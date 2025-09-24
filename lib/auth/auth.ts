import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role?: 'CUSTOMER' | 'ADMIN'
}

export interface AuthUser {
  id: string
  email: string
  name: string | null
  role: string
  profileComplete: boolean
}

/**
 * Registers a new user
 */
export async function registerUser(data: RegisterData): Promise<{ user: AuthUser; token: string } | { error: string }> {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return { error: 'User with this email already exists' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        hashedPassword,
        name: data.name,
        role: data.role || 'CUSTOMER',
        profileComplete: false,
        gdprConsent: true,
        gdprConsentDate: new Date()
      }
    })

    // Create user profile
    await prisma.userProfile.create({
      data: {
        userId: user.id,
        firstName: data.name.split(' ')[0],
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        currency: 'EUR',
        language: 'en',
        timezone: 'Europe/Paris',
        country: 'FR'
      }
    })

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileComplete: user.profileComplete
    }

    return { user: authUser, token }
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Failed to register user' }
  }
}

/**
 * Authenticates user login
 */
export async function loginUser(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string } | { error: string }> {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { 
        email: credentials.email,
        isActive: true
      }
    })

    if (!user || !user.hashedPassword) {
      return { error: 'Invalid email or password' }
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword)
    
    if (!isPasswordValid) {
      return { error: 'Invalid email or password' }
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileComplete: user.profileComplete
    }

    return { user: authUser, token }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Failed to login' }
  }
}

/**
 * Verifies JWT token and returns user data
 */
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    
    const user = await prisma.user.findUnique({
      where: { 
        id: decoded.userId,
        isActive: true
      }
    })

    if (!user) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileComplete: user.profileComplete
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

/**
 * Gets user by ID
 */
export async function getUserById(userId: string): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { 
        id: userId,
        isActive: true
      },
      include: {
        profile: true
      }
    })

    if (!user) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileComplete: user.profileComplete
    }
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

/**
 * Checks if user is admin
 */
export function isAdmin(user: AuthUser): boolean {
  return user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'
}

/**
 * Gets user's download permissions for a plan
 */
export async function getUserPlanAccess(userId: string, planId: string): Promise<{
  hasAccess: boolean
  licenseType?: string
  downloadsRemaining?: number
}> {
  try {
    const license = await prisma.license.findFirst({
      where: {
        userId,
        planId,
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      }
    })

    if (!license) {
      return { hasAccess: false }
    }

    const remainingDownloads = license.maxDownloads 
      ? license.maxDownloads - license.downloadCount 
      : undefined

    return {
      hasAccess: true,
      licenseType: license.licenseType,
      downloadsRemaining: remainingDownloads
    }
  } catch (error) {
    console.error('Get user plan access error:', error)
    return { hasAccess: false }
  }
}