/**
 * Health Check API Endpoint
 * Provides database and system health information for monitoring
 */

import { NextResponse } from 'next/server'
import { checkDatabaseHealth, getDatabaseMetrics } from '@/lib/utils/database-health'

export async function GET() {
  try {
    const [health, metrics] = await Promise.all([
      checkDatabaseHealth(),
      getDatabaseMetrics().catch(() => null) // Don't fail if metrics unavailable
    ])

    const response = {
      status: health.status,
      timestamp: health.timestamp,
      database: {
        connected: health.checks.connection,
        migrations: health.checks.migrations,
        performance: health.checks.performance
      },
      ...(metrics && { metrics }),
      ...(health.errors && { errors: health.errors })
    }

    // Return appropriate HTTP status based on health
    const statusCode = health.status === 'healthy' ? 200 : 
                      health.status === 'degraded' ? 200 : 503

    return NextResponse.json(response, { status: statusCode })

  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  }
}

// Disable caching for health checks
export const revalidate = 0