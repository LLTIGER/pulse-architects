import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/auth'
import { PrismaClient } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import { createUserBasedRateLimiter, RateLimitPresets } from '@/lib/security/rate-limiter'
import { downloadSchema, validateQueryParams } from '@/lib/validation/schemas'

const prisma = new PrismaClient()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const rateLimiter = createUserBasedRateLimiter(RateLimitPresets.download)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply rate limiting
  const rateLimitResult = rateLimiter(request)
  if (rateLimitResult) {
    return rateLimitResult
  }

  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    
    // Validate query parameters
    const validation = validateQueryParams(downloadSchema, searchParams)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid download parameters', details: validation.errors },
        { status: 400 }
      )
    }

    const { imageId: validatedImageId, license } = validation.data
    
    // Use provided imageId or fall back to URL param
    const imageId = validatedImageId || id

    // Verify authentication (optional for public downloads)
    let user = null
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      user = await verifyToken(token)
    }

    // Get image from database
    const image = await prisma.image.findFirst({
      where: {
        id: imageId,
        isActive: true,
        status: 'APPROVED'
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found or not approved for download' },
        { status: 404 }
      )
    }

    // Check download permissions based on license type
    const canDownload = await checkDownloadPermissions(image, user, license as any)
    if (!canDownload.allowed) {
      return NextResponse.json(
        { error: canDownload.reason },
        { status: 403 }
      )
    }

    // Get client IP for tracking
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '127.0.0.1'

    // Track download in database
    await prisma.download.create({
      data: {
        imageId: image.id,
        userId: user?.id,
        license: license as any,
        ipAddress: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        downloadedAt: new Date()
      }
    })

    // Send download confirmation email for authenticated users
    if (user && license !== 'PREVIEW') {
      try {
        const { sendDownloadConfirmation } = await import('../../../../emails/lib/email-sender')
        const downloadUrl = `https://pulse-architects.com/download/${image.id}?license=${license}`
        
        await sendDownloadConfirmation(
          user.email,
          user.name || 'Customer',
          image.title,
          license as string,
          downloadUrl
        )
        
        console.log(`Download confirmation email sent to ${user.email} for ${image.title}`)
      } catch (emailError) {
        console.error('Failed to send download confirmation email:', emailError)
        // Don't fail download if email fails
      }
    }

    // Get Cloudinary download URL with appropriate transformations
    const downloadUrl = getCloudinaryDownloadUrl(image.cloudinaryUrl, license as any)

    // Stream the file from Cloudinary
    const fileResponse = await fetch(downloadUrl)
    
    if (!fileResponse.ok) {
      throw new Error('Failed to fetch file from Cloudinary')
    }

    const fileBuffer = await fileResponse.arrayBuffer()
    
    // Set appropriate headers for download
    const headers = new Headers()
    headers.set('Content-Type', image.mimeType || 'application/octet-stream')
    headers.set('Content-Length', fileBuffer.byteLength.toString())
    headers.set('Content-Disposition', `attachment; filename="${getDownloadFilename(image, license as any)}"`)
    headers.set('Cache-Control', 'private, no-cache')
    
    // Optional: Add watermark for certain license types
    if (license === 'PREVIEW') {
      headers.set('X-License-Type', 'Preview - For evaluation only')
    }

    return new Response(fileBuffer, {
      status: 200,
      headers
    })

  } catch (error: any) {
    console.error('Download API error:', error)
    return NextResponse.json(
      { error: 'Internal server error during download' },
      { status: 500 }
    )
  }
}

async function checkDownloadPermissions(
  image: any, 
  user: any, 
  license: 'PREVIEW' | 'STANDARD' | 'COMMERCIAL' | 'EXTENDED'
) {
  // Preview downloads - always allowed (with watermark)
  if (license === 'PREVIEW') {
    return { allowed: true }
  }

  // Standard/Commercial/Extended downloads require authentication
  if (!user) {
    return { 
      allowed: false, 
      reason: 'Authentication required for this license type' 
    }
  }

  // Check if user has already downloaded this image with this license
  await prisma.download.findFirst({
    where: {
      imageId: image.id,
      userId: user.id,
      license
    }
  })

  // For now, allow multiple downloads
  // In future, could implement download limits per license
  return { allowed: true }
}

function getCloudinaryDownloadUrl(cloudinaryUrl: string, license: 'PREVIEW' | 'STANDARD' | 'COMMERCIAL' | 'EXTENDED') {
  // Extract public_id from Cloudinary URL
  const publicId = cloudinaryUrl.split('/').pop()?.split('.')[0]
  
  if (!publicId) {
    return cloudinaryUrl
  }

  // Apply transformations based on license type
  switch (license) {
    case 'PREVIEW':
      // Reduced quality with watermark for preview
      return cloudinary.url(publicId, {
        quality: 'auto:low',
        overlay: 'text:Arial_60:PREVIEW',
        opacity: 30,
        gravity: 'center',
        color: 'white'
      })
    
    case 'STANDARD':
      // Standard quality
      return cloudinary.url(publicId, {
        quality: 'auto:good',
        fetch_format: 'auto'
      })
    
    case 'COMMERCIAL':
      // High quality
      return cloudinary.url(publicId, {
        quality: 'auto:best',
        fetch_format: 'auto'
      })
    
    case 'EXTENDED':
      // Highest quality, original format
      return cloudinary.url(publicId, {
        quality: '100',
        flags: 'immutable_cache'
      })
    
    default:
      return cloudinaryUrl
  }
}

function getDownloadFilename(image: any, license: 'PREVIEW' | 'STANDARD' | 'COMMERCIAL' | 'EXTENDED') {
  const baseName = image.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
  const timestamp = new Date().toISOString().split('T')[0]
  const extension = image.mimeType?.split('/')[1] || 'jpg'
  
  return `${baseName}_${license.toLowerCase()}_${timestamp}.${extension}`
}