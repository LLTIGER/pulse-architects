import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // For now, return mock data to avoid Prisma client-side issues
    // This will be replaced with actual database calls when Prisma is properly configured server-side
    
    const mockPlans = [
      {
        id: '1',
        title: 'Modern Villa Design',
        slug: 'modern-villa-design',
        description: 'A stunning contemporary villa with open concept living and panoramic windows.',
        category: 'Residential',
        tags: ['modern', 'villa', 'contemporary'],
        images: {
          thumbnail: '/images/properties/prop1.jpg',
          fullSize: '/images/properties/prop1.jpg'
        },
        specifications: {
          bedrooms: 4,
          bathrooms: 3,
          area: '320 sq m',
          floors: 2,
          garage: true,
          style: 'Modern'
        },
        price: '$2,450',
        isPremium: true,
        isNew: true,
        downloads: 245,
        likes: 89,
        rating: 4.8,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Classic Family Home',
        slug: 'classic-family-home',
        description: 'Traditional family home with spacious rooms and classic architectural elements.',
        category: 'Residential',
        tags: ['traditional', 'family', 'spacious'],
        images: {
          thumbnail: '/images/properties/prop2.jpg',
          fullSize: '/images/properties/prop2.jpg'
        },
        specifications: {
          bedrooms: 3,
          bathrooms: 2,
          area: '240 sq m',
          floors: 2,
          garage: true,
          style: 'Traditional'
        },
        price: '$1,850',
        isPremium: false,
        isNew: false,
        downloads: 156,
        likes: 67,
        rating: 4.5,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Luxury Estate Design',
        slug: 'luxury-estate-design',
        description: 'Grand luxury estate featuring premium finishes and sophisticated design elements.',
        category: 'Luxury',
        tags: ['luxury', 'estate', 'premium'],
        images: {
          thumbnail: '/images/properties/prop3.jpg',
          fullSize: '/images/properties/prop3.jpg'
        },
        specifications: {
          bedrooms: 5,
          bathrooms: 4,
          area: '580 sq m',
          floors: 3,
          garage: true,
          style: 'Luxury'
        },
        price: '$4,200',
        isPremium: true,
        isNew: true,
        downloads: 89,
        likes: 134,
        rating: 4.9,
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Minimalist Apartment',
        slug: 'minimalist-apartment',
        description: 'Clean, modern apartment design with focus on functionality and simplicity.',
        category: 'Apartment',
        tags: ['minimalist', 'apartment', 'modern'],
        images: {
          thumbnail: '/images/properties/prop4.jpg',
          fullSize: '/images/properties/prop4.jpg'
        },
        specifications: {
          bedrooms: 2,
          bathrooms: 1,
          area: '85 sq m',
          floors: 1,
          garage: false,
          style: 'Minimalist'
        },
        price: '$950',
        isPremium: false,
        isNew: false,
        downloads: 278,
        likes: 45,
        rating: 4.3,
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Country Farmhouse',
        slug: 'country-farmhouse',
        description: 'Charming farmhouse design with rustic elements and modern amenities.',
        category: 'Farmhouse',
        tags: ['farmhouse', 'country', 'rustic'],
        images: {
          thumbnail: '/images/properties/prop5.jpg',
          fullSize: '/images/properties/prop5.jpg'
        },
        specifications: {
          bedrooms: 4,
          bathrooms: 3,
          area: '290 sq m',
          floors: 2,
          garage: true,
          style: 'Farmhouse'
        },
        price: '$2,100',
        isPremium: false,
        isNew: true,
        downloads: 167,
        likes: 92,
        rating: 4.6,
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        title: 'Victorian Mansion',
        slug: 'victorian-mansion',
        description: 'Elegant Victorian-style mansion with ornate details and period features.',
        category: 'Historic',
        tags: ['victorian', 'mansion', 'historic'],
        images: {
          thumbnail: '/images/properties/prop6.jpg',
          fullSize: '/images/properties/prop6.jpg'
        },
        specifications: {
          bedrooms: 6,
          bathrooms: 5,
          area: '450 sq m',
          floors: 3,
          garage: true,
          style: 'Victorian'
        },
        price: '$3,800',
        isPremium: true,
        isNew: false,
        downloads: 98,
        likes: 156,
        rating: 4.7,
        createdAt: new Date().toISOString()
      }
    ]

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    let filteredPlans = mockPlans

    // Apply featured filter (for now, just return premium plans)
    if (featured === 'true') {
      filteredPlans = mockPlans.filter(plan => plan.isPremium)
    }

    // Apply limit
    filteredPlans = filteredPlans.slice(0, limit)

    return NextResponse.json({
      success: true,
      plans: filteredPlans,
      total: filteredPlans.length,
      message: 'Plans retrieved successfully'
    })

  } catch (error: any) {
    console.error('Error fetching plans:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch plans',
        plans: [],
        total: 0
      },
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