// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navCenter = document.querySelector('.nav-center');
const navRight = document.querySelector('.nav-right');
const mobileOverlay = document.querySelector('.mobile-menu-overlay');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    navCenter.classList.toggle('active');
    navRight.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMenu);
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a, .contact-btn');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Event listeners
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Parallax effect for background text
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const backgroundText = document.querySelector('.background-text');
    if (backgroundText) {
        backgroundText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
    }
});
