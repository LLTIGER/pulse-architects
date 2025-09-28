import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/auth/auth'
import { createRateLimiter, RateLimitPresets } from '@/lib/security/rate-limiter'
import { registerSchema, validateRequestBody } from '@/lib/validation/schemas'

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
    const validation = validateRequestBody(registerSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const { email, password, name, role } = validation.data

    const result = await registerUser({ 
      email, 
      password, 
      name, 
      role 
    })

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    // Send welcome email
    try {
      const { sendWelcomeEmail } = await import('../../../../emails/lib/email-sender')
      await sendWelcomeEmail(result.user.email, result.user.name || 'New User')
      console.log(`Welcome email sent to ${result.user.email}`)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail registration if email fails
    }

    return NextResponse.json({
      user: result.user,
      tokens: result.tokens
    })
  } catch (error: any) {
    console.error('Register API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}