import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Square, ArrowRight } from 'lucide-react';

interface PlanCardProps {
  plan: {
    id: string;
    title: string;
    slug: string;
    description: string;
    specifications: {
      bedrooms: number;
      bathrooms: number;
      area: string;
      floors: number;
      garage: boolean;
      style: string;
    };
    price: string;
    images: {
      thumbnail: string;
      fullSize: string;
    };
    tags: string[];
    category: string;
    isPremium: boolean;
    isNew: boolean;
    downloads: number;
    likes: number;
    rating: number;
    createdAt: string;
  };
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const { title, slug, description, specifications, price, images } = plan;

  const mainImage = images.thumbnail;

  return (
    <div>
      <div className='relative rounded-2xl border border-dark/10 dark:border-white/10 group hover:shadow-3xl duration-300 dark:hover:shadow-white/20'>
        <div className='overflow-hidden rounded-t-2xl'>
          <Link href={`/catalog/${slug}`}>
            {mainImage && (
              <Image
                src={mainImage}
                alt={title}
                width={440}
                height={300}
                className='w-full rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75'
                unoptimized={true}
              />
            )}
          </Link>
          <div className='absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block'>
            <ArrowRight
              size={24}
              className='text-black'
            />
          </div>
        </div>
        <div className='p-6'>
          <div className='flex flex-col mobile:flex-row gap-5 mobile:gap-0 justify-between mb-6'>
            <div>
              <Link href={`/catalog/${slug}`}>
                <h3 className='text-xl font-medium text-black dark:text-white duration-300 group-hover:text-primary'>
                  {title}
                </h3>
              </Link>
              <p className='text-base font-normal text-black/50 dark:text-white/50'>
                {description}
              </p>
            </div>
            <div>
              <button className='text-base font-normal text-primary px-5 py-2 rounded-full bg-primary/10'>
                {price || 'Price TBD'}
              </button>
            </div>
          </div>
          <div className='flex'>
            <div className='flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8'>
              <Bed size={20} />
              <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                {specifications.bedrooms} Bedrooms
              </p>
            </div>
            <div className='flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8'>
              <Bath size={20} />
              <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                {specifications.bathrooms} Bathrooms
              </p>
            </div>
            <div className='flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8'>
              <Square size={20} />
              <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                {specifications.area}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;