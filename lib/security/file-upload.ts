import crypto from 'crypto'
import { securityValidation } from '@/lib/validation/schemas'

// File upload security configuration
export const FILE_UPLOAD_CONFIG = {
  // Maximum file sizes by type (in bytes)
  MAX_SIZES: {
    image: 10 * 1024 * 1024,      // 10MB for images
    document: 50 * 1024 * 1024,   // 50MB for documents
    default: 5 * 1024 * 1024      // 5MB default
  },
  
  // Allowed MIME types
  ALLOWED_TYPES: {
    image: [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/webp',
      'image/avif'
    ],
    document: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  },
  
  // File signature validation (magic numbers)
  FILE_SIGNATURES: {
    'image/jpeg': [0xFF, 0xD8, 0xFF],
    'image/png': [0x89, 0x50, 0x4E, 0x47],
    'image/webp': [0x52, 0x49, 0x46, 0x46],
    'application/pdf': [0x25, 0x50, 0x44, 0x46]
  }
} as const

// File upload validation result
export interface FileValidationResult {
  isValid: boolean
  errors: string[]
  sanitizedFilename?: string
  detectedMimeType?: string
}

// Comprehensive file validation
export function validateUploadedFile(
  file: File,
  category: 'image' | 'document' = 'image'
): FileValidationResult {
  const errors: string[] = []
  
  // Basic file existence check
  if (!file || !file.name) {
    return { isValid: false, errors: ['No file provided'] }
  }

  // File size validation
  const maxSize = FILE_UPLOAD_CONFIG.MAX_SIZES[category] || FILE_UPLOAD_CONFIG.MAX_SIZES.default
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024))
    errors.push(`File size too large. Maximum size is ${maxSizeMB}MB`)
  }

  // MIME type validation
  const allowedTypes = FILE_UPLOAD_CONFIG.ALLOWED_TYPES[category]
  if (!allowedTypes.includes(file.type)) {
    errors.push(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`)
  }

  // Filename security validation
  const filenameValidation = validateFilename(file.name)
  if (!filenameValidation.isValid) {
    errors.push(...filenameValidation.errors)
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedFilename: filenameValidation.sanitizedFilename,
    detectedMimeType: file.type
  }
}

// Advanced file validation with buffer inspection
export async function validateFileBuffer(
  buffer: ArrayBuffer,
  expectedMimeType: string
): Promise<{ isValid: boolean; errors: string[] }> {
  const errors: string[] = []
  const uint8Array = new Uint8Array(buffer)
  
  // Check file signature (magic numbers)
  const expectedSignature = FILE_UPLOAD_CONFIG.FILE_SIGNATURES[expectedMimeType as keyof typeof FILE_UPLOAD_CONFIG.FILE_SIGNATURES]
  if (expectedSignature) {
    const actualSignature = Array.from(uint8Array.slice(0, expectedSignature.length))
    if (!arraysEqual(actualSignature, expectedSignature)) {
      errors.push('File content does not match declared file type')
    }
  }

  // Check for embedded scripts in images (basic XSS prevention)
  if (expectedMimeType.startsWith('image/')) {
    const bufferString = new TextDecoder('utf-8', { fatal: false }).decode(buffer)
    if (containsScriptTags(bufferString)) {
      errors.push('File contains potentially malicious content')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Filename security validation
function validateFilename(filename: string): { isValid: boolean; errors: string[]; sanitizedFilename: string } {
  const errors: string[] = []
  
  // Check for dangerous characters
  const dangerousChars = /[<>:"|?*\x00-\x1f]/
  if (dangerousChars.test(filename)) {
    errors.push('Filename contains invalid characters')
  }

  // Check for path traversal attempts
  if (securityValidation.containsPathTraversal(filename)) {
    errors.push('Filename contains path traversal patterns')
  }

  // Check for reserved names (Windows)
  const reservedNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i
  if (reservedNames.test(filename)) {
    errors.push('Filename uses reserved system name')
  }

  // Generate sanitized filename
  const sanitized = sanitizeFilename(filename)
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedFilename: sanitized
  }
}

// Sanitize filename for safe storage
function sanitizeFilename(filename: string): string {
  // Remove dangerous characters
  let sanitized = filename.replace(/[<>:"|?*\x00-\x1f]/g, '_')
  
  // Remove multiple dots and path separators
  sanitized = sanitized.replace(/\.{2,}/g, '.')
  sanitized = sanitized.replace(/[/\\]/g, '_')
  
  // Ensure reasonable length
  const maxLength = 255
  if (sanitized.length > maxLength) {
    const ext = sanitized.substring(sanitized.lastIndexOf('.'))
    const base = sanitized.substring(0, maxLength - ext.length - 8) // Leave room for timestamp
    sanitized = `${base}_${Date.now()}${ext}`
  }
  
  // Add timestamp to prevent collisions
  const ext = sanitized.substring(sanitized.lastIndexOf('.'))
  const base = sanitized.substring(0, sanitized.lastIndexOf('.'))
  
  return `${base}_${crypto.randomBytes(4).toString('hex')}${ext}`
}

// Check for script tags in file content
function containsScriptTags(content: string): boolean {
  const scriptPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // Event handlers like onclick, onload
    /data:text\/html/gi,
    /vbscript:/gi
  ]
  
  return scriptPatterns.some(pattern => pattern.test(content))
}

// Utility function to compare arrays
function arraysEqual(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((val, index) => val === b[index])
}

// Generate secure file upload token
export function generateFileUploadToken(userId: string, filename: string): string {
  const data = `${userId}:${filename}:${Date.now()}`
  return crypto.createHash('sha256').update(data).digest('hex')
}

// Validate file upload token
export function validateFileUploadToken(
  token: string,
  userId: string,
  filename: string,
  maxAge: number = 3600000 // 1 hour
): boolean {
  try {
    // This is a simplified validation - in production, you'd store tokens with timestamps
    const expectedToken = generateFileUploadToken(userId, filename)
    return token === expectedToken
  } catch (error) {
    return false
  }
}

// Cloudinary upload options with security settings
export function getSecureCloudinaryOptions(category: 'image' | 'document' = 'image') {
  const baseOptions = {
    folder: 'pulse-architects',
    resource_type: category === 'image' ? 'image' as const : 'auto' as const,
    access_mode: 'authenticated', // Require authentication to access
    secure: true,
    use_filename: false, // Use Cloudinary-generated names
    unique_filename: true,
    overwrite: false
  }

  if (category === 'image') {
    return {
      ...baseOptions,
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
        { flags: 'strip_profile' }, // Remove EXIF data for privacy
        { dpr: 'auto' }
      ],
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif']
    }
  }

  return baseOptions
}

// Content Security Policy headers for file uploads
export const FILE_UPLOAD_CSP_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'none'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline';"
} as const

// Type definitions
export type FileCategory = 'image' | 'document'
export type FileUploadOptions = {
  category: FileCategory
  maxSize?: number
  allowedTypes?: string[]
  requireAuth?: boolean
  adminOnly?: boolean
}