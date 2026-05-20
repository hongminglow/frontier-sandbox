import { SectionHeading } from '@shared/ui'
import { useScrollTrigger } from '@shared/hooks'
import { FeatureCard } from './FeatureCard'

const features = [
  {
    icon: '🧠',
    title: 'Compatibility scoring',
    copy: 'Match by size, age, energy, temperament, neighborhood, and preferred play style.',
  },
  {
    icon: '✅',
    title: 'Vet-verified profiles',
    copy: 'Verification badges help owners feel confident before the first park meetup.',
  },
  {
    icon: '📍',
    title: 'Local park discovery',
    copy: 'Find matches near familiar routes, favorite parks, and dog-friendly patios.',
  },
  {
    icon: '💬',
    title: 'Owner-safe chat',
    copy: 'Keep introductions, photos, boundaries, and schedule details in one calm thread.',
  },
  {
    icon: '🎉',
    title: 'Events and pack walks',
    copy: 'Premium members get access to curated group walks and breed-friendly events.',
  },
  {
    icon: '⚡',
    title: 'Boosts that behave',
    copy: 'Profile boosts surface your dog at the right time without overwhelming the feed.',
  },
] as const

export const FeaturesSection = ({ id }: { id: string }) => {
  const sectionRef = useScrollTrigger<HTMLElement>((element, gsap) => {
    gsap.fromTo(
      element.querySelectorAll('.feature-card'),
      { y: 60, autoAlpha: 0, scale: 0.94 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top 72%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )
  })

  return (
    <section id={id} ref={sectionRef} className="bg-[var(--bg-primary)] py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          title="A smarter way to make dog friends"
          subtitle="Everything is built around safer intros, better matches, and less owner guesswork."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
