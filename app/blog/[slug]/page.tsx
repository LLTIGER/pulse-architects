import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'

// Sample blog posts data that matches our blog list
const blogPosts = [
  {
    id: '1',
    title: 'Modern Architecture Trends for 2024',
    slug: 'modern-architecture-trends-2024',
    excerpt: 'Explore the latest trends shaping modern architectural design in 2024.',
    coverImage: '/images/blog/blog1.jpg',
    date: '2024-01-15',
    tag: 'Trends',
    readTime: '5 min read',
    content: `
      <p>The world of architecture is constantly evolving, and 2024 brings exciting new trends that are reshaping how we design and build. From sustainable materials to smart home integration, architects are pushing boundaries to create spaces that are both beautiful and functional.</p>
      
      <h3>1. Sustainable and Eco-Friendly Design</h3>
      <p>Environmental consciousness continues to drive architectural innovation. Architects are increasingly incorporating recycled materials, green roofs, and energy-efficient systems into their designs. Solar panels are becoming more aesthetically pleasing and integrated seamlessly into building facades.</p>
      
      <h3>2. Biophilic Design Elements</h3>
      <p>The connection between nature and architecture has never been stronger. Living walls, natural lighting, and organic shapes are being used to create spaces that promote well-being and productivity.</p>
      
      <h3>3. Flexible and Adaptive Spaces</h3>
      <p>Post-pandemic, the need for flexible spaces has become paramount. Modern architecture focuses on creating adaptable environments that can serve multiple purposes throughout the day.</p>
      
      <h3>4. Smart Technology Integration</h3>
      <p>The Internet of Things (IoT) is revolutionizing how we interact with our built environment. From automated lighting systems to climate control, smart technology is becoming an integral part of architectural planning.</p>
    `
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
    content: `
      <p>Sustainable design is not just a trend—it's a responsibility. As architects and designers, we have the power to create buildings that minimize environmental impact while maximizing human comfort and well-being.</p>
      
      <h3>Core Principles of Sustainable Design</h3>
      <p>Understanding the fundamental principles of sustainable architecture is crucial for creating environmentally responsible buildings that stand the test of time.</p>
      
      <h3>Energy Efficiency</h3>
      <p>Optimizing energy use through proper insulation, strategic window placement, and high-efficiency HVAC systems reduces both environmental impact and operating costs.</p>
      
      <h3>Water Conservation</h3>
      <p>Implementing rainwater harvesting systems, drought-resistant landscaping, and efficient plumbing fixtures helps conserve this precious resource.</p>
      
      <h3>Material Selection</h3>
      <p>Choosing locally sourced, recycled, or rapidly renewable materials reduces transportation emissions and supports local economies.</p>
    `
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
    content: `
      <p>The integration of smart technology into architectural design is transforming how we live and interact with our homes. From the planning stage to the final build, architects must consider how technology can enhance both functionality and aesthetics.</p>
      
      <h3>Planning for Smart Integration</h3>
      <p>Successful smart home integration begins in the design phase. Architects must plan for adequate electrical infrastructure, network connectivity, and device placement.</p>
      
      <h3>Invisible Technology</h3>
      <p>The best smart home integration is invisible. Technology should enhance the living experience without cluttering the visual space or compromising the architectural integrity.</p>
      
      <h3>Future-Proofing</h3>
      <p>Technology evolves rapidly. Designing flexible systems that can adapt to future innovations ensures your smart home remains relevant for years to come.</p>
    `
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
    content: `
      <p>Minimalism in architecture is about more than just clean lines and empty spaces. It's a philosophy that emphasizes the essential elements of design while eliminating the superfluous.</p>
      
      <h3>Less is More</h3>
      <p>The famous axiom "less is more" perfectly encapsulates minimalist design. Every element in a minimalist space serves a purpose and contributes to the overall harmony of the design.</p>
      
      <h3>Quality Over Quantity</h3>
      <p>Minimalist architecture focuses on high-quality materials and craftsmanship. When you have fewer elements, each one must be perfect.</p>
      
      <h3>Light and Space</h3>
      <p>Natural light and open space are crucial elements in minimalist design. Large windows, skylights, and open floor plans create a sense of airiness and connection to the outdoors.</p>
    `
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
    content: `
      <p>Material selection is one of the most critical decisions in architectural design. The right materials can enhance both the aesthetic appeal and functional performance of a building.</p>
      
      <h3>Durability and Longevity</h3>
      <p>Choosing materials that can withstand local climate conditions and daily wear ensures your building will look great and perform well for decades.</p>
      
      <h3>Aesthetic Considerations</h3>
      <p>Materials contribute significantly to the visual character of a building. Consider how different textures, colors, and finishes work together to create your desired aesthetic.</p>
      
      <h3>Cost and Maintenance</h3>
      <p>Balance initial material costs with long-term maintenance requirements. Sometimes investing more upfront in quality materials saves money over the building's lifespan.</p>
    `
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
    content: `
      <p>Architecture doesn't exist in isolation. The relationship between individual buildings and the broader urban context is crucial for creating livable, sustainable communities.</p>
      
      <h3>Context-Sensitive Design</h3>
      <p>Good architecture responds to its surroundings. Understanding the local context, including climate, culture, and existing infrastructure, is essential for successful design.</p>
      
      <h3>Mixed-Use Development</h3>
      <p>Combining residential, commercial, and recreational spaces in single developments creates vibrant communities and reduces transportation needs.</p>
      
      <h3>Public Spaces</h3>
      <p>Quality public spaces are the heart of successful urban planning. Parks, plazas, and pedestrian areas create opportunities for community interaction and improve quality of life.</p>
    `
  }
]

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(post => post.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Pulse Architects'
    }
  }

  return {
    title: `${post.title} | Pulse Architects`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(post => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}