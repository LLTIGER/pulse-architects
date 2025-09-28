import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/auth'
import { PrismaClient } from '@prisma/client'
import { imageUpdateSchema, validateRequestBody } from '@/lib/validation/schemas'
import { validateCSRFToken } from '@/lib/security/csrf'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params
    const body = await request.json()
    
    // Validate request body
    const validation = validateRequestBody(imageUpdateSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const { title, category, isApproved } = validation.data
    
    // Convert isApproved to status
    const status = isApproved !== undefined 
      ? (isApproved ? 'APPROVED' : 'REJECTED')
      : undefined

    // Update the image
    const updatedImage = await prisma.image.update({
      where: { id },
      data: {
        ...(status && { 
          status,
          reviewedAt: new Date(),
          reviewedById: user.id
        }),
        ...(title && { title }),
        ...(category && { category })
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        reviewedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      image: {
        id: updatedImage.id,
        title: updatedImage.title,
        status: updatedImage.status,
        cloudinaryUrl: updatedImage.cloudinaryUrl,
        category: updatedImage.category,
        uploadedAt: updatedImage.uploadedAt,
        reviewedAt: updatedImage.reviewedAt,
        uploadedBy: updatedImage.uploadedBy,
        reviewedBy: updatedImage.reviewedBy
      }
    })

  } catch (error: any) {
    console.error('Update image API error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params

    // Soft delete the image
    await prisma.image.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
        deletedById: user.id
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })

  } catch (error: any) {
    console.error('Delete image API error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}