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

interface DownloadConfirmationEmailProps {
  userName: string
  planTitle: string
  licenseType: string
  downloadUrl: string
}

export const DownloadConfirmationEmail = ({ 
  userName, 
  planTitle, 
  licenseType, 
  downloadUrl 
}: DownloadConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your download is ready: {planTitle}</Preview>
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
          <Heading style={h1}>Download Confirmed! 📁</Heading>
          
          <Text style={text}>
            Hi {userName},
          </Text>

          <Text style={text}>
            Your download of <strong>"{planTitle}"</strong> has been confirmed. 
            You can access your architectural plan using the download link below.
          </Text>

          {/* Download Details */}
          <Section style={downloadDetails}>
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Plan Name:</Text>
                <Text style={detailValue}>{planTitle}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>License Type:</Text>
                <Text style={detailValue}>
                  {licenseType.charAt(0).toUpperCase() + licenseType.slice(1).toLowerCase()} License
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Download Date:</Text>
                <Text style={detailValue}>{new Date().toLocaleDateString()}</Text>
              </Column>
            </Row>
          </Section>

          {/* Download Button */}
          <Section style={buttonContainer}>
            <Button style={downloadButton} href={downloadUrl}>
              📥 Download Your Plan
            </Button>
          </Section>

          {/* License Information */}
          <Section style={licenseInfo}>
            <Heading style={h2}>License Usage Rights</Heading>
            
            {licenseType === 'PREVIEW' && (
              <Text style={licenseText}>
                <strong>Preview License:</strong> This is a watermarked preview for evaluation purposes only. 
                Not for construction or commercial use.
              </Text>
            )}
            
            {licenseType === 'STANDARD' && (
              <Text style={licenseText}>
                <strong>Standard License:</strong> Suitable for personal and residential projects. 
                Includes full construction documentation and modification rights.
              </Text>
            )}
            
            {licenseType === 'COMMERCIAL' && (
              <Text style={licenseText}>
                <strong>Commercial License:</strong> Perfect for commercial projects and professional use. 
                Includes all rights for commercial construction and client projects.
              </Text>
            )}
            
            {licenseType === 'EXTENDED' && (
              <Text style={licenseText}>
                <strong>Extended License:</strong> Full rights including resale, distribution, and unlimited commercial use. 
                Perfect for architects and contractors serving multiple clients.
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          {/* Support Information */}
          <Text style={text}>
            <strong>Need Help?</strong>
          </Text>

          <Text style={text}>
            If you have any questions about your download or need technical support, 
            our team is ready to help:
          </Text>

          <Text style={contactInfo}>
            📧 Email: <Link href="mailto:support@pulse-architects.com">support@pulse-architects.com</Link><br />
            📞 Phone: +33 6 12 77 64 98<br />
            💬 Live Chat: Available on our website
          </Text>

          {/* Recommendations */}
          <Section style={recommendations}>
            <Heading style={h2}>You Might Also Like</Heading>
            <Text style={text}>
              Explore more architectural plans that complement your project:
            </Text>
            
            <Section style={buttonContainer}>
              <Button style={secondaryButton} href="https://pulse-architects.com/catalog">
                Browse More Plans
              </Button>
            </Section>
          </Section>

          <Text style={signature}>
            Thank you for choosing Pulse Architects!<br />
            <strong>The Pulse Architects Team</strong>
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            © 2025 Pulse Architects. All rights reserved.<br />
            This download confirmation was sent to verify your purchase.
          </Text>
          <Text style={footerText}>
            <Link href="https://pulse-architects.com/account" style={footerLink}>
              Manage Account
            </Link>
            {' • '}
            <Link href="https://pulse-architects.com/downloads" style={footerLink}>
              Download History
            </Link>
            {' • '}
            <Link href="https://pulse-architects.com/support" style={footerLink}>
              Support Center
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

const downloadDetails = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const detailColumn = {
  padding: '0 0 12px 0',
}

const detailLabel = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px',
}

const detailValue = {
  color: '#1e293b',
  fontSize: '16px',
  margin: '0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const downloadButton = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
}

const secondaryButton = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
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

const recommendations = {
  margin: '32px 0',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const contactInfo = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '16px 0',
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

export default DownloadConfirmationEmail