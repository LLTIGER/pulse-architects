import { PrismaClient, Project, Prisma } from '@prisma/client'
import { generateProjectNumber } from './sequences'

const prisma = new PrismaClient()

export type ProjectWithDetails = Project & {
  plans: Array<{
    id: string
    planNumber: string
    title: string
    slug: string
    squareFootage: number
    bedrooms: number
    bathrooms: number
    basePrice: number
  }>
  visualizations: Array<{
    id: string
    visualizationNumber: string
    title: string
    description: string
    category: string
    renderType: string
  }>
  galleryItems: Array<{
    id: string
    title: string
    itemType: string
    thumbnailUrl?: string
  }>
  tags: { tag: string }[]
  _count: {
    plans: number
    visualizations: number
    galleryItems: number
  }
}

export type CreateProjectInput = {
  title: string
  slug: string
  description: string
  shortDescription?: string
  clientName?: string
  location?: string
  projectType: string
  status: 'PLANNING' | 'DESIGN' | 'CONSTRUCTION' | 'COMPLETED'
  startDate?: Date
  completionDate?: Date
  totalArea?: number
  budget?: number
  isFeatured?: boolean
  tags?: string[]
}

/**
 * Creates a new project with auto-generated project number
 */
export async function createProject(input: CreateProjectInput): Promise<Project> {
  const projectNumber = await generateProjectNumber()
  
  const project = await prisma.project.create({
    data: {
      projectNumber,
      title: input.title,
      slug: input.slug,
      description: input.description,
      shortDescription: input.shortDescription,
      clientName: input.clientName,
      location: input.location,
      projectType: input.projectType,
      status: input.status,
      startDate: input.startDate,
      completionDate: input.completionDate,
      budget: input.budget,
      totalArea: input.totalArea,
      isFeatured: input.isFeatured || false,
      isPublished: true,
      
      // Create related data
      tags: input.tags ? {
        create: input.tags.map(tag => ({ tag }))
      } : undefined
    }
  })
  
  return project
}

/**
 * Gets all published projects with full details
 */
export async function getAllProjects(options: {
  status?: string
  featured?: boolean
  limit?: number
  offset?: number
  orderBy?: 'createdAt' | 'updatedAt' | 'title' | 'startDate' | 'completionDate'
  orderDirection?: 'asc' | 'desc'
} = {}): Promise<{
  projects: ProjectWithDetails[]
  total: number
}> {
  const {
    status,
    featured,
    limit,
    offset,
    orderBy = 'createdAt',
    orderDirection = 'desc'
  } = options
  
  const where: Prisma.ProjectWhereInput = {
    isPublished: true,
    ...(status && { status: status as any }),
    ...(featured && { isFeatured: true })
  }
  
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        plans: {
          select: {
            id: true,
            planNumber: true,
            title: true,
            slug: true,
            squareFootage: true,
            bedrooms: true,
            bathrooms: true,
            basePrice: true
          },
          where: { isActive: true }
        },
        visualizations: {
          select: {
            id: true,
            visualizationNumber: true,
            title: true,
            description: true,
            category: true,
            renderType: true
          },
          where: { isPublished: true }
        },
        galleryItems: {
          select: {
            id: true,
            title: true,
            itemType: true,
            thumbnailUrl: true
          },
          where: { isPublished: true }
        },
        tags: {
          select: { tag: true }
        },
        _count: {
          select: {
            plans: true,
            visualizations: true,
            galleryItems: true
          }
        }
      },
      orderBy: { [orderBy]: orderDirection },
      ...(limit && { take: limit }),
      ...(offset && { skip: offset })
    }),
    prisma.project.count({ where })
  ])
  
  return { projects, total }
}

/**
 * Gets a single project by ID or slug
 */
