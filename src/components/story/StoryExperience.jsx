import ChapterCover from '../ChapterCover'
import { useReveal } from '../../hooks/useReveal'

export default function StoryExperience() {
  useReveal('#experience')

  return (
    <>
      <ChapterCover
        num="Chapter III"
        title="First Steps"
        subtitle="Turning knowledge into impact."
        ambient="ch-experience"
      />

      <section id="experience" className="story-section">
        <span className="story-label reveal">Professional Experience</span>
        <div className="story-timeline">
          <div className="timeline-entry reveal delay-1">
            <div className="timeline-dot" />
            <p className="timeline-year">Nov 2024 – Oct 2025</p>
            <h3 className="timeline-role">Analyst</h3>
            <p className="timeline-org">Kantar, Bangalore</p>
            <p className="timeline-desc">
              Worked on data analysis and visualization projects, collaborating with
              cross-functional teams to deliver insights and solutions. Developed
              automation scripts and dashboards to improve workflow efficiency.
            </p>
          </div>
        </div>
      </section>

      <div className="ornament reveal">
        <div className="ornament-line" />
        <span className="ornament-glyph">✦</span>
        <div className="ornament-line" />
      </div>
    </>
  )
}
