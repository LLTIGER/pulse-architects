"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, FileCheck, Shield, Award, Building, Home, Factory, MapPin, User, Mail, Phone, MessageSquare, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const BuildingPermitsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    buildingType: '',
    certificationType: '',
    projectDescription: '',
    notes: ''
  })

  const certificationsOffered = [
    {
      title: 'Building Permits',
      description: 'Official permits required for new construction, renovations, and structural modifications.',
      includes: ['Construction permits', 'Renovation permits', 'Structural modification permits', 'Zoning compliance verification']
    },
    {
      title: 'Engineering Certificates', 
      description: 'Professional engineering certifications for structural integrity and safety compliance.',
      includes: ['Structural engineering reports', 'Foundation certifications', 'Load-bearing analysis', 'Safety compliance certificates']
    },
    {
      title: 'Regulatory Certifications',
      description: 'All necessary regulatory certifications required by local and national building authorities.',
      includes: ['Fire safety certificates', 'Environmental compliance', 'Accessibility compliance (ADA)', 'Energy efficiency certifications']
    }
  ]

  const buildingTypes = [
    {
      type: 'residential',
      title: 'Residential Buildings',
      icon: Home,
      description: 'Single-family homes, townhouses, condominiums, and multi-family residential properties.',
      certificates: [
        'Residential Building Permit',
        'Occupancy Certificate',
        'Electrical Safety Certificate', 
        'Plumbing Compliance Certificate',
        'Fire Safety Certificate',
        'Energy Efficiency Rating'
      ],
      timeframe: '2-4 weeks',
      price: 'From $299'
    },
    {
      type: 'commercial',
      title: 'Commercial Buildings',
      icon: Building,
      description: 'Office buildings, retail spaces, restaurants, and commercial properties.',
      certificates: [
        'Commercial Building Permit',
        'Business Occupancy Certificate',
        'ADA Compliance Certificate',
        'Fire Safety & Sprinkler Certificate',
        'HVAC System Certificate',
        'Structural Engineering Report'
      ],
      timeframe: '3-6 weeks',
      price: 'From $899'
    },
    {
      type: 'industrial',
      title: 'Industrial Buildings',
      icon: Factory,
      description: 'Manufacturing facilities, warehouses, factories, and industrial complexes.',
      certificates: [
        'Industrial Building Permit',
        'Environmental Impact Certificate',
        'Occupational Safety Certificate',
        'Structural Load Certificate',
        'Utility Infrastructure Certificate',
        'Waste Management Compliance'
      ],
      timeframe: '4-8 weeks',
      price: 'From $1,499'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you! Your certification request has been submitted. We will contact you within 24 hours.')
  }

  return (
    <div className='min-h-screen pt-24 bg-white dark:bg-black'>
      {/* Back Navigation */}
      <div className='container max-w-8xl mx-auto px-5 py-6'>
        <Link 
          href='/services' 
          className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Services
        </Link>
      </div>

      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-dark dark:text-white mb-8 leading-tight'>
            Building Permits &{' '}
            <span className='bg-gradient-to-r from-primary to-skyblue bg-clip-text text-transparent'>
              Certifications
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-dark/60 dark:text-white/60 max-w-4xl mx-auto mb-12'>
            Complete building permit and certification services ensuring full regulatory compliance 
            for residential, commercial, and industrial projects worldwide.
          </p>
          <div className='flex items-center justify-center gap-8 text-sm text-dark/60 dark:text-white/60'>
            <span className='flex items-center gap-2'>
              <Shield className='w-4 h-4' />
              Fully Compliant
            </span>
            <span className='flex items-center gap-2'>
              <Award className='w-4 h-4' />
              Licensed Engineers
            </span>
            <span className='flex items-center gap-2'>
              <Clock className='w-4 h-4' />
              Fast Processing
            </span>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              What We Offer
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              Comprehensive permit and certification services covering all aspects of building compliance, 
              from initial permits to final occupancy certificates.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {certificationsOffered.map((cert, index) => (
              <div key={index} className='bg-gray-50 dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10'>
                <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6'>
                  <FileCheck className='w-8 h-8 text-primary' />
                </div>
                <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                  {cert.title}
                </h3>
                <p className='text-dark/70 dark:text-white/70 mb-6'>
                  {cert.description}
                </p>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-dark dark:text-white mb-3'>Includes:</h4>
                  {cert.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className='flex items-center gap-2 text-sm text-dark/60 dark:text-white/60'>
                      <CheckCircle className='w-4 h-4 text-primary flex-shrink-0' />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Request Form */}
      <section className='py-24 bg-gray-50 dark:bg-dark'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
                Request Certification
              </h2>
              <p className='text-xl text-dark/60 dark:text-white/60'>
                Fill out the form below with your project details, and we'll provide you with a detailed 
                quote and timeline for all required permits and certifications.
              </p>
            </div>

            <div className='bg-white dark:bg-black rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-white/10'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Personal Information */}
                <div>
                  <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                    Personal Information
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                        Full Name *
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                        placeholder='Enter your full name'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                        Email Address *
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                        placeholder='Enter your email address'
                      />
                    </div>
                  </div>
                  <div className='mt-4'>
                    <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                      placeholder='Enter your phone number'
                    />
                  </div>
                </div>

                {/* Project Information */}
                <div>
                  <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
                    Project Information
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                        Project Name *
                      </label>
                      <input
                        type='text'
                        name='projectName'
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                        placeholder='Enter project name'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                        Building Type *
                      </label>
                      <select
                        name='buildingType'
                        value={formData.buildingType}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                      >
                        <option value=''>Select building type</option>
                        <option value='residential'>Residential</option>
                        <option value='commercial'>Commercial</option>
                        <option value='industrial'>Industrial</option>
                        <option value='mixed-use'>Mixed Use</option>
                        <option value='institutional'>Institutional</option>
                      </select>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                    <div>
                      <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                        City *
                      </label>
                      <input
                        type='text'
                        name='city'
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                        placeholder='Enter city'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                        State/Province
                      </label>
                      <input
                        type='text'
                        name='state'
                        value={formData.state}
                        onChange={handleInputChange}
                        className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                        placeholder='Enter state/province'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                        Country *
                      </label>
                      <input
                        type='text'
                        name='country'
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                        placeholder='Enter country'
                      />
                    </div>
                  </div>
                  <div className='mt-4'>
                    <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                      Project Address
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={formData.address}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                      placeholder='Enter complete project address'
                    />
                  </div>
                </div>

                {/* Certification Type */}
                <div>
                  <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                    Type of Certification Required *
                  </label>
                  <select
                    name='certificationType'
                    value={formData.certificationType}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
                  >
                    <option value=''>Select certification type</option>
                    <option value='building-permit'>Building Permit</option>
                    <option value='occupancy-certificate'>Occupancy Certificate</option>
                    <option value='structural-engineering'>Structural Engineering Report</option>
                    <option value='fire-safety'>Fire Safety Certificate</option>
                    <option value='environmental'>Environmental Compliance</option>
                    <option value='ada-compliance'>ADA Compliance</option>
                    <option value='multiple'>Multiple Certifications</option>
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                    Project Description *
                  </label>
                  <textarea
                    name='projectDescription'
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-vertical'
                    placeholder='Describe your project in detail including scope, size, and any special requirements...'
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className='block text-sm font-medium text-dark dark:text-white mb-2'>
                    Additional Notes
                  </label>
                  <textarea
                    name='notes'
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-vertical'
                    placeholder='Any additional information, special requirements, or questions you have...'
                  />
                </div>

                {/* Important Note */}
                <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4'>
                  <div className='flex items-start gap-3'>
                    <AlertCircle className='w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5' />
                    <div>
                      <h4 className='font-semibold text-yellow-800 dark:text-yellow-200 mb-2'>
                        Important Note
                      </h4>
                      <p className='text-sm text-yellow-700 dark:text-yellow-300'>
                        Please provide as much detail as possible about your certification requirements. 
                        The more information you provide, the more accurate our quote and timeline will be. 
                        Our team will review your request and contact you within 24 hours to discuss your 
                        specific needs and provide a detailed proposal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='pt-4'>
                  <button
                    type='submit'
                    className='w-full bg-primary text-white py-4 px-8 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-3'
                  >
                    <Send className='w-5 h-5' />
                    Submit Certification Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Certificates by Building Type */}
      <section className='py-24 bg-white dark:bg-black'>
        <div className='container max-w-8xl mx-auto px-5'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
              Standard Certificates by Building Type
            </h2>
            <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto'>
              We provide different certification packages based on your building type. 
              Each package includes all necessary permits and certificates for regulatory compliance.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {buildingTypes.map((building, index) => {
              const Icon = building.icon
              return (
                <div key={index} className='bg-gray-50 dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 hover:shadow-lg transition-shadow duration-300'>
                  <div className='flex items-center gap-4 mb-6'>
                    <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center'>
                      <Icon className='w-8 h-8 text-primary' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-dark dark:text-white'>
                        {building.title}
                      </h3>
                      <div className='flex items-center gap-4 text-sm text-dark/60 dark:text-white/60 mt-1'>
                        <span className='flex items-center gap-1'>
                          <Clock className='w-4 h-4' />
                          {building.timeframe}
                        </span>
                        <span className='text-primary font-semibold'>
                          {building.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className='text-dark/70 dark:text-white/70 mb-6'>
                    {building.description}
                  </p>

                  <div className='mb-6'>
                    <h4 className='font-semibold text-dark dark:text-white mb-4'>
                      Standard Certificates Included:
                    </h4>
                    <div className='space-y-3'>
                      {building.certificates.map((cert, certIndex) => (
                        <div key={certIndex} className='flex items-center gap-3'>
                          <CheckCircle className='w-4 h-4 text-primary flex-shrink-0' />
                          <span className='text-sm text-dark/70 dark:text-white/70'>
                            {cert}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className='w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors'>
                    Get Quote for {building.title}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-b from-primary/5 via-skyblue/10 to-lightskyblue/5 dark:from-primary/10 dark:via-skyblue/5 dark:to-lightskyblue/10'>
        <div className='container max-w-8xl mx-auto px-5 text-center'>
          <h2 className='text-4xl md:text-52 font-semibold text-dark dark:text-white mb-6'>
            Need Help with Your Permits?
          </h2>
          <p className='text-xl text-dark/60 dark:text-white/60 max-w-3xl mx-auto mb-12'>
            Our certified professionals are here to guide you through the entire permit and 
            certification process. Contact us for expert consultation and support.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact' className='btn-homely-primary'>
              Schedule Consultation
            </Link>
            <Link href='/services' className='btn-homely-secondary'>
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BuildingPermitsPage