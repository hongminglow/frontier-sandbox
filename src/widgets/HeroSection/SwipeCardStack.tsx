import { useMemo, useState } from 'react'
import { dogProfiles } from '@entities/dog'
import { cn } from '@shared/lib'

type Decision = 'like' | 'pass'
const stackDepth = 5

export const SwipeCardStack = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [decision, setDecision] = useState<Decision | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const visibleCards = useMemo(
    () =>
      Array.from({ length: stackDepth }, (_, offset) => dogProfiles[(activeIndex + offset) % dogProfiles.length]),
    [activeIndex],
  )

  const handleDecision = (nextDecision: Decision) => {
    if (isAnimating) {
      return
    }

    setDecision(nextDecision)
    setIsAnimating(true)

    window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % dogProfiles.length)
      setDecision(null)
      setIsAnimating(false)
    }, 540)
  }

  return (
    <div className="perspective-container group relative mx-auto h-[28rem] w-full max-w-sm sm:h-[32rem]">
      {decision && (
        <span
          className={cn(
            'decision-burst pointer-events-none absolute left-1/2 top-1/2 z-40 inline-flex size-28 items-center justify-center rounded-full border-4 bg-white/85 text-6xl font-extrabold shadow-[var(--shadow-glow-lg)] backdrop-blur dark:bg-neutral-950/75',
            decision === 'like' ? 'border-primary-300 text-primary-500' : 'border-neutral-300 text-neutral-600',
          )}
          aria-hidden="true"
        >
          {decision === 'like' ? '♥' : '×'}
        </span>
      )}
      {visibleCards
        .map((dog, index) => ({ dog, index }))
        .reverse()
        .map(({ dog, index }) => (
          <article
            key={`${dog.name}-${activeIndex}-${index}`}
            aria-hidden={index > 0}
            className={cn(
              'absolute inset-x-0 top-0 mx-auto flex h-[27rem] w-[min(21rem,88vw)] flex-col overflow-hidden rounded-[1.5rem] border border-white/60 bg-[var(--card-bg)] shadow-[var(--card-shadow)] transition duration-500 dark:border-white/10 sm:h-[31rem]',
              index > 0 && 'pointer-events-none',
              index === 0 && 'z-30 rotate-[-3deg] group-hover:rotate-[-7deg]',
              index === 1 && 'z-20 translate-x-5 translate-y-7 rotate-[5deg] group-hover:translate-x-10 group-hover:rotate-[9deg]',
              index === 2 && 'z-10 -translate-x-4 translate-y-14 rotate-[-9deg] opacity-80 group-hover:-translate-x-8 group-hover:rotate-[-12deg]',
              index === 3 && 'z-[5] translate-x-8 translate-y-20 rotate-[12deg] opacity-45 group-hover:translate-x-14',
              index === 4 && 'z-[1] -translate-x-7 translate-y-24 rotate-[-14deg] opacity-30 group-hover:-translate-x-12',
              index === 0 && decision === 'like' && 'swipe-right',
              index === 0 && decision === 'pass' && 'swipe-left',
            )}
          >
            <div
              className="h-3/5 bg-cover bg-center"
              style={{
                backgroundImage: `url(${dog.image})`,
                backgroundPosition: dog.position,
                backgroundSize: '300% 200%',
              }}
              role="img"
              aria-label={`${dog.name}, ${dog.breed}`}
            />
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-3xl font-extrabold text-[var(--text-primary)]">
                    {dog.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                    {dog.breed} · {dog.age}
                  </p>
                </div>
                <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-extrabold text-primary-600 dark:bg-secondary-900 dark:text-primary-100">
                  {dog.match}
                </span>
              </div>
              <p className="text-sm leading-6 text-[var(--text-secondary)]">{dog.energy}</p>
              {index === 0 ? (
                <div className="mt-auto flex justify-center gap-4">
                  <button
                    type="button"
                    aria-label={`Pass on ${dog.name}`}
                    onClick={() => handleDecision('pass')}
                    disabled={isAnimating}
                    className="inline-flex size-14 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-2xl shadow-[var(--shadow-md)] transition hover:scale-110 disabled:opacity-70"
                  >
                    ×
                  </button>
                  <button
                    type="button"
                    aria-label={`Like ${dog.name}`}
                    onClick={() => handleDecision('like')}
                    disabled={isAnimating}
                    className="inline-flex size-14 items-center justify-center rounded-full gradient-primary text-2xl text-white shadow-[var(--shadow-glow)] transition hover:scale-110 disabled:opacity-70"
                  >
                    ♥
                  </button>
                </div>
              ) : (
                <div className="mt-auto flex justify-center gap-4" aria-hidden="true">
                  <span className="inline-flex size-14 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-2xl shadow-[var(--shadow-md)]">
                    ×
                  </span>
                  <span className="inline-flex size-14 items-center justify-center rounded-full gradient-primary text-2xl text-white shadow-[var(--shadow-glow)]">
                    ♥
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
    </div>
  )
}
