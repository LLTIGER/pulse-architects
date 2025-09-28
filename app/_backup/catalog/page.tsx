import { Metadata } from 'next'
import HeroSub from '@/components/shared/HeroSub'
import PlansList from '@/components/Plans/PlansList'

export const metadata: Metadata = {
  title: 'Architectural Plans Catalog | Pulse Architects',
  description: 'Browse our complete collection of premium architectural plans, house designs, and blueprints.',
}

export default function CatalogPage() {
  return (
    <>
      <HeroSub
        title="Discover inspiring designed homes."
        description="Experience elegance and comfort with our exclusive luxury architectural plans, designed for sophisticated living."
        badge="Architectural Plans"
      />
      <PlansList />
    </>
  )
}