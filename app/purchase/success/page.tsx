'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import Link from 'next/link'
import { 
  CheckCircle, 
  Download, 
  FileText, 
  Key, 
  ArrowRight,
  Mail,
  Clock
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  totalAmount: number
  currency: string
  completedAt: string
  items: Array<{
    id: string
    licenseType: string
    itemTitle: string
    itemType: string
    unitPrice: number
  }>
  licenses: Array<{
    id: string
    licenseKey: string
    licenseType: string
    downloadCount: number
    maxDownloads: number | null
    isActive: boolean
  }>
}

const PurchaseSuccessPage: React.FC = () => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const orderId = searchParams.get('order_id')
  
  const [order, setOrder] = useState<Order | null>(null)
  const [orderLoading, setOrderLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (orderId && user) {
      fetchOrder()
    }
  }, [orderId, user])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      } else {
        setError('Order not found or access denied')
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
      setError('Failed to load order details')
    } finally {
      setOrderLoading(false)
    }
  }


  if (loading || orderLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Link href="/gallery" className="btn-homely-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order not found</h1>
          <Link href="/gallery" className="btn-homely-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your license has been activated and is ready for download
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Order Details
              </h3>
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-white">
                  <span className="font-medium">Order #:</span> {order.orderNumber}
                </p>
                <p className="text-gray-900 dark:text-white">
                  <span className="font-medium">Total:</span> ${order.totalAmount} {order.currency}
                </p>
                <p className="text-gray-900 dark:text-white">
                  <span className="font-medium">Date:</span> {new Date(order.completedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Payment Status
              </h3>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Purchased Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {item.itemTitle}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.licenseType} License
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${item.unitPrice}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.itemType}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* License Information & Downloads */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Licenses
          </h2>
          
          <div className="space-y-6">
            {order.licenses.map((license, index) => {
              const item = order.items[index]
              return (
                <div key={license.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Key className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item?.licenseType} License
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item?.itemTitle}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      license.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {license.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">License Key</p>
                      <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                        {license.licenseKey}
                      </code>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Usage</p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {license.downloadCount} downloads
                        {license.maxDownloads && ` of ${license.maxDownloads}`}
                      </p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => {
                      // Extract imageId from the order items - this would need to be included in the API response
                      // For now, redirect to gallery with success message
                      router.push('/gallery')
                    }}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Your File
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            What's Next?
          </h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-900 dark:text-blue-100 font-medium">
                  Check your email
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  A receipt and license details have been sent to your email address
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-900 dark:text-blue-100 font-medium">
                  Save your license key
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Keep your license key safe for future reference and support
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-900 dark:text-blue-100 font-medium">
                  Lifetime access
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Your license never expires - download anytime from your account
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/gallery" 
            className="btn-homely-secondary flex items-center justify-center"
          >
            Browse More Images
          </Link>
          <Link 
            href="/dashboard" 
            className="btn-homely-primary flex items-center justify-center"
          >
            View My Purchases
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PurchaseSuccessPage