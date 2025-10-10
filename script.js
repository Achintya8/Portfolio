// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to nav items on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').slice(1) === current) {
            a.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .skill-category').forEach(el => {
    observer.observe(el);
});

// Horizontal Project Scroll
let currentProject = 0;
const totalProjects = 4;
let isScrolling = false;
let startX = 0;

const projectsContainer = document.querySelector('.projects-container');
const projectSlides = document.querySelectorAll('.project-slide');
const projectDots = document.querySelectorAll('.project-nav-dot');
const scrollHint = document.querySelector('.scroll-hint');
const projectsHeader = document.querySelector('.projects-section-header');

function updateProjectView(index) {
    if (index < 0 || index >= totalProjects) return;

    currentProject = index;
    const offset = -index * 100;
    projectsContainer.style.transform = `translateX(${offset}vw)`;

    // Update active states
    projectSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    projectDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Hide scroll hint after first interaction
    if (index > 0) {
        scrollHint.classList.add('hidden');
    }
}

function goToProject(index) {
    if (!isScrolling) {
        updateProjectView(index);
    }
}

// Wheel/scroll event for project navigation
let scrollTimeout;
document.querySelector('.projects-wrapper').addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isScrolling) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 || e.deltaX > 0) {
            // Scroll down/right - next project
            if (currentProject < totalProjects - 1) {
                isScrolling = true;
                updateProjectView(currentProject + 1);
                setTimeout(() => { isScrolling = false; }, 800);
            } else {
                // Exit projects section, scroll to next section
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Scroll up/left - previous project
            if (currentProject > 0) {
                isScrolling = true;
                updateProjectView(currentProject - 1);
                setTimeout(() => { isScrolling = false; }, 800);
            } else {
                // Exit projects section, scroll to previous section
                document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, 50);
}, { passive: false });

// Touch/swipe support for mobile
projectsContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

projectsContainer.addEventListener('touchmove', (e) => {
    if (!startX) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50 && !isScrolling) {
        isScrolling = true;
        if (diff > 0 && currentProject < totalProjects - 1) {
            updateProjectView(currentProject + 1);
        } else if (diff < 0 && currentProject > 0) {
            updateProjectView(currentProject - 1);
        }
        setTimeout(() => { isScrolling = false; }, 800);
        startX = 0;
    }
});

projectsContainer.addEventListener('touchend', () => {
    startX = 0;
});

// Keyboard navigation for projects
document.addEventListener('keydown', (e) => {
    // Check if we're in the projects section
    const projectsSection = document.getElementById('projects');
    const rect = projectsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

    if (!isInView || isScrolling) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentProject < totalProjects - 1) {
            isScrolling = true;
            updateProjectView(currentProject + 1);
            setTimeout(() => { isScrolling = false; }, 800);
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentProject > 0) {
            isScrolling = true;
            updateProjectView(currentProject - 1);
            setTimeout(() => { isScrolling = false; }, 800);
        }
    }
});

// Show/hide projects header based on scroll
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            projectsHeader.classList.add('visible');
        } else {
            projectsHeader.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

projectsObserver.observe(document.querySelector('.projects-wrapper'));