export async function getProjectByIdOrSlug(identifier: string): Promise<ProjectWithDetails | null> {
  const project = await prisma.project.findFirst({
    where: {
      OR: [
        { id: identifier },
        { slug: identifier },
        { projectNumber: identifier }
      ],
      isPublished: true
    },
    include: {
      plans: {
        select: {
          id: true,
          planNumber: true,
          title: true,
          slug: true,
          squareFootage: true,
          bedrooms: true,
          bathrooms: true,
          basePrice: true
        },
        where: { isActive: true }
      },
      visualizations: {
        select: {
          id: true,
          visualizationNumber: true,
          title: true,
          description: true,
          category: true,
          renderType: true
        },
        where: { isPublished: true }
      },
      galleryItems: {
        select: {
          id: true,
          title: true,
          itemType: true,
          thumbnailUrl: true
        },
        where: { isPublished: true }
      },
      tags: {
        select: { tag: true }
      },
      _count: {
        select: {
          plans: true,
          visualizations: true,
          galleryItems: true
        }
      }
    }
  })
  
  return project
}

/**
 * Gets featured projects for homepage
 */
export async function getFeaturedProjects(limit: number = 6): Promise<ProjectWithDetails[]> {
  const { projects } = await getAllProjects({
    featured: true,
    limit,
    orderBy: 'updatedAt',
    orderDirection: 'desc'
  })
  
  return projects
}

/**
 * Gets projects by status
 */
export async function getProjectsByStatus(status: 'PLANNING' | 'DESIGN' | 'CONSTRUCTION' | 'COMPLETED'): Promise<ProjectWithDetails[]> {
  const { projects } = await getAllProjects({
    status,
    orderBy: 'updatedAt',
    orderDirection: 'desc'
  })
  
  return projects
}

/**
 * Searches projects by title, description, client, or location
 */
export async function searchProjects(query: string, options: {
  limit?: number
  offset?: number
} = {}): Promise<{
  projects: ProjectWithDetails[]
  total: number
}> {
  const { limit, offset } = options
  
  const where: Prisma.ProjectWhereInput = {
    isPublished: true,
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { clientName: { contains: query, mode: 'insensitive' } },
      { location: { contains: query, mode: 'insensitive' } },
      { tags: { some: { tag: { contains: query, mode: 'insensitive' } } } }
    ]
  }
  
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        plans: {
          select: {
            id: true,
            planNumber: true,
            title: true,
            slug: true,
            squareFootage: true,
            bedrooms: true,
            bathrooms: true,
            basePrice: true
          },
          where: { isActive: true }
        },
        visualizations: {
          select: {
            id: true,
            visualizationNumber: true,
            title: true,
            description: true,
            category: true,
            renderType: true
          },
          where: { isPublished: true }
        },
        galleryItems: {
          select: {
            id: true,
            title: true,
            itemType: true,
            thumbnailUrl: true
          },
          where: { isPublished: true }
        },
        tags: {
          select: { tag: true }
        },
        _count: {
          select: {
            plans: true,
            visualizations: true,
            galleryItems: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
      ...(limit && { take: limit }),
      ...(offset && { skip: offset })
    }),
    prisma.project.count({ where })
  ])
  
  return { projects, total }
}

/**
 * Updates a project
 */
export async function updateProject(id: string, input: Partial<CreateProjectInput>): Promise<Project> {
  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(input.title && { title: input.title }),
      ...(input.description && { description: input.description }),
      ...(input.shortDescription && { shortDescription: input.shortDescription }),
      ...(input.clientName && { clientName: input.clientName }),
      ...(input.location && { location: input.location }),
      ...(input.projectType && { projectType: input.projectType }),
      ...(input.status && { status: input.status }),
      ...(input.startDate && { startDate: input.startDate }),
      ...(input.completionDate && { completionDate: input.completionDate }),
      ...(input.budget && { budget: input.budget }),
      ...(input.totalArea && { totalArea: input.totalArea }),
      ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }),
      updatedAt: new Date()
    }
  })
  
  return project
}

/**
 * Deletes a project (soft delete by setting isPublished to false)
 */
export async function deleteProject(id: string): Promise<boolean> {
  try {
    await prisma.project.update({
      where: { id },
      data: { isPublished: false }
    })
    return true
  } catch {
    return false
  }
}