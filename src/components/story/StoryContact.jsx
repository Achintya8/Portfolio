import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StoryContact() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll triggered timeline for contact text and links
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
      .fromTo('.contact-link-btn', 
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power3.out',
          duration: 0.8
        }, 
        '-=0.6'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={containerRef}>
      <div className="s-label" style={{ marginBottom: '2.5rem' }}>
        <span>05 / Get In Touch</span>
      </div>

      <div className="contact-big">
        <div className="split-wrap">
          <span className="split-inner">LET'S</span>
        </div>
        <div className="split-wrap">
          <a
            className="split-inner"
            href="mailto:achintyak30@gmail.com"
            style={{ display: 'block' }}
          >
            TALK.
          </a>
        </div>
      </div>

      <div className="contact-links-row">
        <a href="tel:+917676375421"                                                className="contact-link-btn" style={{ opacity: 0, transform: 'translateY(25px)' }}>Phone</a>
        <a href="mailto:achintyak30@gmail.com"                                      className="contact-link-btn" style={{ opacity: 0, transform: 'translateY(25px)' }}>Email</a>
        <a href="https://www.linkedin.com/in/achintya-k" target="_blank" rel="noreferrer" className="contact-link-btn" style={{ opacity: 0, transform: 'translateY(25px)' }}>LinkedIn</a>
        <a href="https://github.com/Achintya8"           target="_blank" rel="noreferrer" className="contact-link-btn" style={{ opacity: 0, transform: 'translateY(25px)' }}>GitHub</a>
        <a
          href="https://drive.google.com/file/d/1fI_-TDJA_7Py3FWLJLYI9XI7nfSd0Orv/view"
          target="_blank" rel="noreferrer"
          className="contact-link-btn"
          style={{ opacity: 0, transform: 'translateY(25px)' }}
        >
          Resume ↗
        </a>
      </div>
    </section>
  )
}
