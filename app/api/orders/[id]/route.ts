import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params

    // Fetch order with all related data
    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: user.id // Ensure user can only access their own orders
      },
      include: {
        items: {
          include: {
            image: {
              select: {
                id: true,
                title: true,
                cloudinaryUrl: true,
                category: true
              }
            }
          }
        },
        licenses: {
          where: {
            isActive: true
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

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or access denied' },
        { status: 404 }
      )
    }

    // Format the response
    const formattedOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      totalAmount: order.totalAmount,
      subtotal: order.subtotal,
      taxAmount: order.taxAmount,
      currency: order.currency,
      createdAt: order.createdAt,
      completedAt: order.completedAt,
      items: order.items.map(item => ({
        id: item.id,
        licenseType: item.licenseType,
        itemTitle: item.itemTitle,
        itemDescription: item.itemDescription,
        itemType: item.itemType,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        quantity: item.quantity,
        image: item.image ? {
          id: item.image.id,
          title: item.image.title,
          cloudinaryUrl: item.image.cloudinaryUrl,
          category: item.image.category
        } : null
      })),
      licenses: order.licenses.map(license => ({
        id: license.id,
        licenseKey: license.licenseKey,
        licenseType: license.licenseType,
        downloadCount: license.downloadCount,
        maxDownloads: license.maxDownloads,
        isActive: license.isActive,
        expiresAt: license.expiresAt,
        commercialUse: license.commercialUse,
        resaleAllowed: license.resaleAllowed,
        modificationAllowed: license.modificationAllowed
      })),
      billingInfo: {
        email: order.billingEmail,
        name: order.billingName,
        street: order.billingStreet,
        city: order.billingCity,
        state: order.billingState,
        zip: order.billingZip,
        country: order.billingCountry
      }
    }

    return NextResponse.json({
      success: true,
      order: formattedOrder
    })

  } catch (error: any) {
    console.error('Get order API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}