/**
 * Validation Schemas
 * Centralized Zod schemas for data validation throughout the application
 */

import { z } from 'zod'

// Define enum values as constants since we're using SQLite
const UserRole = ['USER', 'ADMIN', 'SUPER_ADMIN'] as const
const ArchitecturalStyle = ['MODERN', 'TRADITIONAL', 'CONTEMPORARY', 'FARMHOUSE', 'CRAFTSMAN', 'COLONIAL', 'VICTORIAN', 'MEDITERRANEAN', 'SOUTHWESTERN', 'INDUSTRIAL'] as const
const BuildingType = ['SINGLE_FAMILY', 'DUPLEX', 'TOWNHOUSE', 'CONDO', 'COMMERCIAL', 'CABIN', 'GARAGE', 'ADU'] as const
const LicenseType = ['SINGLE_BUILD', 'MULTI_BUILD', 'COMMERCIAL', 'MODIFICATION_RIGHTS'] as const

// Common validation patterns
const emailSchema = z.string().email('Please enter a valid email address')
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')

const phoneSchema = z.string()
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
  .optional()

const urlSchema = z.string().url('Please enter a valid URL').optional()

// User Authentication Schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
  marketingEmails: z.boolean().optional().default(false),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// User Profile Schemas
export const userProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  company: z.string().max(100, 'Company name must be less than 100 characters').optional(),
  jobTitle: z.string().max(100, 'Job title must be less than 100 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  website: urlSchema,
  phone: phoneSchema,
  isPublic: z.boolean().default(false),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Plan and Product Schemas
export const planSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  style: z.enum(ArchitecturalStyle).optional(),
  buildingType: z.enum(BuildingType).optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  minSqFt: z.number().positive().optional(),
  maxSqFt: z.number().positive().optional(),
  bedrooms: z.number().int().min(1).optional(),
  bathrooms: z.number().min(1).optional(),
  garageSpaces: z.number().int().min(0).optional(),
  hasBasement: z.boolean().optional(),
  hasSecondFloor: z.boolean().optional(),
  isAccessible: z.boolean().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['newest', 'oldest', 'price-low', 'price-high', 'popular', 'featured']).default('newest'),
})

export const planReviewSchema = z.object({
  planId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(5, 'Review title must be at least 5 characters').max(100),
  content: z.string().min(20, 'Review must be at least 20 characters').max(1000),
  wouldRecommend: z.boolean(),
  images: z.array(z.string().url()).max(5, 'Maximum 5 images allowed').optional(),
})

export const favoriteSchema = z.object({
  planId: z.string().cuid(),
})

// Order and Payment Schemas
export const checkoutSchema = z.object({
  items: z.array(z.object({
    planId: z.string().cuid(),
    licenseType: z.enum(LicenseType),
    quantity: z.number().int().min(1).default(1),
  })).min(1, 'At least one item is required'),
  billingAddress: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: emailSchema,
    phone: phoneSchema,
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(3),
    country: z.string().min(2),
  }),
  paymentMethod: z.enum(['stripe', 'paypal']),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
})

// Custom Request Schemas
export const customRequestSchema = z.object({
  projectType: z.enum(['residential', 'commercial', 'industrial', 'institutional']),
  buildingType: z.enum(BuildingType),
  squareFootage: z.number().positive('Square footage must be positive'),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  stories: z.number().int().min(1).max(5),
  style: z.enum(ArchitecturalStyle).optional(),
  budget: z.object({
    min: z.number().positive(),
    max: z.number().positive(),
  }).refine(data => data.max > data.min, 'Maximum budget must be greater than minimum'),
  timeline: z.enum(['1-2 weeks', '2-4 weeks', '1-2 months', '2+ months']),
  location: z.string().min(2, 'Location is required'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000),
  features: z.array(z.string()).optional(),
  attachments: z.array(z.string().url()).max(10, 'Maximum 10 attachments allowed').optional(),
  contactPreference: z.enum(['email', 'phone', 'both']),
})

// Support and Contact Schemas
export const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: emailSchema,
  phone: phoneSchema,
  subject: z.enum(['custom-design', 'plan-modification', 'technical-support', 'billing', 'general']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  newsletter: z.boolean().optional(),
})

export const supportTicketSchema = z.object({
  category: z.enum(['technical', 'billing', 'download', 'license', 'custom', 'general', 'bug', 'feature']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  attachments: z.array(z.string().url()).max(5, 'Maximum 5 attachments allowed').optional(),
})

// Admin Schemas
export const userManagementSchema = z.object({
  userId: z.string().cuid(),
  role: z.enum(UserRole),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  profileComplete: z.boolean(),
})

export const planManagementSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(50, 'Description must be at least 50 characters').max(5000),
  categoryId: z.string().cuid(),
  style: z.enum(ArchitecturalStyle),
  buildingType: z.enum(BuildingType),
  squareFootage: z.number().positive(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().min(0),
  garageSpaces: z.number().int().min(0),
  stories: z.number().int().min(1).max(5),
  basePrice: z.number().positive(),
  pricePerSqFt: z.number().positive().optional(),
  licenseOptions: z.record(z.number().positive()),
  features: z.array(z.string()),
  tags: z.array(z.string()),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

// File Upload Schemas
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  category: z.enum(['avatar', 'plan-image', 'plan-file', 'attachment', 'cover']),
  metadata: z.record(z.string()).optional(),
})

export const imageUploadSchema = z.object({
  file: z.instanceof(File).refine(
    file => file.type.startsWith('image/'),
    'File must be an image'
  ).refine(
    file => file.size <= 10 * 1024 * 1024, // 10MB
    'File size must be less than 10MB'
  ),
  alt: z.string().min(1, 'Alt text is required').max(200),
  category: z.enum(['plan', 'avatar', 'gallery', 'cover']),
})

// API Response Schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  meta: z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    total: z.number().optional(),
    pages: z.number().optional(),
  }).optional(),
})

// Pagination Schema
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Export type utilities
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type UserProfileInput = z.infer<typeof userProfileSchema>
export type PlanSearchInput = z.infer<typeof planSearchSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type CustomRequestInput = z.infer<typeof customRequestSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type ApiResponse = z.infer<typeof apiResponseSchema>
export type PaginationInput = z.infer<typeof paginationSchema>