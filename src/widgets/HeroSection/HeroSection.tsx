import { useEffect, useRef } from 'react'
import { Button, GradientText } from '@shared/ui'
import { dogProfiles } from '@entities/dog'
import { gsap } from '@shared/lib'
import { siteConfig } from '@shared/constants'
import { FloatingParticles } from './FloatingParticles'
import { SwipeCardStack } from './SwipeCardStack'

type HeroSectionProps = {
  id: string
  ready: boolean
}

export const HeroSection = ({ id, ready }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ready || !sectionRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(['.hero-copy', '.hero-actions', '.hero-proof', '.hero-stack'], {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotate: 0,
      })

      gsap
        .timeline()
        .fromTo('.hero-eyebrow', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 })
        .fromTo(
          '.hero-word',
          { yPercent: 105 },
          { yPercent: 0, stagger: 0.15, duration: 0.75, ease: 'power3.out', immediateRender: false },
          '-=0.1',
        )
        .fromTo(
          '.hero-copy',
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, immediateRender: false },
          '-=0.25',
        )
        .fromTo(
          '.hero-actions',
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, ease: 'back.out(1.7)', immediateRender: false },
          '-=0.25',
        )
        .fromTo(
          '.hero-proof',
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, immediateRender: false },
          '-=0.1',
        )
        .fromTo(
          '.hero-stack',
          { x: 80, rotate: 4, autoAlpha: 0 },
          { x: 0, rotate: 0, autoAlpha: 1, duration: 0.9, immediateRender: false },
          '-=0.7',
        )
    }, sectionRef)

    return () => context.revert()
  }, [ready])

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative flex min-h-[94svh] items-center overflow-hidden pt-28 paw-pattern"
    >
      <FloatingParticles />
      <div className="section-shell relative z-10 grid min-h-[calc(94svh-7rem)] items-center gap-10 pb-14 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-3xl">
          <p className="hero-eyebrow mb-5 inline-flex min-h-9 items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-4 text-sm font-bold text-primary-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-primary-100">
            <span aria-hidden="true">🐾</span>
            {siteConfig.heroEyebrow}
          </p>
          <h1 className="font-heading text-5xl font-extrabold leading-[1.02] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Find Your Dog&apos;s</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">
                <GradientText>Perfect Match</GradientText>
              </span>
            </span>
          </h1>
          <p className="hero-copy mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            {siteConfig.heroCopy}
          </p>
          <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              {siteConfig.primaryCta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ▶ {siteConfig.secondaryCta}
            </Button>
          </div>
          <div className="hero-proof mt-8 flex flex-wrap items-center gap-4">
            <div className="flex">
              {dogProfiles.slice(0, 5).map((dog, index) => (
                <span
                  key={dog.name}
                  className="inline-flex size-11 rounded-full border-2 border-white bg-cover bg-center shadow-[var(--shadow-md)] dark:border-neutral-900"
                  style={{
                    backgroundImage: `url(${dog.image})`,
                    backgroundPosition: dog.position,
                    backgroundSize: '300% 200%',
                    marginLeft: index === 0 ? 0 : '-0.75rem',
                  }}
                  aria-label={dog.name}
                  role="img"
                />
              ))}
            </div>
            <p className="text-sm font-bold text-[var(--text-secondary)]">{siteConfig.matchCount}</p>
          </div>
        </div>

        <div className="hero-stack pb-6 lg:pb-0">
          <SwipeCardStack />
        </div>
      </div>
    </section>
  )
}
