import ChapterCover from '../ChapterCover'
import ScrollStack, { ScrollStackItem } from '../ScrollStack/ScrollStack'

const PROJECTS = [
  {
    id: 'queue',
    image: '/smart_queue.png',
    category: 'Backend · Full Stack',
    title: 'QR Based Queue-Management System',
    date: 'October 2025',
    description:
      'Designed and developed a QR-based queue management system to streamline and digitize customer flow. Implemented QR generation & scanning so users can join queues remotely, cutting physical wait times. Built real-time token tracking with PostgreSQL and a React frontend.',
    tech: ['Node.js', 'PostgreSQL', 'React', 'QR Generation'],
    link: 'https://github.com/Achintya8/Queue_Management',
  },
  {
    id: 'attendance',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    category: 'Backend · REST API',
    title: 'Attendance Management System',
    date: 'Dec 2025 – Jan 2026',
    description:
      'Database-driven system streamlining student tracking and reporting. Spring Boot REST API handles registration, attendance recording and report generation against a MySQL backend.',
    tech: ['Spring Boot', 'React', 'MySQL', 'REST API'],
    link: 'https://github.com/Achintya8/Attendance_Management',
  },
  {
    id: 'routing',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    category: 'Algorithms · Networking',
    title: 'Trust-Based Routing Algorithm',
    date: 'Dec 2025 – Jan 2026',
    description:
      'Designed and implemented a trust-based routing algorithm for secure data transmission. Uses TCP/IP concepts to identify and avoid unreliable nodes, evaluated across path cost, reliability, and efficiency metrics.',
    tech: ['TCP/IP', 'Algorithms', 'Network Simulation'],
    link: 'https://github.com/Achintya8/Intelligent-routing',
  },
  {
    id: 'ipl',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'Data Visualization',
    title: 'IPL Power BI Dashboard',
    date: '2025',
    description:
      'Interactive dashboard providing deep insights into IPL matches. Visualizes team performance, player statistics and match trends using advanced Power BI features and custom DAX measures.',
    tech: ['Power BI', 'DAX', 'Data Analysis'],
    link: 'https://github.com/Achintya8/IPL-Analysis-Dashboard',
  },
  {
    id: 'lumbar',
    image: '/lumbar_spine.png',
    category: 'Image Processing · Deep Learning',
    title: 'Lumbar Spine Disease Diagnosis',
    date: '2025',
    description:
      'Automated detection system for lumbar spine herniations and bulges using YOLOv8, achieving 78% accuracy. Pre-processed DICOM images with manual labelling for clinical decision support.',
    tech: ['Python', 'Deep Learning', 'CNN', 'YOLOv8'],
    link: 'https://github.com/Achintya8/Lumbar-Spine-Diagnosis',
  },
]

export default function StoryProjects() {
  return (
    <>
      <ChapterCover
        num="Chapter V"
        title="The Work"
        subtitle="Stories told through code."
        ambient="ch-projects"
      />

      <div id="projects" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollStack
          useWindowScroll={true}
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={28}
          stackPosition="18%"
          scaleEndPosition="8%"
          baseScale={0.87}
          rotationAmount={0}
          blurAmount={0}
        >
          {PROJECTS.map(p => (
            <ScrollStackItem key={p.id} itemClassName="story-project-card">
              <div className="stack-card-inner">
                <div className="stack-card-image">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="stack-card-content">
                  <p className="project-category">{p.category}</p>
                  <h3>{p.title}</h3>
                  <p className="stack-card-date">{p.date}</p>
                  <p className="project-description">{p.description}</p>
                  <div className="project-tech">
                    {p.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
                      GitHub →
                    </a>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      <div className="ornament">
        <div className="ornament-line" />
        <span className="ornament-glyph">✦</span>
        <div className="ornament-line" />
      </div>
    </>
  )
}
