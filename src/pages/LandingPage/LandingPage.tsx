import { lazy, Suspense } from 'react'
import { Navbar } from '@widgets/Navbar'
import { HeroSection } from '@widgets/HeroSection'

const HowItWorksSection = lazy(() =>
  import('@widgets/HowItWorksSection').then((module) => ({ default: module.HowItWorksSection })),
)
const FeaturesSection = lazy(() =>
  import('@widgets/FeaturesSection').then((module) => ({ default: module.FeaturesSection })),
)
const BreedGallerySection = lazy(() =>
  import('@widgets/BreedGallerySection').then((module) => ({ default: module.BreedGallerySection })),
)
const TestimonialsSection = lazy(() =>
  import('@widgets/TestimonialsSection').then((module) => ({ default: module.TestimonialsSection })),
)
const PricingSection = lazy(() =>
  import('@widgets/PricingSection').then((module) => ({ default: module.PricingSection })),
)
const FAQSection = lazy(() =>
  import('@widgets/FAQSection').then((module) => ({ default: module.FAQSection })),
)
const Footer = lazy(() => import('@widgets/Footer').then((module) => ({ default: module.Footer })))

type LandingPageProps = {
  isReady: boolean
}

export const LandingPage = ({ isReady }: LandingPageProps) => (
  <>
    <Navbar />
    <main>
      <HeroSection id="hero" ready={isReady} />
      <Suspense
        fallback={
          <div className="flex min-h-48 items-center justify-center bg-[var(--bg-secondary)] text-sm font-semibold text-[var(--text-secondary)]">
            Loading PawMatch...
          </div>
        }
      >
        <HowItWorksSection id="how-it-works" />
        <FeaturesSection id="features" />
        <BreedGallerySection id="gallery" />
        <TestimonialsSection id="testimonials" />
        <PricingSection id="pricing" />
        <FAQSection id="faq" />
        <Footer />
      </Suspense>
    </main>
  </>
)
