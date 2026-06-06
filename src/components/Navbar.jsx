import { useEffect, useRef } from 'react'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    // Highlight active section in nav
    const sections = document.querySelectorAll('section[id]')
    const links    = navRef.current?.querySelectorAll('a[href^="#"]') ?? []

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(l => l.classList.remove('active'))
            const active = navRef.current?.querySelector(`a[href="#${entry.target.id}"]`)
            active?.classList.add('active')
          }
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef}>
      <ul>
        {['home','about','education','experience','skills','projects','contact'].map(id => (
          <li key={id}>
            <a href={`#${id}`} onClick={e => scrollTo(e, id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
        <li>
          <a
            href="https://drive.google.com/file/d/1fI_-TDJA_7Py3FWLJLYI9XI7nfSd0Orv/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="nav-resume-btn"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  )
}
