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

interface AdminUploadAlertEmailProps {
  planTitle: string
  uploaderName: string
  uploaderEmail: string
  planCategory: string
  reviewUrl: string
}

export const AdminUploadAlertEmail = ({
  planTitle,
  uploaderName,
  uploaderEmail,
  planCategory,
  reviewUrl
}: AdminUploadAlertEmailProps) => (
  <Html>
    <Head />
    <Preview>New plan upload requires review: {planTitle}</Preview>
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
          <Heading style={h1}>🔔 New Upload Alert</Heading>
          
          <Text style={text}>
            A new architectural plan has been uploaded and requires admin review before publication.
          </Text>

          {/* Upload Details */}
          <Section style={uploadDetails}>
            <Heading style={h2}>Upload Details</Heading>
            
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Plan Title:</Text>
                <Text style={detailValue}>{planTitle}</Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Category:</Text>
                <Text style={detailValue}>
                  {planCategory.charAt(0).toUpperCase() + planCategory.slice(1).toLowerCase()}
                </Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Uploaded by:</Text>
                <Text style={detailValue}>{uploaderName}</Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Uploader Email:</Text>
                <Text style={detailValue}>
                  <Link href={`mailto:${uploaderEmail}`} style={emailLink}>
                    {uploaderEmail}
                  </Link>
                </Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Upload Date:</Text>
                <Text style={detailValue}>{new Date().toLocaleDateString()}</Text>
              </Column>
            </Row>
          </Section>

          {/* Action Required */}
          <Section style={actionSection}>
            <Heading style={h2}>Action Required</Heading>
            
            <Text style={text}>
              Please review this upload to ensure it meets our quality standards and guidelines:
            </Text>

            <Section style={checklistContainer}>
              <Text style={checklistTitle}>Review Checklist:</Text>
              <Text style={checklistItem}>☐ Plan quality and completeness</Text>
              <Text style={checklistItem}>☐ Proper file formats and organization</Text>
              <Text style={checklistItem}>☐ Compliance with building codes</Text>
              <Text style={checklistItem}>☐ Accurate categorization</Text>
              <Text style={checklistItem}>☐ Appropriate pricing tier</Text>
              <Text style={checklistItem}>☐ No copyright infringement</Text>
            </Section>

            {/* Review Button */}
            <Section style={buttonContainer}>
              <Button style={reviewButton} href={reviewUrl}>
                🔍 Review Upload
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Quick Actions */}
          <Section style={quickActions}>
            <Heading style={h2}>Quick Actions</Heading>
            
            <Row>
              <Column style={actionColumn}>
                <Button style={approveButton} href={`${reviewUrl}?action=approve`}>
                  ✅ Quick Approve
                </Button>
              </Column>
              <Column style={actionColumn}>
                <Button style={rejectButton} href={`${reviewUrl}?action=reject`}>
                  ❌ Request Changes
                </Button>
              </Column>
            </Row>
          </Section>

          {/* Admin Dashboard Link */}
          <Text style={text}>
            Need to review multiple uploads? Visit the{' '}
            <Link href="https://pulse-architects.com/dashboard/uploads" style={dashboardLink}>
              Admin Dashboard
            </Link>{' '}
            for batch operations.
          </Text>

          <Text style={signature}>
            Pulse Architects Admin System<br />
            <strong>Automated Upload Notification</strong>
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            © 2025 Pulse Architects. All rights reserved.<br />
            This is an automated admin notification.
          </Text>
          <Text style={footerText}>
            <Link href="https://pulse-architects.com/dashboard" style={footerLink}>
              Admin Dashboard
            </Link>
            {' • '}
            <Link href="https://pulse-architects.com/settings" style={footerLink}>
              Notification Settings
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

const uploadDetails = {
  backgroundColor: '#fef3c7',
  borderLeft: '4px solid #f59e0b',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const detailColumn = {
  padding: '0 0 12px 0',
}

const detailLabel = {
  color: '#92400e',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px',
}

const detailValue = {
  color: '#1e293b',
  fontSize: '16px',
  margin: '0',
}

const emailLink = {
  color: '#3b82f6',
  textDecoration: 'none',
}

const actionSection = {
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const checklistContainer = {
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  padding: '16px',
  margin: '16px 0',
}

const checklistTitle = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px',
}

const checklistItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 6px',
  paddingLeft: '8px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '24px 0',
}

const reviewButton = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
}

const quickActions = {
  margin: '32px 0',
}

const actionColumn = {
  padding: '0 8px',
  width: '50%',
}

const approveButton = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
  width: '100%',
}

const rejectButton = {
  backgroundColor: '#ef4444',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
  width: '100%',
}

const dashboardLink = {
  color: '#3b82f6',
  textDecoration: 'none',
  fontWeight: 'bold',
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

export default AdminUploadAlertEmail