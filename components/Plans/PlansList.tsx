import React from 'react';
import PlanCard from './PlanCard';

// Sample plans data that matches our Homely template structure
const samplePlans = [
  {
    id: '1',
    title: 'Aurora Modern Family Home',
    slug: 'aurora-modern-family-home',
    shortDescription: 'Modern 3-bedroom home with open concept design',
    squareFootage: 2150,
    bedrooms: 3,
    bathrooms: 2.5,
    basePrice: 1299,
    images: [
      {
        cloudinaryUrl: '/images/properties/property1/property1.jpg',
        alt: 'Aurora Modern Family Home'
      }
    ]
  },
  {
    id: '2',
    title: 'Cozy Craftsman Cottage',
    slug: 'cozy-craftsman-cottage',
    shortDescription: 'Charming 2-bedroom cottage with front porch',
    squareFootage: 1450,
    bedrooms: 2,
    bathrooms: 2.0,
    basePrice: 899,
    images: [
      {
        cloudinaryUrl: '/images/properties/property2/property2.jpg',
        alt: 'Cozy Craftsman Cottage'
      }
    ]
  },
  {
    id: '3',
    title: 'Mediterranean Luxury Villa',
    slug: 'mediterranean-luxury-villa',
    shortDescription: 'Elegant 4-bedroom villa with sophisticated design',
    squareFootage: 3850,
    bedrooms: 4,
    bathrooms: 3.5,
    basePrice: 2299,
    images: [
      {
        cloudinaryUrl: '/images/properties/property3/property3.jpg',
        alt: 'Mediterranean Luxury Villa'
      }
    ]
  },
  {
    id: '4',
    title: 'Urban Modern Townhouse',
    slug: 'urban-modern-townhouse',
    shortDescription: 'Sleek 3-bedroom townhouse for urban living',
    squareFootage: 1950,
    bedrooms: 3,
    bathrooms: 2.5,
    basePrice: 1599,
    images: [
      {
        cloudinaryUrl: '/images/properties/property4/property4.jpg',
        alt: 'Urban Modern Townhouse'
      }
    ]
  },
  {
    id: '5',
    title: 'Classic Farmhouse Design',
    slug: 'classic-farmhouse-design',
    shortDescription: 'Beautiful 3-bedroom farmhouse with wrap-around porch',
    squareFootage: 2480,
    bedrooms: 3,
    bathrooms: 2.5,
    basePrice: 1799,
    images: [
      {
        cloudinaryUrl: '/images/properties/property5/property5.jpg',
        alt: 'Classic Farmhouse Design'
      }
    ]
  },
  {
    id: '6',
    title: 'Victorian Mansion Estate',
    slug: 'victorian-mansion-estate',
    shortDescription: 'Elegant 5-bedroom mansion with ornate details',
    squareFootage: 4250,
    bedrooms: 5,
    bathrooms: 4.5,
    basePrice: 2899,
    images: [
      {
        cloudinaryUrl: '/images/properties/property6/property6.jpg',
        alt: 'Victorian Mansion Estate'
      }
    ]
  },
  {
    id: '7',
    title: 'Colonial Revival Classic',
    slug: 'colonial-revival-classic',
    shortDescription: 'Stately 4-bedroom colonial with symmetrical facade',
    squareFootage: 3150,
    bedrooms: 4,
    bathrooms: 3.5,
    basePrice: 1999,
    images: [
      {
        cloudinaryUrl: '/images/properties/property7.jpg',
        alt: 'Colonial Revival Classic'
      }
    ]
  },
  {
    id: '8',
    title: 'Minimalist Urban Loft',
    slug: 'minimalist-urban-loft',
    shortDescription: 'Sleek 2-bedroom loft with contemporary finishes',
    squareFootage: 1680,
    bedrooms: 2,
    bathrooms: 2.0,
    basePrice: 1399,
    images: [
      {
        cloudinaryUrl: '/images/properties/property8.jpg',
        alt: 'Minimalist Urban Loft'
      }
    ]
  },
  {
    id: '9',
    title: 'Smart Home Technology Villa',
    slug: 'smart-home-technology-villa',
    shortDescription: 'Cutting-edge 4-bedroom smart home with technology',
    squareFootage: 2890,
    bedrooms: 4,
    bathrooms: 3.5,
    basePrice: 2199,
    images: [
      {
        cloudinaryUrl: '/images/properties/property9.jpg',
        alt: 'Smart Home Technology Villa'
      }
    ]
  }
];

const PlansList: React.FC = () => {
  return (
    <section className='pt-0!'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
          {samplePlans.map((plan, index) => (
            <div key={plan.id} className=''>
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansList;