import { SectionHeading } from '@shared/ui'
import { useScrollTrigger } from '@shared/hooks'
import { StepCard } from './StepCard'

const steps = [
  {
    number: '01',
    icon: '📸',
    title: 'Build a real profile',
    copy: 'Add photos, energy level, breed notes, play style, and the parks your dog already loves.',
  },
  {
    number: '02',
    icon: '💘',
    title: 'Swipe compatible dogs',
    copy: 'The match engine weighs temperament, size, location, age, and activity preferences.',
  },
  {
    number: '03',
    icon: '💬',
    title: 'Chat with owners',
    copy: 'Confirm details, trade expectations, and keep every first intro inside the app.',
  },
  {
    number: '04',
    icon: '🗓️',
    title: 'Schedule the playdate',
    copy: 'Pick a safe public spot, share reminders, and keep future meetups organized.',
  },
] as const

export const HowItWorksSection = ({ id }: { id: string }) => {
  const sectionRef = useScrollTrigger<HTMLElement>((element, gsap) => {
    gsap.fromTo(
      element.querySelectorAll('.step-card'),
      { y: 44, autoAlpha: 0, scale: 0.96 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        stagger: 0.12,
        ease: 'back.out(1.25)',
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    gsap.fromTo(
      element.querySelectorAll('.step-icon'),
      { scale: 0.8, rotate: -8 },
      {
        scale: 1,
        rotate: 0,
        stagger: 0.12,
        ease: 'elastic.out(1, 0.35)',
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )
  })

  return (
    <section id={id} ref={sectionRef} className="relative bg-[var(--bg-secondary)] py-16 sm:py-24">
      <div className="section-shell relative">
        <SectionHeading
          title="From first swipe to first zoomies"
          subtitle="PawMatch keeps every step simple, specific, and owner-approved."
        />
        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}
