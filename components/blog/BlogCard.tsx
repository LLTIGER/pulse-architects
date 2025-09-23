import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

interface BlogCardProps {
  blog: {
    id: string
    title: string
    slug: string
    excerpt: string
    coverImage: string
    date: string
    tag: string
    readTime: string
  }
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { title, coverImage, date, slug, tag } = blog

  return (
    <Link href={`/blog/${slug}`} className='group block'>
      <div className='overflow-hidden rounded-2xl flex-shrink-0 mb-4'>
        <Image
          src={coverImage}
          alt={title}
          className='transition group-hover:scale-110 w-full h-48 object-cover'
          width={400}
          height={200}
          unoptimized={true}
        />
      </div>
      <div className='flex justify-between items-start gap-4'>
        <div className='flex-1'>
          <h3 className='text-xl font-medium text-black dark:text-white group-hover:text-primary transition-colors duration-300 mb-2 leading-tight'>
            {title}
          </h3>
          <span className='text-base font-medium dark:text-white/50 text-black/50'>
            {format(new Date(date), 'MMM dd, yyyy')}
          </span>
        </div>
        <div className='py-2.5 px-5 bg-black/5 rounded-full dark:bg-white/15 flex-shrink-0'>
          <p className='text-sm font-semibold text-black dark:text-white'>{tag}</p>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard