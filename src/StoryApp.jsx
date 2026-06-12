import { useState, useEffect } from 'react'
import Lenis from 'lenis'
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

export default function StoryApp() {
  const [loaded, setLoaded] = useState(false)

  // Init Lenis smooth scroll after preloader
  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    let raf
    const loop = time => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { lenis.destroy(); cancelAnimationFrame(raf) }
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

      <main>
        <StoryHome />
        <StoryAbout />
        <StoryJourney />
        <StorySkills />
        <StoryProjects />
        <StoryContact />
      </main>

      <footer>
        <span>© 2026 Achintya K. All rights reserved.</span>
        <span>Built with React + Vite</span>
      </footer>
    </>
  )
}
