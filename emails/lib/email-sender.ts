import { Resend } from 'resend'
import { render } from '@react-email/render'
import { ReactElement } from 'react'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailConfig {
  to: string | string[]
  subject: string
  template: ReactElement
  from?: string
  replyTo?: string
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// Default email settings
const DEFAULT_FROM = process.env.EMAIL_FROM || 'Pulse Architects <noreply@pulse-architects.com>'
const DEFAULT_REPLY_TO = process.env.EMAIL_REPLY_TO || 'support@pulse-architects.com'

/**
 * Send an email using Resend with React Email template
 */
export async function sendEmail(config: EmailConfig): Promise<EmailResult> {
  try {
    // Render React template to HTML
    const html = render(config.template)

    // Send email via Resend
    const response = await resend.emails.send({
      from: config.from || DEFAULT_FROM,
      to: Array.isArray(config.to) ? config.to : [config.to],
      subject: config.subject,
      html,
      replyTo: config.replyTo || DEFAULT_REPLY_TO
    })

    if (response.error) {
      console.error('Email sending failed:', response.error)
      return {
        success: false,
        error: response.error.message || 'Failed to send email'
      }
    }

    console.log('Email sent successfully:', response.data?.id)
    return {
      success: true,
      messageId: response.data?.id
    }

  } catch (error) {
    console.error('Email service error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error'
    }
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(userEmail: string, userName: string): Promise<EmailResult> {
  const { WelcomeEmail } = await import('../templates/welcome')
  
  return sendEmail({
    to: userEmail,
    subject: 'Welcome to Pulse Architects! 🏗️',
    template: WelcomeEmail({ userName })
  })
}

/**
 * Send download confirmation email
 */
export async function sendDownloadConfirmation(
  userEmail: string,
  userName: string,
  planTitle: string,
  licenseType: string,
  downloadUrl: string
): Promise<EmailResult> {
  const { DownloadConfirmationEmail } = await import('../templates/download-confirmation')
  
  return sendEmail({
    to: userEmail,
    subject: `Download Confirmation: ${planTitle}`,
    template: DownloadConfirmationEmail({
      userName,
      planTitle,
      licenseType,
      downloadUrl
    })
  })
}

/**
 * Send admin notification for new uploads
 */
export async function sendAdminUploadAlert(
  planTitle: string,
  uploaderName: string,
  uploaderEmail: string,
  planCategory: string,
  reviewUrl: string
): Promise<EmailResult> {
  const { AdminUploadAlertEmail } = await import('../templates/admin-upload-alert')
  
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pulse-architects.com'
  
  return sendEmail({
    to: adminEmail,
    subject: `New Upload Pending Review: ${planTitle}`,
    template: AdminUploadAlertEmail({
      planTitle,
      uploaderName,
      uploaderEmail,
      planCategory,
      reviewUrl
    })
  })
}

/**
 * Send purchase receipt email
 */
export async function sendPurchaseReceipt(
  userEmail: string,
  userName: string,
  planTitle: string,
  licenseType: string,
  amount: number,
  currency: string,
  invoiceNumber: string
): Promise<EmailResult> {
  const { PurchaseReceiptEmail } = await import('../templates/purchase-receipt')
  
  return sendEmail({
    to: userEmail,
    subject: `Purchase Receipt: ${planTitle} - Invoice #${invoiceNumber}`,
    template: PurchaseReceiptEmail({
      userName,
      planTitle,
      licenseType,
      amount,
      currency,
      invoiceNumber
    })
  })
}

/**
 * Log email activity to database (optional)
 */
export async function logEmailActivity(
  userEmail: string,
  emailType: string,
  status: 'sent' | 'failed',
  messageId?: string,
  error?: string
) {
  try {
    // This would integrate with your Prisma database
    // For now, just console log
    console.log('Email Log:', {
      recipient: userEmail,
      type: emailType,
      status,
      messageId,
      error,
      timestamp: new Date().toISOString()
    })
  } catch (logError) {
    console.error('Failed to log email activity:', logError)
  }
}