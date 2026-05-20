import { useEffect, useMemo, useState } from 'react'
import { dogProfiles } from '@entities/dog'
import { cn } from '@shared/lib'

export const SwipeCardStack = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleCards = useMemo(
    () => [0, 1, 2].map((offset) => dogProfiles[(activeIndex + offset) % dogProfiles.length]),
    [activeIndex],
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % dogProfiles.length)
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className="perspective-container group relative mx-auto h-[28rem] w-full max-w-sm sm:h-[32rem]">
      {visibleCards
        .map((dog, index) => ({ dog, index }))
        .reverse()
        .map(({ dog, index }) => (
          <article
            key={`${dog.name}-${index}`}
            className={cn(
              'absolute inset-x-0 top-0 mx-auto flex h-[27rem] w-[min(21rem,88vw)] flex-col overflow-hidden rounded-[1.5rem] border border-white/60 bg-[var(--card-bg)] shadow-[var(--card-shadow)] transition duration-500 dark:border-white/10 sm:h-[31rem]',
              index === 0 && 'z-30 rotate-[-3deg] group-hover:rotate-[-7deg]',
              index === 1 && 'z-20 translate-x-5 translate-y-7 rotate-[5deg] group-hover:translate-x-10 group-hover:rotate-[9deg]',
              index === 2 && 'z-10 -translate-x-4 translate-y-14 rotate-[-9deg] opacity-80 group-hover:-translate-x-8 group-hover:rotate-[-12deg]',
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
              <div className="mt-auto flex justify-center gap-4">
                <button
                  type="button"
                  aria-label={`Pass on ${dog.name}`}
                  className="inline-flex size-14 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-2xl shadow-[var(--shadow-md)] transition hover:scale-110"
                >
                  ×
                </button>
                <button
                  type="button"
                  aria-label={`Like ${dog.name}`}
                  className="inline-flex size-14 items-center justify-center rounded-full gradient-primary text-2xl text-white shadow-[var(--shadow-glow)] transition hover:scale-110"
                >
                  ♥
                </button>
              </div>
            </div>
          </article>
        ))}
    </div>
  )
}
