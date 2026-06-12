import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './story.css'

import Preloader         from './components/Preloader'
import AwardCursor       from './components/AwardCursor'
import ReadingProgressBar from './components/ReadingProgressBar'
import DotNav            from './components/DotNav'

import StoryHome     from './components/story/StoryHome'
import StoryAbout    from './components/story/StoryAbout'
import StoryJourney  from './components/story/StoryJourney'
import StorySkills   from './components/story/StorySkills'
import StoryProjects from './components/story/StoryProjects'
import StoryContact  from './components/story/StoryContact'

gsap.registerPlugin(ScrollTrigger)

export default function StoryApp() {
  const [loaded, setLoaded] = useState(false)

  // Init Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    if (!loaded) return
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Hook GSAP ticker to Lenis
    const updateScroll = time => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateScroll)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateScroll)
    }
  }, [loaded])

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <ReadingProgressBar />
      <AwardCursor />
      <DotNav />

      {/* Fixed header */}
      <header id="site-header">
        <span className="hdr-logo">Achintya K.</span>
        <a
          className="hdr-link"
          href="https://drive.google.com/file/d/1fI_-TDJA_7Py3FWLJLYI9XI7nfSd0Orv/view"
          target="_blank"
          rel="noreferrer"
        >
          Resume ↗
        </a>
      </header>

      {loaded && (
        <main>
          <StoryHome />
          <StoryAbout />
          <StoryJourney />
          <StorySkills />
          <StoryProjects />
          <StoryContact />
        </main>
      )}

      <footer>
        <span>© 2026 Achintya K. All rights reserved.</span>
        <span>Built with React + Vite</span>
      </footer>
    </>
  )
}
