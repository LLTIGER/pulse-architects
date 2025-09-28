import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const user = await verifyToken(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Get date ranges for analytics
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    // Parallel queries for better performance
    const [
      totalUsers,
      totalImages,
      totalDownloads,
      downloadsToday,
      downloadsYesterday,
      downloadsThisMonth,
      downloadsLastMonth,
      imagesByStatus,
      downloadsByLicense,
      recentDownloads
    ] = await Promise.all([
      // Total users count
      prisma.user.count({
        where: { isActive: true }
      }),

      // Total images count
      prisma.image.count({
        where: { isActive: true }
      }),

      // Total downloads count
      prisma.download.count(),

      // Downloads today
      prisma.download.count({
        where: {
          downloadedAt: {
            gte: today
          }
        }
      }),

      // Downloads yesterday
      prisma.download.count({
        where: {
          downloadedAt: {
            gte: yesterday,
            lt: today
          }
        }
      }),

      // Downloads this month
      prisma.download.count({
        where: {
          downloadedAt: {
            gte: thisMonth
          }
        }
      }),

      // Downloads last month
      prisma.download.count({
        where: {
          downloadedAt: {
            gte: lastMonth,
            lt: thisMonth
          }
        }
      }),

      // Images by status
      prisma.image.groupBy({
        by: ['status'],
        where: { isActive: true },
        _count: {
          id: true
        }
      }),

      // Downloads by license type
      prisma.download.groupBy({
        by: ['license'],
        _count: {
          id: true
        }
      }),

      // Recent downloads for activity feed
      prisma.download.findMany({
        take: 10,
        orderBy: {
          downloadedAt: 'desc'
        },
        include: {
          image: {
            select: {
              id: true,
              title: true,
              category: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
    ])

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0
      return Math.round(((current - previous) / previous) * 100)
    }

    const downloadsTodayChange = calculateChange(downloadsToday, downloadsYesterday)
    const downloadsMonthChange = calculateChange(downloadsThisMonth, downloadsLastMonth)

    // Format analytics data
    const analytics = {
      overview: {
        totalUsers: {
          value: totalUsers,
          change: 0, // Would need historical data to calculate
          changeType: 'neutral'
        },
        totalImages: {
          value: totalImages,
          change: 0, // Would need historical data to calculate
          changeType: 'neutral'
        },
        totalDownloads: {
          value: totalDownloads,
          change: downloadsMonthChange,
          changeType: downloadsMonthChange > 0 ? 'positive' : downloadsMonthChange < 0 ? 'negative' : 'neutral'
        },
        downloadsToday: {
          value: downloadsToday,
          change: downloadsTodayChange,
          changeType: downloadsTodayChange > 0 ? 'positive' : downloadsTodayChange < 0 ? 'negative' : 'neutral'
        }
      },
      imageStatuses: imagesByStatus.reduce((acc, item) => {
        acc[item.status] = item._count.id
        return acc
      }, {} as Record<string, number>),
      downloadsByLicense: downloadsByLicense.reduce((acc, item) => {
        acc[item.license] = item._count.id
        return acc
      }, {} as Record<string, number>),
      recentActivity: recentDownloads.map(download => ({
        id: download.id,
        type: 'download',
        description: `${download.user?.name || 'Anonymous'} downloaded "${download.image.title}"`,
        license: download.license,
        category: download.image.category,
        timestamp: download.downloadedAt,
        user: download.user ? {
          name: download.user.name,
          email: download.user.email
        } : null
      })),
      chartData: {
        // Downloads by day for the last 7 days
        downloadsChart: await getDownloadsChartData(prisma),
        // License distribution
        licenseDistribution: downloadsByLicense.map(item => ({
          name: item.license,
          value: item._count.id
        }))
      }
    }

    return NextResponse.json(analytics)

  } catch (error: any) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getDownloadsChartData(prisma: PrismaClient) {
  const now = new Date()
  const chartData = []

  // Get downloads for last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

    const count = await prisma.download.count({
      where: {
        downloadedAt: {
          gte: dayStart,
          lt: dayEnd
        }
      }
    })

    chartData.push({
      date: dayStart.toISOString().split('T')[0],
      downloads: count,
      day: dayStart.toLocaleDateString('en-US', { weekday: 'short' })
    })
  }

  return chartData
}