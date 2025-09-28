import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause - only approved and active images
    const whereClause: any = {
      isActive: true,
      status: 'APPROVED'
    }

    if (category && category !== 'all') {
      whereClause.category = category
    }

    // Fetch approved images
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

    // Get total count for pagination
    const totalCount = await prisma.image.count({
      where: whereClause
    })

    return NextResponse.json({
      images: images.map(image => ({
        id: image.id,
        title: image.title,
        cloudinaryUrl: image.cloudinaryUrl,
        category: image.category,
        uploadedAt: image.uploadedAt,
        uploadedBy: {
          name: image.uploadedBy?.name || 'Anonymous'
        },
        width: image.width,
        height: image.height,
        fileSize: image.fileSize,
        mimeType: image.mimeType
      })),
      totalCount,
      hasMore: offset + limit < totalCount
    })

  } catch (error: any) {
    console.error('Gallery images API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}