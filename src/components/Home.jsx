import { useEffect, useRef } from 'react'

const FULL_TEXT = "I build exceptional digital experiences that live on the web."

export default function Home() {
  const taglineRef = useRef(null)

  useEffect(() => {
    const el = taglineRef.current
    el.textContent = ''
    let i = 0
    let timeout

    const type = () => {
      if (i < FULL_TEXT.length) {
        el.textContent += FULL_TEXT.charAt(i++)
        timeout = setTimeout(type, 50)
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { type(); observer.disconnect() }
    })
    observer.observe(document.getElementById('home'))

    return () => { clearTimeout(timeout); observer.disconnect() }
  }, [])

  return (
    <section id="home">
      <div className="home-content">
        <div className="home-text">
          <p className="intro-text">Hi, I'm</p>
          <h1>Achintya K</h1>
          <p className="tagline" ref={taglineRef} />
          <button
            className="cta-button"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </button>
        </div>
        <div className="home-image">
          <img src="/profile.jpg" alt="Achintya K" />
        </div>
      </div>
      <div className="scroll-indicator">↓</div>
    </section>
  )
}
