import ChapterCover from '../ChapterCover'
import { useReveal } from '../../hooks/useReveal'

export default function StoryContact() {
  useReveal('#contact')

  return (
    <>
      <ChapterCover
        num="Epilogue"
        title="Let's Connect"
        subtitle="Every great story invites a conversation."
        ambient="ch-epilogue"
      />

      <section id="contact" className="story-section">
        <div className="epilogue-inner">
          <p className="epilogue-message reveal">
            I'm currently open to new opportunities. Whether you have a project in mind,
            a question, or just want to say hello — my inbox is always open.
          </p>
          <div className="contact-links reveal delay-1">
            <a href="tel:+917676375421"                                              className="contact-link">📞 Phone</a>
            <a href="mailto:achintyak30@gmail.com"                                   className="contact-link">✉️ Email</a>
            <a href="https://www.linkedin.com/in/achintya-k" target="_blank" rel="noreferrer" className="contact-link">LinkedIn</a>
            <a href="https://github.com/Achintya8"           target="_blank" rel="noreferrer" className="contact-link">GitHub</a>
          </div>
        </div>
      </section>
    </>
  )
}
