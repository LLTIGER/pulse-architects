'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react'

const errorMessages: Record<string, { title: string; description: string; action?: string }> = {
  Configuration: {
    title: 'Server Configuration Error',
    description: 'There is a problem with the server configuration. Please contact support.',
  },
  AccessDenied: {
    title: 'Access Denied',
    description: 'You do not have permission to sign in. Please contact support if you believe this is an error.',
  },
  Verification: {
    title: 'Verification Error',
    description: 'The verification link was invalid or has expired. Please request a new verification email.',
    action: 'Request New Link',
  },
  Default: {
    title: 'Authentication Error',
    description: 'An unexpected error occurred during authentication. Please try again.',
    action: 'Try Again',
  },
  CredentialsSignin: {
    title: 'Invalid Credentials',
    description: 'The email or password you entered is incorrect. Please check your credentials and try again.',
    action: 'Try Again',
  },
  EmailCreateAccount: {
    title: 'Email Account Creation Failed',
    description: 'Could not create an account with this email. The email might already be in use.',
  },
  OAuthSignin: {
    title: 'OAuth Sign In Error',
    description: 'There was an error signing in with your OAuth provider. Please try again.',
    action: 'Try Again',
  },
  OAuthCallback: {
    title: 'OAuth Callback Error',
    description: 'There was an error processing the OAuth callback. Please try signing in again.',
    action: 'Try Again',
  },
  OAuthCreateAccount: {
    title: 'OAuth Account Creation Failed',
    description: 'Could not create an account with your OAuth provider. Please try again or use a different method.',
  },
  EmailSignin: {
    title: 'Email Sign In Error',
    description: 'Could not send sign in email. Please check your email address and try again.',
    action: 'Try Again',
  },
  SessionRequired: {
    title: 'Session Required',
    description: 'You must be signed in to access this page.',
    action: 'Sign In',
  },
}

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || 'Default'
  
  const errorInfo = errorMessages[error] || errorMessages.Default

  return (
    <Card className="p-6 text-center">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangleIcon className="w-8 h-8 text-destructive" />
      </div>
      
      <h1 className="text-2xl font-bold text-foreground mb-2">
        {errorInfo.title}
      </h1>
      
      <p className="text-muted-foreground mb-6">
        {errorInfo.description}
      </p>
      
      {/* Error Code */}
      <div className="bg-muted rounded-lg p-3 mb-6">
        <p className="text-sm text-muted-foreground">Error Code:</p>
        <p className="text-foreground font-mono text-sm">{error}</p>
      </div>
      
      <div className="space-y-3">
        {errorInfo.action && (
          <Button className="w-full" asChild>
            <Link href="/auth/login">
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              {errorInfo.action}
            </Link>
          </Button>
        )}
        
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Need help? <Link href="/contact" className="text-primary hover:text-primary/80">Contact support</Link>
        </p>
      </div>
    </Card>
  )
}

function ErrorFallback() {
  return (
    <Card className="p-6 text-center">
      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangleIcon className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">Loading error details...</p>
    </Card>
  )
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-10 w-10 bg-primary rounded-lg" />
            <span className="text-2xl font-bold text-foreground">Pulse Architects</span>
          </div>
        </div>

        <Suspense fallback={<ErrorFallback />}>
          <ErrorContent />
        </Suspense>
      </div>
    </div>
  )
}