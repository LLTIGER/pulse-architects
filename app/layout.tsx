import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Pulse Architects | Premium Architectural Plans',
    template: '%s | Pulse Architects'
  },
  description: 'Discover premium architectural plans, house designs, and blueprints. Professional residential and commercial designs for your dream project.',
  keywords: [
    'architectural plans',
    'house designs',
    'blueprints',
    'residential plans',
    'commercial designs',
    'building plans',
    'home plans'
  ],
  authors: [{ name: 'Pulse Architects' }],
  creator: 'Pulse Architects',
  publisher: 'Pulse Architects',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pulse-architects.com',
    siteName: 'Pulse Architects',
    title: 'Pulse Architects | Premium Architectural Plans',
    description: 'Discover premium architectural plans, house designs, and blueprints. Professional residential and commercial designs for your dream project.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pulse Architects - Premium Architectural Plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pulse_architects',
    creator: '@pulse_architects',
    title: 'Pulse Architects | Premium Architectural Plans',
    description: 'Discover premium architectural plans, house designs, and blueprints.',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}