import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@pulseArchitects.com' },
    update: {},
    create: {
      email: 'admin@pulseArchitects.com',
      hashedPassword,
      name: 'Admin User',
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
      profileComplete: true,
      gdprConsent: true,
      gdprConsentDate: new Date(),
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          company: 'Pulse Architects',
          profession: 'System Administrator',
          country: 'US',
          currency: 'USD',
          language: 'en',
          timezone: 'UTC',
          marketingEmails: false,
          productUpdates: true,
          newsletter: false,
        }
      }
    },
    include: {
      profile: true
    }
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Create sample architect user
  const architectUser = await prisma.user.upsert({
    where: { email: 'architect@pulseArchitects.com' },
    update: {},
    create: {
      email: 'architect@pulseArchitects.com',
      hashedPassword: await bcrypt.hash('architect123', 12),
      name: 'Jane Architect',
      role: 'ARCHITECT',
      emailVerified: new Date(),
      profileComplete: true,
      gdprConsent: true,
      gdprConsentDate: new Date(),
      profile: {
        create: {
          firstName: 'Jane',
          lastName: 'Architect',
          company: 'Design Studios Inc.',
          profession: 'Licensed Architect',
          yearsExperience: 8,
          specializations: ['Residential', 'Modern Design', 'Sustainable Architecture'],
          country: 'US',
          currency: 'USD',
          language: 'en',
          timezone: 'America/New_York',
        }
      }
    },
    include: {
      profile: true
    }
  })

  console.log('✅ Created architect user:', architectUser.email)

  // Create sample customer user
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      hashedPassword: await bcrypt.hash('customer123', 12),
      name: 'John Customer',
      role: 'CUSTOMER',
      emailVerified: new Date(),
      profileComplete: true,
      gdprConsent: true,
      gdprConsentDate: new Date(),
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Customer',
          profession: 'Home Builder',
          country: 'US',
          currency: 'USD',
          language: 'en',
          timezone: 'America/Los_Angeles',
        }
      }
    },
    include: {
      profile: true
    }
  })

  console.log('✅ Created customer user:', customerUser.email)

  // Create categories
  const residentialCategory = await prisma.category.upsert({
    where: { slug: 'residential' },
    update: {},
    create: {
      name: 'Residential',
      slug: 'residential',
      description: 'Single-family homes, duplexes, and residential buildings',
      icon: 'home',
      metaTitle: 'Residential House Plans | Pulse Architects',
      metaDescription: 'Browse our collection of residential house plans including modern, traditional, and custom designs.',
      isActive: true,
      sortOrder: 1,
    }
  })

  const modernCategory = await prisma.category.upsert({
    where: { slug: 'modern' },
    update: {},
    create: {
      name: 'Modern',
      slug: 'modern',
      description: 'Contemporary and modern architectural designs',
      icon: 'square',
      parentId: residentialCategory.id,
      metaTitle: 'Modern House Plans | Contemporary Designs',
      metaDescription: 'Explore sleek modern house plans with clean lines and contemporary features.',
      isActive: true,
      sortOrder: 1,
    }
  })

  const traditionalCategory = await prisma.category.upsert({
    where: { slug: 'traditional' },
    update: {},
    create: {
      name: 'Traditional',
      slug: 'traditional',
      description: 'Classic and timeless architectural styles',
      icon: 'building',
      parentId: residentialCategory.id,
      metaTitle: 'Traditional House Plans | Classic Designs',
      metaDescription: 'Discover traditional house plans featuring classic architectural elements and timeless appeal.',
      isActive: true,
      sortOrder: 2,
    }
  })

  const commercialCategory = await prisma.category.upsert({
    where: { slug: 'commercial' },
    update: {},
    create: {
      name: 'Commercial',
      slug: 'commercial',
      description: 'Office buildings, retail spaces, and commercial properties',
      icon: 'briefcase',
      metaTitle: 'Commercial Building Plans | Office & Retail Designs',
      metaDescription: 'Professional commercial building plans for offices, retail spaces, and business facilities.',
      isActive: true,
      sortOrder: 2,
    }
  })

  console.log('✅ Created categories')

  // Create sample plans
  const modernFamilyPlan = await prisma.plan.create({
    data: {
      title: 'The Aurora - Modern Family Home',
      slug: 'aurora-modern-family-home',
      description: `A stunning 3-bedroom, 2.5-bathroom modern family home featuring an open-concept living space, chef's kitchen with large island, and master suite with walk-in closet. The design emphasizes natural light with floor-to-ceiling windows and sliding glass doors leading to a covered patio.

      Key Features:
      - Open-concept living, dining, and kitchen
      - Master suite with en-suite bathroom and walk-in closet
      - Two additional bedrooms with shared bathroom
      - Covered patio and outdoor living space
      - Two-car garage
      - Energy-efficient design with sustainable materials`,
      shortDescription: 'A stunning 3-bedroom modern family home with open-concept living and chef\'s kitchen.',
      squareFootage: 2150.0,
      bedrooms: 3,
      bathrooms: 2.5,
      floors: 1,
      garageSpaces: 2,
      lotSize: 8500.0,
      width: 68.0,
      depth: 45.0,
      height: 14.0,
      style: 'MODERN',
      features: [
        'Open concept living',
        'Chef\'s kitchen with island',
        'Master suite with walk-in closet',
        'Covered patio',
        'Two-car garage',
        'Energy efficient windows',
        'Hardwood flooring',
        'Stainless steel appliances'
      ],
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Flat/Low-slope',
      exteriorMaterial: ['Stucco', 'Stone accent', 'Metal panels'],
      basePrice: 1299.00,
      pricePerSqFt: 0.6047,
      licenseOptions: {
        single: 1299.00,
        commercial: 2599.00,
        unlimited: 4299.00
      },
      metaTitle: 'The Aurora Modern Family Home Plan - 3BR/2.5BA',
      metaDescription: 'Download The Aurora modern family home plan featuring 3 bedrooms, 2.5 bathrooms, and 2,150 sq ft of contemporary living space.',
      tags: ['modern', 'family home', 'open concept', 'single story', 'energy efficient'],
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: modernCategory.id,
      publishedAt: new Date(),
    }
  })

  const craftmanCottagePlan = await prisma.plan.create({
    data: {
      title: 'Cozy Craftsman Cottage',
      slug: 'cozy-craftsman-cottage',
      description: `A charming 2-bedroom, 2-bathroom Craftsman-style cottage perfect for couples or small families. This home features classic Craftsman details including exposed beams, built-in cabinetry, and a welcoming front porch.

      Design Highlights:
      - Classic Craftsman architectural details
      - Welcoming front porch with columns
      - Open living and dining area
      - Efficient kitchen with breakfast nook
      - Master bedroom with en-suite bathroom
      - Guest bedroom and full bathroom
      - Laundry room and storage areas`,
      shortDescription: 'A charming 2-bedroom Craftsman cottage with classic details and welcoming front porch.',
      squareFootage: 1450.0,
      bedrooms: 2,
      bathrooms: 2.0,
      floors: 1,
      garageSpaces: 1,
      lotSize: 6000.0,
      width: 48.0,
      depth: 36.0,
      height: 16.0,
      style: 'CRAFTSMAN',
      features: [
        'Front porch with columns',
        'Exposed ceiling beams',
        'Built-in cabinetry',
        'Breakfast nook',
        'Master en-suite',
        'Laundry room',
        'Single car garage'
      ],
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Gable',
      exteriorMaterial: ['Wood siding', 'Stone foundation', 'Composite shingles'],
      basePrice: 899.00,
      pricePerSqFt: 0.6200,
      licenseOptions: {
        single: 899.00,
        commercial: 1799.00,
        unlimited: 2999.00
      },
      metaTitle: 'Cozy Craftsman Cottage Plan - 2BR/2BA',
      metaDescription: 'Download this charming Craftsman cottage plan with 2 bedrooms, 2 bathrooms, and 1,450 sq ft of classic design.',
      tags: ['craftsman', 'cottage', 'small home', 'front porch', 'traditional'],
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: traditionalCategory.id,
      publishedAt: new Date(),
    }
  })

  console.log('✅ Created sample plans')

  // Create sample plan files
  await prisma.planFile.createMany({
    data: [
      // Aurora Modern Home files
      {
        planId: modernFamilyPlan.id,
        filename: 'aurora_floor_plan.pdf',
        originalName: 'Aurora Floor Plan.pdf',
        fileType: 'FLOOR_PLAN',
        fileFormat: 'pdf',
        fileSize: BigInt(2458000),
        cloudinaryUrl: 'https://res.cloudinary.com/sample/pdf/aurora_floor_plan.pdf',
        publicId: 'plans/aurora_floor_plan',
        secureUrl: 'https://res.cloudinary.com/sample/pdf/aurora_floor_plan.pdf',
        description: 'Main floor plan showing layout and dimensions',
        version: '1.0',
        scale: '1/4" = 1\'',
        units: 'feet',
        sortOrder: 1,
        isPreview: true,
      },
      {
        planId: modernFamilyPlan.id,
        filename: 'aurora_elevations.pdf',
        originalName: 'Aurora Elevations.pdf',
        fileType: 'ELEVATION',
        fileFormat: 'pdf',
        fileSize: BigInt(3200000),
        cloudinaryUrl: 'https://res.cloudinary.com/sample/pdf/aurora_elevations.pdf',
        publicId: 'plans/aurora_elevations',
        secureUrl: 'https://res.cloudinary.com/sample/pdf/aurora_elevations.pdf',
        description: 'Front, rear, and side elevations',
        version: '1.0',
        scale: '1/4" = 1\'',
        units: 'feet',
        sortOrder: 2,
      },
      {
        planId: modernFamilyPlan.id,
        filename: 'aurora_foundation.dwg',
        originalName: 'Aurora Foundation Plan.dwg',
        fileType: 'FOUNDATION',
        fileFormat: 'dwg',
        fileSize: BigInt(1800000),
        cloudinaryUrl: 'https://res.cloudinary.com/sample/dwg/aurora_foundation.dwg',
        publicId: 'plans/aurora_foundation',
        secureUrl: 'https://res.cloudinary.com/sample/dwg/aurora_foundation.dwg',
        description: 'Foundation plan with structural details',
        version: '1.0',
        scale: '1/4" = 1\'',
        units: 'feet',
        sortOrder: 3,
      },
      // Craftsman Cottage files
      {
        planId: craftmanCottagePlan.id,
        filename: 'cottage_floor_plan.pdf',
        originalName: 'Craftsman Cottage Floor Plan.pdf',
        fileType: 'FLOOR_PLAN',
        fileFormat: 'pdf',
        fileSize: BigInt(1900000),
        cloudinaryUrl: 'https://res.cloudinary.com/sample/pdf/cottage_floor_plan.pdf',
        publicId: 'plans/cottage_floor_plan',
        secureUrl: 'https://res.cloudinary.com/sample/pdf/cottage_floor_plan.pdf',
        description: 'Complete floor plan with room layouts',
        version: '1.0',
        scale: '1/4" = 1\'',
        units: 'feet',
        sortOrder: 1,
        isPreview: true,
      },
    ]
  })

  console.log('✅ Created sample plan files')

  // Create sample plan images
  await prisma.planImage.createMany({
    data: [
      // Aurora Modern Home images
      {
        planId: modernFamilyPlan.id,
        filename: 'aurora_front_exterior.jpg',
        alt: 'Aurora Modern Home - Front Exterior View',
        imageType: 'EXTERIOR_FRONT',
        cloudinaryUrl: 'https://res.cloudinary.com/sample/image/aurora_front_exterior.jpg',
        publicId: 'plans/aurora_front_exterior',
        width: 1920,
        height: 1080,
        thumbnailUrl: 'https://res.cloudinary.com/sample/image/aurora_front_exterior/c_thumb,w_300,h_200',
        mediumUrl: 'https://res.cloudinary.com/sample/image/aurora_front_exterior/c_fit,w_800,h_600',
        largeUrl: 'https://res.cloudinary.com/sample/image/aurora_front_exterior/c_fit,w_1920,h_1080',
        sortOrder: 1,
        isPrimary: true,
      },
      {
        planId: modernFamilyPlan.id,
        filename: 'aurora_kitchen_interior.jpg',
        alt: 'Aurora Modern Home - Kitchen Interior',
        imageType: 'INTERIOR_KITCHEN',
        cloudinaryUrl: 'https://res.cloudinary.com/sample/image/aurora_kitchen_interior.jpg',
        publicId: 'plans/aurora_kitchen_interior',
        width: 1920,
        height: 1280,
        thumbnailUrl: 'https://res.cloudinary.com/sample/image/aurora_kitchen_interior/c_thumb,w_300,h_200',
        mediumUrl: 'https://res.cloudinary.com/sample/image/aurora_kitchen_interior/c_fit,w_800,h_600',
        largeUrl: 'https://res.cloudinary.com/sample/image/aurora_kitchen_interior/c_fit,w_1920,h_1280',
        sortOrder: 2,
        isPrimary: false,
      },
      // Craftsman Cottage images
      {
        planId: craftmanCottagePlan.id,
        filename: 'cottage_front_exterior.jpg',
        alt: 'Craftsman Cottage - Front Exterior with Porch',
        imageType: 'EXTERIOR_FRONT',
        cloudinaryUrl: 'https://res.cloudinary.com/sample/image/cottage_front_exterior.jpg',
        publicId: 'plans/cottage_front_exterior',
        width: 1920,
        height: 1080,
        thumbnailUrl: 'https://res.cloudinary.com/sample/image/cottage_front_exterior/c_thumb,w_300,h_200',
        mediumUrl: 'https://res.cloudinary.com/sample/image/cottage_front_exterior/c_fit,w_800,h_600',
        largeUrl: 'https://res.cloudinary.com/sample/image/cottage_front_exterior/c_fit,w_1920,h_1080',
        sortOrder: 1,
        isPrimary: true,
      },
    ]
  })

  console.log('✅ Created sample plan images')

  // Create system configuration
  await prisma.systemConfig.createMany({
    data: [
      {
        key: 'site_name',
        value: { value: 'Pulse Architects' },
        description: 'Site name displayed in headers and titles',
        category: 'general',
        isPublic: true,
      },
      {
        key: 'site_description',
        value: { value: 'Premium architectural plans and house designs for modern living' },
        description: 'Site description for SEO and marketing',
        category: 'general',
        isPublic: true,
      },
      {
        key: 'featured_plans_count',
        value: { value: 8 },
        description: 'Number of featured plans to show on homepage',
        category: 'display',
        isPublic: true,
      },
      {
        key: 'max_file_upload_size',
        value: { value: 52428800 },
        description: 'Maximum file upload size in bytes (50MB)',
        category: 'uploads',
        isPublic: false,
      },
      {
        key: 'allowed_file_types',
        value: { 
          images: ['jpg', 'jpeg', 'png', 'webp'],
          documents: ['pdf', 'dwg', 'dxf', 'skp', 'rvt'],
          archives: ['zip', 'rar']
        },
        description: 'Allowed file types for uploads',
        category: 'uploads',
        isPublic: false,
      },
      {
        key: 'email_notifications',
        value: {
          new_order: true,
          order_completed: true,
          custom_request: true,
          plan_approved: true
        },
        description: 'Email notification settings',
        category: 'notifications',
        isPublic: false,
      },
    ]
  })

  console.log('✅ Created system configuration')

  // Update plan statistics
  await prisma.plan.update({
    where: { id: modernFamilyPlan.id },
    data: {
      viewCount: 125,
      downloadCount: 8,
      favoriteCount: 12,
      averageRating: 4.8,
      reviewCount: 5,
    }
  })

  await prisma.plan.update({
    where: { id: craftmanCottagePlan.id },
    data: {
      viewCount: 89,
      downloadCount: 6,
      favoriteCount: 7,
      averageRating: 4.6,
      reviewCount: 3,
    }
  })

  console.log('✅ Updated plan statistics')

  console.log('🎉 Database seed completed successfully!')
  console.log('')
  console.log('Test Users Created:')
  console.log('- Admin: admin@pulseArchitects.com / admin123')
  console.log('- Architect: architect@pulseArchitects.com / architect123')
  console.log('- Customer: customer@example.com / customer123')
  console.log('')
  console.log('Sample Data:')
  console.log('- 4 Categories (Residential, Modern, Traditional, Commercial)')
  console.log('- 2 Featured Plans (Aurora Modern Home, Craftsman Cottage)')
  console.log('- Plan files and images')
  console.log('- System configuration')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })