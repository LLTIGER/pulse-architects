import { NextRequest, NextResponse } from 'next/server'
import NodeCache from 'node-cache'

// Rate limiter cache with TTL
const cache = new NodeCache()

export interface RateLimitConfig {
  windowMs: number    // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  message?: string    // Custom error message
  keyGenerator?: (req: NextRequest) => string // Custom key generator
}

const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'Too many requests, please try again later'
}

/**
 * Rate limiting middleware for API routes
 */
export function createRateLimiter(config: Partial<RateLimitConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config }

  return function rateLimitMiddleware(req: NextRequest): NextResponse | null {
    try {
      // Generate key for rate limiting (IP + User Agent + endpoint)
      const key = finalConfig.keyGenerator 
        ? finalConfig.keyGenerator(req)
        : generateDefaultKey(req)

      // Get current request count
      const requestCount = cache.get<number>(key) || 0

      // Check if limit exceeded
      if (requestCount >= finalConfig.maxRequests) {
        return NextResponse.json(
          { 
            error: finalConfig.message,
            retryAfter: Math.ceil(finalConfig.windowMs / 1000)
          },
          { 
            status: 429,
            headers: {
              'Retry-After': Math.ceil(finalConfig.windowMs / 1000).toString(),
              'X-RateLimit-Limit': finalConfig.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': new Date(Date.now() + finalConfig.windowMs).toISOString()
            }
          }
        )
      }

      // Increment request count
      cache.set(key, requestCount + 1, finalConfig.windowMs / 1000)

      // Add rate limit headers to response
      const remaining = finalConfig.maxRequests - requestCount - 1
      const resetTime = new Date(Date.now() + finalConfig.windowMs)

      return NextResponse.next({
        headers: {
          'X-RateLimit-Limit': finalConfig.maxRequests.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': resetTime.toISOString()
        }
      })

    } catch (error) {
      console.error('Rate limiter error:', error)
      // On error, allow the request to continue
      return null
    }
  }
}

/**
 * Generate default key for rate limiting
 */
function generateDefaultKey(req: NextRequest): string {
  const ip = getClientIP(req)
  const userAgent = req.headers.get('user-agent') || 'unknown'
  const endpoint = req.nextUrl.pathname
  
  // Create a hash-like key
  return `${ip}:${Buffer.from(userAgent).toString('base64').slice(0, 10)}:${endpoint}`
}

/**
 * Extract client IP address
 */
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIP = req.headers.get('x-real-ip')
  const remoteAddr = req.headers.get('remote-addr')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  return realIP || remoteAddr || 'unknown'
}

/**
 * Predefined rate limit configurations
 */
export const RateLimitPresets = {
  // Strict limits for authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: 'Too many authentication attempts, please try again in 15 minutes'
  },
  
  // Moderate limits for API endpoints
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: 'API rate limit exceeded, please try again later'
  },
  
  // Generous limits for file downloads
  download: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    message: 'Download rate limit exceeded, please wait before downloading again'
  },
  
  // Very strict limits for payment endpoints
  payment: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
    message: 'Payment rate limit exceeded for security reasons'
  },
  
  // Limits for search/query endpoints
  search: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    message: 'Search rate limit exceeded, please slow down'
  }
}

/**
 * Rate limit based on user ID for authenticated endpoints
 */
export function createUserBasedRateLimiter(config: Partial<RateLimitConfig> = {}) {
  return createRateLimiter({
    ...config,
    keyGenerator: (req: NextRequest) => {
      // Try to extract user ID from Authorization header
      const authHeader = req.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
          const token = authHeader.substring(7)
          // Simple JWT payload extraction (just for rate limiting, not verification)
          const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
          if (payload.userId) {
            return `user:${payload.userId}:${req.nextUrl.pathname}`
          }
        } catch {
          // Fall back to IP-based limiting if token parsing fails
        }
      }
      return generateDefaultKey(req)
    }
  })
}