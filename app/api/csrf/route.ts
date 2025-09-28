import { NextRequest, NextResponse } from 'next/server'
import { generateCSRFToken, createCSRFTokenHash, CSRF_CONSTANTS } from '@/lib/security/csrf'
import { verifyToken } from '@/lib/auth/auth'

export async function GET(request: NextRequest) {
  try {
    // Extract user session if available
    let userSession: string | undefined
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const user = await verifyToken(token)
      userSession = user?.id
    }

    // Generate CSRF token
    const token = generateCSRFToken()
    const tokenHash = createCSRFTokenHash(token, userSession)

    // Create response with CSRF token
    const response = NextResponse.json({
      csrfToken: token,
      headerName: CSRF_CONSTANTS.HEADER_NAME
    })

    // Set secure cookie with CSRF token hash
    response.cookies.set(CSRF_CONSTANTS.COOKIE_NAME, tokenHash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return response

  } catch (error: any) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}