'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Box, 
  Users, 
  Settings, 
  Download, 
  BarChart3, 
  LogOut,
  Home
} from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

const DashboardPage: React.FC = () => {
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  const adminMenuItems = [
    {
      title: 'Plans Management',
      description: 'Manage architectural plans, add new designs, edit existing ones',
      href: '/dashboard/plans',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Visualizations',
      description: 'Manage 3D visualizations, renderings, and galleries',
      href: '/dashboard/visualizations',
      icon: Box,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      href: '/dashboard/users',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Downloads & Licenses',
      description: 'Track downloads, manage licenses and user access',
      href: '/dashboard/downloads',
      icon: Download,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Analytics',
      description: 'View website analytics, sales reports, and performance metrics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Settings',
      description: 'System configuration, site settings, and preferences',
      href: '/dashboard/settings',
      icon: Settings,
      color: 'from-gray-500 to-gray-600'
    }
  ]

  const userMenuItems = [
    {
      title: 'My Downloads',
      description: 'View and download your purchased plans',
      href: '/dashboard/my-downloads',
      icon: Download,
      color: 'from-primary to-green-600'
    },
    {
      title: 'Purchase History',
      description: 'View your order history and invoices',
      href: '/dashboard/orders',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Profile Settings',
      description: 'Manage your account and preferences',
      href: '/dashboard/profile',
      icon: Settings,
      color: 'from-gray-500 to-gray-600'
    }
  ]

  const menuItems = isAdmin ? adminMenuItems : userMenuItems

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-8xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Site</span>
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-dark">
                  {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                </h1>
                <p className="text-sm text-dark/60">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-dark/60">
                {isAdmin ? 'Administrator' : 'Customer'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-8xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome to {isAdmin ? 'Admin Dashboard' : 'Your Dashboard'}
          </h2>
          <p className="text-white/80 text-lg">
            {isAdmin 
              ? 'Manage your architectural plans, users, and website content from here.'
              : 'Access your purchased plans, view order history, and manage your account.'
            }
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-dark group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-dark/60 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Recent Activity (Placeholder) */}
        {isAdmin && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-dark mb-6">Recent Activity</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Activity dashboard coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DashboardPage