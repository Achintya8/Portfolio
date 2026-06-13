import { useEffect, useRef } from 'react'
import { useReveal } from '../../hooks/useReveal'

const FULL_TEXT = 'I build exceptional digital experiences that live on the web.'

export default function StoryHome() {
  const taglineRef = useRef(null)
  useReveal('#prologue')

  useEffect(() => {
    const el = taglineRef.current
    if (!el) return
    el.textContent = ''
    let i = 0
    let timeout

    const type = () => {
      if (i < FULL_TEXT.length) {
        el.textContent += FULL_TEXT.charAt(i++)
        timeout = setTimeout(type, 45)
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { type(); observer.disconnect() }
    })
    const section = document.getElementById('prologue')
    if (section) observer.observe(section)

    return () => { clearTimeout(timeout); observer.disconnect() }
  }, [])

  return (
    <section id="prologue">
      <div className="prologue-inner">
        <div className="prologue-text">
          <span className="prologue-intro reveal">Hi, I'm</span>
          <h1 className="prologue-name reveal delay-1">
            Achintya <em>K</em>
          </h1>
          <p className="prologue-tagline reveal delay-2" ref={taglineRef} />
          <button
            className="prologue-cta reveal delay-3"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Read My Story ↓
          </button>
        </div>
        <div className="prologue-photo-wrap reveal delay-2">
          <img className="prologue-photo" src="/profile.jpg" alt="Achintya K" />
        </div>
      </div>
      <div className="scroll-hint">
        <span className="scroll-hint-arrow">↓</span>
        <span>scroll to begin</span>
      </div>
    </section>
  )
}
