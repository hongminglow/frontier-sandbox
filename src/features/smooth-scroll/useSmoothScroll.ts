let activeScrollFrame: number | null = null

const easeInOutCubic = (progress: number) =>
  progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

const getScrollDuration = (distance: number) => {
  const scaledDuration = Math.abs(distance) * 0.46

  return Math.min(Math.max(scaledDuration, 760), 2400)
}

const scrollToPosition = (targetTop: number) => {
  const startTop = window.scrollY
  const maxTop = document.documentElement.scrollHeight - window.innerHeight
  const finalTop = Math.max(0, Math.min(targetTop, maxTop))
  const distance = finalTop - startTop

  if (Math.abs(distance) < 2) {
    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, finalTop)
    return
  }

  if (activeScrollFrame !== null) {
    window.cancelAnimationFrame(activeScrollFrame)
  }

  const duration = getScrollDuration(distance)
  const startedAt = window.performance.now()

  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - startedAt) / duration, 1)
    const nextTop = startTop + distance * easeInOutCubic(progress)

    window.scrollTo(0, nextTop)

    if (progress < 1) {
      activeScrollFrame = window.requestAnimationFrame(step)
      return
    }

    activeScrollFrame = null
  }

  activeScrollFrame = window.requestAnimationFrame(step)
}

export const useSmoothScroll = () => {
  const scrollToId = (id: string) => {
    const section = document.getElementById(id)

    if (!section) {
      return
    }

    const headerOffset = 92
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerOffset

    scrollToPosition(sectionTop)
  }

  const scrollToTop = () => scrollToPosition(0)

  return { scrollToId, scrollToTop }
}
