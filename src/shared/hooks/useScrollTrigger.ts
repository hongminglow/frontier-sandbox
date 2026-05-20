import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@shared/lib/gsapConfig'

type ScrollAnimation = (
  element: HTMLElement,
  gsapInstance: typeof gsap,
  scrollTrigger: typeof ScrollTrigger,
) => void

export const useScrollTrigger = <T extends HTMLElement = HTMLElement>(animation: ScrollAnimation) => {
  const containerRef = useRef<T | null>(null)

  useEffect(() => {
    const element = containerRef.current

    if (!element) {
      return undefined
    }

    const context = gsap.context(() => {
      animation(element, gsap, ScrollTrigger)
    }, element)
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.cancelAnimationFrame(refreshId)
      context.revert()
    }
  }, [animation])

  return containerRef
}
