import ChapterCover from '../ChapterCover'
import { useReveal } from '../../hooks/useReveal'

export default function StoryAbout() {
  useReveal('#about')

  return (
    <>
      <ChapterCover
        num="Chapter I"
        title="Who I Am"
        subtitle="Every great story starts with a character."
        ambient="ch-about"
      />

      <section id="about" className="story-section">
        <span className="story-label reveal">The Person</span>
        <blockquote className="story-quote reveal delay-1">
          "A passionate developer who enjoys creating things that live on the internet."
        </blockquote>
        <p className="story-body reveal delay-2">
          Hello! My name is Achintya K. My interest in web development started back in 2020
          when I decided to try building my first website — and I haven't stopped since.
        </p>
        <p className="story-body reveal delay-3">
          Fast-forward to today, and I've had the privilege of working on various projects
          that have helped me grow as a developer. My main focus is building accessible,
          inclusive products and digital experiences that make a real difference.
        </p>
      </section>

      <div className="ornament reveal">
        <div className="ornament-line" />
        <span className="ornament-glyph">✦</span>
        <div className="ornament-line" />
      </div>
    </>
  )
}
