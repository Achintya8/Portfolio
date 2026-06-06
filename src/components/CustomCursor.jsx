import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef     = useRef(null)
  const outlineRef = useRef(null)

  useEffect(() => {
    const dot     = dotRef.current
    const outline = outlineRef.current

    const onMove = e => {
      dot.style.left = `${e.clientX}px`
      dot.style.top  = `${e.clientY}px`
      outline.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 500, fill: 'forwards' }
      )
    }

    const addHover    = () => document.body.classList.add('hovering')
    const removeHover = () => document.body.classList.remove('hovering')

    const targets = document.querySelectorAll('a, button, .project-card-stack, .skill-category, input, textarea')
    targets.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return (
    <>
      <div className="cursor-dot"     ref={dotRef} />
      <div className="cursor-outline" ref={outlineRef} />
    </>
  )
}
