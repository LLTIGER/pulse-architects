import { Metadata } from 'next'
import HeroSub from '@/components/shared/HeroSub'
import BlogList from '@/components/blog/BlogList'

export const metadata: Metadata = {
  title: 'Architectural Insights | Pulse Architects',
  description: 'Stay ahead in architectural design with expert insights, trends, and updates from our professional team.',
}

export default function BlogPage() {
  return (
    <>
      <HeroSub
        title="Architectural insights."
        description="Stay ahead in architectural design with expert insights, trends, and updates from our professional team."
        badge="Blog"
      />
      <BlogList />
    </>
  )
}