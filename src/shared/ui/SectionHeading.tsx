import { useScrollTrigger } from '@shared/hooks'
import { cn } from '@shared/lib'
import { GradientText } from './GradientText'

type SectionHeadingProps = {
  title: string
  subtitle: string
  align?: 'center' | 'left'
  gradient?: boolean
}

export const SectionHeading = ({
  title,
  subtitle,
  align = 'center',
  gradient = true,
}: SectionHeadingProps) => {
  const headingRef = useScrollTrigger<HTMLDivElement>((element, gsap) => {
    const underline = element.querySelector('.heading-underline')
    gsap.fromTo(
      element.querySelectorAll('.heading-copy'),
      { y: 26, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        immediateRender: false,
        scrollTrigger: {
          trigger: element,
          start: 'top 78%',
        },
      },
    )

    if (underline) {
      gsap.fromTo(
        underline,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: align === 'center' ? 'center' : 'left',
          duration: 0.9,
          scrollTrigger: {
            trigger: element,
            start: 'top 78%',
          },
        },
      )
    }
  })

  return (
    <div
      ref={headingRef}
      className={cn(
        'mb-10 flex max-w-3xl flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
      )}
    >
      <h2 className="heading-copy font-heading text-4xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-5xl">
        {gradient ? <GradientText>{title}</GradientText> : title}
      </h2>
      <p className="heading-copy max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
        {subtitle}
      </p>
      <span className="heading-underline h-1 w-24 rounded-full gradient-primary" />
    </div>
  )
}
