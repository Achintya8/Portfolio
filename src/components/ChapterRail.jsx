import { useEffect, useRef } from 'react'

const CHAPTERS = [
  { id: 'prologue',   label: 'Prologue' },
  { id: 'about',      label: 'Ch I · Who I Am' },
  { id: 'education',  label: 'Ch II · Foundation' },
  { id: 'experience', label: 'Ch III · First Steps' },
  { id: 'skills',     label: 'Ch IV · Tools' },
  { id: 'projects',   label: 'Ch V · The Work' },
  { id: 'contact',    label: 'Epilogue' },
]

export default function ChapterRail() {
  const railRef = useRef(null)

  useEffect(() => {
    const dots = railRef.current?.querySelectorAll('.rail-dot') ?? []

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            dots.forEach(d => d.classList.remove('active'))
            const dot = railRef.current?.querySelector(`.rail-dot[data-id="${entry.target.id}"]`)
            dot?.classList.add('active')
          }
        })
      },
      { threshold: 0.4 }
    )

    CHAPTERS.forEach(ch => {
      const el = document.getElementById(ch.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav id="chapter-rail" ref={railRef} aria-label="Chapter navigation">
      {CHAPTERS.map(ch => (
        <button
          key={ch.id}
          className="rail-dot"
          data-id={ch.id}
          data-label={ch.label}
          onClick={() => scrollTo(ch.id)}
          aria-label={`Jump to ${ch.label}`}
        />
      ))}
    </nav>
  )
}
