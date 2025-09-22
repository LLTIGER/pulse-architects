/**
 * Database Health Check and Monitoring Utilities
 * Provides health checks, performance monitoring, and diagnostics
 */

import { prisma } from '@/lib/db'

export interface DatabaseHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  checks: {
    connection: boolean
    migrations: boolean
    performance: {
      avgQueryTime: number
      activeConnections: number
      status: 'good' | 'warning' | 'critical'
    }
  }
  errors?: string[]
}

export interface DatabaseMetrics {
  totalUsers: number
  totalPlans: number
  totalOrders: number
  activeConnections: number
  avgQueryTime: number
  databaseSize: string
  lastBackup?: string
}

/**
 * Comprehensive database health check
 */
export async function checkDatabaseHealth(): Promise<DatabaseHealth> {
  const timestamp = new Date().toISOString()
  const errors: string[] = []
  let status: DatabaseHealth['status'] = 'healthy'

  const checks = {
    connection: false,
    migrations: false,
    performance: {
      avgQueryTime: 0,
      activeConnections: 0,
      status: 'good' as 'good' | 'warning' | 'critical'
    }
  }

  try {
    // Test basic connection
    const startTime = Date.now()
    await prisma.$queryRaw`SELECT 1 as test`
    const queryTime = Date.now() - startTime
    checks.connection = true
    checks.performance.avgQueryTime = queryTime

    // Check if migrations are up to date
    try {
      await prisma.user.findFirst()
      checks.migrations = true
    } catch (error) {
      errors.push('Database schema not properly initialized')
      checks.migrations = false
      status = 'unhealthy'
    }

    // Performance checks
    if (queryTime > 1000) {
      checks.performance.status = 'critical'
      status = 'degraded'
      errors.push(`Slow query response: ${queryTime}ms`)
    } else if (queryTime > 500) {
      checks.performance.status = 'warning'
      if (status === 'healthy') status = 'degraded'
      errors.push(`Moderate query response: ${queryTime}ms`)
    }

    // Check for critical data
    try {
      const userCount = await prisma.user.count()
      if (userCount === 0) {
        errors.push('No users found in database')
        if (status === 'healthy') status = 'degraded'
      }
    } catch (error) {
      errors.push('Unable to query user table')
      status = 'unhealthy'
    }

  } catch (error) {
    errors.push(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    status = 'unhealthy'
  }

  return {
    status,
    timestamp,
    checks,
    ...(errors.length > 0 && { errors })
  }
}

/**
 * Get basic database metrics
 */
export async function getDatabaseMetrics(): Promise<DatabaseMetrics> {
  try {
    const [
      totalUsers,
      totalPlans,
      totalOrders
    ] = await Promise.all([
      prisma.user.count(),
      prisma.plan.count(),
      prisma.order.count()
    ])

    // Get database size (PostgreSQL specific)
    let databaseSize = 'unknown'
    try {
      const sizeResult = await prisma.$queryRaw<{ size: string }[]>`
        SELECT pg_size_pretty(pg_database_size(current_database())) as size
      `
      databaseSize = sizeResult[0]?.size || 'unknown'
    } catch {
      // Fallback if query fails
    }

    return {
      totalUsers,
      totalPlans,
      totalOrders,
      activeConnections: 0, // Would need more complex query for actual connections
      avgQueryTime: 0, // Would need query performance monitoring
      databaseSize
    }

  } catch (error) {
    throw new Error(`Failed to get database metrics: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Check for database performance issues
 */
export async function checkPerformanceIssues(): Promise<{
  issues: string[]
  recommendations: string[]
}> {
  const issues: string[] = []
  const recommendations: string[] = []

  try {
    // Check for plans without images
    const plansWithoutImages = await prisma.plan.count({
      where: {
        images: {
          none: {}
        },
        status: 'PUBLISHED'
      }
    })

    if (plansWithoutImages > 0) {
      issues.push(`${plansWithoutImages} published plans have no images`)
      recommendations.push('Add images to published plans for better user experience')
    }

    // Check for users without profiles
    const usersWithoutProfiles = await prisma.user.count({
      where: {
        profile: null,
        profileComplete: true
      }
    })

    if (usersWithoutProfiles > 0) {
      issues.push(`${usersWithoutProfiles} users marked complete but missing profiles`)
      recommendations.push('Fix user profile completion status')
    }

    // Check for orphaned records (files without corresponding plans)
    const allPlanIds = await prisma.plan.findMany({ select: { id: true } }).then(plans => plans.map(p => p.id))
    const orphanedFiles = await prisma.planFile.count({
      where: {
        planId: { notIn: allPlanIds }
      }
    })

    if (orphanedFiles > 0) {
      issues.push(`${orphanedFiles} orphaned plan files found`)
      recommendations.push('Run cleanup utility to remove orphaned files')
    }

    // Check for large tables that might need partitioning
    const auditLogCount = await prisma.auditLog.count()
    if (auditLogCount > 100000) {
      issues.push('Audit log table is large and may impact performance')
      recommendations.push('Consider implementing audit log archiving or partitioning')
    }

    const downloadLogCount = await prisma.downloadLog.count()
    if (downloadLogCount > 50000) {
      issues.push('Download log table is large and may impact performance')
      recommendations.push('Consider implementing download log archiving')
    }

  } catch (error) {
    issues.push(`Performance check failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  return { issues, recommendations }
}

/**
 * Get slow query information (PostgreSQL specific)
 */
export async function getSlowQueries(): Promise<{
  query: string
  calls: number
  totalTime: number
  avgTime: number
}[]> {
  try {
    // This requires pg_stat_statements extension to be enabled
    const slowQueries = await prisma.$queryRaw<{
      query: string
      calls: bigint
      total_exec_time: number
      mean_exec_time: number
    }[]>`
      SELECT 
        query,
        calls,
        total_exec_time,
        mean_exec_time
      FROM pg_stat_statements 
      WHERE mean_exec_time > 100
      ORDER BY mean_exec_time DESC 
      LIMIT 10
    `

    return slowQueries.map(q => ({
      query: q.query,
      calls: Number(q.calls),
      totalTime: q.total_exec_time,
      avgTime: q.mean_exec_time
    }))

  } catch (error) {
    // pg_stat_statements might not be available
    return []
  }
}

/**
 * Check database configuration
 */
export async function checkDatabaseConfig(): Promise<{
  version: string
  extensions: string[]
  settings: Record<string, string>
  recommendations: string[]
}> {
  const recommendations: string[] = []

  try {
    // Get PostgreSQL version
    const versionResult = await prisma.$queryRaw<{ version: string }[]>`
      SELECT version()
    `
    const version = versionResult[0]?.version || 'unknown'

    // Get installed extensions
    const extensionsResult = await prisma.$queryRaw<{ extname: string }[]>`
      SELECT extname FROM pg_extension
    `
    const extensions = extensionsResult.map(e => e.extname)

    // Get relevant settings
    const settingsResult = await prisma.$queryRaw<{ name: string; setting: string }[]>`
      SELECT name, setting 
      FROM pg_settings 
      WHERE name IN (
        'max_connections',
        'shared_buffers',
        'effective_cache_size',
        'maintenance_work_mem',
        'checkpoint_completion_target',
        'wal_buffers',
        'default_statistics_target'
      )
    `

    const settings: Record<string, string> = {}
    settingsResult.forEach(s => {
      settings[s.name] = s.setting
    })

    // Generate recommendations
    if (!extensions.includes('pg_stat_statements')) {
      recommendations.push('Consider enabling pg_stat_statements extension for query performance monitoring')
    }

    if (!extensions.includes('pg_trgm')) {
      recommendations.push('Consider enabling pg_trgm extension for improved text search performance')
    }

    const maxConnections = parseInt(settings.max_connections || '0')
    if (maxConnections < 100) {
      recommendations.push('Consider increasing max_connections for better concurrent user support')
    }

    return {
      version,
      extensions,
      settings,
      recommendations
    }

  } catch (error) {
    return {
      version: 'unknown',
      extensions: [],
      settings: {},
      recommendations: ['Unable to check database configuration']
    }
  }
}

/**
 * Verify data integrity
 */
export async function verifyDataIntegrity(): Promise<{
  passed: boolean
  issues: string[]
  fixes: string[]
}> {
  const issues: string[] = []
  const fixes: string[] = []

  try {
    // Check referential integrity
    const allOrderIds = await prisma.order.findMany({ select: { id: true } }).then(orders => orders.map(o => o.id))
    const allPlanIds = await prisma.plan.findMany({ select: { id: true } }).then(plans => plans.map(p => p.id))
    const allUserIds = await prisma.user.findMany({ select: { id: true } }).then(users => users.map(u => u.id))
    
    const orphanedOrderItems = await prisma.orderItem.count({
      where: {
        orderId: { notIn: allOrderIds }
      }
    })

    if (orphanedOrderItems > 0) {
      issues.push(`${orphanedOrderItems} order items without valid orders`)
      fixes.push('Delete orphaned order items')
    }
    const orphanedLicenses = await prisma.license.count({
      where: {
        OR: [
          { orderId: { notIn: allOrderIds } },
          { userId: { notIn: allUserIds } },
          { planId: { notIn: allPlanIds } }
        ]
      }
    })

    if (orphanedLicenses > 0) {
      issues.push(`${orphanedLicenses} licenses with invalid references`)
      fixes.push('Fix or delete invalid licenses')
    }

    // Check data consistency
    const plansWithInvalidPricing = await prisma.plan.count({
      where: {
        OR: [
          { basePrice: { lt: 0 } },
          { pricePerSqFt: { lt: 0 } }
        ]
      }
    })

    if (plansWithInvalidPricing > 0) {
      issues.push(`${plansWithInvalidPricing} plans with invalid pricing`)
      fixes.push('Correct plan pricing data')
    }

    // Check required fields
    const usersWithoutEmails = await prisma.user.count({
      where: {
        email: ""
      }
    })

    if (usersWithoutEmails > 0) {
      issues.push(`${usersWithoutEmails} users without email addresses`)
      fixes.push('Update user records with valid email addresses')
    }

    return {
      passed: issues.length === 0,
      issues,
      fixes
    }

  } catch (error) {
    return {
      passed: false,
      issues: [`Data integrity check failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      fixes: ['Review database schema and fix connection issues']
    }
  }
}