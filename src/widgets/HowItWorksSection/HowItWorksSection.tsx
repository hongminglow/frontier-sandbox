import { SectionHeading } from '@shared/ui'
import { useScrollTrigger } from '@shared/hooks'
import { ConnectingLine } from './ConnectingLine'
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
      { y: 70, rotateX: 10, autoAlpha: 0 },
      {
        y: 0,
        rotateX: 0,
        autoAlpha: 1,
        stagger: 0.12,
        immediateRender: false,
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
        },
      },
    )

    gsap.fromTo(
      element.querySelector('.connecting-line'),
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left',
        duration: 1.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 68%',
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
        <ConnectingLine />
        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}
