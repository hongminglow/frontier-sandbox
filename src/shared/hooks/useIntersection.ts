import { useEffect, useState } from 'react'

export const useIntersection = (sectionIds: string[], rootMargin = '-45% 0px -45% 0px') => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id)
        }
      },
      { rootMargin, threshold: 0.1 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [rootMargin, sectionIds])

  return activeId
}
