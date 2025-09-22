/**
 * Database Migration Utilities for Vercel Deployment
 * Handles safe migrations and schema updates in production
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Migration status tracking
export interface MigrationStatus {
  name: string
  applied: boolean
  appliedAt?: Date
  error?: string
}

// Safe migration wrapper with rollback capability
export async function runMigration(
  migrationName: string,
  migrationFn: () => Promise<void>,
  rollbackFn?: () => Promise<void>
): Promise<{ success: boolean; error?: string }> {
  const startTime = Date.now()
  
  try {
    console.log(`🔄 Starting migration: ${migrationName}`)
    
    // Check if migration already applied
    const existingMigration = await prisma.systemConfig.findUnique({
      where: { key: `migration_${migrationName}` }
    })
    
    if (existingMigration?.value?.applied) {
      console.log(`✅ Migration ${migrationName} already applied`)
      return { success: true }
    }
    
    // Run migration in transaction
    await prisma.$transaction(async (tx) => {
      await migrationFn()
      
      // Record migration as applied
      await tx.systemConfig.upsert({
        where: { key: `migration_${migrationName}` },
        update: {
          value: {
            applied: true,
            appliedAt: new Date(),
            duration: Date.now() - startTime
          }
        },
        create: {
          key: `migration_${migrationName}`,
          value: {
            applied: true,
            appliedAt: new Date(),
            duration: Date.now() - startTime
          },
          description: `Migration: ${migrationName}`,
          category: 'migrations'
        }
      })
    })
    
    console.log(`✅ Migration ${migrationName} completed in ${Date.now() - startTime}ms`)
    return { success: true }
    
  } catch (error) {
    console.error(`❌ Migration ${migrationName} failed:`, error)
    
    // Attempt rollback if provided
    if (rollbackFn) {
      try {
        console.log(`🔄 Rolling back migration: ${migrationName}`)
        await rollbackFn()
        console.log(`✅ Rollback completed for: ${migrationName}`)
      } catch (rollbackError) {
        console.error(`❌ Rollback failed for ${migrationName}:`, rollbackError)
      }
    }
    
    // Record migration failure
    await prisma.systemConfig.upsert({
      where: { key: `migration_${migrationName}` },
      update: {
        value: {
          applied: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          failedAt: new Date()
        }
      },
      create: {
        key: `migration_${migrationName}`,
        value: {
          applied: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          failedAt: new Date()
        },
        description: `Failed migration: ${migrationName}`,
        category: 'migrations'
      }
    })
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Get migration history
export async function getMigrationHistory(): Promise<MigrationStatus[]> {
  const migrations = await prisma.systemConfig.findMany({
    where: {
      key: { startsWith: 'migration_' }
    },
    orderBy: { createdAt: 'asc' }
  })
  
  return migrations.map(migration => ({
    name: migration.key.replace('migration_', ''),
    applied: migration.value?.applied || false,
    appliedAt: migration.value?.appliedAt ? new Date(migration.value.appliedAt) : undefined,
    error: migration.value?.error
  }))
}

// Data integrity checks
export async function performDataIntegrityCheck(): Promise<{
  passed: boolean
  issues: string[]
}> {
  const issues: string[] = []
  
  try {
    // Check for orphaned records
    const orphanedFiles = await prisma.planFile.count({
      where: {
        plan: null
      }
    })
    
    if (orphanedFiles > 0) {
      issues.push(`Found ${orphanedFiles} orphaned plan files`)
    }
    
    const orphanedImages = await prisma.planImage.count({
      where: {
        plan: null
      }
    })
    
    if (orphanedImages > 0) {
      issues.push(`Found ${orphanedImages} orphaned plan images`)
    }
    
    // Check for plans without primary images
    const plansWithoutImages = await prisma.plan.count({
      where: {
        images: {
          none: {
            isPrimary: true
          }
        },
        status: 'PUBLISHED'
      }
    })
    
    if (plansWithoutImages > 0) {
      issues.push(`Found ${plansWithoutImages} published plans without primary images`)
    }
    
    // Check for invalid license relationships
    const invalidLicenses = await prisma.license.count({
      where: {
        OR: [
          { user: null },
          { plan: null },
          { order: null }
        ]
      }
    })
    
    if (invalidLicenses > 0) {
      issues.push(`Found ${invalidLicenses} licenses with invalid relationships`)
    }
    
    // Check for users without profiles
    const usersWithoutProfiles = await prisma.user.count({
      where: {
        profile: null,
        profileComplete: true
      }
    })
    
    if (usersWithoutProfiles > 0) {
      issues.push(`Found ${usersWithoutProfiles} users marked complete without profiles`)
    }
    
    return {
      passed: issues.length === 0,
      issues
    }
    
  } catch (error) {
    issues.push(`Data integrity check failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return {
      passed: false,
      issues
    }
  }
}

// Cleanup orphaned records
export async function cleanupOrphanedRecords(): Promise<{
  success: boolean
  cleaned: number
  errors: string[]
}> {
  let cleaned = 0
  const errors: string[] = []
  
  try {
    await prisma.$transaction(async (tx) => {
      // Delete orphaned plan files
      const orphanedFiles = await tx.planFile.deleteMany({
        where: {
          planId: {
            notIn: await tx.plan.findMany({ select: { id: true } }).then(plans => plans.map(p => p.id))
          }
        }
      })
      cleaned += orphanedFiles.count
      
      // Delete orphaned plan images
      const orphanedImages = await tx.planImage.deleteMany({
        where: {
          planId: {
            notIn: await tx.plan.findMany({ select: { id: true } }).then(plans => plans.map(p => p.id))
          }
        }
      })
      cleaned += orphanedImages.count
      
      // Delete orphaned order items
      const orphanedOrderItems = await tx.orderItem.deleteMany({
        where: {
          OR: [
            {
              orderId: {
                notIn: await tx.order.findMany({ select: { id: true } }).then(orders => orders.map(o => o.id))
              }
            },
            {
              planId: {
                notIn: await tx.plan.findMany({ select: { id: true } }).then(plans => plans.map(p => p.id))
              }
            }
          ]
        }
      })
      cleaned += orphanedOrderItems.count
      
      // Delete orphaned reviews
      const orphanedReviews = await tx.review.deleteMany({
        where: {
          OR: [
            {
              userId: {
                notIn: await tx.user.findMany({ select: { id: true } }).then(users => users.map(u => u.id))
              }
            },
            {
              planId: {
                notIn: await tx.plan.findMany({ select: { id: true } }).then(plans => plans.map(p => p.id))
              }
            }
          ]
        }
      })
      cleaned += orphanedReviews.count
      
      // Delete orphaned favorites
      const orphanedFavorites = await tx.favorite.deleteMany({
        where: {
          OR: [
            {
              userId: {
                notIn: await tx.user.findMany({ select: { id: true } }).then(users => users.map(u => u.id))
              }
            },
            {
              planId: {
                notIn: await tx.plan.findMany({ select: { id: true } }).then(plans => plans.map(p => p.id))
              }
            }
          ]
        }
      })
      cleaned += orphanedFavorites.count
    })
    
    return {
      success: true,
      cleaned,
      errors
    }
    
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Unknown error')
    return {
      success: false,
      cleaned,
      errors
    }
  }
}

// Production deployment checks
export async function runPreDeploymentChecks(): Promise<{
  passed: boolean
  issues: string[]
  warnings: string[]
}> {
  const issues: string[] = []
  const warnings: string[] = []
  
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check required environment variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'DIRECT_URL',
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL'
    ]
    
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        issues.push(`Missing required environment variable: ${envVar}`)
      }
    }
    
    // Check for admin users
    const adminCount = await prisma.user.count({
      where: {
        role: { in: ['ADMIN', 'SUPER_ADMIN'] },
        isActive: true
      }
    })
    
    if (adminCount === 0) {
      warnings.push('No active admin users found')
    }
    
    // Check for published plans
    const publishedPlansCount = await prisma.plan.count({
      where: {
        status: 'PUBLISHED',
        isActive: true
      }
    })
    
    if (publishedPlansCount === 0) {
      warnings.push('No published plans found')
    }
    
    // Check for system configuration
    const systemConfigCount = await prisma.systemConfig.count()
    
    if (systemConfigCount === 0) {
      warnings.push('No system configuration found')
    }
    
    // Run data integrity check
    const integrityCheck = await performDataIntegrityCheck()
    if (!integrityCheck.passed) {
      issues.push(...integrityCheck.issues)
    }
    
    return {
      passed: issues.length === 0,
      issues,
      warnings
    }
    
  } catch (error) {
    issues.push(`Pre-deployment check failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return {
      passed: false,
      issues,
      warnings
    }
  }
}

export { prisma }