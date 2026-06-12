import { useEffect, useRef } from 'react'

export default function AwardCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY } }

    const loop = () => {
      // dot follows exactly
      dot.style.transform  = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`
      // ring lags
      ring.current.x += (pos.current.x - ring.current.x) * 0.14
      ring.current.y += (pos.current.y - ring.current.y) * 0.14
      rng.style.transform  = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`
      raf.current = requestAnimationFrame(loop)
    }

    const onEnter = () => document.body.classList.add('link-hover')
    const onLeave = () => document.body.classList.remove('link-hover')

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[role=button]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    raf.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div id="cursor">
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </div>
  )
}
