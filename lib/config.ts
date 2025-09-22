/**
 * Application Configuration
 * Centralized configuration management with environment variable validation
 */

import { z } from 'zod'

// Environment variable schema for validation
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  DIRECT_URL: z.string().url().optional(),
  
  // NextAuth
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  
  // OAuth Providers
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
  
  // File Storage (Cloudinary)
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().optional(),
  
  // Payment Processing (Stripe)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_', 'Invalid Stripe publishable key'),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_', 'Invalid Stripe secret key'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_', 'Invalid Stripe webhook secret'),
  
  // Email Service
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  FROM_EMAIL: z.string().email('FROM_EMAIL must be a valid email'),
  
  // Feature Flags
  ENABLE_AUDIT_LOGGING: z.enum(['true', 'false']).default('true'),
  ENABLE_CUSTOM_REQUESTS: z.enum(['true', 'false']).default('true'),
  ENABLE_GUEST_BROWSING: z.enum(['true', 'false']).default('true'),
  ENABLE_REVIEWS: z.enum(['true', 'false']).default('true'),
  
  // Development Settings
  DEBUG: z.enum(['true', 'false']).default('false'),
  SEED_DATABASE: z.enum(['true', 'false']).default('false'),
  MOCK_PAYMENTS: z.enum(['true', 'false']).default('false'),
  
  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  
  // File Upload Limits
  MAX_FILE_SIZE: z.string().transform(Number).default('52428800'), // 50MB
  MAX_FILES_PER_PLAN: z.string().transform(Number).default('20'),
  
  // Analytics (Optional)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  VERCEL_ANALYTICS: z.enum(['true', 'false']).default('false'),
})

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`❌ Invalid environment variables:\n${missingVars}`)
    }
    throw error
  }
}

// Export validated configuration
export const config = parseEnv()

// Type-safe configuration object
export const appConfig = {
  // App Information
  app: {
    name: 'Pulse Architects',
    description: 'Premium Architectural Plans and Design Services',
    url: config.NEXTAUTH_URL || 'http://localhost:3000',
    version: '1.0.0',
  },
  
  // Environment
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  },
  
  // Database
  database: {
    url: config.DATABASE_URL,
    directUrl: config.DIRECT_URL,
  },
  
  // Authentication
  auth: {
    secret: config.NEXTAUTH_SECRET,
    url: config.NEXTAUTH_URL,
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
    sessionUpdateAge: 24 * 60 * 60,   // 24 hours
  },
  
  // OAuth Providers
  oauth: {
    google: {
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    },
  },
  
  // File Storage
  storage: {
    cloudinary: {
      cloudName: config.CLOUDINARY_CLOUD_NAME,
      apiKey: config.CLOUDINARY_API_KEY,
      apiSecret: config.CLOUDINARY_API_SECRET,
      uploadPreset: config.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    },
  },
  
  // Payment Processing
  payments: {
    stripe: {
      publishableKey: config.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: config.STRIPE_SECRET_KEY,
      webhookSecret: config.STRIPE_WEBHOOK_SECRET,
    },
  },
  
  // Email Service
  email: {
    apiKey: config.RESEND_API_KEY,
    fromEmail: config.FROM_EMAIL,
  },
  
  // Feature Flags
  features: {
    auditLogging: config.ENABLE_AUDIT_LOGGING === 'true',
    customRequests: config.ENABLE_CUSTOM_REQUESTS === 'true',
    guestBrowsing: config.ENABLE_GUEST_BROWSING === 'true',
    reviews: config.ENABLE_REVIEWS === 'true',
    debug: config.DEBUG === 'true',
    seedDatabase: config.SEED_DATABASE === 'true',
    mockPayments: config.MOCK_PAYMENTS === 'true',
  },
  
  // Rate Limiting
  rateLimit: {
    maxRequests: config.RATE_LIMIT_MAX_REQUESTS,
    windowMs: config.RATE_LIMIT_WINDOW_MS,
  },
  
  // File Upload
  upload: {
    maxFileSize: config.MAX_FILE_SIZE,
    maxFilesPerPlan: config.MAX_FILES_PER_PLAN,
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    allowedDocumentTypes: ['application/pdf', 'application/vnd.ms-excel', 'text/csv'],
  },
  
  // Analytics
  analytics: {
    googleAnalytics: config.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    vercelAnalytics: config.VERCEL_ANALYTICS === 'true',
  },
  
  // Cache Configuration
  cache: {
    ttl: {
      plans: 300,        // 5 minutes
      categories: 900,   // 15 minutes
      user: 600,        // 10 minutes
      health: 0,        // No cache
    },
  },
  
  // Business Logic
  business: {
    defaultPaginationLimit: 20,
    maxPaginationLimit: 100,
    passwordMinLength: 8,
    tokenExpirationHours: 24,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 30,
  },
} as const

// Utility functions
export const isDevelopment = appConfig.env.isDevelopment
export const isProduction = appConfig.env.isProduction
export const isTest = appConfig.env.isTest

// Feature flag utilities
export const isFeatureEnabled = (feature: keyof typeof appConfig.features): boolean => {
  return appConfig.features[feature]
}

// Environment validation utility
export const validateEnvironment = (): boolean => {
  try {
    parseEnv()
    console.log('✅ Environment variables validated successfully')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// Export individual configs for convenience
export const {
  app: appInfo,
  auth: authConfig,
  database: dbConfig,
  storage: storageConfig,
  payments: paymentsConfig,
  email: emailConfig,
  features,
} = appConfig