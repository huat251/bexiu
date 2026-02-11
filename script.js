// Render Product Cards from Data
function renderProductCards() {
    const container = document.getElementById('cardShowcaseContainer');
    if (!container || typeof productsData === 'undefined') return;
    
    container.innerHTML = '';
    
    productsData.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'showcase-card';
        card.setAttribute('data-tag', product.tag);
        card.setAttribute('data-title', product.title.replace(/<br>/g, ' '));
        card.setAttribute('data-image', product.image);
        card.setAttribute('data-images', product.images.join('|'));
        card.setAttribute('data-description', product.description);
        card.setAttribute('data-features', product.features.join('|'));
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="card-content">
                <span class="card-tag">${product.tag}</span>
                <h3 class="card-title">${product.title}</h3>
                <button class="card-btn">EXPLORE →</button>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Re-attach event listeners to newly created buttons
    attachExploreButtonListeners();
}

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

// Product Detail Overlay Functionality
const productOverlay = document.getElementById('productOverlay');
const overlayClose = document.getElementById('overlayClose');
let currentImageIndex = 0;
let currentImages = [];

// Function to attach event listeners to explore buttons
function attachExploreButtonListeners() {
    const exploreButtons = document.querySelectorAll('.card-btn');
    exploreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.showcase-card');
            openProductOverlay(card);
        });
    });
}

// Function to update main image
function updateMainImage(index) {
    if (!currentImages || currentImages.length === 0) return;
    
    currentImageIndex = index;
    const mainImage = document.getElementById('overlayImage');
    mainImage.src = currentImages[currentImageIndex];
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Function to navigate gallery
function navigateGallery(direction) {
    if (!currentImages || currentImages.length === 0) return;
    
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    } else if (direction === 'prev') {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    }
    
    updateMainImage(currentImageIndex);
}

// Function to open overlay with product details
function openProductOverlay(card) {
    const tag = card.getAttribute('data-tag');
    const title = card.getAttribute('data-title');
    const image = card.getAttribute('data-image');
    const imagesStr = card.getAttribute('data-images');
    const description = card.getAttribute('data-description');
    const features = card.getAttribute('data-features');
    
    // Parse images
    currentImages = imagesStr ? imagesStr.split('|') : [image];
    currentImageIndex = 0;
    
    // Update overlay content
    document.getElementById('overlayTag').textContent = tag;
    document.getElementById('overlayTitle').textContent = title;
    document.getElementById('overlayImage').src = currentImages[0];
    document.getElementById('overlayDescription').textContent = description;
    
    // Create thumbnails
    const thumbnailsContainer = document.getElementById('overlayThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    if (currentImages.length > 1) {
        currentImages.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${title} - Image ${index + 1}`;
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => updateMainImage(index));
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
    
    // Update features list
    const featuresList = document.getElementById('overlayFeatures');
    featuresList.innerHTML = '';
    if (features) {
        const featuresArray = features.split('|');
        featuresArray.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }
    
    // Show overlay
    productOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close overlay
function closeProductOverlay() {
    productOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close overlay when clicking close button
if (overlayClose) {
    overlayClose.addEventListener('click', closeProductOverlay);
}

// Close overlay when clicking outside the content
if (productOverlay) {
    productOverlay.addEventListener('click', (e) => {
        if (e.target === productOverlay) {
            closeProductOverlay();
        }
    });
}

// Close overlay with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productOverlay.classList.contains('active')) {
        closeProductOverlay();
    }
});


// Initialize: Render product cards when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProductCards();
});