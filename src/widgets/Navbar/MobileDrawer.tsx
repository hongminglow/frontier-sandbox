import { useEffect, useRef } from 'react'
import { ThemeToggle } from '@features/theme-toggle'
import { Button } from '@shared/ui'
import { gsap } from '@shared/lib'
import { navigationItems, siteConfig } from '@shared/constants'

type MobileDrawerProps = {
  isOpen: boolean
  activeId: string
  onClose: () => void
  onNavigate: (id: string) => void
}

export const MobileDrawer = ({ isOpen, activeId, onClose, onNavigate }: MobileDrawerProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!panelRef.current) {
      return
    }

    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { x: '100%' },
        { x: 0, duration: 0.42, ease: 'power3.out' },
      )
      gsap.fromTo(
        panelRef.current.querySelectorAll('.drawer-link'),
        { x: 28, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, stagger: 0.05, delay: 0.12 },
      )
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden" aria-modal="true" role="dialog">
      <button
        type="button"
        className="absolute inset-0 bg-neutral-950/50"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="glass absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col gap-8 px-6 py-6 shadow-[var(--shadow-xl)]"
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-2xl font-extrabold">{siteConfig.brandName}</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-full text-2xl text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`drawer-link min-h-12 rounded-xl px-4 text-left font-semibold transition ${
                activeId === item.id
                  ? 'gradient-primary text-white'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex items-center justify-between gap-3">
          <ThemeToggle />
          <Button onClick={() => onNavigate('pricing')}>{siteConfig.primaryCta}</Button>
        </div>
      </div>
    </div>
  )
}
