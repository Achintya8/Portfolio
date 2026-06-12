import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StoryAbout() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      })

      tl.fromTo('.split-inner', 
        { y: '105%' },
        {
          y: '0%',
          stagger: 0.15,
          ease: 'power4.out',
          duration: 1.2
        }
      )
      .fromTo('.fade-up', 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power3.out',
          duration: 1.0
        }, 
        '-=0.8'
      )

      // Premium Stat Counter Count-up Animation
      const stats = [
        { id: 'stat-projects',   target: 5, suffix: '+' },
        { id: 'stat-experience', target: 1, suffix: 'yr' },
        { id: 'stat-degrees',    target: 2, suffix: '°' }
      ]

      stats.forEach(stat => {
        const el = document.getElementById(stat.id)
        if (!el) return
        
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          onUpdate: () => {
            el.innerHTML = `${Math.floor(obj.val)}<span>${stat.suffix}</span>`
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="s-wrap" ref={containerRef}>
      <span className="s-num">01</span>
      <div className="s-label fade-up" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <span>About</span>
      </div>

      <div className="about-grid">
        <div>
          <div className="split-wrap">
            <p className="about-display split-inner">I Build</p>
          </div>
          <div className="split-wrap">
            <p className="about-display split-inner">Things That</p>
          </div>
          <div className="split-wrap">
            <p className="about-display split-inner"><em>Matter.</em></p>
          </div>

          <div className="about-stat-row">
            <div>
              <div className="about-stat-num" id="stat-projects">0<span>+</span></div>
              <div className="about-stat-label">Projects Built</div>
            </div>
            <div>
              <div className="about-stat-num" id="stat-experience">0<span>yr</span></div>
              <div className="about-stat-label">Industry Exp.</div>
            </div>
            <div>
              <div className="about-stat-num" id="stat-degrees">0<span>°</span></div>
              <div className="about-stat-label">Degrees</div>
            </div>
          </div>
        </div>

        <div>
          <p className="about-body fade-up" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            Hello! I'm Achintya K — a passionate developer who enjoys creating
            things that live on the internet. My journey began in 2020 when I
            decided to build my very first website, and I haven't stopped since.
          </p>
          <p className="about-body fade-up" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            Today I focus on building accessible, inclusive products and digital
            experiences — from Spring Boot APIs to React frontends and beyond.
            Currently pursuing my MCA at RV College of Engineering, Bangalore.
          </p>
        </div>
      </div>
    </section>
  )
}
