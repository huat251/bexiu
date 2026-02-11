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
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');

    if (hamburger && navMenu && mobileOverlay) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}
