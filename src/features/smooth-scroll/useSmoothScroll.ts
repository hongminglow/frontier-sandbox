export const useSmoothScroll = () => {
  const scrollToId = (id: string) => {
    const section = document.getElementById(id)

    if (!section) {
      return
    }

    const headerOffset = 92
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(sectionTop, 0),
      behavior: 'smooth',
    })
  }

  return { scrollToId }
}
