import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/auth/auth'
import { createRateLimiter, RateLimitPresets } from '@/lib/security/rate-limiter'
import { loginSchema, validateRequestBody } from '@/lib/validation/schemas'

const rateLimiter = createRateLimiter(RateLimitPresets.auth)

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = rateLimiter(request)
  if (rateLimitResult) {
    return rateLimitResult
  }

  try {
    const body = await request.json()
    
    // Validate request body
    const validation = validateRequestBody(loginSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    const result = await loginUser({ email, password })

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: result.user,
      tokens: result.tokens
    })
  } catch (error: any) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}