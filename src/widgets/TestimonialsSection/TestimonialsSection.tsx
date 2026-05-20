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
  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 < 0 ? maxStartIndex : currentIndex - 1))
  }

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1 > maxStartIndex ? 0 : currentIndex + 1))
  }

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
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goToPrevious}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-[var(--shadow-md)] transition hover:-translate-x-0.5 hover:border-primary-300"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex justify-center gap-2">
            {Array.from({ length: maxStartIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  safeActiveIndex === index ? 'w-8 gradient-primary' : 'w-2.5 bg-neutral-300 dark:bg-neutral-700'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goToNext}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-[var(--shadow-md)] transition hover:translate-x-0.5 hover:border-primary-300"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
