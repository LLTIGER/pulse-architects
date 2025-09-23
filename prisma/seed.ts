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

  await prisma.category.upsert({
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
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Flat/Low-slope',
      basePrice: 1299.00,
      pricePerSqFt: 0.6047,
      singleLicensePrice: 1299.00,
      commercialLicensePrice: 2599.00,
      unlimitedLicensePrice: 4299.00,
      metaTitle: 'The Aurora Modern Family Home Plan - 3BR/2.5BA',
      metaDescription: 'Download The Aurora modern family home plan featuring 3 bedrooms, 2.5 bathrooms, and 2,150 sq ft of contemporary living space.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: modernCategory.id,
      publishedAt: new Date(),
    }
  })

  // Add tags for the modern family plan
  await prisma.planTag.createMany({
    data: [
      { planId: modernFamilyPlan.id, tag: 'modern' },
      { planId: modernFamilyPlan.id, tag: 'family home' },
      { planId: modernFamilyPlan.id, tag: 'open concept' },
      { planId: modernFamilyPlan.id, tag: 'single story' },
      { planId: modernFamilyPlan.id, tag: 'energy efficient' },
    ]
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
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Gable',
      basePrice: 899.00,
      pricePerSqFt: 0.6200,
      singleLicensePrice: 899.00,
      commercialLicensePrice: 1799.00,
      unlimitedLicensePrice: 2999.00,
      metaTitle: 'Cozy Craftsman Cottage Plan - 2BR/2BA',
      metaDescription: 'Download this charming Craftsman cottage plan with 2 bedrooms, 2 bathrooms, and 1,450 sq ft of classic design.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: traditionalCategory.id,
      publishedAt: new Date(),
    }
  })

  // Add tags for the craftsman cottage
  await prisma.planTag.createMany({
    data: [
      { planId: craftmanCottagePlan.id, tag: 'craftsman' },
      { planId: craftmanCottagePlan.id, tag: 'cottage' },
      { planId: craftmanCottagePlan.id, tag: 'small home' },
      { planId: craftmanCottagePlan.id, tag: 'front porch' },
      { planId: craftmanCottagePlan.id, tag: 'traditional' },
    ]
  })

  // Create additional sample plans
  const luxuryVillaPlan = await prisma.plan.create({
    data: {
      title: 'Mediterranean Luxury Villa',
      slug: 'mediterranean-luxury-villa',
      description: `An elegant 4-bedroom, 3.5-bathroom Mediterranean-style luxury villa featuring sophisticated design elements, spacious living areas, and premium finishes throughout.

      Luxury Features:
      - Grand foyer with marble flooring
      - Gourmet kitchen with premium appliances
      - Master suite with spa-like bathroom
      - Three additional bedrooms with en-suite bathrooms
      - Formal dining room and living room
      - Family room with fireplace
      - Three-car garage
      - Outdoor entertainment area with pool deck`,
      shortDescription: 'An elegant 4-bedroom Mediterranean luxury villa with sophisticated design and premium finishes.',
      squareFootage: 3850.0,
      bedrooms: 4,
      bathrooms: 3.5,
      floors: 2,
      garageSpaces: 3,
      lotSize: 12000.0,
      width: 85.0,
      depth: 65.0,
      height: 28.0,
      style: 'MEDITERRANEAN',
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Tile/Clay',
      basePrice: 2299.00,
      pricePerSqFt: 0.597,
      singleLicensePrice: 2299.00,
      commercialLicensePrice: 4599.00,
      unlimitedLicensePrice: 7699.00,
      metaTitle: 'Mediterranean Luxury Villa Plan - 4BR/3.5BA',
      metaDescription: 'Download this elegant Mediterranean luxury villa plan with 4 bedrooms, 3.5 bathrooms, and 3,850 sq ft of sophisticated living space.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: residentialCategory.id,
      publishedAt: new Date(),
    }
  })

  const modernTownhousePlan = await prisma.plan.create({
    data: {
      title: 'Urban Modern Townhouse',
      slug: 'urban-modern-townhouse',
      description: `A sleek 3-bedroom, 2.5-bathroom modern townhouse designed for urban living. Features contemporary design with efficient use of space and natural light.

      Modern Design Elements:
      - Open-concept main floor
      - Large windows for natural light
      - Modern kitchen with island
      - Master bedroom with walk-in closet
      - Two additional bedrooms
      - Rooftop deck access
      - Attached garage
      - Energy-efficient systems`,
      shortDescription: 'A sleek 3-bedroom modern townhouse designed for efficient urban living.',
      squareFootage: 1950.0,
      bedrooms: 3,
      bathrooms: 2.5,
      floors: 3,
      garageSpaces: 1,
      lotSize: 2800.0,
      width: 25.0,
      depth: 45.0,
      height: 35.0,
      style: 'CONTEMPORARY',
      buildingType: 'RESIDENTIAL_TOWNHOUSE',
      roofType: 'Flat/Low-slope',
      basePrice: 1599.00,
      pricePerSqFt: 0.820,
      singleLicensePrice: 1599.00,
      commercialLicensePrice: 3199.00,
      unlimitedLicensePrice: 5299.00,
      metaTitle: 'Urban Modern Townhouse Plan - 3BR/2.5BA',
      metaDescription: 'Download this sleek modern townhouse plan with 3 bedrooms, 2.5 bathrooms, and 1,950 sq ft of contemporary urban living.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: modernCategory.id,
      publishedAt: new Date(),
    }
  })

  // Add tags for the new plans
  await prisma.planTag.createMany({
    data: [
      { planId: luxuryVillaPlan.id, tag: 'luxury' },
      { planId: luxuryVillaPlan.id, tag: 'mediterranean' },
      { planId: luxuryVillaPlan.id, tag: 'villa' },
      { planId: luxuryVillaPlan.id, tag: 'two story' },
      { planId: luxuryVillaPlan.id, tag: 'swimming pool' },
      { planId: modernTownhousePlan.id, tag: 'townhouse' },
      { planId: modernTownhousePlan.id, tag: 'urban' },
      { planId: modernTownhousePlan.id, tag: 'contemporary' },
      { planId: modernTownhousePlan.id, tag: 'compact' },
      { planId: modernTownhousePlan.id, tag: 'rooftop deck' },
    ]
  })

  // Create additional plans to ensure we have at least 5 per category
  const farmhousePlan = await prisma.plan.create({
    data: {
      title: 'Classic Farmhouse Design',
      slug: 'classic-farmhouse-design',
      description: `A beautiful 3-bedroom, 2.5-bathroom farmhouse featuring wrap-around porch, shiplap siding, and traditional charm with modern conveniences.

      Farmhouse Features:
      - Wrap-around front porch
      - Open concept kitchen and living
      - Farmhouse kitchen with island
      - Master suite on main floor
      - Two bedrooms upstairs
      - Mudroom and pantry
      - Traditional detailing throughout`,
      shortDescription: 'A beautiful 3-bedroom farmhouse with wrap-around porch and traditional charm.',
      squareFootage: 2480.0,
      bedrooms: 3,
      bathrooms: 2.5,
      floors: 2,
      garageSpaces: 2,
      lotSize: 8500.0,
      width: 62.0,
      depth: 48.0,
      height: 24.0,
      style: 'FARMHOUSE',
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Gable',
      basePrice: 1799.00,
      pricePerSqFt: 0.725,
      singleLicensePrice: 1799.00,
      commercialLicensePrice: 3599.00,
      unlimitedLicensePrice: 5999.00,
      metaTitle: 'Classic Farmhouse Design Plan - 3BR/2.5BA',
      metaDescription: 'Download this classic farmhouse plan with 3 bedrooms, 2.5 bathrooms, and 2,480 sq ft of traditional charm.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: traditionalCategory.id,
      publishedAt: new Date(),
    }
  })

  const victorianMansion = await prisma.plan.create({
    data: {
      title: 'Victorian Mansion Estate',
      slug: 'victorian-mansion-estate',
      description: `An elegant 5-bedroom, 4.5-bathroom Victorian mansion featuring ornate details, bay windows, and timeless architectural elements.

      Victorian Features:
      - Ornate exterior detailing
      - Grand entry foyer
      - Formal parlor and dining
      - Gourmet kitchen with butler's pantry
      - Master suite with sitting area
      - Four additional bedrooms
      - Multiple fireplaces
      - Wraparound porch`,
      shortDescription: 'An elegant 5-bedroom Victorian mansion with ornate details and timeless charm.',
      squareFootage: 4250.0,
      bedrooms: 5,
      bathrooms: 4.5,
      floors: 3,
      garageSpaces: 3,
      lotSize: 15000.0,
      width: 75.0,
      depth: 68.0,
      height: 38.0,
      style: 'VICTORIAN',
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Complex/Multiple',
      basePrice: 2899.00,
      pricePerSqFt: 0.682,
      singleLicensePrice: 2899.00,
      commercialLicensePrice: 5799.00,
      unlimitedLicensePrice: 9699.00,
      metaTitle: 'Victorian Mansion Estate Plan - 5BR/4.5BA',
      metaDescription: 'Download this elegant Victorian mansion plan with 5 bedrooms, 4.5 bathrooms, and 4,250 sq ft of timeless design.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: traditionalCategory.id,
      publishedAt: new Date(),
    }
  })

  const colonialRevival = await prisma.plan.create({
    data: {
      title: 'Colonial Revival Classic',
      slug: 'colonial-revival-classic',
      description: `A stately 4-bedroom, 3.5-bathroom Colonial Revival featuring symmetrical facade, columns, and traditional American architecture.

      Colonial Features:
      - Symmetrical facade design
      - Grand center hall entry
      - Formal living and dining rooms
      - Family room with fireplace
      - Gourmet kitchen with breakfast room
      - Master suite with walk-in closet
      - Three additional bedrooms
      - Two-car attached garage`,
      shortDescription: 'A stately 4-bedroom Colonial Revival with symmetrical facade and traditional design.',
      squareFootage: 3150.0,
      bedrooms: 4,
      bathrooms: 3.5,
      floors: 2,
      garageSpaces: 2,
      lotSize: 10000.0,
      width: 68.0,
      depth: 52.0,
      height: 26.0,
      style: 'COLONIAL',
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Gable',
      basePrice: 1999.00,
      pricePerSqFt: 0.635,
      singleLicensePrice: 1999.00,
      commercialLicensePrice: 3999.00,
      unlimitedLicensePrice: 6699.00,
      metaTitle: 'Colonial Revival Classic Plan - 4BR/3.5BA',
      metaDescription: 'Download this stately Colonial Revival plan with 4 bedrooms, 3.5 bathrooms, and 3,150 sq ft of traditional American design.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: traditionalCategory.id,
      publishedAt: new Date(),
    }
  })

  const minimalistLoft = await prisma.plan.create({
    data: {
      title: 'Minimalist Urban Loft',
      slug: 'minimalist-urban-loft',
      description: `A sleek 2-bedroom, 2-bathroom minimalist loft featuring open spaces, floor-to-ceiling windows, and contemporary finishes.

      Minimalist Features:
      - Open concept living space
      - Floor-to-ceiling windows
      - Polished concrete floors
      - Modern kitchen with waterfall island
      - Master loft bedroom
      - Guest bedroom with en-suite
      - Industrial-modern aesthetic
      - Rooftop terrace access`,
      shortDescription: 'A sleek 2-bedroom minimalist loft with open spaces and contemporary finishes.',
      squareFootage: 1680.0,
      bedrooms: 2,
      bathrooms: 2.0,
      floors: 2,
      garageSpaces: 1,
      lotSize: 2200.0,
      width: 32.0,
      depth: 42.0,
      height: 22.0,
      style: 'MINIMALIST',
      buildingType: 'RESIDENTIAL_LOFT',
      roofType: 'Flat/Low-slope',
      basePrice: 1399.00,
      pricePerSqFt: 0.833,
      singleLicensePrice: 1399.00,
      commercialLicensePrice: 2799.00,
      unlimitedLicensePrice: 4699.00,
      metaTitle: 'Minimalist Urban Loft Plan - 2BR/2BA',
      metaDescription: 'Download this sleek minimalist loft plan with 2 bedrooms, 2 bathrooms, and 1,680 sq ft of contemporary living.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: modernCategory.id,
      publishedAt: new Date(),
    }
  })

  const smartHomePlan = await prisma.plan.create({
    data: {
      title: 'Smart Home Technology Villa',
      slug: 'smart-home-technology-villa',
      description: `A cutting-edge 4-bedroom, 3.5-bathroom smart home featuring integrated technology, sustainable systems, and modern automation.

      Smart Home Features:
      - Fully integrated home automation
      - Smart lighting and climate control
      - Solar panel ready roof
      - Electric vehicle charging station
      - Smart security system
      - Energy-efficient appliances
      - Sustainable building materials
      - Modern open floor plan`,
      shortDescription: 'A cutting-edge 4-bedroom smart home with integrated technology and sustainable systems.',
      squareFootage: 2890.0,
      bedrooms: 4,
      bathrooms: 3.5,
      floors: 2,
      garageSpaces: 3,
      lotSize: 9200.0,
      width: 72.0,
      depth: 58.0,
      height: 28.0,
      style: 'CONTEMPORARY',
      buildingType: 'RESIDENTIAL_SINGLE_FAMILY',
      roofType: 'Flat/Low-slope',
      basePrice: 2199.00,
      pricePerSqFt: 0.761,
      singleLicensePrice: 2199.00,
      commercialLicensePrice: 4399.00,
      unlimitedLicensePrice: 7399.00,
      metaTitle: 'Smart Home Technology Villa Plan - 4BR/3.5BA',
      metaDescription: 'Download this cutting-edge smart home plan with 4 bedrooms, 3.5 bathrooms, and 2,890 sq ft of modern technology.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: modernCategory.id,
      publishedAt: new Date(),
    }
  })

  const commercialOffice = await prisma.plan.create({
    data: {
      title: 'Modern Office Complex',
      slug: 'modern-office-complex',
      description: `A contemporary 2-story office building designed for efficiency and employee well-being, featuring flexible workspace layouts and sustainable design.

      Commercial Features:
      - Open office floor plans
      - Private meeting rooms
      - Break room and kitchen facilities
      - Reception and waiting area
      - IT server room
      - Sustainable HVAC systems
      - Large windows for natural light
      - Parking for 50 vehicles`,
      shortDescription: 'A contemporary 2-story office building with flexible workspace layouts.',
      squareFootage: 8500.0,
      bedrooms: 0,
      bathrooms: 8.0,
      floors: 2,
      garageSpaces: 50,
      lotSize: 25000.0,
      width: 120.0,
      depth: 85.0,
      height: 32.0,
      style: 'CONTEMPORARY',
      buildingType: 'COMMERCIAL_OFFICE',
      roofType: 'Flat/Low-slope',
      basePrice: 4999.00,
      pricePerSqFt: 0.588,
      singleLicensePrice: 4999.00,
      commercialLicensePrice: 9999.00,
      unlimitedLicensePrice: 16999.00,
      metaTitle: 'Modern Office Complex Plan - 8,500 Sq Ft',
      metaDescription: 'Download this contemporary office building plan with 8,500 sq ft of flexible workspace design.',
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: commercialCategory.id,
      publishedAt: new Date(),
    }
  })

  // Add tags for the new plans
  await prisma.planTag.createMany({
    data: [
      { planId: farmhousePlan.id, tag: 'farmhouse' },
      { planId: farmhousePlan.id, tag: 'wrap-around porch' },
      { planId: farmhousePlan.id, tag: 'traditional' },
      { planId: farmhousePlan.id, tag: 'shiplap' },
      { planId: farmhousePlan.id, tag: 'mudroom' },
      { planId: victorianMansion.id, tag: 'victorian' },
      { planId: victorianMansion.id, tag: 'mansion' },
      { planId: victorianMansion.id, tag: 'ornate' },
      { planId: victorianMansion.id, tag: 'bay windows' },
      { planId: victorianMansion.id, tag: 'luxury' },
      { planId: colonialRevival.id, tag: 'colonial' },
      { planId: colonialRevival.id, tag: 'symmetrical' },
      { planId: colonialRevival.id, tag: 'traditional' },
      { planId: colonialRevival.id, tag: 'formal' },
      { planId: colonialRevival.id, tag: 'center hall' },
      { planId: minimalistLoft.id, tag: 'minimalist' },
      { planId: minimalistLoft.id, tag: 'loft' },
      { planId: minimalistLoft.id, tag: 'urban' },
      { planId: minimalistLoft.id, tag: 'contemporary' },
      { planId: minimalistLoft.id, tag: 'industrial' },
      { planId: smartHomePlan.id, tag: 'smart home' },
      { planId: smartHomePlan.id, tag: 'technology' },
      { planId: smartHomePlan.id, tag: 'sustainable' },
      { planId: smartHomePlan.id, tag: 'automation' },
      { planId: smartHomePlan.id, tag: 'solar ready' },
      { planId: commercialOffice.id, tag: 'commercial' },
      { planId: commercialOffice.id, tag: 'office' },
      { planId: commercialOffice.id, tag: 'flexible workspace' },
      { planId: commercialOffice.id, tag: 'sustainable' },
      { planId: commercialOffice.id, tag: 'modern' },
    ]
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
        fileSize: 2458000,
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
        fileSize: 3200000,
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
        fileSize: 1800000,
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
        fileSize: 1900000,
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

  // Create sample plan images using template property images
  await prisma.planImage.createMany({
    data: [
      // Aurora Modern Home images - using property1 from template
      {
        planId: modernFamilyPlan.id,
        filename: 'property1.jpg',
        alt: 'Aurora Modern Home - Front Exterior View',
        imageType: 'EXTERIOR_FRONT',
        cloudinaryUrl: '/images/properties/property1/property1.jpg',
        publicId: 'plans/property1',
        width: 1920,
        height: 1080,
        thumbnailUrl: '/images/properties/property1/property1.jpg',
        mediumUrl: '/images/properties/property1/property1.jpg',
        largeUrl: '/images/properties/property1/property1.jpg',
        sortOrder: 1,
        isPrimary: true,
      },
      {
        planId: modernFamilyPlan.id,
        filename: 'image-2.jpg',
        alt: 'Aurora Modern Home - Interior View',
        imageType: 'INTERIOR_KITCHEN',
        cloudinaryUrl: '/images/properties/property1/image-2.jpg',
        publicId: 'plans/property1_interior_2',
        width: 1920,
        height: 1280,
        thumbnailUrl: '/images/properties/property1/image-2.jpg',
        mediumUrl: '/images/properties/property1/image-2.jpg',
        largeUrl: '/images/properties/property1/image-2.jpg',
        sortOrder: 2,
        isPrimary: false,
      },
      {
        planId: modernFamilyPlan.id,
        filename: 'image-3.jpg',
        alt: 'Aurora Modern Home - Living Area',
        imageType: 'INTERIOR_LIVING',
        cloudinaryUrl: '/images/properties/property1/image-3.jpg',
        publicId: 'plans/property1_interior_3',
        width: 1920,
        height: 1280,
        thumbnailUrl: '/images/properties/property1/image-3.jpg',
        mediumUrl: '/images/properties/property1/image-3.jpg',
        largeUrl: '/images/properties/property1/image-3.jpg',
        sortOrder: 3,
        isPrimary: false,
      },
      // Craftsman Cottage images - using property2 from template
      {
        planId: craftmanCottagePlan.id,
        filename: 'property2.jpg',
        alt: 'Craftsman Cottage - Front Exterior with Porch',
        imageType: 'EXTERIOR_FRONT',
        cloudinaryUrl: '/images/properties/property2/property2.jpg',
        publicId: 'plans/property2',
        width: 1920,
        height: 1080,
        thumbnailUrl: '/images/properties/property2/property2.jpg',
        mediumUrl: '/images/properties/property2/property2.jpg',
        largeUrl: '/images/properties/property2/property2.jpg',
        sortOrder: 1,
        isPrimary: true,
      },
      {
        planId: craftmanCottagePlan.id,
        filename: 'image-2.jpg',
        alt: 'Craftsman Cottage - Interior View',
        imageType: 'INTERIOR_LIVING',
        cloudinaryUrl: '/images/properties/property2/image-2.jpg',
        publicId: 'plans/property2_interior_2',
        width: 1920,
        height: 1280,
        thumbnailUrl: '/images/properties/property2/image-2.jpg',
        mediumUrl: '/images/properties/property2/image-2.jpg',
        largeUrl: '/images/properties/property2/image-2.jpg',
        sortOrder: 2,
        isPrimary: false,
      },
      // Mediterranean Luxury Villa images - using property3 from template
      {
        planId: luxuryVillaPlan.id,
        filename: 'property3.jpg',
        alt: 'Mediterranean Luxury Villa - Front Exterior View',
        imageType: 'EXTERIOR_FRONT',
        cloudinaryUrl: '/images/properties/property3/property3.jpg',
        publicId: 'plans/property3',
        width: 1920,
        height: 1080,
        thumbnailUrl: '/images/properties/property3/property3.jpg',
        mediumUrl: '/images/properties/property3/property3.jpg',
        largeUrl: '/images/properties/property3/property3.jpg',
        sortOrder: 1,
        isPrimary: true,
      },
      {
        planId: luxuryVillaPlan.id,
        filename: 'image-2.jpg',
        alt: 'Mediterranean Luxury Villa - Interior Living Area',
        imageType: 'INTERIOR_LIVING',
        cloudinaryUrl: '/images/properties/property3/image-2.jpg',
        publicId: 'plans/property3_interior_2',
        width: 1920,
        height: 1280,
        thumbnailUrl: '/images/properties/property3/image-2.jpg',
        mediumUrl: '/images/properties/property3/image-2.jpg',
        largeUrl: '/images/properties/property3/image-2.jpg',
        sortOrder: 2,
        isPrimary: false,
      },
      // Urban Modern Townhouse images - using property4 from template
      {
        planId: modernTownhousePlan.id,
        filename: 'property4.jpg',
        alt: 'Urban Modern Townhouse - Front Exterior View',
        imageType: 'EXTERIOR_FRONT',
        cloudinaryUrl: '/images/properties/property4/property4.jpg',
        publicId: 'plans/property4',
        width: 1920,
        height: 1080,
        thumbnailUrl: '/images/properties/property4/property4.jpg',
        mediumUrl: '/images/properties/property4/property4.jpg',
        largeUrl: '/images/properties/property4/property4.jpg',
        sortOrder: 1,
        isPrimary: true,
      },
      {
        planId: modernTownhousePlan.id,
        filename: 'image-3.jpg',
        alt: 'Urban Modern Townhouse - Modern Interior',
        imageType: 'INTERIOR_KITCHEN',
        cloudinaryUrl: '/images/properties/property4/image-3.jpg',
        publicId: 'plans/property4_interior_3',
        width: 1920,
        height: 1280,
        thumbnailUrl: '/images/properties/property4/image-3.jpg',
        mediumUrl: '/images/properties/property4/image-3.jpg',
        largeUrl: '/images/properties/property4/image-3.jpg',
        sortOrder: 2,
        isPrimary: false,
      },
    ]
  })

  console.log('✅ Created sample plan images')

  // Create system configuration
  await prisma.systemConfig.createMany({
    data: [
      {
        key: 'site_name',
        value: JSON.stringify({ value: 'Pulse Architects' }),
        description: 'Site name displayed in headers and titles',
        category: 'general',
        isPublic: true,
      },
      {
        key: 'site_description',
        value: JSON.stringify({ value: 'Premium architectural plans and house designs for modern living' }),
        description: 'Site description for SEO and marketing',
        category: 'general',
        isPublic: true,
      },
      {
        key: 'featured_plans_count',
        value: JSON.stringify({ value: 8 }),
        description: 'Number of featured plans to show on homepage',
        category: 'display',
        isPublic: true,
      },
      {
        key: 'max_file_upload_size',
        value: JSON.stringify({ value: 52428800 }),
        description: 'Maximum file upload size in bytes (50MB)',
        category: 'uploads',
        isPublic: false,
      },
      {
        key: 'allowed_file_types',
        value: JSON.stringify({ 
          images: ['jpg', 'jpeg', 'png', 'webp'],
          documents: ['pdf', 'dwg', 'dxf', 'skp', 'rvt'],
          archives: ['zip', 'rar']
        }),
        description: 'Allowed file types for uploads',
        category: 'uploads',
        isPublic: false,
      },
      {
        key: 'email_notifications',
        value: JSON.stringify({
          new_order: true,
          order_completed: true,
          custom_request: true,
          plan_approved: true
        }),
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

  await prisma.plan.update({
    where: { id: luxuryVillaPlan.id },
    data: {
      viewCount: 156,
      downloadCount: 12,
      favoriteCount: 18,
      averageRating: 4.9,
      reviewCount: 8,
    }
  })

  await prisma.plan.update({
    where: { id: modernTownhousePlan.id },
    data: {
      viewCount: 73,
      downloadCount: 4,
      favoriteCount: 5,
      averageRating: 4.4,
      reviewCount: 2,
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