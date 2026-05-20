import { useState } from 'react'
import { pricingPlans } from '@entities/pricing'
import { useScrollTrigger } from '@shared/hooks'
import { SectionHeading } from '@shared/ui'
import { PricingCard } from './PricingCard'
import { PricingToggle } from './PricingToggle'

export const PricingSection = ({ id }: { id: string }) => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const sectionRef = useScrollTrigger<HTMLElement>((element, gsap) => {
    gsap.fromTo(
      element.querySelectorAll('.pricing-card'),
      { y: 80, autoAlpha: 0, scale: 0.9 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )
  })

  return (
    <section id={id} ref={sectionRef} className="bg-[var(--bg-secondary)] py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          title="Plans for every pack"
          subtitle="Start free, then unlock unlimited swipes, verification, boosts, and event access."
        />
        <PricingToggle billing={billing} onChange={setBilling} />
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>
      </div>
    </section>
  )
}
