import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  duration: 0.8,
  ease: 'power2.out',
})

export const createScrollReveal = (targets: gsap.DOMTarget, options: gsap.TweenVars = {}) =>
  gsap.from(targets, {
    y: 60,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    ...options,
  })

export { gsap, ScrollTrigger }
