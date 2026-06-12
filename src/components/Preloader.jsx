import { useEffect, useRef } from 'react'

const NAME = 'ACHINTYA K.'

export default function Preloader({ onDone }) {
  const barRef = useRef(null)

  useEffect(() => {
    const chars = document.querySelectorAll('.pre-char')
    // stagger char reveals
    chars.forEach((c, i) => {
      setTimeout(() => c.classList.add('up'), 100 + i * 60)
    })
    // expand bar after chars
    setTimeout(() => {
      if (barRef.current) barRef.current.classList.add('grow')
    }, 100 + NAME.length * 60 + 100)
    // exit
    setTimeout(() => {
      const el = document.getElementById('preloader')
      if (el) el.classList.add('exit')
      setTimeout(onDone, 1000)
    }, 100 + NAME.length * 60 + 900)
  }, [])

  return (
    <div id="preloader">
      <div className="pre-word">
        {NAME.split('').map((ch, i) => (
          <span key={i} className="pre-char">{ch === ' ' ? '\u00A0' : ch}</span>
        ))}
      </div>
      <div className="pre-bar" ref={barRef} />
    </div>
  )
}
