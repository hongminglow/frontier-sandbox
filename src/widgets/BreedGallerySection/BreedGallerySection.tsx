import { breedGallery } from '@entities/dog'
import { useScrollTrigger } from '@shared/hooks'
import { SectionHeading } from '@shared/ui'
import { BreedCard } from './BreedCard'

export const BreedGallerySection = ({ id }: { id: string }) => {
  const sectionRef = useScrollTrigger<HTMLElement>((element, gsap) => {
    const galleryGrid = element.querySelector('.breed-grid') ?? element

    gsap.fromTo(
      element.querySelectorAll('.breed-card'),
      { y: 80, rotate: -2, autoAlpha: 0 },
      {
        y: 0,
        rotate: 0,
        autoAlpha: 1,
        duration: 0.72,
        ease: 'power3.out',
        stagger: {
          each: 0.09,
          from: 'start',
        },
        scrollTrigger: {
          trigger: galleryGrid,
          start: 'top 78%',
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
        <div className="breed-grid grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {breedGallery.map((dog, index) => (
            <BreedCard key={`${dog.name}-${index}`} dog={dog} />
          ))}
        </div>
      </div>
    </section>
  )
}
