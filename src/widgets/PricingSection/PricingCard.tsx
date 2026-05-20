import { useEffect, useRef, useState } from 'react'
import type { PricingPlan } from '@entities/pricing'
import { Badge, Button } from '@shared/ui'
import { cn, gsap } from '@shared/lib'

type PricingCardProps = {
  plan: PricingPlan
  billing: 'monthly' | 'yearly'
}

export const PricingCard = ({ plan, billing }: PricingCardProps) => {
  const price = billing === 'monthly' ? plan.monthly : plan.yearlyMonthly
  const [displayPrice, setDisplayPrice] = useState(price)
  const displayPriceRef = useRef(price)

  useEffect(() => {
    const value = { amount: displayPriceRef.current }

    gsap.to(value, {
      amount: price,
      duration: 0.55,
      ease: 'power1.out',
      onUpdate: () => {
        displayPriceRef.current = Number(value.amount.toFixed(2))
        setDisplayPrice(displayPriceRef.current)
      },
    })
  }, [price])

  useEffect(() => {
    if (billing === 'yearly') {
      gsap.fromTo('.save-badge', { y: 12, scale: 0.85, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, ease: 'elastic.out(1, 0.3)' })
    }
  }, [billing])

  return (
    <article
      className={cn(
        'pricing-card relative flex min-h-[36rem] flex-col rounded-2xl border bg-[var(--card-bg)] p-6 shadow-[var(--card-shadow)] transition duration-300 hover:-translate-y-2',
        plan.popular
          ? 'border-primary-300 shadow-[var(--shadow-glow-lg)] lg:-translate-y-4'
          : 'border-[var(--border-color)] hover:border-primary-200',
      )}
    >
      {plan.popular && (
        <Badge variant="popular" pulse className="absolute -top-4 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <div className="flex flex-col gap-4">
        <span className="text-4xl" aria-hidden="true">
          {plan.emoji}
        </span>
        <div>
          <h3 className="font-heading text-3xl font-extrabold text-[var(--text-primary)]">{plan.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{plan.summary}</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <span className="font-heading text-5xl font-extrabold text-[var(--text-primary)]">
            ${displayPrice.toFixed(displayPrice === 0 ? 0 : 2)}
          </span>
          <span className="pb-2 text-sm font-bold text-[var(--text-secondary)]">/mo</span>
          {billing === 'yearly' && plan.yearlySavings && (
            <Badge variant="new" className="save-badge mb-2">
              {plan.yearlySavings}
            </Badge>
          )}
        </div>
        {billing === 'yearly' && plan.yearlyTotal > 0 && (
          <p className="text-sm font-semibold text-[var(--text-tertiary)]">
            ${plan.yearlyTotal.toFixed(2)} billed yearly
          </p>
        )}
      </div>
      <ul className="mt-8 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]">
            <span className={feature.included ? 'font-extrabold text-success' : 'font-extrabold text-[var(--text-tertiary)]'}>
              {feature.included ? '✓' : '×'}
            </span>
            {feature.label}
          </li>
        ))}
      </ul>
      <Button className="mt-auto" variant={plan.popular ? 'primary' : 'outline'}>
        {plan.cta}
      </Button>
    </article>
  )
}
