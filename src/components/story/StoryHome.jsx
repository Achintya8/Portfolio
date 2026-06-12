import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function StoryHome() {
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

      // Animate big name text slide up
      tl.to('.split-inner', {
        y: '0%',
        stagger: 0.15
      })
      // Animate top eyebrow text items
      .to('.hero-eyebrow-tag, .hero-eyebrow-year', {
        opacity: 0.7,
        y: 0,
        stagger: 0.1,
        duration: 1.0
      }, '-=0.9')
      // Animate role description and scroll button
      .to('.hero-role, .hero-scroll-btn', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.0
      }, '-=0.9')
    }, secRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={secRef}>
      {/* Top eyebrow row */}
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-tag" style={{ opacity: 0, transform: 'translateY(20px)' }}>Full Stack Developer</span>
        <span className="hero-eyebrow-year" style={{ opacity: 0, transform: 'translateY(20px)' }}>©&nbsp;2026</span>
      </div>

      {/* Giant name */}
      <div>
        <div className="split-wrap">
          <h1 className="hero-title split-inner">ACHINTYA</h1>
        </div>
        <div className="split-wrap">
          <h1 className="hero-title split-inner">
            <span className="accent">K.</span>
          </h1>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-foot">
        <p className="hero-role" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          Building exceptional digital experiences&nbsp;—&nbsp;
          one line of code at a time.
        </p>
        <button
          className="hero-scroll-btn"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Scroll
          <span className="hero-scroll-circle">↓</span>
        </button>
      </div>
    </section>
  )
}
