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

interface WelcomeEmailProps {
  userName: string
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Pulse Architects - Your journey to exceptional design starts here!</Preview>
    <Body style={main}>
      <Container style={container}>
        
        {/* Header with Logo */}
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
          <Heading style={h1}>Welcome to Pulse Architects, {userName}! 🏗️</Heading>
          
          <Text style={text}>
            Thank you for joining our community of architects, designers, and building enthusiasts. 
            You now have access to our premium collection of architectural plans and designs.
          </Text>

          <Text style={text}>
            <strong>What you can do now:</strong>
          </Text>

          <Section style={features}>
            <Row>
              <Column style={featureColumn}>
                <Text style={featureTitle}>🏠 Browse Plans</Text>
                <Text style={featureText}>
                  Explore our extensive library of residential, commercial, and luxury architectural plans
                </Text>
              </Column>
              <Column style={featureColumn}>
                <Text style={featureTitle}>📁 Download Instantly</Text>
                <Text style={featureText}>
                  Get immediate access to plans with various licensing options to fit your needs
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={featureColumn}>
                <Text style={featureTitle}>🎨 High Quality</Text>
                <Text style={featureText}>
                  All plans are professionally designed and ready for construction or modification
                </Text>
              </Column>
              <Column style={featureColumn}>
                <Text style={featureTitle}>🔄 Regular Updates</Text>
                <Text style={featureText}>
                  New designs added weekly to keep your project options fresh and current
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Call to Action */}
          <Section style={buttonContainer}>
            <Button style={button} href="https://pulse-architects.com/gallery">
              Start Exploring Plans
            </Button>
          </Section>

          <Text style={text}>
            <strong>Popular Categories to Get Started:</strong>
          </Text>

          <Section style={categoriesContainer}>
            <Link href="https://pulse-architects.com/catalog?category=residential" style={categoryLink}>
              🏡 Residential Plans
            </Link>
            <Link href="https://pulse-architects.com/catalog?category=commercial" style={categoryLink}>
              🏢 Commercial Designs
            </Link>
            <Link href="https://pulse-architects.com/catalog?category=luxury" style={categoryLink}>
              ✨ Luxury Collections
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            Need help getting started? Our team is here to assist you:
          </Text>

          <Text style={contactInfo}>
            📧 Email: <Link href="mailto:support@pulse-architects.com">support@pulse-architects.com</Link><br />
            📞 Phone: +33 6 12 77 64 98<br />
            🌐 Website: <Link href="https://pulse-architects.com">pulse-architects.com</Link>
          </Text>

          <Text style={signature}>
            Best regards,<br />
            <strong>The Pulse Architects Team</strong>
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            © 2025 Pulse Architects. All rights reserved.<br />
            You received this email because you created an account with us.
          </Text>
          <Text style={footerText}>
            <Link href="https://pulse-architects.com/unsubscribe" style={footerLink}>
              Unsubscribe
            </Link>
            {' • '}
            <Link href="https://pulse-architects.com/privacy" style={footerLink}>
              Privacy Policy
            </Link>
            {' • '}
            <Link href="https://pulse-architects.com/terms" style={footerLink}>
              Terms of Service
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

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const features = {
  margin: '32px 0',
}

const featureColumn = {
  padding: '0 16px 24px 0',
  width: '50%',
}

const featureTitle = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px',
}

const featureText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
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

const categoriesContainer = {
  margin: '16px 0 32px',
  textAlign: 'center' as const,
}

const categoryLink = {
  color: '#3b82f6',
  fontSize: '16px',
  textDecoration: 'none',
  margin: '0 16px 8px 0',
  display: 'inline-block',
  padding: '8px 16px',
  backgroundColor: '#eff6ff',
  borderRadius: '6px',
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

export default WelcomeEmail