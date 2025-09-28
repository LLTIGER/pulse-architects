'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { 
  Users, 
  FileImage, 
  Download, 
  BarChart3, 
  Settings,
  Plus,
  TrendingUp,
  Eye
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalUsers: { value: number; change: number; changeType: string }
    totalImages: { value: number; change: number; changeType: string }
    totalDownloads: { value: number; change: number; changeType: string }
    downloadsToday: { value: number; change: number; changeType: string }
  }
  imageStatuses: Record<string, number>
  downloadsByLicense: Record<string, number>
  recentActivity: Array<{
    id: string
    type: string
    description: string
    license: string
    category: string
    timestamp: string
    user: { name: string; email: string } | null
  }>
  chartData: {
    downloadsChart: Array<{ date: string; downloads: number; day: string }>
    licenseDistribution: Array<{ name: string; value: number }>
  }
}

const DashboardPage: React.FC = () => {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    } else if (!loading && user && !isAdmin) {
      router.push('/')
    }
  }, [user, loading, isAdmin, router])

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user || !isAdmin) return

      try {
        const response = await fetch('/api/admin/analytics', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        } else {
          console.error('Failed to fetch analytics:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setAnalyticsLoading(false)
      }
    }

    fetchAnalytics()
  }, [user, isAdmin])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  const stats = analytics ? [
    {
      name: 'Total Users',
      value: analytics.overview.totalUsers.value.toLocaleString(),
      change: analytics.overview.totalUsers.change > 0 ? `+${analytics.overview.totalUsers.change}%` : `${analytics.overview.totalUsers.change}%`,
      changeType: analytics.overview.totalUsers.changeType,
      icon: Users
    },
    {
      name: 'Images Uploaded',
      value: analytics.overview.totalImages.value.toLocaleString(),
      change: analytics.overview.totalImages.change > 0 ? `+${analytics.overview.totalImages.change}%` : `${analytics.overview.totalImages.change}%`,
      changeType: analytics.overview.totalImages.changeType,
      icon: FileImage
    },
    {
      name: 'Downloads Today',
      value: analytics.overview.downloadsToday.value.toLocaleString(),
      change: analytics.overview.downloadsToday.change > 0 ? `+${analytics.overview.downloadsToday.change}%` : `${analytics.overview.downloadsToday.change}%`,
      changeType: analytics.overview.downloadsToday.changeType,
      icon: Download
    },
    {
      name: 'Total Downloads',
      value: analytics.overview.totalDownloads.value.toLocaleString(),
      change: analytics.overview.totalDownloads.change > 0 ? `+${analytics.overview.totalDownloads.change}%` : `${analytics.overview.totalDownloads.change}%`,
      changeType: analytics.overview.totalDownloads.changeType,
      icon: TrendingUp
    }
  ] : [
    {
      name: 'Total Users',
      value: '...',
      change: '...',
      changeType: 'neutral',
      icon: Users
    },
    {
      name: 'Images Uploaded',
      value: '...',
      change: '...',
      changeType: 'neutral',
      icon: FileImage
    },
    {
      name: 'Downloads Today',
      value: '...',
      change: '...',
      changeType: 'neutral',
      icon: Download
    },
    {
      name: 'Total Downloads',
      value: '...',
      change: '...',
      changeType: 'neutral',
      icon: TrendingUp
    }
  ]

  const quickActions = [
    {
      name: 'Upload Images',
      description: 'Add new architectural plans to the gallery',
      icon: Plus,
      href: '/dashboard/upload',
      color: 'bg-blue-500'
    },
    {
      name: 'Manage Content',
      description: 'Review and approve pending uploads',
      icon: Eye,
      href: '/dashboard/content',
      color: 'bg-green-500'
    },
    {
      name: 'View Analytics',
      description: 'Check website and download statistics',
      icon: BarChart3,
      href: '/dashboard/analytics',
      color: 'bg-purple-500'
    },
    {
      name: 'Settings',
      description: 'Configure site settings and preferences',
      icon: Settings,
      href: '/dashboard/settings',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Welcome back, {user.name}. Here's what's happening with Pulse Architects today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    from last month
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <div 
                  key={action.name}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(action.href)}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {action.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {action.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Download Analytics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Download Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Download Statistics
              </h2>
            </div>
            <div className="p-6">
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : analytics ? (
                <div className="space-y-6">
                  {/* License Distribution */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      Downloads by License Type
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(analytics.downloadsByLicense).map(([license, count]) => (
                        <div key={license} className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {license.toLowerCase()}
                          </span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image Status */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      Images by Status
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(analytics.imageStatuses).map(([status, count]) => (
                        <div key={status} className="flex items-center justify-between">
                          <span className={`text-sm capitalize px-2 py-1 rounded text-xs font-medium ${
                            status === 'APPROVED' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {status.toLowerCase()}
                          </span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Failed to load analytics data
                </p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : analytics && analytics.recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Download className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            activity.license === 'PREVIEW' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                            activity.license === 'STANDARD' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            activity.license === 'COMMERCIAL' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                            'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                          }`}>
                            {activity.license}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No recent download activity
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardPage