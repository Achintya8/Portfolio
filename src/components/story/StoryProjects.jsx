import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    id:'queue', num:'01',
    title:'QR Queue Management',
    cat:'Backend · Full Stack',
    tech:['Node.js','PostgreSQL','React'],
    link:'https://github.com/Achintya8/Queue_Management',
    image:'/smart_queue.png',
  },
  {
    id:'attendance', num:'02',
    title:'Attendance Management System',
    cat:'Backend · REST API',
    tech:['Spring Boot','MySQL','React'],
    link:'https://github.com/Achintya8/Attendance_Management',
    image:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=380&fit=crop',
  },
  {
    id:'routing', num:'03',
    title:'Trust-Based Routing Algorithm',
    cat:'Algorithms · Networking',
    tech:['TCP/IP','Algorithms'],
    link:'https://github.com/Achintya8/Intelligent-routing',
    image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop',
  },
  {
    id:'ipl', num:'04',
    title:'IPL Power BI Dashboard',
    cat:'Data Visualization',
    tech:['Power BI','DAX'],
    link:'https://github.com/Achintya8/IPL-Analysis-Dashboard',
    image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop',
  },
  {
    id:'lumbar', num:'05',
    title:'Lumbar Spine Diagnosis',
    cat:'Deep Learning · CV',
    tech:['Python','YOLOv8','CNN'],
    link:'https://github.com/Achintya8/Lumbar-Spine-Diagnosis',
    image:'/lumbar_spine.png',
  },
]

export default function StoryProjects() {
  const ref = useRef(null)
  const [preview, setPreview] = useState({ show: false, src: '', x: 0, y: 0 })

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

  const handleMove = (e, src) => {
    setPreview({ show: true, src, x: e.clientX + 24, y: e.clientY - 100 })
  }

  return (
    <section id="projects" ref={ref}>
      <div className="s-wrap" style={{ paddingBottom: '2rem' }}>
        <span className="s-num">04</span>
        <div className="s-label fade-up"><span>Work</span></div>
        <div className="split-wrap">
          <p className="about-display split-inner">Selected Projects.</p>
        </div>
      </div>

      <div className="projects-list" style={{ padding: '0 3rem 4rem' }}>
        {PROJECTS.map((p, i) => (
          <a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className={`project-row fade-up d${i % 4 + 1}`}
            onMouseMove={e => handleMove(e, p.image)}
            onMouseLeave={() => setPreview(v => ({ ...v, show: false }))}
          >
            <span className="proj-num">{p.num}</span>
            <div className="proj-info">
              <div className="proj-title">{p.title}</div>
              <div className="proj-cat">{p.cat}</div>
            </div>
            <div className="proj-tech">
              {p.tech.map(t => <span key={t} className="proj-tag">{t}</span>)}
            </div>
            <span className="proj-arrow">↗</span>
          </a>
        ))}
      </div>

      {/* Hover image preview */}
      <div
        className={`proj-preview ${preview.show ? 'show' : ''}`}
        style={{ left: preview.x, top: preview.y, transform: 'none' }}
      >
        <img src={preview.src} alt="" />
      </div>
    </section>
  )
}
