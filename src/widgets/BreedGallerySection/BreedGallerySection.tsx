import { breedGallery } from '@entities/dog'
import { useScrollTrigger } from '@shared/hooks'
import { SectionHeading } from '@shared/ui'
import { BreedCard } from './BreedCard'

export const BreedGallerySection = ({ id }: { id: string }) => {
  const sectionRef = useScrollTrigger<HTMLElement>((element, gsap) => {
    gsap.fromTo(
      element.querySelectorAll('.breed-card'),
      { y: 80, rotate: -2, autoAlpha: 0 },
      {
        y: 0,
        rotate: 0,
        autoAlpha: 1,
        stagger: 0.07,
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
          title="Meet every kind of match"
          subtitle="From lap-dog loungers to high-energy trail partners, profiles are built for quick scanning."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {breedGallery.map((dog, index) => (
            <BreedCard key={`${dog.name}-${index}`} dog={dog} />
          ))}
        </div>
      </div>
    </section>
  )
}
