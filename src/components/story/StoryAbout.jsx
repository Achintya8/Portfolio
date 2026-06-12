import { useEffect, useRef } from 'react'

function useRevealSection(ref) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        ref.current?.querySelectorAll('.split-inner').forEach(el => el.classList.add('up'))
        ref.current?.querySelectorAll('.fade-up').forEach(el => el.classList.add('up'))
        obs.disconnect()
      }
    }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
}

export default function StoryAbout() {
  const ref = useRef(null)
  useRevealSection(ref)

  return (
    <section id="about" className="s-wrap" ref={ref}>
      <span className="s-num">01</span>
      <div className="s-label fade-up">
        <span>About</span>
      </div>

      <div className="about-grid">
        <div>
          <div className="split-wrap">
            <p className="about-display split-inner">I Build</p>
          </div>
          <div className="split-wrap">
            <p className="about-display split-inner d1">Things That</p>
          </div>
          <div className="split-wrap">
            <p className="about-display split-inner d2"><em>Matter.</em></p>
          </div>

          <div className="about-stat-row">
            <div>
              <div className="about-stat-num">5<span>+</span></div>
              <div className="about-stat-label">Projects Built</div>
            </div>
            <div>
              <div className="about-stat-num">1<span>yr</span></div>
              <div className="about-stat-label">Industry Exp.</div>
            </div>
            <div>
              <div className="about-stat-num">2<span>°</span></div>
              <div className="about-stat-label">Degrees</div>
            </div>
          </div>
        </div>

        <div>
          <p className="about-body fade-up d2">
            Hello! I'm Achintya K — a passionate developer who enjoys creating
            things that live on the internet. My journey began in 2020 when I
            decided to build my very first website, and I haven't stopped since.
          </p>
          <p className="about-body fade-up d3">
            Today I focus on building accessible, inclusive products and digital
            experiences — from Spring Boot APIs to React frontends and beyond.
            Currently pursuing my MCA at RV College of Engineering, Bangalore.
          </p>
        </div>
      </div>
    </section>
  )
}
