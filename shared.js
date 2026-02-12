// Load shared navigation and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load navigation
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
                // Re-initialize any nav-related scripts if needed
                initializeNavigation();
            })
            .catch(error => console.error('Error loading navigation:', error));
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});

// Initialize navigation functionality (hamburger menu, etc.)
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navCenter = document.querySelector('.nav-center');
    const navRight = document.querySelector('.nav-right');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');

    if (hamburger && navMenu && mobileOverlay) {
        const closeMenu = () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            if (navCenter) navCenter.classList.remove('active');
            if (navRight) navRight.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        };

        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navCenter) navCenter.classList.toggle('active');
            if (navRight) navRight.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            document.body.classList.toggle('menu-open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        mobileOverlay.addEventListener('click', function() {
            closeMenu();
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        hamburger.setAttribute('aria-expanded', 'false');
    }
}
