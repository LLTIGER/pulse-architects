/**
 * Enhanced TypeScript types for the Pulse Architects database schema
 * Provides type safety and autocompletion for database operations
 */

import type { 
  User, 
  UserProfile, 
  Plan, 
  Category, 
  PlanFile, 
  PlanImage,
  PlanTag,
  Order,
  OrderItem,
  License,
  Review,
  Favorite,
  DownloadLog,
  AuditLog,
  SystemConfig
} from '@prisma/client'

// Define string literal types for our SQLite schema
export type UserRole = 'CUSTOMER' | 'ARCHITECT' | 'ADMIN' | 'SUPER_ADMIN'
export type CompanySize = 'SOLO' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE'
export type ArchitecturalStyle = 'MODERN' | 'TRADITIONAL' | 'CONTEMPORARY' | 'FARMHOUSE' | 'CRAFTSMAN' | 'COLONIAL' | 'VICTORIAN' | 'MEDITERRANEAN' | 'SOUTHWESTERN' | 'INDUSTRIAL'
export type BuildingType = 'SINGLE_FAMILY' | 'DUPLEX' | 'TOWNHOUSE' | 'CONDO' | 'COMMERCIAL' | 'CABIN' | 'GARAGE' | 'ADU'
export type PlanStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
export type FileType = 'DWG' | 'PDF' | 'REVIT' | 'SKETCHUP' | 'CAD' | 'ZIP'
export type ImageType = 'THUMBNAIL' | 'MAIN' | 'GALLERY' | 'FLOOR_PLAN' | 'ELEVATION' | 'PERSPECTIVE'
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED'
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
export type FulfillmentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
export type LicenseType = 'SINGLE_BUILD' | 'MULTI_BUILD' | 'COMMERCIAL' | 'MODIFICATION_RIGHTS'
export type CustomRequestStatus = 'PENDING' | 'IN_REVIEW' | 'QUOTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type TicketCategory = 'TECHNICAL' | 'BILLING' | 'DOWNLOAD' | 'LICENSE' | 'CUSTOM' | 'GENERAL' | 'BUG' | 'FEATURE'
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'

// Enhanced types with relations
export interface UserWithProfile extends User {
  profile: UserProfile | null
}

export interface UserWithRelations extends User {
  profile: UserProfile | null
  orders: Order[]
  reviews: Review[]
  favorites: Favorite[]
  licenses: License[]
}

export interface PlanWithDetails extends Plan {
  category: Category
  files: PlanFile[]
  images: PlanImage[]
  reviews: ReviewWithUser[]
  _count: {
    reviews: number
    favorites: number
    downloadLogs: number
  }
}

export interface PlanSummary extends Plan {
  category: Category
  images: PlanImage[]
  _count: {
    reviews: number
    favorites: number
  }
}

export interface ReviewWithUser extends Review {
  user: {
    name: string | null
    profile: {
      firstName: string | null
      lastName: string | null
    } | null
  }
}

export interface OrderWithItems extends Order {
  items: OrderItemWithPlan[]
  licenses: License[]
}

export interface OrderItemWithPlan extends OrderItem {
  plan: PlanSummary
}

export interface LicenseWithPlan extends License {
  plan: PlanWithDetails
  order: {
    orderNumber: string
    createdAt: Date
  }
}

// Commented out since CustomPlanRequest model doesn't exist in our schema
// export interface CustomRequestWithUser extends CustomPlanRequest {
//   user: UserWithProfile
//   assignedTo: UserWithProfile | null
// }

export interface CategoryWithPlans extends Category {
  plans: PlanSummary[]
  children: Category[]
}

