import './story.css'
import ParticleCanvas from './components/ParticleCanvas'
import CustomCursor from './components/CustomCursor'
import ReadingProgressBar from './components/ReadingProgressBar'
import ChapterRail from './components/ChapterRail'
import StoryHome from './components/story/StoryHome'
import StoryAbout from './components/story/StoryAbout'
import StoryEducation from './components/story/StoryEducation'
import StoryExperience from './components/story/StoryExperience'
import StorySkills from './components/story/StorySkills'
import StoryProjects from './components/story/StoryProjects'
import StoryContact from './components/story/StoryContact'
import Footer from './components/Footer'

export default function StoryApp() {
  return (
    <>
      {/* Fixed UI */}
      <ReadingProgressBar />
      <ParticleCanvas />
      <CustomCursor />
      <ChapterRail />

      {/* Narrative */}
      <main>
        <StoryHome />
        <StoryAbout />
        <StoryEducation />
        <StoryExperience />
        <StorySkills />
        <StoryProjects />
        <StoryContact />
      </main>

      <Footer />
    </>
  )
}
