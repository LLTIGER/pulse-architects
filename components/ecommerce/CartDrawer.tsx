'use client'

import { useCartStore } from '@/lib/stores/cart-store'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function CartDrawer() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    totalItems, 
    totalPrice 
  } = useCartStore()
  
  const drawerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      closeCart()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />
      )}

      {/* Cart Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-dark shadow-lg transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-dark dark:text-white">
                Shopping Cart
              </h2>
              {totalItems > 0 && (
                <span className="bg-primary text-white text-sm rounded-full px-2 py-1 min-w-[24px] text-center">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-dark dark:text-white" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">
                  Your cart is empty
                </h3>
                <p className="text-dark/60 dark:text-white/60 mb-6">
                  Start browsing our architectural plans to find your perfect design.
                </p>
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="btn-homely-primary"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-dark dark:text-white text-sm mb-1 truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-dark/60 dark:text-white/60 mb-2">
                          {item.category}
                        </p>
                        {(item.bedrooms || item.bathrooms || item.squareFootage) && (
                          <p className="text-xs text-dark/60 dark:text-white/60 mb-2">
                            {item.bedrooms && `${item.bedrooms} bed`}
                            {item.bedrooms && item.bathrooms && ' • '}
                            {item.bathrooms && `${item.bathrooms} bath`}
                            {(item.bedrooms || item.bathrooms) && item.squareFootage && ' • '}
                            {item.squareFootage && `${item.squareFootage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sq ft`}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">
                            {formatPrice(item.price)}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-white dark:bg-dark border border-gray-300 dark:border-gray-600 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3 text-dark dark:text-white" />
                              </button>
                              <span className="px-2 py-1 text-sm font-medium text-dark dark:text-white min-w-[32px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3 text-dark dark:text-white" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500 hover:text-red-700"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-dark/60 dark:text-white/60">Subtotal</span>
                  <span className="font-semibold text-dark dark:text-white">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-dark dark:text-white">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center btn-homely-primary"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="block w-full text-center btn-homely-secondary"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}