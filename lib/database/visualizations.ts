import { PrismaClient, Visualization, VisualizationImage, Prisma } from '@prisma/client'
import { generateVisualizationNumber } from './sequences'

const prisma = new PrismaClient()

export type VisualizationWithDetails = Visualization & {
  category: { name: string; slug: string }
  project?: { title: string; slug: string; projectNumber: string }
  images: VisualizationImage[]
  tags: { tag: string }[]
  _count: {
    reviews: number
    favorites: number
  }
}

export type CreateVisualizationInput = {
  title: string
  slug: string
  description: string
  shortDescription?: string
  visualizationType: string
  renderEngine: string
  resolution: string
  renderTime?: number
  style: string
  categoryId: string
  projectId?: string
  basePrice: number
  singleLicensePrice: number
  commercialLicensePrice: number
  unlimitedLicensePrice: number
  isFeatured?: boolean
  tags?: string[]
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
 * Creates a new 3D visualization with auto-generated visualization number
 */
export async function createVisualization(input: CreateVisualizationInput): Promise<Visualization> {
  const visualizationNumber = await generateVisualizationNumber()
  
  const visualization = await prisma.visualization.create({
    data: {
      visualizationNumber,
      title: input.title,
      slug: input.slug,
      description: input.description,
      shortDescription: input.shortDescription,
      visualizationType: input.visualizationType,
      renderEngine: input.renderEngine,
      resolution: input.resolution,
      renderTime: input.renderTime,
      style: input.style,
      categoryId: input.categoryId,
      projectId: input.projectId,
      basePrice: input.basePrice,
      singleLicensePrice: input.singleLicensePrice,
      commercialLicensePrice: input.commercialLicensePrice,
      unlimitedLicensePrice: input.unlimitedLicensePrice,
      isFeatured: input.isFeatured || false,
      status: 'DRAFT',
      publishedAt: new Date(),
      
      // Create related data
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
  
  return visualization
}

/**
 * Gets all published visualizations with full details
 */
export async function getAllVisualizations(options: {
  category?: string
  project?: string
  featured?: boolean
  limit?: number
  offset?: number
  orderBy?: 'createdAt' | 'updatedAt' | 'title' | 'basePrice' | 'viewCount'
  orderDirection?: 'asc' | 'desc'
} = {}): Promise<{
  visualizations: VisualizationWithDetails[]
  total: number
}> {
  const {
    category,
    project,
    featured,
    limit,
    offset,
    orderBy = 'createdAt',
    orderDirection = 'desc'
  } = options
  
  const where: Prisma.VisualizationWhereInput = {
    status: 'PUBLISHED',
    isActive: true,
    ...(category && { category: { slug: category } }),
    ...(project && { project: { slug: project } }),
    ...(featured && { isFeatured: true })
  }
  
  const [visualizations, total] = await Promise.all([
    prisma.visualization.findMany({
      where,
      include: {
        category: {
          select: { name: true, slug: true }
        },
        project: {
          select: { title: true, slug: true, projectNumber: true }
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
    prisma.visualization.count({ where })
  ])
  
  return { visualizations, total }
}

/**
 * Gets a single visualization by ID or slug
 */
export async function getVisualizationByIdOrSlug(identifier: string): Promise<VisualizationWithDetails | null> {
  const visualization = await prisma.visualization.findFirst({
    where: {
      OR: [
        { id: identifier },
        { slug: identifier },
        { visualizationNumber: identifier }
      ],
      status: 'PUBLISHED',
      isActive: true
    },
    include: {
      category: {
        select: { name: true, slug: true }
      },
      project: {
        select: { title: true, slug: true, projectNumber: true }
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
  if (visualization) {
    await prisma.visualization.update({
      where: { id: visualization.id },
      data: { viewCount: { increment: 1 } }
    })
  }
  
  return visualization
}

/**
 * Gets featured visualizations for homepage
 */
export async function getFeaturedVisualizations(limit: number = 6): Promise<VisualizationWithDetails[]> {
  const { visualizations } = await getAllVisualizations({
    featured: true,
    limit,
    orderBy: 'viewCount',
    orderDirection: 'desc'
  })
  
  return visualizations
}

/**
 * Searches visualizations by title, description, or tags
 */
export async function searchVisualizations(query: string, options: {
  limit?: number
  offset?: number
} = {}): Promise<{
  visualizations: VisualizationWithDetails[]
  total: number
}> {
  const { limit, offset } = options
  
  const where: Prisma.VisualizationWhereInput = {
    status: 'PUBLISHED',
    isActive: true,
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { tags: { some: { tag: { contains: query, mode: 'insensitive' } } } }
    ]
  }
  
  const [visualizations, total] = await Promise.all([
    prisma.visualization.findMany({
      where,
      include: {
        category: {
          select: { name: true, slug: true }
        },
        project: {
          select: { title: true, slug: true, projectNumber: true }
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
    prisma.visualization.count({ where })
  ])
  
  return { visualizations, total }
}

/**
 * Gets visualizations by project
 */
export async function getVisualizationsByProject(projectId: string): Promise<VisualizationWithDetails[]> {
  const visualizations = await prisma.visualization.findMany({
    where: {
      projectId,
      status: 'PUBLISHED',
      isActive: true
    },
    include: {
      category: {
        select: { name: true, slug: true }
      },
      project: {
        select: { title: true, slug: true, projectNumber: true }
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
    orderBy: { createdAt: 'desc' }
  })
  
  return visualizations
}

/**
 * Updates a visualization
 */
export async function updateVisualization(id: string, input: Partial<CreateVisualizationInput>): Promise<Visualization> {
  const visualization = await prisma.visualization.update({
    where: { id },
    data: {
      ...(input.title && { title: input.title }),
      ...(input.description && { description: input.description }),
      ...(input.shortDescription && { shortDescription: input.shortDescription }),
      ...(input.visualizationType && { visualizationType: input.visualizationType }),
      ...(input.renderEngine && { renderEngine: input.renderEngine }),
      ...(input.resolution && { resolution: input.resolution }),
      ...(input.basePrice && { basePrice: input.basePrice }),
      ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }),
      updatedAt: new Date()
    }
  })
  
  return visualization
}

/**
 * Deletes a visualization (soft delete by setting isActive to false)
 */
export async function deleteVisualization(id: string): Promise<boolean> {
  try {
    await prisma.visualization.update({
      where: { id },
      data: { isActive: false }
    })
    return true
  } catch {
    return false
  }
}