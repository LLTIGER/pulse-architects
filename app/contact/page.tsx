import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  PhoneIcon, 
  MailIcon, 
  MapPinIcon, 
  MessageSquareIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Pulse Architects for custom designs, support, or questions about our architectural plans.',
}

const contactMethods = [
  {
    title: 'Phone Support',
    description: 'Speak directly with our architectural experts',
    icon: PhoneIcon,
    value: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
    actionLabel: 'Call Now',
    hours: 'Mon-Fri: 8AM-6PM PST',
  },
  {
    title: 'Email Support',
    description: 'Send us detailed questions or project requirements',
    icon: MailIcon,
    value: 'hello@pulseArchitects.com',
    action: 'mailto:hello@pulseArchitects.com',
    actionLabel: 'Send Email',
    hours: 'Response within 24 hours',
  },
  {
    title: 'Live Chat',
    description: 'Get instant help with plan selection and technical questions',
    icon: MessageSquareIcon,
    value: 'Available Now',
    action: '#',
    actionLabel: 'Start Chat',
    hours: 'Mon-Fri: 9AM-5PM PST',
  },
]

const offices = [
  {
    city: 'San Francisco',
    address: '123 Architecture Way\nSan Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    email: 'sf@pulseArchitects.com',
    primary: true,
  },
  {
    city: 'New York',
    address: '456 Design Avenue\nNew York, NY 10001',
    phone: '+1 (555) 234-5678',
    email: 'ny@pulseArchitects.com',
    primary: false,
  },
  {
    city: 'Austin',
    address: '789 Blueprint Street\nAustin, TX 78701',
    phone: '+1 (555) 345-6789',
    email: 'austin@pulseArchitects.com',
    primary: false,
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our plans? Need a custom design? Our team of architectural 
            experts is here to help bring your vision to life.
          </p>
        </div>
      </header>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How Can We Help You?
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the contact method that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <Card key={method.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {method.description}
                  </p>
                  <div className="text-lg font-medium text-foreground mb-2">
                    {method.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-6">
                    {method.hours}
                  </div>
                  <a 
                    href={method.action}
                    className="w-full inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 h-10 px-4 py-2 border border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    {method.actionLabel}
                  </a>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>
            
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="custom-design">Custom Design Request</option>
                    <option value="plan-modification">Plan Modification</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us about your project, questions, or how we can help you..."
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-1"
                  />
                  <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                    I'd like to receive updates about new plans, design trends, and special offers.
                  </label>
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Offices
            </h2>
            <p className="text-lg text-muted-foreground">
              Visit us at one of our convenient locations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office) => (
              <Card key={office.city} className={`p-6 ${office.primary ? 'ring-2 ring-primary' : ''}`}>
                <div className="flex items-center mb-4">
                  <MapPinIcon className="w-5 h-5 text-primary mr-2" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {office.city}
                    {office.primary && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        Headquarters
                      </span>
                    )}
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
                    <div className="whitespace-pre-line text-muted-foreground">
                      {office.address}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 text-muted-foreground mr-2" />
                    <a 
                      href={`tel:${office.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <MailIcon className="w-4 h-4 text-muted-foreground mr-2" />
                    <a 
                      href={`mailto:${office.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How quickly will I receive my plans after purchase?',
                answer: 'All plans are available for immediate download after purchase. You\'ll receive an email with download links within minutes of completing your order.',
              },
              {
                question: 'Can you modify existing plans?',
                answer: 'Yes! Our team can modify any of our existing plans to meet your specific needs. Contact us for a custom quote.',
              },
              {
                question: 'Are your plans code compliant?',
                answer: 'All our plans are designed to meet current building codes. However, local codes may vary, so we recommend having them reviewed by local authorities.',
              },
              {
                question: 'Do you offer custom design services?',
                answer: 'Absolutely! Our team of licensed architects can create completely custom plans tailored to your specific requirements and site conditions.',
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}