export interface CategoryHierarchy extends Category {
  parent: Category | null
  children: CategoryWithPlans[]
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  pages: number
  currentPage: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PlansResponse extends PaginatedResponse<PlanSummary> {}

export interface SearchFilters {
  categoryId?: string
  style?: ArchitecturalStyle
  buildingType?: BuildingType
  minPrice?: number
  maxPrice?: number
  minSqFt?: number
  maxSqFt?: number
  bedrooms?: number
  bathrooms?: number
  status?: PlanStatus
  search?: string
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'sqft_asc' | 'sqft_desc' | 'rating' | 'popular'
  page?: number
  limit?: number
}

// Form data types
export interface CreatePlanData {
  title: string
  slug: string
  description: string
  shortDescription?: string
  squareFootage: number
  bedrooms: number
  bathrooms: number
  floors: number
  garageSpaces: number
  lotSize?: number
  width: number
  depth: number
  height?: number
  style: ArchitecturalStyle
  features: string[]
  buildingType: BuildingType
  roofType?: string
  exteriorMaterial: string[]
  basePrice: number
  pricePerSqFt?: number
  licenseOptions: Record<string, number>
  metaTitle?: string
  metaDescription?: string
  tags: string[]
  categoryId: string
  status: PlanStatus
  isActive: boolean
  isFeatured: boolean
}

export interface UpdatePlanData extends Partial<CreatePlanData> {
  id: string
}

export interface CreateOrderData {
  items: {
    planId: string
    licenseType: LicenseType
    quantity?: number
  }[]
  billingEmail: string
  billingName: string
  billingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  notes?: string
}

// Commented out since CustomPlanRequest model doesn't exist
// export interface CreateCustomRequestData {
//   title: string
//   description: string
//   requirements: Record<string, any>
//   squareFootage?: number
//   bedrooms?: number
//   bathrooms?: number
//   floors?: number
//   style?: ArchitecturalStyle
//   buildingType?: BuildingType
//   budget?: number
//   timeline?: string
//   location?: {
//     city?: string
//     state?: string
//     country?: string
//   }
//   attachments?: string[]
// }

export interface CreateReviewData {
  planId: string
  rating: number
  title?: string
  content: string
}

export interface UpdateUserProfileData {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: Date
  profilePicture?: string
  profession?: string
  company?: string
  companySize?: CompanySize
  yearsExperience?: number
  specializations?: string[]
  street?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  currency?: string
  language?: string
  timezone?: string
  marketingEmails?: boolean
  productUpdates?: boolean
  newsletter?: boolean
}

// Analytics types
export interface PlanAnalytics {
  planId: string
  views: number
  downloads: number
  favorites: number
  revenue: number
  averageRating: number
  reviewCount: number
  conversionRate: number
  period: 'day' | 'week' | 'month' | 'year'
}

export interface SalesMetrics {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  conversionRate: number
  topPlans: {
    planId: string
    title: string
    revenue: number
    orderCount: number
  }[]
  revenueByCategory: {
    categoryId: string
    categoryName: string
    revenue: number
  }[]
  period: {
    start: Date
    end: Date
  }
}

export interface UserMetrics {
  totalUsers: number
  newUsers: number
  activeUsers: number
  customersByRole: Record<UserRole, number>
  userGrowth: {
    date: Date
    count: number
  }[]
  topCustomers: {
    userId: string
    name: string
    totalSpent: number
    orderCount: number
  }[]
}

// Error types
export interface DatabaseError {
  code: string
  message: string
  details?: any
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

// Utility types
export type PlanFilters = Pick<Plan, 'style' | 'buildingType' | 'bedrooms' | 'bathrooms'> & {
  priceRange: [number, number]
  sqftRange: [number, number]
  categoryIds: string[]
}

export type OrderSummary = Pick<Order, 'id' | 'orderNumber' | 'status' | 'totalAmount' | 'createdAt'> & {
  itemCount: number
  planTitles: string[]
}

export type LicenseSummary = Pick<License, 'id' | 'licenseType' | 'downloadCount' | 'maxDownloads' | 'isActive' | 'expiresAt'> & {
  planTitle: string
  planSlug: string
}

// Database configuration types
export interface DatabaseConfig {
  url: string
  directUrl?: string
  maxConnections?: number
  connectionTimeout?: number
  queryTimeout?: number
  ssl?: boolean
}

export interface MigrationConfig {
  migrationsDir: string
  seedFile?: string
  backupBeforeMigration?: boolean
  skipSeeding?: boolean
}

// Search and indexing types
export interface SearchResult {
  plans: PlanSummary[]
  categories: Category[]
  total: number
  suggestions: string[]
  filters: {
    styles: { value: ArchitecturalStyle; count: number }[]
    buildingTypes: { value: BuildingType; count: number }[]
    priceRanges: { min: number; max: number; count: number }[]
    categories: { id: string; name: string; count: number }[]
  }
}

export interface AutocompleteResult {
  type: 'plan' | 'category' | 'style' | 'feature'
  value: string
  label: string
  metadata?: any
}

// File upload types
export interface FileUploadData {
  planId: string
  fileType: FileType
  originalName: string
  description?: string
  version?: string
  scale?: string
  units?: string
  isSecure?: boolean
  downloadLimit?: number
  isPreview?: boolean
}

export interface ImageUploadData {
  planId: string
  imageType: ImageType
  alt: string
  isPrimary?: boolean
}

// Export all Prisma types for convenience
export {
  User,
  UserProfile,
  Plan,
  Category,
  PlanFile,
  PlanImage,
  PlanTag,
  Order,
  OrderItem,
  License,
  Review,
  Favorite,
  DownloadLog,
  AuditLog,
  SystemConfig
}