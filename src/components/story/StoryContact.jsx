import { useEffect, useRef } from 'react'

export default function StoryContact() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        ref.current?.querySelectorAll('.split-inner,.fade-up').forEach(el => el.classList.add('up'))
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref}>
      <div className="s-label fade-up" style={{ marginBottom: '2.5rem' }}>
        <span>05 / Get In Touch</span>
      </div>

      <div className="contact-big">
        <div className="split-wrap">
          <span className="split-inner">LET'S</span>
        </div>
        <div className="split-wrap">
          <a
            className="split-inner d1"
            href="mailto:achintyak30@gmail.com"
            style={{ display: 'block' }}
          >
            TALK.
          </a>
        </div>
      </div>

      <div className="contact-links-row">
        <a href="tel:+917676375421"                                                className="contact-link-btn fade-up d1">Phone</a>
        <a href="mailto:achintyak30@gmail.com"                                      className="contact-link-btn fade-up d2">Email</a>
        <a href="https://www.linkedin.com/in/achintya-k" target="_blank" rel="noreferrer" className="contact-link-btn fade-up d3">LinkedIn</a>
        <a href="https://github.com/Achintya8"           target="_blank" rel="noreferrer" className="contact-link-btn fade-up d4">GitHub</a>
        <a
          href="https://drive.google.com/file/d/1fI_-TDJA_7Py3FWLJLYI9XI7nfSd0Orv/view"
          target="_blank" rel="noreferrer"
          className="contact-link-btn fade-up d4"
        >
          Resume ↗
        </a>
      </div>
    </section>
  )
}
