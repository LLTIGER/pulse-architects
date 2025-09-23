'use client'

import { useCartStore } from '@/lib/stores/cart-store'
import { ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CartButtonProps {
  className?: string
  showText?: boolean
}

export default function CartButton({ className = '', showText = false }: CartButtonProps) {
  const { totalItems, openCart } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className={`relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}>
        <ShoppingBag size={24} className="text-dark dark:text-white" />
      </button>
    )
  }

  return (
    <button
      onClick={openCart}
      className={`relative flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingBag size={24} className="text-dark dark:text-white" />
      
      {showText && (
        <span className="text-dark dark:text-white font-medium">
          Cart
        </span>
      )}
      
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}