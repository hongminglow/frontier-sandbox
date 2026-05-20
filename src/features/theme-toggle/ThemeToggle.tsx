import { useEffect, useRef } from 'react'
import { useTheme } from '@app/providers/useTheme'
import { gsap } from '@shared/lib'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const iconRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!iconRef.current) {
      return
    }

    gsap.fromTo(iconRef.current, { rotate: 0, scale: 0.9 }, { rotate: 360, scale: 1, duration: 0.5 })
  }, [theme])

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      onClick={toggleTheme}
      className="glass inline-flex size-11 items-center justify-center rounded-full text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
    >
      <svg ref={iconRef} viewBox="0 0 48 48" className="size-5" aria-hidden="true">
        {theme === 'light' ? (
          <>
            <circle cx="24" cy="24" r="9" fill="currentColor" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
              <line
                key={rotation}
                x1="24"
                y1="5"
                x2="24"
                y2="11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="4"
                transform={`rotate(${rotation} 24 24)`}
              />
            ))}
          </>
        ) : (
          <path
            d="M34.5 32.8A15.2 15.2 0 0 1 16.2 14.5 14.8 14.8 0 1 0 34.5 32.8Z"
            fill="currentColor"
          />
        )}
      </svg>
    </button>
  )
}
