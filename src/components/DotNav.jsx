import { useEffect, useRef } from 'react'

const SECTIONS = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: '01 About' },
  { id: 'journey',  label: '02 Journey' },
  { id: 'skills',   label: '03 Skills' },
  { id: 'projects', label: '04 Work' },
  { id: 'contact',  label: '05 Contact' },
]

export default function DotNav() {
  const navRef = useRef(null)

  useEffect(() => {
    const dots = navRef.current?.querySelectorAll('.dnav-dot') ?? []
    const obs  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          dots.forEach(d => d.classList.remove('active'))
          navRef.current?.querySelector(`.dnav-dot[data-id="${e.target.id}"]`)?.classList.add('active')
        }
      })
    }, { threshold: 0.4 })
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div id="dot-nav" ref={navRef} aria-label="Section navigation">
      {SECTIONS.map(s => (
        <button
          key={s.id}
          className="dnav-dot"
          data-id={s.id}
          data-label={s.label}
          aria-label={s.label}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
        />
      ))}
    </div>
  )
}
