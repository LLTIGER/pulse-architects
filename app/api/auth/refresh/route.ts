import { NextRequest, NextResponse } from 'next/server'
import { refreshAccessToken } from '@/lib/auth/auth'
import { refreshTokenSchema, validateRequestBody } from '@/lib/validation/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validation = validateRequestBody(refreshTokenSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const { refreshToken } = validation.data

    const result = await refreshAccessToken(refreshToken)

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      tokens: result.tokens
    })

  } catch (error: any) {
    console.error('Refresh token API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}