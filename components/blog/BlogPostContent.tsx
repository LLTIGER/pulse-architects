import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Clock, User, Tag } from 'lucide-react'

interface BlogPostProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string
    coverImage: string
    date: string
    tag: string
    readTime: string
    content: string
  }
}

const BlogPostContent: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className='container max-w-4xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
      {/* Back Navigation */}
      <div className='mb-8'>
        <Link 
          href='/blog' 
          className='inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300'
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      <div className='relative mb-8 overflow-hidden rounded-2xl'>
        <Image
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={400}
          className='w-full h-64 md:h-80 object-cover'
          unoptimized={true}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
        <div className='absolute bottom-6 left-6 text-white'>
          <div className='inline-block py-2 px-4 bg-primary/90 rounded-full text-sm font-medium mb-4'>
            {post.tag}
          </div>
          <h1 className='text-3xl md:text-4xl font-bold mb-2 leading-tight'>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta Information */}
      <div className='flex flex-wrap items-center gap-6 mb-8 text-black/60 dark:text-white/60'>
        <div className='flex items-center gap-2'>
          <User size={16} />
          <span className='text-sm'>Pulse Architects Team</span>
        </div>
        <div className='flex items-center gap-2'>
          <Clock size={16} />
          <span className='text-sm'>{post.readTime}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-sm'>Published {format(new Date(post.date), 'MMMM dd, yyyy')}</span>
        </div>
      </div>

      {/* Article Content */}
      <article className='prose prose-lg max-w-none dark:prose-invert'>
        <div 
          className='text-black dark:text-white leading-relaxed'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts CTA */}
      <div className='mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center'>
        <h3 className='text-2xl font-medium text-black dark:text-white mb-4'>
          Interested in More Architectural Insights?
        </h3>
        <p className='text-black/60 dark:text-white/60 mb-6'>
          Explore our collection of architectural plans and design resources.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link 
            href='/blog'
            className='px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300'
          >
            More Articles
          </Link>
          <Link 
            href='/catalog'
            className='px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300'
          >
            Browse Plans
          </Link>
        </div>
      </div>

      {/* Author Bio */}
      <div className='mt-12 p-6 border border-black/10 dark:border-white/10 rounded-2xl'>
        <div className='flex items-start gap-4'>
          <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
            <User className='w-8 h-8 text-primary' />
          </div>
          <div>
            <h4 className='text-lg font-medium text-black dark:text-white mb-2'>
              Pulse Architects Team
            </h4>
            <p className='text-black/60 dark:text-white/60 text-sm leading-relaxed'>
              Our team of licensed architects and design professionals brings decades of experience 
              in residential and commercial architecture. We're passionate about sharing knowledge 
              and insights to help create better built environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostContent