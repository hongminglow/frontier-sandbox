export const useSmoothScroll = () => {
  const scrollToId = (id: string) => {
    const section = document.getElementById(id)

    if (!section) {
      return
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { scrollToId }
}
