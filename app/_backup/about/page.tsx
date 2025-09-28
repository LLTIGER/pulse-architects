import { Metadata } from 'next'
import HeroSub from '@/components/shared/HeroSub'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us | Pulse Architects',
  description: 'Learn about Pulse Architects, our mission to create exceptional architectural designs, and our team of expert designers.',
}

export default function AboutPage() {
  return (
    <>
      <HeroSub
        title="Crafting architectural excellence."
        description="Transforming visions into reality through innovative design and meticulous attention to detail."
        badge="About Us"
      />
      <AboutContent />
    </>
  )
}