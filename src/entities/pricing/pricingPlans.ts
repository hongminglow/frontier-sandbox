export type PricingPlan = {
  id: 'puppy' | 'good-boy' | 'alpha-dog'
  emoji: string
  name: string
  summary: string
  monthly: number
  yearlyMonthly: number
  yearlyTotal: number
  yearlySavings?: string
  popular?: boolean
  cta: string
  features: Array<{ label: string; included: boolean }>
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'puppy',
    emoji: '🐶',
    name: 'Puppy',
    summary: 'Start with friendly local discovery.',
    monthly: 0,
    yearlyMonthly: 0,
    yearlyTotal: 0,
    cta: 'Get Started',
    features: [
      { label: '10 daily swipes', included: true },
      { label: '3 photo uploads', included: true },
      { label: 'Basic breed matching', included: true },
      { label: 'Limited chat', included: true },
      { label: 'Profile boost', included: false },
      { label: 'Vet verification', included: false },
      { label: 'Community support', included: true },
    ],
  },
  {
    id: 'good-boy',
    emoji: '🌟',
    name: 'Good Boy',
    summary: 'Unlimited swipes and smarter matches.',
    monthly: 9.99,
    yearlyMonthly: 7.99,
    yearlyTotal: 95.88,
    yearlySavings: 'Save 20%',
    popular: true,
    cta: 'Start Pro',
    features: [
      { label: 'Unlimited daily swipes', included: true },
      { label: '15 photo uploads', included: true },
      { label: 'Advanced breed matching', included: true },
      { label: 'Unlimited chat', included: true },
      { label: '1 profile boost per week', included: true },
      { label: 'Vet verification', included: true },
      { label: 'Email support', included: true },
    ],
  },
  {
    id: 'alpha-dog',
    emoji: '👑',
    name: 'Alpha Dog',
    summary: 'Premium care for power matchers.',
    monthly: 19.99,
    yearlyMonthly: 14.99,
    yearlyTotal: 179.88,
    yearlySavings: 'Save 25%',
    cta: 'Go Premium',
    features: [
      { label: 'Unlimited daily swipes', included: true },
      { label: 'Unlimited photo uploads', included: true },
      { label: 'AI-powered premium matching', included: true },
      { label: 'Priority chat', included: true },
      { label: '3 profile boosts per week', included: true },
      { label: 'VIP event access', included: true },
      { label: '24/7 priority support', included: true },
    ],
  },
]
