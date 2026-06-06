import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particlesArray = []
    const mouse = { x: null, y: null }
    const colors = ['#d946ef', '#8b5cf6', '#06b6d4']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    class Particle {
      constructor(x, y, dx, dy, size, color) {
        Object.assign(this, { x, y, dx, dy, size, color })
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy
        this.x += this.dx
        this.y += this.dy
        const dist = Math.hypot(mouse.x - this.x, mouse.y - this.y)
        if (dist < 150) {
          const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x)
          this.x -= Math.cos(angle)
          this.y -= Math.sin(angle)
        }
        this.draw()
      }
    }

    function init() {
      particlesArray = []
      const count = (canvas.height * canvas.width) / 9000
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1
        particlesArray.push(new Particle(
          Math.random() * (canvas.width - size * 4) + size * 2,
          Math.random() * (canvas.height - size * 4) + size * 2,
          (Math.random() - 0.5),
          (Math.random() - 0.5),
          size,
          colors[Math.floor(Math.random() * colors.length)]
        ))
      }
    }

    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const dist = dx * dx + dy * dy
          const threshold = (canvas.width / 7) * (canvas.height / 7)
          if (dist < threshold) {
            const opacity = 1 - dist / 20000
            ctx.strokeStyle = `rgba(139,92,246,${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    let rafId
    function animate() {
      rafId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesArray.forEach(p => p.update())
      connect()
    }

    const onMouseMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)
    resize()
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="particle-canvas" ref={canvasRef} />
}
