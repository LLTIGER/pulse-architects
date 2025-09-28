import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// CSRF token configuration
const CSRF_TOKEN_SECRET = process.env.CSRF_SECRET || 'csrf-secret-fallback'
const CSRF_TOKEN_LENGTH = 32
const CSRF_HEADER_NAME = 'x-csrf-token'
const CSRF_COOKIE_NAME = '__Host-csrf-token'

// Generate a cryptographically secure CSRF token
export function generateCSRFToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex')
}

// Create CSRF token hash for verification
export function createCSRFTokenHash(token: string, userSession?: string): string {
  const data = `${token}:${userSession || 'anonymous'}:${CSRF_TOKEN_SECRET}`
  return crypto.createHash('sha256').update(data).digest('hex')
}

// Verify CSRF token
export function verifyCSRFToken(
  providedToken: string, 
  expectedHash: string, 
  userSession?: string
): boolean {
  if (!providedToken || !expectedHash) {
    return false
  }

  const computedHash = createCSRFTokenHash(providedToken, userSession)
  
  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(expectedHash, 'hex'),
    Buffer.from(computedHash, 'hex')
  )
}

// Middleware function to validate CSRF tokens
export function validateCSRFToken(request: NextRequest, userSession?: string): boolean {
  // Skip CSRF validation for safe HTTP methods
  const method = request.method.toUpperCase()
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return true
  }

  // Get CSRF token from header
  const tokenFromHeader = request.headers.get(CSRF_HEADER_NAME)
  
  // Get CSRF token hash from cookie
  const cookieHeader = request.headers.get('cookie')
  const tokenHashFromCookie = extractCSRFTokenFromCookie(cookieHeader)

  if (!tokenFromHeader || !tokenHashFromCookie) {
    return false
  }

  return verifyCSRFToken(tokenFromHeader, tokenHashFromCookie, userSession)
}

// Extract CSRF token from cookie string
function extractCSRFTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null

  const cookies = cookieHeader.split(';').map(cookie => cookie.trim())
  const csrfCookie = cookies.find(cookie => cookie.startsWith(`${CSRF_COOKIE_NAME}=`))
  
  if (!csrfCookie) return null
  
  return csrfCookie.split('=')[1]
}

// Create CSRF response with token
export function createCSRFResponse(response: NextResponse, userSession?: string): NextResponse {
  const token = generateCSRFToken()
  const tokenHash = createCSRFTokenHash(token, userSession)
  
  // Set secure cookie with CSRF token hash
  response.cookies.set(CSRF_COOKIE_NAME, tokenHash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  })

  // Return the plain token in response for client to use in headers
  return NextResponse.json({
    ...response.body ? JSON.parse(response.body as string) : {},
    csrfToken: token
  })
}

// Higher-order function to wrap API routes with CSRF protection
export function withCSRFProtection(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    // Extract user session if available
    const authHeader = request.headers.get('authorization')
    const userSession = authHeader ? authHeader.substring(7) : undefined

    // Validate CSRF token for unsafe methods
    if (!validateCSRFToken(request, userSession)) {
      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      )
    }

    // Call the original handler
    const response = await handler(request, ...args)
    
    // Add CSRF token to response for safe methods or successful requests
    if (request.method.toUpperCase() === 'GET' || response.ok) {
      return createCSRFResponse(response, userSession)
    }

    return response
  }
}

// Utility function to get CSRF token for client-side use
export async function getCSRFToken(userSession?: string): Promise<string> {
  const token = generateCSRFToken()
  return token
}

// Constants for client-side usage
export const CSRF_CONSTANTS = {
  HEADER_NAME: CSRF_HEADER_NAME,
  COOKIE_NAME: CSRF_COOKIE_NAME
} as const

// Type definitions
export interface CSRFTokenData {
  token: string
  hash: string
}

export interface CSRFConfig {
  skipValidation?: boolean
  customSecret?: string
  tokenExpiry?: number
}