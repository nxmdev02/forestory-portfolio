export const useSpotlightCard = () => {
  const updateSpotlight = (event: PointerEvent) => {
    if (!import.meta.client || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = event.currentTarget as HTMLElement | null
    if (!target) return

    const rect = target.getBoundingClientRect()
    target.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
    target.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
    target.style.setProperty('--spotlight-opacity', '1')
  }

  const clearSpotlight = (event: PointerEvent) => {
    const target = event.currentTarget as HTMLElement | null
    target?.style.setProperty('--spotlight-opacity', '0')
  }

  return {
    updateSpotlight,
    clearSpotlight
  }
}
