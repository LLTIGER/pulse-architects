import { UserRole } from '@prisma/client'
import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      profileComplete: boolean
      emailVerified: Date | null
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: UserRole
    profileComplete: boolean
    emailVerified: Date | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: UserRole
    profileComplete: boolean
    emailVerified: Date | null
  }
}