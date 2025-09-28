import React from 'react'
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Link,
  Button,
  Hr,
  Img
} from '@react-email/components'

interface PurchaseReceiptEmailProps {
  userName: string
  planTitle: string
  licenseType: string
  amount: number
  currency: string
  invoiceNumber: string
}

export const PurchaseReceiptEmail = ({
  userName,
  planTitle,
  licenseType,
  amount,
  currency,
  invoiceNumber
}: PurchaseReceiptEmailProps) => (
  <Html>
    <Head />
    <Preview>Purchase Receipt #{invoiceNumber} - {planTitle}</Preview>
    <Body style={main}>
      <Container style={container}>
        
        {/* Header */}
        <Section style={header}>
          <Row>
            <Column>
              <Img
                src="https://pulse-architects.com/logo-full.svg"
                width="200"
                height="60"
                alt="Pulse Architects"
                style={logo}
              />
            </Column>
          </Row>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Purchase Receipt 🧾</Heading>
          
          <Text style={text}>
            Hi {userName},
          </Text>

          <Text style={text}>
            Thank you for your purchase! Your payment has been successfully processed. 
            Below are the details of your transaction.
          </Text>

          {/* Invoice Details */}
          <Section style={invoiceHeader}>
            <Row>
              <Column style={invoiceLeft}>
                <Text style={invoiceTitle}>Invoice #{invoiceNumber}</Text>
                <Text style={invoiceDate}>Date: {new Date().toLocaleDateString()}</Text>
              </Column>
              <Column style={invoiceRight}>
                <Text style={totalAmount}>
                  {currency.toUpperCase()} {(amount / 100).toFixed(2)}
                </Text>
                <Text style={paidStatus}>✅ PAID</Text>
              </Column>
            </Row>
          </Section>

          {/* Purchase Details */}
          <Section style={purchaseDetails}>
            <Heading style={h2}>Purchase Details</Heading>
            
            <Section style={itemContainer}>
              <Row>
                <Column style={itemLeft}>
                  <Text style={itemName}>{planTitle}</Text>
                  <Text style={itemDescription}>
                    {licenseType.charAt(0).toUpperCase() + licenseType.slice(1).toLowerCase()} License
                  </Text>
                </Column>
                <Column style={itemRight}>
                  <Text style={itemPrice}>
                    {currency.toUpperCase()} {(amount / 100).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr style={itemDivider} />

            <Row>
              <Column style={totalLeft}>
                <Text style={totalLabel}>Total Amount:</Text>
              </Column>
              <Column style={totalRight}>
                <Text style={totalValue}>
                  {currency.toUpperCase()} {(amount / 100).toFixed(2)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* License Information */}
          <Section style={licenseInfo}>
            <Heading style={h2}>License Rights</Heading>
            
            {licenseType === 'PREVIEW' && (
              <Text style={licenseText}>
                <strong>Preview License:</strong> This is a watermarked preview for evaluation purposes only. 
                Not suitable for construction or commercial use. Perfect for initial project planning and design review.
              </Text>
            )}
            
            {licenseType === 'STANDARD' && (
              <Text style={licenseText}>
                <strong>Standard License:</strong> Complete construction-ready plans suitable for personal and residential projects. 
                Includes full documentation, modification rights, and unlimited personal use.
              </Text>
            )}
            
            {licenseType === 'COMMERCIAL' && (
              <Text style={licenseText}>
                <strong>Commercial License:</strong> Professional-grade license perfect for commercial projects and client work. 
                Includes all construction documentation, modification rights, and commercial use permissions.
              </Text>
            )}
            
            {licenseType === 'EXTENDED' && (
              <Text style={licenseText}>
                <strong>Extended License:</strong> Ultimate license with full rights including resale, distribution, and unlimited commercial use. 
                Perfect for architects, contractors, and developers serving multiple clients.
              </Text>
            )}
          </Section>

          {/* Download Section */}
          <Section style={downloadSection}>
            <Heading style={h2}>Access Your Purchase</Heading>
            
            <Text style={text}>
              Your architectural plans are now available for download in your account.
            </Text>

            <Section style={buttonContainer}>
              <Button style={downloadButton} href="https://pulse-architects.com/account/downloads">
                📁 Access Downloads
              </Button>
            </Section>

            <Text style={downloadNote}>
              Your download links will remain active and accessible through your account dashboard. 
              No expiration date for paid licenses.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Billing Information */}
          <Section style={billingInfo}>
            <Heading style={h2}>Billing Information</Heading>
            
            <Row>
              <Column>
                <Text style={billingLabel}>Payment Method:</Text>
                <Text style={billingValue}>Credit Card (ending in ****)</Text>
              </Column>
            </Row>
            
            <Row>
              <Column>
                <Text style={billingLabel}>Transaction ID:</Text>
                <Text style={billingValue}>{invoiceNumber}</Text>
              </Column>
            </Row>
            
            <Row>
              <Column>
                <Text style={billingLabel}>Payment Processor:</Text>
                <Text style={billingValue}>Stripe</Text>
              </Column>
            </Row>
          </Section>

          {/* Support Information */}
          <Text style={text}>
            <strong>Need Help?</strong>
          </Text>

          <Text style={text}>
            If you have any questions about your purchase or need technical support:
          </Text>

          <Text style={contactInfo}>
            📧 Email: <Link href="mailto:support@pulse-architects.com">support@pulse-architects.com</Link><br />
            📞 Phone: +33 6 12 77 64 98<br />
            💬 Live Chat: Available on our website
          </Text>

          {/* Account Management */}
          <Section style={accountSection}>
            <Heading style={h2}>Account Management</Heading>
            
            <Text style={text}>
              Manage your purchases, download history, and account settings:
            </Text>

            <Section style={accountButtons}>
              <Button style={accountButton} href="https://pulse-architects.com/account">
                👤 My Account
              </Button>
              <Button style={secondaryButton} href="https://pulse-architects.com/account/invoices">
                📋 All Invoices
              </Button>
            </Section>
          </Section>

          <Text style={signature}>
            Thank you for your business!<br />
            <strong>The Pulse Architects Team</strong>
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            © 2025 Pulse Architects. All rights reserved.<br />
            This receipt was generated for invoice #{invoiceNumber}
          </Text>
          <Text style={footerText}>
            <Link href="https://pulse-architects.com/account" style={footerLink}>
              Account Dashboard
            </Link>
            {' • '}
            <Link href="https://pulse-architects.com/terms" style={footerLink}>
              Terms of Service
            </Link>
            {' • '}
            <Link href="https://pulse-architects.com/refunds" style={footerLink}>
              Refund Policy
            </Link>
          </Text>
        </Section>

      </Container>
    </Body>
  </Html>
)

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  padding: '20px 30px',
  backgroundColor: '#1e293b',
}

