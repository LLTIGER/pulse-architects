import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '12')
    const category = searchParams.get('category')
    const style = searchParams.get('style')
    const minBedrooms = searchParams.get('minBedrooms')
    const maxBedrooms = searchParams.get('maxBedrooms')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') ?? 'newest'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: 'PUBLISHED',
      isActive: true,
    }

    if (category) {
      where.category = {
        slug: category
      }
    }

    if (style) {
      where.style = style
    }

    if (minBedrooms) {
      where.bedrooms = {
        ...where.bedrooms,
        gte: parseInt(minBedrooms)
      }
    }

    if (maxBedrooms) {
      where.bedrooms = {
        ...where.bedrooms,
        lte: parseInt(maxBedrooms)
      }
    }

    if (minPrice) {
      where.basePrice = {
        ...where.basePrice,
        gte: parseFloat(minPrice)
      }
    }

    if (maxPrice) {
      where.basePrice = {
        ...where.basePrice,
        lte: parseFloat(maxPrice)
      }
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { some: { tag: { contains: search, mode: 'insensitive' } } } }
      ]
    }

    // Build orderBy clause
    let orderBy: any = {}
    switch (sortBy) {
      case 'price-low':
        orderBy = { basePrice: 'asc' }
        break
      case 'price-high':
        orderBy = { basePrice: 'desc' }
        break
      case 'popular':
        orderBy = { downloadCount: 'desc' }
        break
      case 'rating':
        orderBy = { averageRating: 'desc' }
        break
      case 'newest':
      default:
        orderBy = { publishedAt: 'desc' }
        break
    }

    // Get total count for pagination
    const total = await prisma.plan.count({ where })

    // Get plans with relations
    const plans = await prisma.plan.findMany({
      where,
      include: {
        category: true,
        images: {
          where: { isPrimary: true },
          take: 1
        },
        tags: true,
        _count: {
          select: {
            reviews: true,
            favorites: true
          }
        }
      },
      orderBy,
      skip,
      take: limit
    })

    // Transform data for frontend
    const transformedPlans = plans.map(plan => ({
      id: plan.id,
      title: plan.title,
      slug: plan.slug,
      description: plan.shortDescription || plan.description.substring(0, 200) + '...',
      category: plan.category.name,
      tags: plan.tags.map(t => t.tag).slice(0, 5),
      images: {
        thumbnail: plan.images[0]?.thumbnailUrl || plan.images[0]?.cloudinaryUrl || '/placeholder-house.jpg',
        fullSize: plan.images[0]?.largeUrl || plan.images[0]?.cloudinaryUrl || '/placeholder-house.jpg',
      },
      specifications: {
        bedrooms: plan.bedrooms,
        bathrooms: plan.bathrooms,
        area: `${plan.squareFootage.toLocaleString()} sq ft`,
        floors: plan.floors,
        garage: plan.garageSpaces > 0,
        style: plan.style,
      },
      price: `$${plan.basePrice.toFixed(0)}`,
      isPremium: plan.basePrice > 1000,
      isNew: plan.publishedAt && new Date(plan.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      downloads: plan.downloadCount,
      likes: plan.favoriteCount,
      rating: plan.averageRating || 0,
      createdAt: plan.createdAt.toISOString(),
    }))

    return NextResponse.json({
      plans: transformedPlans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
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

// Cache for 5 minutes for public data
export const revalidate = 300