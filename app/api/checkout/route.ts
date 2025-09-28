import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/auth'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'
import { createUserBasedRateLimiter, RateLimitPresets } from '@/lib/security/rate-limiter'
import { checkoutSchema, validateRequestBody } from '@/lib/validation/schemas'
import { validateCSRFToken } from '@/lib/security/csrf'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// License pricing configuration
const LICENSE_PRICING = {
  PREVIEW: { price: 0, name: 'Preview License', description: 'Watermarked preview for evaluation' },
  STANDARD: { price: 29.99, name: 'Standard License', description: 'High-quality download for personal use' },
  COMMERCIAL: { price: 99.99, name: 'Commercial License', description: 'Commercial use with full rights' },
  EXTENDED: { price: 199.99, name: 'Extended License', description: 'Unlimited commercial use and modifications' }
} as const

const rateLimiter = createUserBasedRateLimiter(RateLimitPresets.payment)

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = rateLimiter(request)
  if (rateLimitResult) {
    return rateLimitResult
  }

  try {
    // Validate CSRF token
    const authHeader = request.headers.get('authorization')
    const userSession = authHeader ? authHeader.substring(7) : undefined
    
    if (!validateCSRFToken(request, userSession)) {
      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      )
    }
    
    // Verify authentication
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required for purchasing licenses' },
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

    const body = await request.json()
    
    // Validate request body
    const validation = validateRequestBody(checkoutSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const { imageId, licenseType, returnUrl } = validation.data

    // Get image details
    const image = await prisma.image.findFirst({
      where: {
        id: imageId,
        isActive: true,
        status: 'APPROVED'
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found or not available for purchase' },
        { status: 404 }
      )
    }

    // Skip Stripe for free preview downloads
    const licenseConfig = LICENSE_PRICING[licenseType as keyof typeof LICENSE_PRICING]
    if (licenseConfig.price === 0) {
      return NextResponse.json(
        { 
          success: true, 
          isFree: true,
          message: 'Preview license is free - download directly' 
        }
      )
    }

    // Check if user already has this license
    const existingLicense = await prisma.imageLicense.findFirst({
      where: {
        imageId,
        userId: user.id,
        licenseType,
        isActive: true
      }
    })

    if (existingLicense) {
      return NextResponse.json(
        { error: 'You already own this license for this image' },
        { status: 400 }
      )
    }

    // Generate unique order number
    const orderNumber = `PLS-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        status: 'PENDING',
        totalAmount: licenseConfig.price,
        subtotal: licenseConfig.price,
        currency: 'USD',
        paymentStatus: 'PENDING',
        billingEmail: user.email,
        billingName: user.name || user.email,
        customerIp: request.headers.get('x-forwarded-for') || '127.0.0.1',
        items: {
          create: {
            imageId,
            quantity: 1,
            unitPrice: licenseConfig.price,
            totalPrice: licenseConfig.price,
            currency: 'USD',
            licenseType,
            itemTitle: image.title,
            itemDescription: `${licenseConfig.name} for ${image.title}`,
            itemType: 'IMAGE'
          }
        }
      }
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${licenseConfig.name}: ${image.title}`,
              description: licenseConfig.description,
              images: [image.cloudinaryUrl],
              metadata: {
                imageId: image.id,
                licenseType,
                orderId: order.id
              }
            },
            unit_amount: Math.round(licenseConfig.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl || process.env.NEXT_PUBLIC_SITE_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${returnUrl || process.env.NEXT_PUBLIC_SITE_URL}/gallery/${imageId}?checkout=cancelled`,
      customer_email: user.email,
      metadata: {
        orderId: order.id,
        imageId: image.id,
        licenseType,
        userId: user.id
      },
      billing_address_collection: 'required',
      payment_intent_data: {
        metadata: {
          orderId: order.id,
          imageId: image.id,
          licenseType,
          userId: user.id
        }
      }
    })

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeSessionId: session.id,
        paymentStatus: 'PROCESSING'
      }
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
      orderId: order.id,
      amount: licenseConfig.price,
      currency: 'USD',
      licenseType: licenseConfig.name
    })

  } catch (error: any) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { error: 'Internal server error during checkout process' },
      { status: 500 }
    )
  }
}