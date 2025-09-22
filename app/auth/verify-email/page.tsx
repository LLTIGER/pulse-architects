'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MailIcon } from 'lucide-react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <Card className="p-6 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <MailIcon className="w-8 h-8 text-primary" />
      </div>
      
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Check Your Email
      </h1>
      
      <p className="text-muted-foreground mb-6">
        We've sent a verification link to:
      </p>
      
      {email && (
        <div className="bg-secondary/50 rounded-lg p-3 mb-6">
          <p className="text-foreground font-medium">{email}</p>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mb-6">
        Click the link in the email to verify your account. If you don't see the email, 
        check your spam folder.
      </p>
      
      <div className="space-y-3">
        <Button variant="outline" className="w-full">
          Resend Verification Email
        </Button>
        
        <Button variant="ghost" className="w-full" asChild>
          <Link href="/auth/login">
            Back to Sign In
          </Link>
        </Button>
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Having trouble? <Link href="/contact" className="text-primary hover:text-primary/80">Contact support</Link>
        </p>
      </div>
    </Card>
  )
}

function VerifyEmailFallback() {
  return (
    <Card className="p-6 text-center">
      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
        <MailIcon className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">Loading verification details...</p>
    </Card>
  )
}

export default function VerifyEmailPage() {
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

        <Suspense fallback={<VerifyEmailFallback />}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  )
}