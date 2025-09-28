import { z } from 'zod'

// Common validation patterns
const emailSchema = z.string().email('Invalid email format').min(1, 'Email is required')
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')

const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters long')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and periods')

// Auth schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
})

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  role: z.enum(['CUSTOMER', 'ADMIN']).optional().default('CUSTOMER')
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required')
})

// License and order schemas
export const licenseTypeSchema = z.enum(['PREVIEW', 'STANDARD', 'COMMERCIAL', 'EXTENDED'])

export const checkoutSchema = z.object({
  imageId: z.string().cuid('Invalid image ID'),
  licenseType: licenseTypeSchema,
  returnUrl: z.string().url('Invalid return URL')
})

export const downloadSchema = z.object({
  imageId: z.string().cuid('Invalid image ID'),
  license: licenseTypeSchema.optional().default('STANDARD')
})

// Image management schemas
export const imageUploadSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be less than 100 characters'),
  category: z.enum(['ARCHITECTURAL_PLAN', 'RESIDENTIAL', 'COMMERCIAL', 'LUXURY']),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  tags: z.array(z.string().max(20, 'Tag must be less than 20 characters'))
    .max(10, 'Maximum 10 tags allowed')
    .optional()
})

export const imageUpdateSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be less than 100 characters')
    .optional(),
  category: z.enum(['ARCHITECTURAL_PLAN', 'RESIDENTIAL', 'COMMERCIAL', 'LUXURY']).optional(),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  isApproved: z.boolean().optional(),
  tags: z.array(z.string().max(20, 'Tag must be less than 20 characters'))
    .max(10, 'Maximum 10 tags allowed')
    .optional()
})

// User profile schemas
export const profileUpdateSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phone: z.string()
    .regex(/^\+?[\d\s\-\(\)]{10,15}$/, 'Invalid phone number format')
    .optional(),
  profession: z.string().max(50, 'Profession must be less than 50 characters').optional(),
  company: z.string().max(100, 'Company name must be less than 100 characters').optional(),
  companySize: z.enum(['INDIVIDUAL', 'SMALL_2_10', 'MEDIUM_11_50', 'LARGE_51_200', 'ENTERPRISE_200_PLUS']).optional(),
  yearsExperience: z.number().min(0).max(50).optional(),
  street: z.string().max(100, 'Street address must be less than 100 characters').optional(),
  city: z.string().max(50, 'City must be less than 50 characters').optional(),
  state: z.string().max(50, 'State must be less than 50 characters').optional(),
  zipCode: z.string().max(20, 'ZIP code must be less than 20 characters').optional(),
  country: z.string().length(2, 'Country code must be 2 characters').optional(),
  currency: z.string().length(3, 'Currency code must be 3 characters').optional(),
  language: z.string().length(2, 'Language code must be 2 characters').optional(),
  timezone: z.string().max(50, 'Timezone must be less than 50 characters').optional(),
  marketingEmails: z.boolean().optional(),
  productUpdates: z.boolean().optional(),
  newsletter: z.boolean().optional()
})

// Search and filter schemas
export const searchQuerySchema = z.object({
  q: z.string().max(100, 'Search query must be less than 100 characters').optional(),
  category: z.enum(['ARCHITECTURAL_PLAN', 'RESIDENTIAL', 'COMMERCIAL', 'LUXURY']).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  license: licenseTypeSchema.optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  sortBy: z.enum(['createdAt', 'title', 'category', 'price']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
})

// Admin schemas
export const adminOrderFilterSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'ALL']).optional().default('ALL'),
  search: z.string().max(100, 'Search term must be less than 100 characters').optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20)
})

export const adminUserFilterSchema = z.object({
  role: z.enum(['CUSTOMER', 'ADMIN', 'ALL']).optional().default('ALL'),
  isActive: z.boolean().optional(),
  search: z.string().max(100, 'Search term must be less than 100 characters').optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20)
})

// Billing schemas
export const billingInfoSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  street: z.string().min(1, 'Street address is required').max(100, 'Street address must be less than 100 characters'),
  city: z.string().min(1, 'City is required').max(50, 'City must be less than 50 characters'),
  state: z.string().min(1, 'State is required').max(50, 'State must be less than 50 characters'),
  zip: z.string().min(1, 'ZIP code is required').max(20, 'ZIP code must be less than 20 characters'),
  country: z.string().length(2, 'Country code must be 2 characters')
})

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters long')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message must be less than 1000 characters'),
  phone: z.string()
    .regex(/^\+?[\d\s\-\(\)]{10,15}$/, 'Invalid phone number format')
    .optional(),
  company: z.string().max(100, 'Company name must be less than 100 characters').optional(),
  projectType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'MIXED_USE', 'OTHER']).optional()
})

// File upload schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File, 'File is required'),
  maxSize: z.number().optional().default(10 * 1024 * 1024), // 10MB default
  allowedTypes: z.array(z.string()).optional().default(['image/jpeg', 'image/png', 'image/webp'])
})

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: emailSchema,
  preferences: z.object({
    weekly: z.boolean().optional().default(true),
    productUpdates: z.boolean().optional().default(true),
    specialOffers: z.boolean().optional().default(false)
  }).optional()
})

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional()
})

export const paginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean()
  })
})

// Utility function to validate request body
export function validateRequestBody<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      return { success: false, errors }
    }
    return { success: false, errors: ['Invalid data format'] }
  }
}

// Utility function to validate query parameters
export function validateQueryParams<T>(schema: z.ZodSchema<T>, params: URLSearchParams): { success: true; data: T } | { success: false; errors: string[] } {
  const data: Record<string, any> = {}
  
  // Convert URLSearchParams to object
  for (const [key, value] of params.entries()) {
    // Handle numeric values
    if (/^\d+$/.test(value)) {
      data[key] = parseInt(value, 10)
    } else if (/^\d+\.\d+$/.test(value)) {
      data[key] = parseFloat(value)
    } else if (value === 'true') {
      data[key] = true
    } else if (value === 'false') {
      data[key] = false
    } else {
      data[key] = value
    }
  }
  
  return validateRequestBody(schema, data)
}

// Security validation helpers
export const securityValidation = {
  // XSS protection - basic HTML sanitization check
  containsHTML: (str: string): boolean => {
    const htmlRegex = /<[^>]*>/
    return htmlRegex.test(str)
  },
  
  // SQL injection protection - basic check for SQL keywords
  containsSQLInjection: (str: string): boolean => {
    const sqlKeywords = /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b|\bEXEC\b|\bUNION\b)/i
    return sqlKeywords.test(str)
  },
  
  // Path traversal protection
  containsPathTraversal: (str: string): boolean => {
    const pathTraversalRegex = /(\.\.[\/\\]|\.\.\\|\.\.\/)/
    return pathTraversalRegex.test(str)
  },
  
  // Validate string doesn't contain malicious patterns
  isSafeString: (str: string): boolean => {
    return !securityValidation.containsHTML(str) && 
           !securityValidation.containsSQLInjection(str) && 
           !securityValidation.containsPathTraversal(str)
  }
}

// Export type definitions
export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type CheckoutData = z.infer<typeof checkoutSchema>
export type ImageUploadData = z.infer<typeof imageUploadSchema>
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type SearchQuery = z.infer<typeof searchQuerySchema>
export type ContactFormData = z.infer<typeof contactFormSchema>