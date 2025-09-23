import React from 'react'
import Image from 'next/image'
import { Icon } from "@iconify/react"
import Link from 'next/link'
import { format } from 'date-fns'

interface Blog {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    slug: string;
    detail: string;
    tag: string;
}

const BlogPreviewSection: React.FC = () => {
    const posts: Blog[] = [
        {
            title: 'Modern Architecture Trends for 2024',
            date: '2024-01-15',
            excerpt: 'Discover the latest trends shaping modern architectural design, from sustainable materials to smart home integration.',
            coverImage: '/images/blog/blog-1.jpg',
            slug: 'modern-architecture-trends-2024',
            detail: 'Comprehensive guide to modern architectural trends',
            tag: 'Trends'
        },
        {
            title: 'Sustainable Design Principles',
            date: '2024-01-10',
            excerpt: 'Learn about eco-friendly building practices and how sustainable architecture benefits both environment and costs.',
            coverImage: '/images/blog/blog-2.jpg',
            slug: 'sustainable-design-principles',
            detail: 'Complete guide to sustainable building practices',
            tag: 'Sustainability'
        },
        {
            title: 'Smart Home Integration in Architecture',
            date: '2024-01-05',
            excerpt: 'How to seamlessly integrate smart technology into your home design for enhanced living and functionality.',
            coverImage: '/images/blog/blog-3.jpg',
            slug: 'smart-home-integration-architecture',
            detail: 'Smart technology integration guide',
            tag: 'Technology'
        }
    ].slice(0, 3)

    return (
        <section>
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <div className='flex justify-between md:items-end items-start mb-10 md:flex-row flex-col'>
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" aria-label="Home icon" />
                            Blog
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white">
                            Real estate insights
                        </h2>
                        <p className='text-dark/50 dark:text-white/50 text-xm'>
                            Stay ahead in the property market with expert advice and updates
                        </p>
                    </div>
                    <Link href="/blog" className='bg-dark dark:bg-white text-white dark:text-dark py-4 px-8 rounded-full hover:bg-primary duration-300' aria-label="Read all blog articles">
                        Read all articles
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-12">
                    {posts.map((blog, i) => (
                        <div key={i} className="w-full">
                            <Link href={`/blog/${blog.slug}`} aria-label="blog cover 5xl:h-full 5xl:inline-block" className="gap-4 group">
                                <div className="overflow-hidden rounded-2xl flex-shrink-0">
                                    <Image
                                        src={blog.coverImage}
                                        alt="image"
                                        className="transition group-hover:scale-110"
                                        width={190}
                                        height={163}
                                        style={{ width: "100%", height: "100%" }}
                                        unoptimized={true}
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="mt-2 text-xl font-medium text-dark dark:text-white group-hover:text-primary">
                                            {blog.title}
                                        </h3>
                                        <span className="text-base font-medium dark:text-white/50 text-dark/50 leading-loose">
                                            {format(new Date(blog.date), "MMM dd, yyyy")}
                                        </span>
                                    </div>
                                    <div className="py-2.5 px-5 bg-dark/5 rounded-full dark:bg-white/15">
                                        <p className="text-sm font-semibold text-dark dark:text-white">{blog.tag}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BlogPreviewSection