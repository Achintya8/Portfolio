const SKILLS = [
  { title: 'Frontend',       tags: ['HTML5', 'CSS3', 'JavaScript'] },
  { title: 'Backend',        tags: ['Java', 'Spring Boot', 'REST API'] },
  { title: 'Database',       tags: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { title: 'DevOps & Tools', tags: ['Docker', 'Git', 'AWS'] },
]

export default function Skills() {
  return (
    <section id="skills">
      <h2>Skills &amp; Technologies</h2>
      <div className="skills-grid">
        {SKILLS.map(({ title, tags }) => (
          <div key={title} className="skill-category">
            <h3>{title}</h3>
            <div>
              {tags.map(tag => <span key={tag} className="skill-tag">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
