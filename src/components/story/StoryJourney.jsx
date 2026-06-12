import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    id: 'mca',
    year: '2025 – Present',
    title: 'Master of Computer Applications',
    org: 'RV College of Engineering, Bangalore',
    desc: 'Advanced Data Structures, Algorithms, DBMS, Web Dev, Machine Learning.',
    type: 'Education',
  },
  {
    id: 'kantar',
    year: 'Nov 2024 – Oct 2025',
    title: 'Analyst',
    org: 'Kantar, Bangalore',
    desc: 'Data analysis & visualization projects; automation scripts and dashboards to improve workflow efficiency.',
    type: 'Experience',
  },
  {
    id: 'bca',
    year: '2021 – 2024',
    title: 'Bachelor of Computer Applications',
    org: "St Joseph's College, Bangalore",
    desc: 'Specialized in Data Science with focus on statistical analysis and machine learning.',
    type: 'Education',
  },
]

export default function StoryJourney() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.s-label', 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      )

      // Staggered reveal of each journey block
      gsap.fromTo('.journey-item', 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.journey-list',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" className="s-wrap" ref={containerRef}>
      <span className="s-num">02</span>
      <div className="s-label" style={{ opacity: 0, transform: 'translateY(20px)' }}><span>Journey</span></div>

      <div className="journey-list">
        {ITEMS.map(item => (
          <div key={item.id} className="journey-item" style={{ opacity: 0 }}>
            <div>
              <div className="journey-year">{item.year}</div>
              <div className="journey-year" style={{ color: 'var(--muted)', marginTop: '.3rem' }}>
                {item.type}
              </div>
            </div>
            <div>
              <div className="journey-title">{item.title}</div>
              <div className="journey-org">{item.org}</div>
              <div className="journey-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
