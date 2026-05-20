import { useEffect, useState } from 'react'
import { testimonialData } from '@entities/testimonials'
import { useMediaQuery, useScrollTrigger } from '@shared/hooks'
import { SectionHeading } from '@shared/ui'
import { TestimonialCard } from './TestimonialCard'

export const TestimonialsSection = ({ id }: { id: string }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px)')
  const visibleCount = isDesktop ? 3 : isTablet ? 2 : 1
  const maxStartIndex = Math.max(testimonialData.length - visibleCount, 0)
  const safeActiveIndex = Math.min(activeIndex, maxStartIndex)
  const sectionRef = useScrollTrigger<HTMLElement>((element, gsap) => {
    gsap.fromTo(
      element.querySelectorAll('.testimonial-card'),
      { x: 100, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        stagger: 0.12,
        scrollTrigger: {
          trigger: element,
          start: 'top 72%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    gsap.fromTo(
      element.querySelectorAll('.testimonial-star'),
      { scale: 0 },
      {
        scale: 1,
        stagger: 0.035,
        ease: 'back.out(2.5)',
        scrollTrigger: {
          trigger: element,
          start: 'top 72%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )
  })

  useEffect(() => {
    if (isPaused) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1 > maxStartIndex ? 0 : currentIndex + 1))
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [isPaused, maxStartIndex])

  return (
    <section id={id} ref={sectionRef} className="bg-[var(--bg-primary)] py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          title="Owners are finding better first hellos"
          subtitle="Real matches turn into repeat playdates, calmer introductions, and dog-park routines."
        />
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${safeActiveIndex * (100 / visibleCount)}%)` }}
          >
            {testimonialData.map((testimonial) => (
              <div key={testimonial.owner} className="w-full shrink-0 px-1 md:w-1/2 lg:w-1/3">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
