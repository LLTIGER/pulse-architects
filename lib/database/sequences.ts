import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Generates the next plan number in the format PA-YYYY-####
 * @returns Promise<string> - The generated plan number
 */
export async function generatePlanNumber(): Promise<string> {
  const currentYear = new Date().getFullYear()
  
  // Get or create the sequence for current year
  let sequence = await prisma.planSequence.findUnique({
    where: { year: currentYear }
  })
  
  if (!sequence) {
    sequence = await prisma.planSequence.create({
      data: {
        year: currentYear,
        nextSequence: 1
      }
    })
  }
  
  // Generate the plan number
  const planNumber = `PA-${currentYear}-${sequence.nextSequence.toString().padStart(4, '0')}`
  
  // Update the sequence for next use
  await prisma.planSequence.update({
    where: { year: currentYear },
    data: {
      nextSequence: sequence.nextSequence + 1
    }
  })
  
  return planNumber
}

/**
 * Generates the next visualization number in the format VIS-YYYY-####
 * @returns Promise<string> - The generated visualization number
 */
export async function generateVisualizationNumber(): Promise<string> {
  const currentYear = new Date().getFullYear()
  
  // Get or create the sequence for current year
  let sequence = await prisma.visualizationSequence.findUnique({
    where: { year: currentYear }
  })
  
  if (!sequence) {
    sequence = await prisma.visualizationSequence.create({
      data: {
        year: currentYear,
        nextSequence: 1
      }
    })
  }
  
  // Generate the visualization number
  const visualizationNumber = `VIS-${currentYear}-${sequence.nextSequence.toString().padStart(4, '0')}`
  
  // Update the sequence for next use
  await prisma.visualizationSequence.update({
    where: { year: currentYear },
    data: {
      nextSequence: sequence.nextSequence + 1
    }
  })
  
  return visualizationNumber
}

/**
 * Generates the next project number in the format PRJ-YYYY-####
 * @returns Promise<string> - The generated project number
 */
export async function generateProjectNumber(): Promise<string> {
  const currentYear = new Date().getFullYear()
  
  // Get or create the sequence for current year
  let sequence = await prisma.projectSequence.findUnique({
    where: { year: currentYear }
  })
  
  if (!sequence) {
    sequence = await prisma.projectSequence.create({
      data: {
        year: currentYear,
        nextSequence: 1
      }
    })
  }
  
  // Generate the project number
  const projectNumber = `PRJ-${currentYear}-${sequence.nextSequence.toString().padStart(4, '0')}`
  
  // Update the sequence for next use
  await prisma.projectSequence.update({
    where: { year: currentYear },
    data: {
      nextSequence: sequence.nextSequence + 1
    }
  })
  
  return projectNumber
}

/**
 * Generates the next gallery item number in the format GAL-YYYY-####
 * @returns Promise<string> - The generated gallery item number
 */
export async function generateGalleryNumber(): Promise<string> {
  const currentYear = new Date().getFullYear()
  
  // Get or create the sequence for current year
  let sequence = await prisma.gallerySequence.findUnique({
    where: { year: currentYear }
  })
  
  if (!sequence) {
    sequence = await prisma.gallerySequence.create({
      data: {
        year: currentYear,
        nextSequence: 1
      }
    })
  }
  
  // Generate the gallery number
  const galleryNumber = `GAL-${currentYear}-${sequence.nextSequence.toString().padStart(4, '0')}`
  
  // Update the sequence for next use
  await prisma.gallerySequence.update({
    where: { year: currentYear },
    data: {
      nextSequence: sequence.nextSequence + 1
    }
  })
  
  return galleryNumber
}

/**
 * Gets the current sequence numbers for all auto-numbered entities
 * @returns Promise<{planSequence: number, visualizationSequence: number, projectSequence: number, gallerySequence: number, year: number}>
 */
export async function getCurrentSequences(): Promise<{
  planSequence: number
  visualizationSequence: number
  projectSequence: number
  gallerySequence: number
  year: number
}> {
  const currentYear = new Date().getFullYear()
  
  const planSequence = await prisma.planSequence.findUnique({
    where: { year: currentYear }
  })
  
  const visualizationSequence = await prisma.visualizationSequence.findUnique({
    where: { year: currentYear }
  })
  
  const projectSequence = await prisma.projectSequence.findUnique({
    where: { year: currentYear }
  })
  
  const gallerySequence = await prisma.gallerySequence.findUnique({
    where: { year: currentYear }
  })
  
  return {
    planSequence: planSequence?.nextSequence || 1,
    visualizationSequence: visualizationSequence?.nextSequence || 1,
    projectSequence: projectSequence?.nextSequence || 1,
    gallerySequence: gallerySequence?.nextSequence || 1,
    year: currentYear
  }
}

/**
 * Validates if a plan number is unique
 * @param planNumber - The plan number to validate
 * @returns Promise<boolean> - True if unique, false if exists
 */
export async function isUniquePlanNumber(planNumber: string): Promise<boolean> {
  const existing = await prisma.plan.findUnique({
    where: { planNumber }
  })
  return !existing
}

/**
 * Validates if a visualization number is unique
 * @param visualizationNumber - The visualization number to validate
 * @returns Promise<boolean> - True if unique, false if exists
 */
export async function isUniqueVisualizationNumber(visualizationNumber: string): Promise<boolean> {
  const existing = await prisma.visualization.findUnique({
    where: { visualizationNumber }
  })
  return !existing
}