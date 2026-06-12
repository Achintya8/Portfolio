import { useEffect, useRef } from 'react'

const ITEMS = [
  {
    id:'mca', year:'2025 – Present',
    title:'Master of Computer Applications',
    org:'RV College of Engineering, Bangalore',
    desc:'Advanced Data Structures, Algorithms, DBMS, Web Dev, Machine Learning.',
    type:'Education',
  },
  {
    id:'kantar', year:'Nov 2024 – Oct 2025',
    title:'Analyst',
    org:'Kantar, Bangalore',
    desc:'Data analysis & visualization projects; automation scripts and dashboards to improve workflow efficiency.',
    type:'Experience',
  },
  {
    id:'bca', year:'2021 – 2024',
    title:'Bachelor of Computer Applications',
    org:"St Joseph's College, Bangalore",
    desc:'Specialized in Data Science with focus on statistical analysis and machine learning.',
    type:'Education',
  },
]

export default function StoryJourney() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        ref.current?.querySelectorAll('.fade-up').forEach(el => el.classList.add('up'))
        obs.disconnect()
      }
    }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="journey" className="s-wrap" ref={ref}>
      <span className="s-num">02</span>
      <div className="s-label fade-up"><span>Journey</span></div>

      <div className="journey-list">
        {ITEMS.map((item, i) => (
          <div key={item.id} className={`journey-item fade-up d${i + 1}`}>
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
