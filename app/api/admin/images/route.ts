import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const whereClause: any = {
      isActive: true
    }

    if (status && status !== 'ALL') {
      whereClause.status = status
    }

    // Fetch images
    const images = await prisma.image.findMany({
      where: whereClause,
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        uploadedAt: 'desc'
      },
      take: limit,
      skip: offset
    })

    // Get total count
    const totalCount = await prisma.image.count({
      where: whereClause
    })

    return NextResponse.json({
      images: images.map(image => ({
        id: image.id,
        title: image.title,
        cloudinaryUrl: image.cloudinaryUrl,
        status: image.status,
        uploadedAt: image.uploadedAt,
        uploadedBy: image.uploadedBy,
        category: image.category,
        width: image.width,
        height: image.height,
        fileSize: image.fileSize,
        mimeType: image.mimeType
      })),
      totalCount,
      hasMore: offset + limit < totalCount
    })

  } catch (error: any) {
    console.error('Get images API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}