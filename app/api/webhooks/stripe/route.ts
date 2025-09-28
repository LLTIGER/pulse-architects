import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('Missing Stripe signature')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    console.log('Stripe webhook received:', event.type)

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'charge.dispute.created':
        await handleChargeDispute(event.data.object as Stripe.Dispute)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error: any) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const orderId = session.metadata?.orderId
    const imageId = session.metadata?.imageId
    const licenseType = session.metadata?.licenseType
    const userId = session.metadata?.userId

    if (!orderId || !imageId || !licenseType || !userId) {
      console.error('Missing metadata in checkout session:', session.metadata)
      return
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        stripePaymentIntentId: session.payment_intent as string,
        fulfillmentStatus: 'PROCESSING',
        completedAt: new Date()
      }
    })

    // Generate license key
    const licenseKey = generateLicenseKey(orderId, imageId, licenseType)

    // Create license record
    const license = await prisma.imageLicense.create({
      data: {
        orderId,
        imageId,
        userId,
        licenseType,
        licenseKey,
        commercialUse: licenseType === 'COMMERCIAL' || licenseType === 'EXTENDED',
        resaleAllowed: licenseType === 'EXTENDED',
        modificationAllowed: true,
        purchasePrice: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency?.toUpperCase() || 'USD'
      }
    })

    // Update fulfillment status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        fulfillmentStatus: 'FULFILLED',
        downloadExpiresAt: licenseType === 'PREVIEW' ? 
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : // 7 days for preview
          null // No expiration for paid licenses
      }
    })

    console.log(`License created successfully: ${license.licenseKey}`)

    // Get user details for email notification
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    const image = await prisma.image.findUnique({
      where: { id: imageId }
    })

    if (user && image) {
      // Send purchase receipt email
      const { sendPurchaseReceipt, sendDownloadConfirmation } = await import('../../../../emails/lib/email-sender')
      
      await sendPurchaseReceipt(
        user.email,
        user.name || 'Customer',
        image.title,
        licenseType,
        session.amount_total || 0,
        session.currency?.toUpperCase() || 'USD',
        orderId
      )

      // Send download confirmation email
      const downloadUrl = `https://pulse-architects.com/download/${license.licenseKey}`
      await sendDownloadConfirmation(
        user.email,
        user.name || 'Customer',
        image.title,
        licenseType,
        downloadUrl
      )

      console.log(`Email notifications sent to ${user.email}`)
    }

  } catch (error: any) {
    console.error('Error handling checkout completion:', error)
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata?.orderId

    if (!orderId) {
      console.error('Missing orderId in payment intent metadata')
      return
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        stripePaymentIntentId: paymentIntent.id
      }
    })

    console.log(`Payment succeeded for order: ${orderId}`)

  } catch (error: any) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata?.orderId

    if (!orderId) {
      console.error('Missing orderId in payment intent metadata')
      return
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'FAILED',
        stripePaymentIntentId: paymentIntent.id,
        fulfillmentStatus: 'CANCELLED'
      }
    })

    console.log(`Payment failed for order: ${orderId}`)

  } catch (error: any) {
    console.error('Error handling payment failure:', error)
  }
}

async function handleChargeDispute(dispute: Stripe.Dispute) {
  try {
    // Find order by payment intent ID
    const order = await prisma.order.findFirst({
      where: {
        stripePaymentIntentId: dispute.payment_intent as string
      }
    })

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'CANCELLED',
          paymentStatus: 'REFUNDED',
          fulfillmentStatus: 'CANCELLED',
          internalNotes: `Dispute created: ${dispute.reason}`
        }
      })

      // Deactivate associated licenses
      await prisma.imageLicense.updateMany({
        where: { orderId: order.id },
        data: { isActive: false }
      })

      console.log(`Dispute handled for order: ${order.id}`)
    }

  } catch (error: any) {
    console.error('Error handling charge dispute:', error)
  }
}

function generateLicenseKey(orderId: string, imageId: string, licenseType: string): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 8)
  const prefix = licenseType.substring(0, 2).toUpperCase()
  const orderHash = orderId.substring(0, 4)
  const imageHash = imageId.substring(0, 4)
  
  return `${prefix}-${orderHash}-${imageHash}-${timestamp}-${random}`.toUpperCase()
}