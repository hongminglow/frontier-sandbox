import type { ReactNode } from 'react'
import { cn } from '@shared/lib'

type BadgeVariant = 'default' | 'popular' | 'new'

type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  pulse?: boolean
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-color)]',
  popular: 'gradient-primary text-white border-transparent shadow-[var(--shadow-glow)]',
  new: 'bg-accent-50 text-accent-700 border-accent-100 dark:bg-accent-900 dark:text-accent-100',
}

export const Badge = ({ children, variant = 'default', pulse = false, className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-bold',
      variants[variant],
      pulse && 'animate-pulse',
      className,
    )}
  >
    {children}
  </span>
)
