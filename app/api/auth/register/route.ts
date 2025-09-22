import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  marketingEmails: z.boolean().optional().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcryptjs.hash(validatedData.password, 12)
    
    // Create user and profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          hashedPassword,
          name: `${validatedData.firstName} ${validatedData.lastName}`,
          role: 'CUSTOMER',
          isActive: true,
          profileComplete: false,
          onboardingStep: 0,
          gdprConsent: true,
          gdprConsentDate: new Date(),
        },
      })
      
      // Create user profile
      const profile = await tx.userProfile.create({
        data: {
          userId: user.id,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          company: null,
          phone: null,
          marketingEmails: validatedData.marketingEmails,
        },
      })
      
      // Generate email verification token
      const verificationToken = await tx.verificationToken.create({
        data: {
          identifier: user.email,
          token: crypto.randomUUID(),
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      })
      
      // Create audit log for GDPR compliance
      await tx.auditLog.create({
        data: {
          userId: user.id,
          action: 'USER_REGISTRATION',
          entityType: 'USER',
          entityId: user.id,
          ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent'),
          endpoint: '/api/auth/register',
          metadata: JSON.stringify({
            email: user.email,
            registrationMethod: 'email',
            gdprConsent: true,
            marketingEmails: validatedData.marketingEmails,
            timestamp: new Date().toISOString(),
          }),
        },
      })
      
      return { user, profile, verificationToken }
    })
    
    // TODO: Send verification email
    // await sendVerificationEmail(result.user.email, result.verificationToken.token)
    
    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please check your email to verify your account.',
      userId: result.user.id,
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: error.errors.map(e => e.message) 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}