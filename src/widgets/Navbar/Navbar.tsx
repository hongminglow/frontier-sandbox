import { useEffect, useMemo, useState } from 'react'
import { ThemeToggle } from '@features/theme-toggle'
import { useSmoothScroll } from '@features/smooth-scroll'
import { useIntersection } from '@shared/hooks'
import { cn } from '@shared/lib'
import { navigationItems, siteConfig } from '@shared/constants'
import { Button } from '@shared/ui'
import { MobileDrawer } from './MobileDrawer'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const sectionIds = useMemo(() => navigationItems.map((item) => item.id), [])
  const activeId = useIntersection(sectionIds)
  const { scrollToId, scrollToTop } = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigate = (id: string) => {
    scrollToId(id)
    setIsDrawerOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          isScrolled ? 'py-2' : 'py-4',
        )}
      >
        <div className="section-shell">
          <div
            className={cn(
              'glass mx-auto flex items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-5',
              isScrolled ? 'min-h-16 shadow-[var(--shadow-lg)]' : 'min-h-20 shadow-sm',
            )}
          >
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex min-h-11 items-center gap-2 rounded-full pr-3 font-heading text-xl font-extrabold text-[var(--text-primary)]"
              aria-label="Go to top"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full gradient-primary text-lg text-white shadow-[var(--shadow-glow)]">
                🐾
              </span>
              {siteConfig.brandName}
            </button>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={cn(
                    'min-h-11 rounded-full px-3 text-sm font-semibold transition lg:px-4',
                    activeId === item.id
                      ? 'bg-primary-50 text-primary-600 dark:bg-secondary-900 dark:text-primary-100'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <Button onClick={() => navigate('pricing')}>Get Started</Button>
            </div>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex size-11 flex-col items-center justify-center gap-1.5 rounded-full text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] md:hidden"
            >
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        activeId={activeId}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={navigate}
      />
    </>
  )
}
