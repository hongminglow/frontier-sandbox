import { useState } from 'react'
import { faqData } from '@entities/faq'
import { useScrollTrigger } from '@shared/hooks'
import { SectionHeading } from '@shared/ui'
import { FAQItem } from './FAQItem'

export const FAQSection = ({ id }: { id: string }) => {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useScrollTrigger<HTMLElement>((element, gsap) => {
    gsap.fromTo(
      element.querySelectorAll('.faq-item'),
      { x: -40, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )
  })

  return (
    <section id={id} ref={sectionRef} className="bg-[var(--bg-primary)] py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          title="Questions before the first match?"
          subtitle="The essentials on pricing, safety, matching, subscriptions, and meeting etiquette."
        />
        <div className="mx-auto max-w-4xl rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] px-5 shadow-[var(--card-shadow)]">
          {faqData.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
