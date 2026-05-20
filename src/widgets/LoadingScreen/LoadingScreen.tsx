import { useEffect, useRef, useState } from 'react'
import { gsap } from '@shared/lib'
import { siteConfig } from '@shared/constants'

type LoadingScreenProps = {
  onComplete: () => void
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const screenRef = useRef<HTMLDivElement | null>(null)
  const leftPawRef = useRef<HTMLSpanElement | null>(null)
  const rightPawRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (leftPawRef.current && rightPawRef.current) {
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.05 })
        .to(leftPawRef.current, { y: -10, rotate: -5, duration: 0.3, yoyo: true, repeat: 1 })
        .to(rightPawRef.current, { y: -10, rotate: 5, duration: 0.3, yoyo: true, repeat: 1 }, '-=0.15')
    }

    gsap.fromTo(
      '.loading-letter',
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.045, delay: 0.15, duration: 0.45 },
    )
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) => Math.min(currentProgress + 4, 88))
    }, 70)

    const image = new Image()
    image.src = '/dog-portraits-sheet.png'

    const imageReady = image.decode?.().catch(() => undefined) ?? Promise.resolve()
    const fontReady = document.fonts?.ready ?? Promise.resolve()
    const minimumDisplay = new Promise((resolve) => window.setTimeout(resolve, 1500))

    Promise.all([imageReady, fontReady, minimumDisplay]).then(() => {
      window.clearInterval(intervalId)
      setProgress(100)

      window.setTimeout(() => {
        if (!screenRef.current) {
          setIsVisible(false)
          onComplete()
          return
        }

        gsap.to(screenRef.current, {
          scale: 1.05,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsVisible(false)
            onComplete()
          },
        })
      }, 220)
    })

    return () => window.clearInterval(intervalId)
  }, [onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden gradient-primary px-6 text-white"
    >
      <div className="flex items-center gap-2 text-5xl" aria-hidden="true">
        <span ref={leftPawRef}>🐾</span>
        <span ref={rightPawRef}>🐾</span>
      </div>
      <div className="mt-6 flex font-heading text-4xl font-extrabold sm:text-5xl" aria-label={siteConfig.brandName}>
        {siteConfig.brandName.split('').map((letter, index) => (
          <span className="loading-letter" key={`${letter}-${index}`}>
            {letter}
          </span>
        ))}
      </div>
      <div className="mt-8 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/25">
        <div className="relative h-full rounded-full bg-white" style={{ width: `${progress}%` }}>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-100 to-transparent opacity-70 [animation:shimmer_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  )
}
