'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { 
  ShoppingCartIcon, 
  XIcon, 
  PlusIcon, 
  MinusIcon,
  TrashIcon,
  HeartIcon,
  DownloadIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  TruckIcon,
} from 'lucide-react';

export interface CartItem {
  id: string;
  planId: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  license: 'personal' | 'commercial' | 'extended';
  quantity: number;
  isPremium: boolean;
  downloadFormats: string[];
}

export interface CartDiscount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

export interface ShoppingCartProps {
  items: CartItem[];
  discounts?: CartDiscount[];
  isOpen?: boolean;
  onClose?: () => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onUpdateLicense?: (itemId: string, license: CartItem['license']) => void;
  onMoveToWishlist?: (itemId: string) => void;
  onCheckout?: (items: CartItem[], total: number) => void;
  onApplyDiscount?: (code: string) => void;
  className?: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  discounts = [],
  isOpen = false,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateLicense,
  onMoveToWishlist,
  onCheckout,
  onApplyDiscount,
  className,
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<CartDiscount | null>(null);

  // License pricing multipliers
  const licenseMultipliers = {
    personal: 1,
    commercial: 1.5,
    extended: 2,
  };

  const licenseLabels = {
    personal: 'Personal Use',
    commercial: 'Commercial Use',
    extended: 'Extended License',
  };

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const basePrice = item.price * licenseMultipliers[item.license];
      return sum + (basePrice * item.quantity);
    }, 0);

    let discountAmount = 0;
    if (appliedDiscount) {
      discountAmount = appliedDiscount.type === 'percentage'
        ? subtotal * (appliedDiscount.value / 100)
        : appliedDiscount.value;
    }

    const tax = (subtotal - discountAmount) * 0.08; // 8% tax
    const total = subtotal - discountAmount + tax;

    return {
      subtotal,
      discountAmount,
      tax,
      total,
    };
  }, [items, appliedDiscount]);

  // Handle discount application
  const handleApplyDiscount = useCallback(() => {
    const discount = discounts.find(d => d.code.toLowerCase() === discountCode.toLowerCase());
    if (discount) {
      setAppliedDiscount(discount);
      onApplyDiscount?.(discountCode);
      setDiscountCode('');
    }
  }, [discountCode, discounts, onApplyDiscount]);

  // Handle checkout
  const handleCheckout = useCallback(() => {
    onCheckout?.(items, totals.total);
  }, [items, totals.total, onCheckout]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className={cn(
        'absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl',
        'dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800',
        'flex flex-col',
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center">
            <ShoppingCartIcon className="h-6 w-6 mr-3 text-primary-600" />
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Shopping Cart ({items.length})
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <ShoppingCartIcon className="h-16 w-16 text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-neutral-500 mb-6">
                Browse our architectural plans and add your favorites to get started.
              </p>
              <Button variant="primary" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {/* Cart Items */}
              {items.map((item) => {
                const itemPrice = item.price * licenseMultipliers[item.license];
                const itemTotal = itemPrice * item.quantity;

                return (
                  <Card key={item.id} variant="outline" size="sm">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="w-20 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                              {item.title}
                            </h4>
                            <p className="text-xs text-neutral-500 mt-1">
                              {item.category}
                              {item.isPremium && (
                                <span className="ml-2 bg-primary-100 text-primary-700 px-2 py-0.5 rounded text-xs">
                                  Premium
                                </span>
                              )}
                            </p>

                            {/* License Selection */}
                            <div className="mt-2">
                              <select
                                value={item.license}
                                onChange={(e) => onUpdateLicense?.(item.id, e.target.value as CartItem['license'])}
                                className="text-xs border border-neutral-200 rounded px-2 py-1 dark:border-neutral-700 dark:bg-neutral-800"
                              >
                                {Object.entries(licenseLabels).map(([value, label]) => (
                                  <option key={value} value={value}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Download Formats */}
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.downloadFormats.slice(0, 3).map((format) => (
                                <span
                                  key={format}
                                  className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded dark:bg-neutral-800 dark:text-neutral-400"
                                >
                                  {format.toUpperCase()}
                                </span>
                              ))}
                              {item.downloadFormats.length > 3 && (
                                <span className="text-xs text-neutral-400">
                                  +{item.downloadFormats.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-start space-x-1 ml-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onMoveToWishlist?.(item.id)}
                              className="h-8 w-8"
                            >
                              <HeartIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onRemoveItem?.(item.id)}
                              className="h-8 w-8 text-error-600 hover:text-error-700"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-neutral-200 rounded dark:border-neutral-700">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 rounded-r-none"
                            >
                              <MinusIcon className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-l-none"
                            >
                              <PlusIcon className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            {item.originalPrice && item.originalPrice !== itemPrice && (
                              <div className="text-xs text-neutral-400 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </div>
                            )}
                            <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                              ${itemTotal.toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-neutral-500">
                                ${itemPrice.toFixed(2)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
            {/* Discount Code */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleApplyDiscount}
                  disabled={!discountCode.trim()}
                >
                  Apply
                </Button>
              </div>
              
              {appliedDiscount && (
                <div className="flex items-center justify-between text-sm text-success-600">
                  <span>✓ {appliedDiscount.description}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedDiscount(null)}
                    className="text-xs p-1"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              
              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-success-600">
                  <span>Discount</span>
                  <span>-${totals.discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-lg font-semibold border-t border-neutral-200 dark:border-neutral-800 pt-2">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 text-xs text-neutral-500">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-4 w-4 mr-1" />
                Secure
              </div>
              <div className="flex items-center">
                <DownloadIcon className="h-4 w-4 mr-1" />
                Instant
              </div>
              <div className="flex items-center">
                <TruckIcon className="h-4 w-4 mr-1" />
                Lifetime
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleCheckout}
              className="w-full"
              leftIcon={<CreditCardIcon className="h-5 w-5" />}
            >
              Secure Checkout
            </Button>

            {/* Security Notice */}
            <p className="text-xs text-neutral-500 text-center">
              <ShieldCheckIcon className="h-3 w-3 inline mr-1" />
              SSL encrypted checkout • 30-day money back guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { ShoppingCart };
export type { CartItem, CartDiscount };