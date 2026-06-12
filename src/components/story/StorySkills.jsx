import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROW1 = ['Node.js','React','Java','Spring Boot','Docker','PostgreSQL','AWS','MongoDB']
const ROW2 = ['HTML5','CSS3','JavaScript','MySQL','Python','YOLOv8','Power BI','Git']

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-outer">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {doubled.map((item, i) => (
          <span key={i} className={`marquee-item ${i % 3 === 2 ? 'dim' : ''}`}>
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function StorySkills() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo('.split-inner', 
        { y: '105%' },
        {
          y: '0%',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={containerRef}>
      <div className="skills-header s-wrap" style={{ paddingBottom: '2rem' }}>
        <span className="s-num">03</span>
        <div className="s-label"><span>Skills</span></div>
        <div className="split-wrap">
          <p className="about-display split-inner" style={{ marginBottom: '0' }}>
            Tools of the Trade.
          </p>
        </div>
      </div>
      <MarqueeRow items={ROW1} />
      <MarqueeRow items={ROW2} reverse />
    </section>
  )
}
