import { useEffect } from 'react'

/**
 * Activates .reveal / .reveal-left / .reveal-right animations
 * for all elements within the given root selector (or document).
 */
export function useReveal(rootSelector = null) {
  useEffect(() => {
    const root = rootSelector ? document.querySelector(rootSelector) : document
    if (!root) return

    const els = root.querySelectorAll('.reveal, .reveal-left, .reveal-right')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
