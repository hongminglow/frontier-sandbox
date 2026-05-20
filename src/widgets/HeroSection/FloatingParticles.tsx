import type { CSSProperties } from 'react'

const particles = [
  ['♥', 'left-[7%] top-[18%]', 'text-primary-400', '1.1rem', '7s', '0s', '0.28'],
  ['🐾', 'left-[18%] top-[72%]', 'text-secondary-400', '1.5rem', '8s', '-2s', '0.2'],
  ['✦', 'left-[42%] top-[22%]', 'text-accent-400', '1rem', '6s', '-1s', '0.35'],
  ['♥', 'left-[70%] top-[12%]', 'text-primary-300', '1.35rem', '9s', '-4s', '0.25'],
  ['🐾', 'left-[85%] top-[36%]', 'text-primary-500', '1.2rem', '7s', '-3s', '0.22'],
  ['✦', 'left-[78%] top-[78%]', 'text-accent-300', '1.15rem', '8s', '-5s', '0.3'],
  ['♥', 'left-[34%] top-[84%]', 'text-primary-400', '1rem', '7s', '-1.5s', '0.23'],
  ['🐾', 'left-[55%] top-[64%]', 'text-secondary-300', '1.25rem', '8s', '-2.5s', '0.24'],
] as const

export const FloatingParticles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {particles.map(([symbol, position, color, size, duration, delay, opacity], index) => (
      <span
        key={`${symbol}-${index}`}
        className={`particle ${position} ${color}`}
        style={{
          fontSize: size,
          '--duration': duration,
          '--delay': delay,
          '--opacity': opacity,
        } as CSSProperties}
      >
        {symbol}
      </span>
    ))}
  </div>
)
