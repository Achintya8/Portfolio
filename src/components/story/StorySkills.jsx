import ChapterCover from '../ChapterCover'
import { useReveal } from '../../hooks/useReveal'

const SKILLS = [
  { title: 'Frontend',        tags: ['HTML5', 'CSS3', 'JavaScript', 'React'] },
  { title: 'Backend',         tags: ['Java', 'Spring Boot', 'Node.js', 'REST API'] },
  { title: 'Database',        tags: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { title: 'DevOps & Tools',  tags: ['Docker', 'Git', 'AWS', 'Power BI'] },
]

export default function StorySkills() {
  useReveal('#skills')

  return (
    <>
      <ChapterCover
        num="Chapter IV"
        title="Tools of the Trade"
        subtitle="The instruments that shape the craft."
        ambient="ch-skills"
      />

      <section id="skills" className="story-section">
        <span className="story-label reveal">Skills & Technologies</span>
        <div className="skills-chapters">
          {SKILLS.map(({ title, tags }, i) => (
            <div key={title} className={`skill-block reveal delay-${i + 1}`}>
              <p className="skill-block-title">{title}</p>
              <div className="skill-pills">
                {tags.map(tag => (
                  <span key={tag} className="skill-pill">{tag}</span>
                ))}
              </div>
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
