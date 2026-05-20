import type { ReactNode } from 'react'
import { cn } from '@shared/lib'

export const GradientText = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn('gradient-text', className)}>{children}</span>
)
