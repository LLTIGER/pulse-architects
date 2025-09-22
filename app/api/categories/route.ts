/**
 * Categories API Endpoint
 * Handles architectural plan categories with plan counts
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeCount = searchParams.get('includeCount') === 'true'
    const parentId = searchParams.get('parentId')

    const where = {
      isActive: true,
      ...(parentId ? { parentId } : {}),
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        ...(includeCount && {
          _count: {
            select: {
              plans: {
                where: {
                  status: 'PUBLISHED',
                  isActive: true
                }
              },
              children: {
                where: { isActive: true }
              }
            }
          }
        }),
        children: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
            ...(includeCount && {
              _count: {
                select: {
                  plans: {
                    where: {
                      status: 'PUBLISHED',
                      isActive: true
                    }
                  }
                }
              }
            })
          }
        }
      },
      orderBy: [
        { sortOrder: 'asc' },
        { name: 'asc' }
      ]
    })

    // Transform data to include plan counts if requested
    const transformedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      parentId: category.parentId,
      sortOrder: category.sortOrder,
      isActive: category.isActive,
      metaTitle: category.metaTitle,
      metaDescription: category.metaDescription,
      children: category.children.map(child => ({
        ...child,
        ...(includeCount && {
          planCount: (child as any)._count?.plans || 0
        })
      })),
      ...(includeCount && {
        planCount: (category as any)._count?.plans || 0,
        childrenCount: (category as any)._count?.children || 0
      })
    }))

    return NextResponse.json({
      success: true,
      data: transformedCategories,
      meta: {
        total: categories.length,
        includeCount
      }
    })

  } catch (error) {
    console.error('Categories API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Enable CORS for public API
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Cache for 15 minutes for categories (they change less frequently)
export const revalidate = 900