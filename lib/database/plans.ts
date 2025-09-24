import { PrismaClient, Plan, PlanFile, PlanImage, Prisma } from '@prisma/client'
import { generatePlanNumber } from './sequences'

const prisma = new PrismaClient()

export type PlanWithDetails = Plan & {
  category: { name: string; slug: string }
  files: PlanFile[]
  images: PlanImage[]
  tags: { tag: string }[]
  _count: {
    reviews: number
    favorites: number
  }
}

export type CreatePlanInput = {
  title: string
  slug: string
  description: string
  shortDescription?: string
  squareFootage: number
  bedrooms: number
  bathrooms: number
  floors?: number
  garageSpaces?: number
  lotSize?: number
  width: number
  depth: number
  height?: number
  style: string
  buildingType: string
  roofType?: string
  basePrice: number
  pricePerSqFt?: number
  singleLicensePrice: number
  commercialLicensePrice: number
  unlimitedLicensePrice: number
  categoryId: string
  isFeatured?: boolean
  tags?: string[]
  files?: {
    filename: string
    originalName: string
    fileType: string
    fileFormat: string
    fileSize: number
    cloudinaryUrl: string
    publicId: string
    secureUrl: string
    description?: string
    version?: string
    scale?: string
    units?: string
  }[]
  images?: {
    filename: string
    alt: string
    imageType: string
    cloudinaryUrl: string
    publicId: string
    width: number
    height: number
    thumbnailUrl?: string
    mediumUrl?: string
    largeUrl?: string
    isPrimary?: boolean
  }[]
}

/**
 * Creates a new architectural plan with auto-generated plan number
 */
export async function createPlan(input: CreatePlanInput): Promise<Plan> {
  const planNumber = await generatePlanNumber()
  
  const plan = await prisma.plan.create({
    data: {
      planNumber,
      title: input.title,
      slug: input.slug,
      description: input.description,
      shortDescription: input.shortDescription,
      squareFootage: input.squareFootage,
      bedrooms: input.bedrooms,
      bathrooms: input.bathrooms,
      floors: input.floors || 1,
      garageSpaces: input.garageSpaces || 0,
      lotSize: input.lotSize,
      width: input.width,
      depth: input.depth,
      height: input.height,
      style: input.style,
      buildingType: input.buildingType,
      roofType: input.roofType,
      basePrice: input.basePrice,
      pricePerSqFt: input.pricePerSqFt,
      singleLicensePrice: input.singleLicensePrice,
      commercialLicensePrice: input.commercialLicensePrice,
      unlimitedLicensePrice: input.unlimitedLicensePrice,
      categoryId: input.categoryId,
      isFeatured: input.isFeatured || false,
      status: 'DRAFT',
      publishedAt: new Date(),
      
      // Create related data
      files: input.files ? {
        create: input.files.map((file, index) => ({
          ...file,
          sortOrder: index,
          version: file.version || '1.0',
          units: file.units || 'feet'
        }))
      } : undefined,
      
      images: input.images ? {
        create: input.images.map((image, index) => ({
          ...image,
          sortOrder: index
        }))
      } : undefined,
      
      tags: input.tags ? {
        create: input.tags.map(tag => ({ tag }))
      } : undefined
    }
  })
  
  return plan
}

/**
 * Gets all published plans with full details
 */
