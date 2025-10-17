wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
wombat
// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
    }
});

// Custom cursor effect for hero sections
const heroSection = document.querySelector('.hero-secondary');
const heroCatering = document.querySelector('.hero-catering');
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

// Create trail elements
const trailLength = 8;
const trail = [];
for (let i = 0; i < trailLength; i++) {
    const trailElement = document.createElement('div');
    trailElement.className = 'cursor-trail';
    document.body.appendChild(trailElement);
    trail.push({
        element: trailElement,
        x: 0,
        y: 0,
        opacity: 0
    });
}

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Store previous cursor positions for trail
const positions = [];

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation with trail
function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Add current position to positions array
    positions.unshift({ x: cursorX, y: cursorY });
    
    // Keep only the positions we need for the trail
    if (positions.length > trailLength * 3) {
        positions.splice(trailLength * 3);
    }
    
    // Update trail elements
    trail.forEach((trailItem, index) => {
        const positionIndex = (index + 1) * 3; // Space out the trail
        if (positions[positionIndex]) {
            trailItem.x += (positions[positionIndex].x - trailItem.x) * 0.1;
            trailItem.y += (positions[positionIndex].y - trailItem.y) * 0.1;
            
            trailItem.element.style.left = trailItem.x + 'px';
            trailItem.element.style.top = trailItem.y + 'px';
            
            // Calculate opacity based on position in trail (fade out)
            const opacity = Math.max(0, 1 - (index / trailLength)) * 0.6;
            trailItem.element.style.opacity = opacity;
        }
    });
    
    requestAnimationFrame(animateCursor);
}

// Function to show custom cursor
function showCustomCursor() {
    cursor.style.opacity = '1';
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    
    // Show trail elements
    trail.forEach((trailItem) => {
        trailItem.element.style.visibility = 'visible';
        trailItem.element.style.opacity = '0.3';
    });
}

// Function to hide custom cursor
function hideCustomCursor() {
    cursor.style.opacity = '0';
    cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
    cursor.classList.remove('hover');
    cursor.classList.remove('clicked');
    
    // Hide trail elements completely
    trail.forEach((trailItem) => {
        trailItem.element.style.opacity = '0';
        trailItem.element.style.visibility = 'hidden';
    });
}

// Apply cursor effects to hero-secondary if it exists
if (heroSection) {
    heroSection.addEventListener('mouseenter', showCustomCursor);
    heroSection.addEventListener('mouseleave', hideCustomCursor);
    
    heroSection.addEventListener('mousedown', () => {
        cursor.classList.add('clicked');
    });
    
    heroSection.addEventListener('mouseup', () => {
        setTimeout(() => {
            cursor.classList.remove('clicked');
        }, 150);
    });
}

// Apply cursor effects to hero-catering if it exists
if (heroCatering) {
    heroCatering.addEventListener('mouseenter', showCustomCursor);
    heroCatering.addEventListener('mouseleave', hideCustomCursor);
    
    heroCatering.addEventListener('mousedown', () => {
        cursor.classList.add('clicked');
    });
    
    heroCatering.addEventListener('mouseup', () => {
        setTimeout(() => {
            cursor.classList.remove('clicked');
        }, 150);
    });
}

// Global mouseup to handle edge cases
document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicked');
});

// Handle button hover effects
const viewMoreBtn = document.querySelector('.view-more-btn');

if (viewMoreBtn) {
    viewMoreBtn.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    viewMoreBtn.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });

    // Handle button click effects (in addition to hero section clicks)
    viewMoreBtn.addEventListener('mousedown', () => {
        viewMoreBtn.classList.add('clicked');
        // cursor.classList.add('clicked') is already handled by hero section
    });

    viewMoreBtn.addEventListener('mouseup', () => {
        setTimeout(() => {
            viewMoreBtn.classList.remove('clicked');
            // cursor click effect is handled by hero section
        }, 150);
    });

    // Handle if mouse leaves button while pressed
    viewMoreBtn.addEventListener('mouseleave', () => {
        viewMoreBtn.classList.remove('clicked');
    });
}

// Start cursor animation
animateCursor();

