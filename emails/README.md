# Email Notification System

This directory contains the email notification system for Pulse Architects, built with Resend and React Email.

## Overview

The email system provides automated notifications for key user interactions and business events:

- **Welcome emails** for new user registrations
- **Download confirmation emails** after successful purchases
- **Purchase receipt emails** with invoice details
- **Admin upload alerts** when new content is uploaded for review

## Architecture

### Core Components

- **`/lib/email-sender.ts`** - Central email service with Resend integration
- **`/templates/`** - React Email templates for all notification types
- **Environment variables** - Configuration for SMTP and branding

### Email Templates

All templates are built with React Email components for consistent styling and cross-client compatibility:

1. **Welcome Email** (`templates/welcome.tsx`)
   - Sent to new users upon registration
   - Highlights platform features and getting started guide
   - Includes links to popular plan categories

2. **Download Confirmation Email** (`templates/download-confirmation.tsx`)
   - Sent after successful plan purchase and license generation
   - Contains download link and license details
   - Includes usage rights information based on license type

3. **Purchase Receipt Email** (`templates/purchase-receipt.tsx`)
   - Professional invoice format with transaction details
   - License rights explanation
   - Account management links

4. **Admin Upload Alert Email** (`templates/admin-upload-alert.tsx`)
   - Notifies administrators of new content uploads
   - Includes review checklist and quick action buttons
   - Links to admin dashboard for batch operations

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```bash
# Required
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM="Pulse Architects <noreply@pulse-architects.com>"
EMAIL_REPLY_TO="support@pulse-architects.com"
ADMIN_EMAIL="admin@pulse-architects.com"
```

### Resend Setup

1. Create account at [resend.com](https://resend.com)
2. Verify your domain for custom email addresses
3. Generate API key and add to environment variables
4. Test email delivery in development

## Usage

### Basic Email Sending

```typescript
import { sendEmail } from '@/emails/lib/email-sender'
import { WelcomeEmail } from '@/emails/templates/welcome'

const result = await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome to Pulse Architects!',
  template: WelcomeEmail({ userName: 'John Doe' })
})

if (result.success) {
  console.log('Email sent:', result.messageId)
} else {
  console.error('Email failed:', result.error)
}
```

### Pre-built Functions

The email sender includes convenient functions for common use cases:

```typescript
import {
  sendWelcomeEmail,
  sendDownloadConfirmation,
  sendPurchaseReceipt,
  sendAdminUploadAlert
} from '@/emails/lib/email-sender'

// Welcome new user
await sendWelcomeEmail('user@example.com', 'John Doe')

// Confirm download
await sendDownloadConfirmation(
  'user@example.com',
  'John Doe',
  'Modern Villa Plans',
  'STANDARD',
  'https://download-link.com'
)

// Send receipt
await sendPurchaseReceipt(
  'user@example.com',
  'John Doe',
  'Modern Villa Plans',
  'STANDARD',
  4999, // amount in cents
  'USD',
  'INV-001'
)

// Admin alert
await sendAdminUploadAlert(
  'New Villa Design',
  'Jane Smith',
  'jane@example.com',
  'RESIDENTIAL',
  'https://admin.pulse-architects.com/review/123'
)
```

## Integration Points

The email system is automatically integrated into these workflows:

### User Registration
- **File**: `app/api/auth/register/route.ts`
- **Trigger**: New user account creation
- **Email**: Welcome email with platform introduction

### Purchase Completion
- **File**: `app/api/webhooks/stripe/route.ts`
- **Trigger**: Stripe checkout session completion
- **Emails**: Purchase receipt + Download confirmation

### Content Upload
- **File**: `app/api/admin/upload/route.ts`
- **Trigger**: New plan upload by admin
- **Email**: Admin notification for review

## Email Template Styling

All templates use consistent styling based on the Pulse Architects brand:

### Brand Colors
- **Primary**: #1e293b (dark slate)
- **Secondary**: #3b82f6 (blue)
- **Success**: #10b981 (emerald)
- **Warning**: #f59e0b (amber)
- **Danger**: #ef4444 (red)

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
- **Headings**: Bold, color #1e293b
- **Body Text**: #374151, 16px, line-height 1.6
- **Small Text**: #6b7280, 14px

### Layout
- **Container**: 600px max-width, centered
- **Header**: Dark background with logo
- **Content**: White background with padding
- **Footer**: Light gray with links

## Error Handling

The email system includes comprehensive error handling:

- **Network failures** are logged but don't break user workflows
- **Invalid email addresses** are caught and reported
- **Template rendering errors** are isolated per email type
- **Rate limiting** prevents spam and abuse

## Testing

### Development Testing

Use Resend's test mode for development:

```typescript
// Test email delivery without sending real emails
const result = await sendEmail({
  to: 'test@example.com',
  subject: 'Test Email',
  template: WelcomeEmail({ userName: 'Test User' })
})
```

### Email Preview

React Email provides preview functionality:

```bash
# Install React Email CLI
npm install -g @react-email/cli

# Preview templates in browser
email dev
```

### Staging Environment

Test with real email addresses in staging:

1. Use personal email addresses
2. Verify all email types render correctly
3. Check links and buttons work as expected
4. Test mobile compatibility

## Monitoring

### Email Delivery Tracking

Resend provides delivery analytics:

- Open rates and click tracking
- Bounce and complaint monitoring
- Delivery status for each email
- Real-time webhook notifications

### Application Logging

The system logs email events:

```typescript
// Success logging
console.log(`Email sent successfully: ${messageId}`)

// Error logging
console.error('Email sending failed:', error)

// Optional database logging
await logEmailActivity(
  userEmail,
  'welcome',
  'sent',
  messageId
)
```

## Security Considerations

### Email Security
- All emails use HTTPS links only
- Sensitive data is not included in email content
- Download links are time-limited and secure
- Admin emails are restricted to verified addresses

### Anti-Spam Measures
- Rate limiting on email sending
- Unsubscribe links in marketing emails
- SPF, DKIM, and DMARC configuration
- Domain verification with Resend

## Troubleshooting

### Common Issues

**Email not sending:**
- Check RESEND_API_KEY is valid
- Verify domain is configured in Resend
- Check API rate limits

**Template not rendering:**
- Verify React Email component syntax
- Check for missing props in template
- Test template in isolation

**Links not working:**
- Ensure all URLs are absolute (https://)
- Check environment variables for correct domain
- Test links in different email clients

### Debug Mode

Enable detailed logging for troubleshooting:

```typescript
// Set environment variable
DEBUG_EMAIL=true

// Check logs for detailed information
console.log('Email debug:', {
  template: 'welcome',
  recipient: userEmail,
  status: 'sent',
  messageId: result.messageId
})
```

## Future Enhancements

### Planned Features
- Email template customization in admin panel
- A/B testing for email campaigns
- Advanced analytics and reporting
- Multi-language email templates
- Email scheduling and automation workflows

### Performance Improvements
- Email queue processing for high volume
- Template caching and optimization
- Batch email sending capabilities
- Background job processing

## Support

For email system issues:

1. Check Resend dashboard for delivery status
2. Review application logs for error details
3. Test individual templates in isolation
4. Contact support with specific error messages

---

*Last updated: January 2025*