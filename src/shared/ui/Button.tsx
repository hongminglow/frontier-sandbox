import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@shared/lib'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'gradient-primary text-white shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-lg)]',
  secondary:
    'bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-[var(--shadow-md)]',
  ghost: 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]',
  outline:
    'bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-secondary-900',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition duration-300 hover:-translate-y-0.5 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      sizes[size],
      className,
    )}
    {...props}
  >
    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20 transition duration-500 group-hover:translate-x-full" />
    <span className="relative inline-flex items-center gap-2">{children}</span>
  </button>
)
