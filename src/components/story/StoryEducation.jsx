import ChapterCover from '../ChapterCover'
import { useReveal } from '../../hooks/useReveal'

const EDUCATION = [
  {
    id: 'mca',
    role: 'Master of Computer Applications (MCA)',
    org: 'RV College of Engineering, Bangalore',
    year: '2025 – Present',
    desc: 'Relevant Coursework: Advanced Data Structures, Algorithms, Database Management, Web Development, Machine Learning.',
  },
  {
    id: 'bca',
    role: 'Bachelor of Computer Applications (BCA)',
    org: "St Joseph's College, Bangalore",
    year: '2021 – 2024',
    desc: 'Specialized in Data Science with focus on statistical analysis and machine learning applications.',
  },
]

export default function StoryEducation() {
  useReveal('#education')

  return (
    <>
      <ChapterCover
        num="Chapter II"
        title="The Foundation"
        subtitle="Where curiosity became craft."
        ambient="ch-education"
      />

      <section id="education" className="story-section">
        <span className="story-label reveal">Academic Journey</span>
        <div className="story-timeline">
          {EDUCATION.map((item, i) => (
            <div key={item.id} className={`timeline-entry reveal delay-${i + 1}`}>
              <div className="timeline-dot" />
              <p className="timeline-year">{item.year}</p>
              <h3 className="timeline-role">{item.role}</h3>
              <p className="timeline-org">{item.org}</p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
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
