import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

interface Params {
  id: string
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const planId = params.id

    // Get plan with all related data
    const plan = await prisma.plan.findUnique({
      where: {
        id: planId,
        status: 'PUBLISHED',
        isActive: true
      },
      include: {
        category: true,
        images: {
          orderBy: [
            { isPrimary: 'desc' },
            { sortOrder: 'asc' }
          ]
        },
        files: {
          where: { isPreview: true },
          orderBy: { sortOrder: 'asc' }
        },
        tags: true,
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: {
                name: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            reviews: { where: { isApproved: true } },
            favorites: true,
            downloadLogs: true
          }
        }
      }
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    // Update view count
    await prisma.plan.update({
      where: { id: planId },
      data: { viewCount: { increment: 1 } }
    })

    // Transform data for frontend
    const transformedPlan = {
      id: plan.id,
      title: plan.title,
      slug: plan.slug,
      description: plan.description,
      shortDescription: plan.shortDescription,
      category: {
        id: plan.category.id,
        name: plan.category.name,
        slug: plan.category.slug
      },
      tags: plan.tags.map(t => t.tag),
      images: plan.images.map(img => ({
        id: img.id,
        filename: img.filename,
        alt: img.alt,
        type: img.imageType,
        url: img.cloudinaryUrl,
        thumbnailUrl: img.thumbnailUrl,
        mediumUrl: img.mediumUrl,
        largeUrl: img.largeUrl,
        width: img.width,
        height: img.height,
        isPrimary: img.isPrimary,
        sortOrder: img.sortOrder
      })),
      files: plan.files.map(file => ({
        id: file.id,
        filename: file.filename,
        originalName: file.originalName,
        type: file.fileType,
        format: file.fileFormat,
        size: file.fileSize,
        description: file.description,
        version: file.version,
        scale: file.scale,
        units: file.units,
        isPreview: file.isPreview,
        sortOrder: file.sortOrder
      })),
      specifications: {
        squareFootage: plan.squareFootage,
        bedrooms: plan.bedrooms,
        bathrooms: plan.bathrooms,
        floors: plan.floors,
        garageSpaces: plan.garageSpaces,
        lotSize: plan.lotSize,
        width: plan.width,
        depth: plan.depth,
        height: plan.height,
        style: plan.style,
        buildingType: plan.buildingType,
        roofType: plan.roofType
      },
      pricing: {
        basePrice: plan.basePrice,
        pricePerSqFt: plan.pricePerSqFt,
        singleLicense: plan.singleLicensePrice,
        commercialLicense: plan.commercialLicensePrice,
        unlimitedLicense: plan.unlimitedLicensePrice
      },
      meta: {
        metaTitle: plan.metaTitle,
        metaDescription: plan.metaDescription
      },
      stats: {
        viewCount: plan.viewCount + 1, // Include the increment
        downloadCount: plan.downloadCount,
        favoriteCount: plan.favoriteCount,
        averageRating: plan.averageRating,
        reviewCount: plan.reviewCount,
        totalReviews: plan._count.reviews,
        totalFavorites: plan._count.favorites,
        totalDownloads: plan._count.downloadLogs
      },
      reviews: plan.reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        title: review.title,
        content: review.content,
        isVerified: review.isVerified,
        helpfulVotes: review.helpfulVotes,
        createdAt: review.createdAt.toISOString(),
        user: {
          name: review.user.name || 
                `${review.user.profile?.firstName || ''} ${review.user.profile?.lastName || ''}`.trim() ||
                'Anonymous'
        }
      })),
      status: plan.status,
      isActive: plan.isActive,
      isFeatured: plan.isFeatured,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
      publishedAt: plan.publishedAt?.toISOString()
    }

    return NextResponse.json({
      plan: transformedPlan
    })
  } catch (error: any) {
    console.error('Error fetching plan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plan' },
      { status: 500 }
    )
  }
}

// Enable CORS for public API
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Cache for 5 minutes for plan details
export const revalidate = 300