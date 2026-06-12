import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ReadingProgressBar() {
  useEffect(() => {
    const tween = gsap.to('#reading-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1, // Slight lag for smooth progress update
      }
    })
    return () => tween.scrollTrigger?.kill()
  }, [])

  return <div id="reading-progress" />
}
