import { useEffect, useRef } from 'react'

/**
 * ChapterCover — Full-viewport chapter title panel.
 * @param {string}  num      e.g. "Chapter I"
 * @param {string}  title    e.g. "Who I Am"
 * @param {string}  subtitle Optional short blurb
 * @param {string}  ambient  CSS class for ambient background, e.g. "ch-about"
 */
export default function ChapterCover({ num, title, subtitle, ambient = '' }) {
  const coverRef = useRef(null)

  useEffect(() => {
    const el = coverRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('in-view')
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={coverRef} className={`chapter-cover ${ambient}`}>
      <span className="chapter-eyebrow">{num}</span>
      <h2 className="chapter-headline">{title}</h2>
      {subtitle && <p className="chapter-subtitle">{subtitle}</p>}
      <div className="chapter-divider" />
    </div>
  )
}
