'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ShoppingBag, CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface CheckoutForm {
  email: string
  firstName: string
  lastName: string
  company?: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  paymentMethod: 'card' | 'paypal'
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
  billingAddressSame: boolean
  marketingEmails: boolean
  termsAccepted: boolean
}

export function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'confirmation'>('details')
  
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddressSame: true,
    marketingEmails: false,
    termsAccepted: false
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep !== 'confirmation') {
      router.push('/catalog')
    }
  }, [items.length, router, currentStep])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateStep = (step: 'details' | 'payment') => {
    if (step === 'details') {
      return form.email && form.firstName && form.lastName && form.address && 
             form.city && form.state && form.zipCode && form.country
    }
    
    if (step === 'payment') {
      if (form.paymentMethod === 'card') {
        return form.cardNumber && form.expiryDate && form.cvv && 
               form.nameOnCard && form.termsAccepted
      }
      return form.termsAccepted
    }
    
    return false
  }

  const handleStepSubmit = async (step: 'details' | 'payment') => {
    if (!validateStep(step)) {
      toast.error('Please fill in all required fields')
      return
    }

    if (step === 'details') {
      setCurrentStep('payment')
    } else if (step === 'payment') {
      setIsProcessing(true)
      
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // In a real app, this would integrate with Stripe, PayPal, etc.
        console.log('Processing payment for:', {
          items,
          total: totalPrice,
          customer: form
        })
        
        setCurrentStep('confirmation')
        toast.success('Payment successful!')
        
        // Clear cart after successful payment
        setTimeout(() => {
          clearCart()
        }, 3000)
        
      } catch (error) {
        toast.error('Payment failed. Please try again.')
      } finally {
        setIsProcessing(false)
      }
    }
  }

  if (currentStep === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">
            Order Confirmed!
          </h2>
          <p className="text-dark/60 dark:text-white/60 mb-6">
            Thank you for your purchase. Your architectural plans will be available for download shortly.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-dark/60 dark:text-white/60 mb-2">Order Total</p>
            <p className="text-2xl font-bold text-dark dark:text-white">
              {formatPrice(totalPrice)}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push('/catalog')}
              className="btn-homely-secondary"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push('/downloads')}
              className="btn-homely-primary"
            >
              View Downloads
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Checkout Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 'details' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              1
            </div>
            <span className={`text-sm ${currentStep === 'details' ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Details
            </span>
          </div>
          
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-4" />
          
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 'payment' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              2
            </div>
            <span className={`text-sm ${currentStep === 'payment' ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Payment
            </span>
          </div>
        </div>

        {/* Step 1: Customer Details */}
        {currentStep === 'details' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-dark dark:text-white mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Customer Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                    placeholder="John"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                  placeholder="Your Company"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                  placeholder="123 Main Street"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                    placeholder="New York"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                    placeholder="NY"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={form.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                    placeholder="10001"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={form.marketingEmails}
                  onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="marketing" className="text-sm text-dark/60 dark:text-white/60">
                  I'd like to receive marketing emails about new architectural plans and updates
                </label>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                onClick={() => handleStepSubmit('details')}
                disabled={!validateStep('details')}
                className="btn-homely-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 'payment' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </h3>
              <button
                onClick={() => setCurrentStep('details')}
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={form.paymentMethod === 'card'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value as 'card' | 'paypal')}
                      className="text-primary"
                    />
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="text-dark dark:text-white">Credit or Debit Card</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={form.paymentMethod === 'paypal'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value as 'card' | 'paypal')}
                      className="text-primary"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      P
                    </div>
                    <span className="text-dark dark:text-white">PayPal</span>
                  </label>
                </div>
              </div>

              {/* Card Details */}
              {form.paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={form.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                        placeholder="MM/YY"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={form.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      value={form.nameOnCard}
                      onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-dark dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  id="terms"
                  checked={form.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                />
                <label htmlFor="terms" className="text-sm text-dark/60 dark:text-white/60">
                  I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and 
                  <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a>. 
                  I understand that architectural plans are for licensed use only.
                </label>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Your payment information is encrypted and secure</span>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep('details')}
                className="btn-homely-secondary"
              >
                Back to Details
              </button>
              
              <button
                onClick={() => handleStepSubmit('payment')}
                disabled={!validateStep('payment') || isProcessing}
                className="btn-homely-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Complete Order - ${formatPrice(totalPrice)}`}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm h-fit">
        <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
          Order Summary
        </h3>
        
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-dark dark:text-white text-sm truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-dark/60 dark:text-white/60">
                  {item.category}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-dark/60 dark:text-white/60">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-medium text-dark dark:text-white text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-dark/60 dark:text-white/60">Subtotal</span>
            <span className="text-dark dark:text-white">{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark/60 dark:text-white/60">Tax</span>
            <span className="text-dark dark:text-white">$0.00</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-dark dark:text-white">Total</span>
            <span className="text-primary">{formatPrice(totalPrice)}</span>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            📧 Download links will be sent to your email after payment confirmation.
          </p>
        </div>
      </div>
    </div>
  )
}