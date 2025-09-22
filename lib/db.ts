import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL,
  })

// Vercel Edge Runtime compatibility
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Connection management for serverless environments
export async function connectDb() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

export async function disconnectDb() {
  try {
    await prisma.$disconnect()
    console.log('✅ Database disconnected successfully')
  } catch (error) {
    console.error('❌ Database disconnection failed:', error)
  }
}

// Health check function for monitoring
export async function checkDbHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'healthy', timestamp: new Date().toISOString() }
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString() 
    }
  }
}

// Transaction helper with retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxRetries) {
        throw lastError
      }
      
      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }
  
  throw lastError!
}

// Optimized query helpers for common operations
export const queries = {
  // Get plans with pagination and filtering
  getPlans: async (params: {
    page?: number
    limit?: number
    categoryId?: string
    style?: string
    minPrice?: number
    maxPrice?: number
    minSqFt?: number
    maxSqFt?: number
    bedrooms?: number
    bathrooms?: number
    status?: string
    search?: string
  }) => {
    const {
      page = 1,
      limit = 20,
      categoryId,
      style,
      minPrice,
      maxPrice,
      minSqFt,
      maxSqFt,
      bedrooms,
      bathrooms,
      status = 'PUBLISHED',
      search
    } = params

    const skip = (page - 1) * limit
    
    const where: any = {
      status,
      isActive: true,
    }

    if (categoryId) where.categoryId = categoryId
    if (style) where.style = style
    if (bedrooms) where.bedrooms = bedrooms
    if (bathrooms) where.bathrooms = { gte: bathrooms }
    if (minPrice || maxPrice) {
      where.basePrice = {}
      if (minPrice) where.basePrice.gte = minPrice
      if (maxPrice) where.basePrice.lte = maxPrice
    }
    if (minSqFt || maxSqFt) {
      where.squareFootage = {}
      if (minSqFt) where.squareFootage.gte = minSqFt
      if (maxSqFt) where.squareFootage.lte = maxSqFt
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: search.split(' ') } }
      ]
    }

    const [plans, total] = await Promise.all([
      prisma.plan.findMany({
        where,
        include: {
          category: true,
          images: {
            where: { isPrimary: true },
            take: 1
          },
          _count: {
            select: {
              reviews: true,
              favorites: true
            }
          }
        },
        orderBy: [
          { isFeatured: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.plan.count({ where })
    ])

    return {
      plans,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  },

  // Get plan by slug with all related data
  getPlanBySlug: async (slug: string) => {
    return prisma.plan.findUnique({
      where: { slug },
      include: {
        category: true,
        files: {
          orderBy: { sortOrder: 'asc' }
        },
        images: {
          orderBy: { sortOrder: 'asc' }
        },
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
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
            downloadLogs: true
          }
        }
      }
    })
  },

  // Get user orders with plans
  getUserOrders: async (userId: string) => {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            plan: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1
                }
              }
            }
          }
        },
        licenses: true
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  // Get user licenses with download access
  getUserLicenses: async (userId: string) => {
    return prisma.license.findMany({
      where: { 
        userId,
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      },
      include: {
        plan: {
          include: {
            files: true,
            images: {
              where: { isPrimary: true },
              take: 1
            }
          }
        },
        order: {
          select: {
            orderNumber: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
}

export default prisma