const logo = {
  margin: '0 auto',
}

const content = {
  padding: '30px 30px 40px',
}

const h1 = {
  color: '#1e293b',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#1e293b',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '32px 0 16px',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const invoiceHeader = {
  backgroundColor: '#f8fafc',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const invoiceLeft = {
  width: '60%',
}

const invoiceRight = {
  width: '40%',
  textAlign: 'right' as const,
}

const invoiceTitle = {
  color: '#1e293b',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 8px',
}

const invoiceDate = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
}

const totalAmount = {
  color: '#059669',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 4px',
}

const paidStatus = {
  color: '#059669',
  fontSize: '12px',
  fontWeight: 'bold',
  margin: '0',
}

const purchaseDetails = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const itemContainer = {
  margin: '16px 0',
}

const itemLeft = {
  width: '70%',
}

const itemRight = {
  width: '30%',
  textAlign: 'right' as const,
}

const itemName = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 4px',
}

const itemDescription = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
}

const itemPrice = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const itemDivider = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
}

const totalLeft = {
  width: '70%',
}

const totalRight = {
  width: '30%',
  textAlign: 'right' as const,
}

const totalLabel = {
  color: '#1e293b',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
}

const totalValue = {
  color: '#059669',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
}

const licenseInfo = {
  backgroundColor: '#eff6ff',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const licenseText = {
  color: '#1e40af',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
}

const downloadSection = {
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '20px 0',
}

const downloadButton = {
  backgroundColor: '#059669',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
}

const downloadNote = {
  color: '#065f46',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '16px 0 0',
  textAlign: 'center' as const,
}

const billingInfo = {
  margin: '24px 0',
}

const billingLabel = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px',
}

const billingValue = {
  color: '#1e293b',
  fontSize: '16px',
  margin: '0 0 12px',
}

const contactInfo = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '16px 0',
}

const accountSection = {
  margin: '32px 0',
}

const accountButtons = {
  textAlign: 'center' as const,
  margin: '20px 0',
}

const accountButton = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0 8px 8px 0',
}

const secondaryButton = {
  backgroundColor: '#6b7280',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0 8px 8px 0',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const signature = {
  color: '#374151',
  fontSize: '16px',
  margin: '32px 0 0',
}

const footer = {
  padding: '20px 30px',
  backgroundColor: '#f9fafb',
  borderTop: '1px solid #e5e7eb',
}

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

const footerLink = {
  color: '#3b82f6',
  textDecoration: 'none',
}

export default PurchaseReceiptEmail