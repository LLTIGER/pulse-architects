const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    // Admin details from user requirements
    const adminData = {
      email: 'chicco007@PulseArchitects.com',
      name: 'Kabundji Chicco Mutombo',
      password: 'admin123456', // This should be changed after first login
      role: 'ADMIN'
    }

    console.log('Creating admin user...')

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email }
    })

    if (existingAdmin) {
      console.log('Admin user already exists!')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 12)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminData.email,
        hashedPassword,
        name: adminData.name,
        role: adminData.role,
        profileComplete: true,
        gdprConsent: true,
        gdprConsentDate: new Date()
      }
    })

    // Create admin profile
    await prisma.userProfile.create({
      data: {
        userId: admin.id,
        firstName: 'Kabundji',
        lastName: 'Chicco Mutombo',
        street: '3 Avenue Jacques Prévert',
        city: 'Torcy',
        zipCode: '77200',
        country: 'FR',
        currency: 'EUR',
        language: 'en',
        timezone: 'Europe/Paris',
        phone: '+33612776498'
      }
    })

    console.log('✅ Admin user created successfully!')
    console.log('Email:', adminData.email)
    console.log('Password:', adminData.password)
    console.log('⚠️  Please change the password after first login')

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()