// Smooth scroll to carousel function
function scrollToCarousel() {
    const carouselSection = document.getElementById('carousel-section');
    carouselSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

let list = document.querySelectorAll('.carousel .list .item');
let carousel = document.querySelector('.carousel');
let dots = document.querySelectorAll('.dots li');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

// Only initialize carousel if elements exist
if (nextBtn && prevBtn && list.length > 0 && carousel && dots.length > 0) {
    let lastPosition = list.length - 1;
    let active = 0;
    let zIndex = 2;

    nextBtn.onclick = () => {
        let newValue = active + 1 > lastPosition ? 0 : active + 1;
        setItemActive(newValue, showSlider);
    }
    prevBtn.onclick = () => {
        let newValue = active - 1 < 0 ? lastPosition : active - 1;
        setItemActive(newValue, showSlider);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setItemActive(index, showSlider);
        })
    })

    const setItemActive = (newValue, callbackFunction) => {
        if(newValue === active) return;
        let type = newValue > active ? 'next' : 'prev';
        active = newValue;
        callbackFunction(type);
    }
    let removeEffect;
    let autoRun = setTimeout(() => {
        nextBtn.click();
    }, 5000);
    const showSlider = (type) => {
        carousel.style.pointerEvents = 'none';
        // find Item Active Old
        let itemActiveOld = document.querySelector('.carousel .list .item.active');
        if(itemActiveOld) itemActiveOld.classList.remove('active');
        zIndex++;
        list[active].style.zIndex = zIndex;
        list[active].classList.add('active');

        if(type === 'next'){
            carousel.style.setProperty('--transform', '300px');
        }else{
            carousel.style.setProperty('--transform', '-300px');
        }
        carousel.classList.add('effect');

        // dots
        // find dot active old
        let dotActiveOld = document.querySelector('.dots li.active');
        if(dotActiveOld) dotActiveOld.classList.remove('active');
        dots[active].classList.add('active');

        clearTimeout(removeEffect);
        removeEffect = setTimeout(() => {
            carousel.classList.remove('effect');
            carousel.style.pointerEvents = 'auto';
        }, 1500);

        clearTimeout(autoRun);
        autoRun = setTimeout(() => {
            nextBtn.click();
        }, 5000);
    }
}

// Scroll animations for index-info sections
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.index-info section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Trigger animation when section is 70% visible
        if (rect.top <= windowHeight * 0.7 && rect.bottom >= windowHeight * 0.3) {
            section.classList.add('animate');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScrollAnimations);

// Check on page load in case sections are already in view
document.addEventListener('DOMContentLoaded', handleScrollAnimations);

// Smooth scroll to catering content
function scrollToCateringContent() {
    const cateringContent = document.getElementById('catering-content');
    if (cateringContent) {
        cateringContent.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scroll to form
function scrollToForm() {
    const form = document.querySelector('.form-background-section');
    if (form) {
        form.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== MENU PAGE FUNCTIONALITY =====

// Menu Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (menuNavBtns.length > 0) {
        menuNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                menuNavBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filter menu items
                menuItems.forEach(item => {
                    if (category === 'all') {
                        item.classList.remove('hidden');
                        // Re-trigger animation
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.animation = '';
                        }, 10);
                    } else {
                        if (item.getAttribute('data-category') === category) {
                            item.classList.remove('hidden');
                            // Re-trigger animation
                            item.style.animation = 'none';
                            setTimeout(() => {
                                item.style.animation = '';
                            }, 10);
                        } else {
                            item.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }
    
    // Menu Grid Scrolling with Arrows
    const menuPrevBtn = document.getElementById('menuPrev');
    const menuNextBtn = document.getElementById('menuNext');
    const menuGrid = document.querySelector('.menu-grid');
    
    if (menuPrevBtn && menuNextBtn && menuGrid) {
        console.log('Menu navigation initialized');
        
        menuNextBtn.addEventListener('click', function() {
            console.log('Next button clicked');
            // Each page shows 8 items (4 columns x 2 rows)
            // Each column is 300px + 32px gap = 332px
            // So we scroll 4 columns = 1328px
            const scrollAmount = (300 + 32) * 4;
            const currentScroll = menuGrid.scrollLeft;
            const newScroll = currentScroll + scrollAmount;
            
            console.log('Current scroll:', currentScroll, 'New scroll:', newScroll);
            
            menuGrid.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
            
            setTimeout(updateArrows, 400);
        });
        
        menuPrevBtn.addEventListener('click', function() {
            console.log('Prev button clicked');
            const scrollAmount = (300 + 32) * 4;
            const currentScroll = menuGrid.scrollLeft;
            const newScroll = Math.max(0, currentScroll - scrollAmount);
            
            console.log('Current scroll:', currentScroll, 'New scroll:', newScroll);
            
            menuGrid.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
            
            setTimeout(updateArrows, 400);
        });
        
        // Update when user manually scrolls
        menuGrid.addEventListener('scroll', function() {
            updateArrows();
        });
        
        function updateArrows() {
            const scrollLeft = menuGrid.scrollLeft;
            const maxScroll = menuGrid.scrollWidth - menuGrid.clientWidth;
            
            console.log('ScrollLeft:', scrollLeft, 'MaxScroll:', maxScroll, 'ScrollWidth:', menuGrid.scrollWidth, 'ClientWidth:', menuGrid.clientWidth);
            
            menuPrevBtn.disabled = scrollLeft <= 5;
            menuNextBtn.disabled = scrollLeft >= maxScroll - 5;
            
            console.log('Prev disabled:', menuPrevBtn.disabled, 'Next disabled:', menuNextBtn.disabled);
        }
        
        // Update on window resize
        window.addEventListener('resize', function() {
            updateArrows();
        });
        
        // Initial update
        setTimeout(updateArrows, 500);
    }
});

// Form submission handler
const cateringForm = document.querySelector('.form-background-section form');
if (cateringForm) {
    cateringForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Show success notification
        showNotification('Form submitted successfully! We will contact you soon.', 'success');
        
        // Reset the form
        cateringForm.reset();
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

