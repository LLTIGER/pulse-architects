import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db'
import bcryptjs from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'CUSTOMER',
          emailVerified: profile.email_verified ? new Date() : null,
          profileComplete: false,
        }
      },
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email',
          placeholder: 'your@email.com'
        },
        password: { 
          label: 'Password', 
          type: 'password' 
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email as string 
          },
          include: {
            profile: true
          }
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid email or password')
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          user.hashedPassword
        )

        if (!isPasswordValid) {
          throw new Error('Invalid email or password')
        }

        if (!user.emailVerified) {
          throw new Error('Please verify your email before signing in')
        }

        if (!user.isActive) {
          throw new Error('Your account has been deactivated')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          emailVerified: user.emailVerified,
          profileComplete: user.profileComplete,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-email',
  },
  callbacks: {
    async jwt({ token, user, account: _account, profile: _profile }) {
      // Initial sign in
      if (user) {
        token.role = user.role || 'CUSTOMER'
        token.profileComplete = user.profileComplete || false
        token.emailVerified = user.emailVerified
      }

      // Return previous token if the access token has not expired yet
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.profileComplete = token.profileComplete as boolean
        session.user.emailVerified = token.emailVerified as Date | null
      }

      return session
    },
    async signIn({ user, account, profile: _profile, email: _email, credentials: _credentials }) {
      // OAuth sign in
      if (account?.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          // If user exists with Google OAuth, update last login
          if (existingUser) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { 
                lastLoginAt: new Date(),
                emailVerified: new Date() // OAuth emails are pre-verified
              }
            })
          }

          return true
        } catch (error) {
          console.error('OAuth sign in error:', error)
          return false
        }
      }

      // Credentials sign in
      if (account?.provider === 'credentials') {
        try {
          await prisma.user.update({
            where: { email: user.email! },
            data: { lastLoginAt: new Date() }
          })
          return true
        } catch (error) {
          console.error('Credentials sign in error:', error)
          return false
        }
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,    // 24 hours
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  events: {
    async signIn({ user, account, profile: _profile, isNewUser }) {
      // Log successful sign in
      console.log(`User ${user.email} signed in via ${account?.provider}`)
      
      // Create audit log for GDPR compliance
      if (user.id) {
        try {
          await prisma.auditLog.create({
            data: {
              userId: user.id,
              action: 'SIGN_IN',
              entityType: 'AUTH',
              entityId: user.id,
              ipAddress: 'unknown',
              userAgent: null,
              endpoint: '/auth/signin',
              metadata: JSON.stringify({
                provider: account?.provider,
                isNewUser,
                timestamp: new Date().toISOString()
              })
            }
          })
        } catch (error) {
          console.error('Failed to create audit log:', error)
        }
      }
    },
    async signOut(params) {
      const token = 'token' in params ? params.token : null
      // Log sign out
      console.log(`User signed out`)
      
      // Create audit log
      if (token?.sub) {
        try {
          await prisma.auditLog.create({
            data: {
              userId: token.sub,
              action: 'SIGN_OUT',
              entityType: 'AUTH',
              entityId: token.sub,
              ipAddress: 'unknown',
              userAgent: null,
              endpoint: '/auth/signout',
              metadata: JSON.stringify({
                timestamp: new Date().toISOString()
              })
            }
          })
        } catch (error) {
          console.error('Failed to create audit log:', error)
        }
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
})