import { useEffect, useRef } from 'react'

export default function StoryHome() {
  const secRef = useRef(null)

  useEffect(() => {
    const splits = secRef.current?.querySelectorAll('.split-inner') ?? []
    const fades  = secRef.current?.querySelectorAll('.fade-up') ?? []
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          splits.forEach(el => el.classList.add('up'))
          fades.forEach(el  => el.classList.add('up'))
          obs.disconnect()
        }
      })
    }, { threshold: 0.1 })
    if (secRef.current) obs.observe(secRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="hero" ref={secRef}>
      {/* Top eyebrow row */}
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-tag fade-up">Full Stack Developer</span>
        <span className="hero-eyebrow-year fade-up">©&nbsp;2026</span>
      </div>

      {/* Giant name */}
      <div>
        <div className="split-wrap">
          <h1 className="hero-title split-inner">ACHINTYA</h1>
        </div>
        <div className="split-wrap">
          <h1 className="hero-title split-inner d1">
            <span className="accent">K.</span>
          </h1>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-foot">
        <p className="hero-role fade-up d2">
          Building exceptional digital experiences&nbsp;—&nbsp;
          one line of code at a time.
        </p>
        <button
          className="hero-scroll-btn fade-up d3"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Scroll
          <span className="hero-scroll-circle">↓</span>
        </button>
      </div>
    </section>
  )
}
