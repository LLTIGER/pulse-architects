import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/auth'
import { v2 as cloudinary } from 'cloudinary'
import { PrismaClient } from '@prisma/client'
import { createUserBasedRateLimiter } from '@/lib/security/rate-limiter'
import { validateCSRFToken } from '@/lib/security/csrf'
import { 
  validateUploadedFile, 
  validateFileBuffer, 
  getSecureCloudinaryOptions,
  FILE_UPLOAD_CSP_HEADERS
} from '@/lib/security/file-upload'

const prisma = new PrismaClient()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const rateLimiter = createUserBasedRateLimiter({
  windowMs: 60 * 1000,     // 1 minute
  maxRequests: 5,          // 5 uploads per minute
  message: 'Upload rate limit exceeded. Please wait before uploading again.'
})

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = rateLimiter(request)
  if (rateLimitResult) {
    return rateLimitResult
  }
  try {
    // Validate CSRF token and verify authentication
    const authHeader = request.headers.get('authorization')
    const userSession = authHeader ? authHeader.substring(7) : undefined
    
    if (!validateCSRFToken(request, userSession)) {
      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      )
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const user = await verifyToken(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Comprehensive file validation
    const fileValidation = validateUploadedFile(file, 'image')
    if (!fileValidation.isValid) {
      return NextResponse.json(
        { error: 'File validation failed', details: fileValidation.errors },
        { status: 400 }
      )
    }

    // Convert file to buffer and validate content
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Advanced buffer validation
    const bufferValidation = await validateFileBuffer(bytes, file.type)
    if (!bufferValidation.isValid) {
      return NextResponse.json(
        { error: 'File content validation failed', details: bufferValidation.errors },
        { status: 400 }
      )
    }

    // Upload to Cloudinary with secure options
    const cloudinaryOptions = getSecureCloudinaryOptions('image')
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        cloudinaryOptions,
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    }) as any

    // Save to database with sanitized filename
    const sanitizedTitle = fileValidation.sanitizedFilename?.replace(/\.[^/.]+$/, '') || 
                          file.name.replace(/\.[^/.]+$/, '')
    
    const savedImage = await prisma.image.create({
      data: {
        title: sanitizedTitle,
        cloudinaryUrl: uploadResult.secure_url,
        fileSize: file.size,
        mimeType: fileValidation.detectedMimeType || file.type,
        width: uploadResult.width,
        height: uploadResult.height,
        uploadedById: user.id,
        status: 'PENDING', // Default to pending approval
        category: 'ARCHITECTURAL_PLAN', // Default category
        isActive: true
      }
    })

    // Send admin notification email
    try {
      const { sendAdminUploadAlert } = await import('../../../../emails/lib/email-sender')
      const reviewUrl = `https://pulse-architects.com/dashboard/uploads/${savedImage.id}`
      
      await sendAdminUploadAlert(
        savedImage.title,
        user.name || 'Admin User',
        user.email,
        savedImage.category,
        reviewUrl
      )
      
      console.log(`Admin upload alert sent for image: ${savedImage.id}`)
    } catch (emailError) {
      console.error('Failed to send admin upload alert:', emailError)
      // Don't fail upload if email fails
    }

    // Create response with security headers
    const response = NextResponse.json({
      success: true,
      image: {
        id: savedImage.id,
        title: savedImage.title,
        url: savedImage.cloudinaryUrl,
        status: savedImage.status
      }
    })

    // Add security headers
    Object.entries(FILE_UPLOAD_CSP_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response

  } catch (error: any) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}