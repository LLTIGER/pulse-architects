import React from 'react'
import BlogCard from './BlogCard'

const sampleBlogs = [
  {
    id: '1',
    title: 'Modern Architecture Trends for 2024',
    slug: 'modern-architecture-trends-2024',
    excerpt: 'Explore the latest trends shaping modern architectural design in 2024.',
    coverImage: '/images/blog/blog1.jpg',
    date: '2024-01-15',
    tag: 'Trends',
    readTime: '5 min read',
    content: ''
  },
  {
    id: '2',
    title: 'Sustainable Design Principles',
    slug: 'sustainable-design-principles',
    excerpt: 'Learn about eco-friendly building practices and sustainable architecture.',
    coverImage: '/images/blog/blog2.jpg',
    date: '2024-01-10',
    tag: 'Sustainability',
    readTime: '7 min read',
    content: ''
  },
  {
    id: '3',
    title: 'Smart Home Integration in Architecture',
    slug: 'smart-home-integration-architecture',
    excerpt: 'How to seamlessly integrate smart technology into your home design.',
    coverImage: '/images/blog/blog3.jpg',
    date: '2024-01-05',
    tag: 'Technology',
    readTime: '6 min read',
    content: ''
  },
  {
    id: '4',
    title: 'Minimalist Design Philosophy',
    slug: 'minimalist-design-philosophy',
    excerpt: 'Understanding the principles of minimalist architecture and design.',
    coverImage: '/images/blog/blog4.jpg',
    date: '2023-12-28',
    tag: 'Design',
    readTime: '4 min read',
    content: ''
  },
  {
    id: '5',
    title: 'Choosing the Right Materials',
    slug: 'choosing-right-materials',
    excerpt: 'A comprehensive guide to selecting materials for your architectural project.',
    coverImage: '/images/blog/blog5.jpg',
    date: '2023-12-20',
    tag: 'Materials',
    readTime: '8 min read',
    content: ''
  },
  {
    id: '6',
    title: 'Urban Planning and Architecture',
    slug: 'urban-planning-architecture',
    excerpt: 'The relationship between urban planning and architectural design.',
    coverImage: '/images/blog/blog6.jpg',
    date: '2023-12-15',
    tag: 'Planning',
    readTime: '6 min read',
    content: ''
  }
]

const BlogList: React.FC = () => {
  return (
    <section className='pt-0!'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pb-14 md:pb-28'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
          {sampleBlogs.map((blog) => (
            <div key={blog.id} className='w-full'>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogList