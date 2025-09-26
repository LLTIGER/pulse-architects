'use client'

import React, { useState, useEffect } from 'react';
import PlanCard from './PlanCard';

interface PlanData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  images: {
    thumbnail: string;
    fullSize: string;
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    floors: number;
    garage: boolean;
    style: string;
  };
  price: string;
  isPremium: boolean;
  isNew: boolean;
  downloads: number;
  likes: number;
  rating: number;
  createdAt: string;
}

const PlansList: React.FC = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans?featured=true&limit=12');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.plans) {
          setPlans(data.plans);
        } else {
          setPlans([]);
        }
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        setError('Failed to load architectural plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section className='pt-0!'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
            {[...Array(9)].map((_, index) => (
              <div key={index} className='bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 animate-pulse'>
                <div className='h-48 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4'></div>
                <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2'></div>
                <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2'></div>
                <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3'></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='pt-0!'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
          <div className='text-center py-20'>
            <div className='text-red-500 mb-4'>
              <svg className='w-16 h-16 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-dark dark:text-white mb-2'>
              Unable to Load Plans
            </h3>
            <p className='text-dark/60 dark:text-white/60 mb-6'>
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className='bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors'
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (plans.length === 0) {
    return (
      <section className='pt-0!'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
          <div className='text-center py-20'>
            <div className='text-primary mb-4'>
              <svg className='w-16 h-16 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-dark dark:text-white mb-2'>
              No Plans Available Yet
            </h3>
            <p className='text-dark/60 dark:text-white/60 mb-6'>
              We're currently preparing our architectural plans collection. Please check back soon!
            </p>
            <a 
              href='/contact'
              className='bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors inline-block'
            >
              Contact Us for Custom Plans
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='pt-0!'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
          {plans.map((plan) => (
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