import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'queue', num: '01',
    title: 'QR Queue Management',
    cat: 'Backend · Full Stack',
    tech: ['Node.js', 'PostgreSQL', 'React'],
    link: 'https://github.com/Achintya8/Queue_Management',
    image: '/smart_queue.png',
  },
  {
    id: 'attendance', num: '02',
    title: 'Attendance Management System',
    cat: 'Backend · REST API',
    tech: ['Spring Boot', 'MySQL', 'React'],
    link: 'https://github.com/Achintya8/Attendance_Management',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=380&fit=crop',
  },
  {
    id: 'routing', num: '03',
    title: 'Trust-Based Routing Algorithm',
    cat: 'Algorithms · Networking',
    tech: ['TCP/IP', 'Algorithms'],
    link: 'https://github.com/Achintya8/Intelligent-routing',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop',
  },
  {
    id: 'ipl', num: '04',
    title: 'IPL Power BI Dashboard',
    cat: 'Data Visualization',
    tech: ['Power BI', 'DAX'],
    link: 'https://github.com/Achintya8/IPL-Analysis-Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop',
  },
  {
    id: 'lumbar', num: '05',
    title: 'Lumbar Spine Diagnosis',
    cat: 'Deep Learning · CV',
    tech: ['Python', 'YOLOv8', 'CNN'],
    link: 'https://github.com/Achintya8/Lumbar-Spine-Diagnosis',
    image: '/lumbar_spine.png',
  },
]

export default function StoryProjects() {
  const containerRef = useRef(null)
  const previewRef = useRef(null)
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header and title reveal
      gsap.fromTo('.split-inner', 
        { y: '105%' },
        {
          y: '0%',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )

      // Stagger project row entries
      gsap.fromTo('.project-row', 
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-list',
            start: 'top 80%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Floating Image Cursor Inertia & Velocity Skew Animation
  useEffect(() => {
    const preview = previewRef.current
    if (!preview) return

    // GSAP quickTo setters for lag/inertia position updates
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.45, ease: 'power3.out' })
    
    // Scale and skew/rotation velocity trackers
    const scaleTo = gsap.quickTo(preview, 'scale', { duration: 0.35, ease: 'power3.out' })
    const rotateTo = gsap.quickTo(preview, 'rotation', { duration: 0.35, ease: 'power3.out' })

    let lastX = 0
    let lastY = 0

    const handleMouseMove = e => {
      // Offset position to keep it nicely aligned near cursor
      const offsetContainerX = e.clientX + 25
      const offsetContainerY = e.clientY - 100

      xTo(offsetContainerX)
      yTo(offsetContainerY)

      // Calculate speed/velocity of mouse movement
      const deltaX = e.clientX - lastX
      const deltaY = e.clientY - lastY
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      // Map velocity to a slight tilt skew and organic stretch
      const rotationAngle = gsap.utils.clamp(-15, 15, deltaX * 0.18)
      const dynamicScale = gsap.utils.clamp(1, 1.12, 1 + velocity * 0.0018)

      rotateTo(rotationAngle)
      scaleTo(dynamicScale)

      lastX = e.clientX
      lastY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleMouseEnterRow = (imageSrc, e) => {
    setActiveImage(imageSrc)
    
    // Animate preview image container reveal
    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    })

    // Dim out non-hovered siblings
    const rows = containerRef.current.querySelectorAll('.project-row')
    rows.forEach(row => {
      if (!row.contains(e.currentTarget)) {
        gsap.to(row, { opacity: 0.25, duration: 0.3 })
      } else {
        gsap.to(row, { opacity: 1, duration: 0.3 })
      }
    })
  }

  const handleMouseLeaveRow = () => {
    // Fade out preview image container
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.82,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: 'auto'
    })

    // Reset all row opacities back to normal
    const rows = containerRef.current.querySelectorAll('.project-row')
    rows.forEach(row => {
      gsap.to(row, { opacity: 1, duration: 0.3 })
    })
  }

  return (
    <section id="projects" ref={containerRef}>
      <div className="s-wrap" style={{ paddingBottom: '2rem' }}>
        <span className="s-num">04</span>
        <div className="s-label"><span>Work</span></div>
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
            className="project-row"
            style={{ opacity: 0 }}
            onMouseEnter={e => handleMouseEnterRow(p.image, e)}
            onMouseLeave={handleMouseLeaveRow}
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

      {/* GSAP-animated hover image preview container */}
      <div
        className="proj-preview"
        ref={previewRef}
        style={{
          opacity: 0,
          scale: 0.8,
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 350,
        }}
      >
        {activeImage && <img src={activeImage} alt="Project Showcase" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
    </section>
  )
}