export async function getAllPlans(options: {
  category?: string
  featured?: boolean
  limit?: number
  offset?: number
  orderBy?: 'createdAt' | 'updatedAt' | 'title' | 'basePrice' | 'viewCount'
  orderDirection?: 'asc' | 'desc'
} = {}): Promise<{
  plans: PlanWithDetails[]
  total: number
}> {
  const {
    category,
    featured,
    limit,
    offset,
    orderBy = 'createdAt',
    orderDirection = 'desc'
  } = options
  
  const where: Prisma.PlanWhereInput = {
    status: 'PUBLISHED',
    isActive: true,
    ...(category && { category: { slug: category } }),
    ...(featured && { isFeatured: true })
  }
  
  const [plans, total] = await Promise.all([
    prisma.plan.findMany({
      where,
      include: {
        category: {
          select: { name: true, slug: true }
        },
        files: {
          orderBy: { sortOrder: 'asc' }
        },
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        tags: {
          select: { tag: true }
        },
        _count: {
          select: {
            reviews: true,
            favorites: true
          }
        }
      },
      orderBy: { [orderBy]: orderDirection },
      ...(limit && { take: limit }),
      ...(offset && { skip: offset })
    }),
    prisma.plan.count({ where })
  ])
  
  return { plans, total }
}

/**
 * Gets a single plan by ID or slug
 */
export async function getPlanByIdOrSlug(identifier: string): Promise<PlanWithDetails | null> {
  const plan = await prisma.plan.findFirst({
    where: {
      OR: [
        { id: identifier },
        { slug: identifier },
        { planNumber: identifier }
      ],
      status: 'PUBLISHED',
      isActive: true
    },
    include: {
      category: {
        select: { name: true, slug: true }
      },
      files: {
        orderBy: { sortOrder: 'asc' }
      },
      images: {
        orderBy: { sortOrder: 'asc' }
      },
      tags: {
        select: { tag: true }
      },
      _count: {
        select: {
          reviews: true,
          favorites: true
        }
      }
    }
  })
  
  // Increment view count
  if (plan) {
    await prisma.plan.update({
      where: { id: plan.id },
      data: { viewCount: { increment: 1 } }
    })
  }
  
  return plan
}

/**
 * Gets featured plans for homepage
 */
export async function getFeaturedPlans(limit: number = 6): Promise<PlanWithDetails[]> {
  const { plans } = await getAllPlans({
    featured: true,
    limit,
    orderBy: 'viewCount',
    orderDirection: 'desc'
  })
  
  return plans
}

/**
 * Searches plans by title, description, or tags
 */
export async function searchPlans(query: string, options: {
  limit?: number
  offset?: number
} = {}): Promise<{
  plans: PlanWithDetails[]
  total: number
}> {
  const { limit, offset } = options
  
  const where: Prisma.PlanWhereInput = {
    status: 'PUBLISHED',
    isActive: true,
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { tags: { some: { tag: { contains: query, mode: 'insensitive' } } } }
    ]
  }
  
  const [plans, total] = await Promise.all([
    prisma.plan.findMany({
      where,
      include: {
        category: {
          select: { name: true, slug: true }
        },
        files: {
          orderBy: { sortOrder: 'asc' }
        },
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        tags: {
          select: { tag: true }
        },
        _count: {
          select: {
            reviews: true,
            favorites: true
          }
        }
      },
      orderBy: { viewCount: 'desc' },
      ...(limit && { take: limit }),
      ...(offset && { skip: offset })
    }),
    prisma.plan.count({ where })
  ])
  
  return { plans, total }
}

/**
 * Updates a plan
 */
export async function updatePlan(id: string, input: Partial<CreatePlanInput>): Promise<Plan> {
  const plan = await prisma.plan.update({
    where: { id },
    data: {
      ...(input.title && { title: input.title }),
      ...(input.description && { description: input.description }),
      ...(input.shortDescription && { shortDescription: input.shortDescription }),
      ...(input.squareFootage && { squareFootage: input.squareFootage }),
      ...(input.bedrooms && { bedrooms: input.bedrooms }),
      ...(input.bathrooms && { bathrooms: input.bathrooms }),
      ...(input.basePrice && { basePrice: input.basePrice }),
      ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }),
      updatedAt: new Date()
    }
  })
  
  return plan
}

/**
 * Deletes a plan (soft delete by setting isActive to false)
 */
export async function deletePlan(id: string): Promise<boolean> {
  try {
    await prisma.plan.update({
      where: { id },
      data: { isActive: false }
    })
    return true
  } catch {
    return false
  }
}