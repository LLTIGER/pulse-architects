/**
 * System Status API Endpoint
 * Provides basic system status information
 */

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const status = {
      status: 'online',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        api: 'operational',
        database: 'operational', // Will be checked properly once DB is connected
        fileStorage: 'operational',
        payments: 'operational'
      },
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024)
      }
    }

    return NextResponse.json(status)

  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Disable caching for status endpoint
export const revalidate = 0