// ===================================
// Language System
// ===================================

let currentLang = localStorage.getItem('lang') || 'ar';

function initLanguage() {
    currentLang = localStorage.getItem('lang') || 'ar';
    setLanguage(currentLang);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    const html = document.getElementById('html');
    const langToggle = document.getElementById('langToggle');
    
    if (lang === 'ar') {
        html.lang = 'ar';
        html.dir = 'rtl';
        langToggle.textContent = 'EN';
    } else {
        html.lang = 'en';
        html.dir = 'ltr';
        langToggle.textContent = 'العربية';
    }
    
    const title = document.querySelector('title');
    if (title) {
        title.textContent = title.getAttribute(`data-${lang}`);
    }
    
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        if (!element.querySelector('[data-ar][data-en]')) {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
}


const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
}


// ===================================
// PDF Functionality
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const viewPdfBtn = document.getElementById('viewPdfBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

    // View PDF Button - Ensure it works correctly
    if (viewPdfBtn) {
        viewPdfBtn.addEventListener('click', (e) => {
            // The link already has target="_blank" so it should work
            // But we can add a fallback if needed
            const pdfUrl = viewPdfBtn.getAttribute('href');
            console.log('Opening PDF:', pdfUrl);
            
            // Try to open, if blocked, fallback to same window
            try {
                const newWindow = window.open(pdfUrl, '_blank');
                if (!newWindow) {
                    // Popup blocked, open in same window
                    window.location.href = pdfUrl;
                }
            } catch (error) {
                console.error('Error opening PDF:', error);
                window.location.href = pdfUrl;
            }
        });
    }

    // Download PDF Button - Ensure download works
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', (e) => {
            // Ensure download attribute is set
            if (!downloadPdfBtn.hasAttribute('download')) {
                downloadPdfBtn.setAttribute('download', 'Mostafa-Ragab-CV-2025.pdf');
            }
            console.log('Downloading PDF...');
        });
    }
});

// ===================================
// Image Modal for Certificates
// ===================================

function openImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    
    if (modal && modalImg) {
        modal.style.display = 'flex';
        modalImg.src = src;
        captionText.textContent = alt || '';
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', () => {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('imageModal');
            if (modal && modal.style.display === 'flex') {
                closeImageModal();
            }
        }
    });
});

// ===================================
// Navigation Functionality
// ===================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===================================
// Scroll Effects
// ===================================

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow to navbar on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    if (currentScroll > 10) {
        navbar.classList.add('nav-shrink');
    } else {
        navbar.classList.remove('nav-shrink');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link
// ===================================

// Update active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// Smooth Scroll
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Observe education cards
const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateX(30px)';
    tag.style.transition = `all 0.5s ease ${index * 0.05}s`;
    observer.observe(tag);
});

// Observe achievement cards
const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe info cards
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

// Observe contact cards
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// ===================================
// Dynamic Year in Footer
// ===================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} مصطفى رجب. جميع الحقوق محفوظة.`;
}

// ===================================
// Loading Animation
// ===================================

window.addEventListener('load', () => {
    initLanguage();
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Keyboard Navigation
// ===================================

document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    
    // Press 'Home' to scroll to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(updateActiveNavLink, 10));

// ===================================
// Print Functionality
// ===================================

// Optimize page for printing
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections
    document.querySelectorAll('.timeline-content').forEach(content => {
        content.style.pageBreakInside = 'avoid';
    });
});

// ===================================
// Accessibility Enhancements
// ===================================

// Add ARIA labels dynamically
navLinks.forEach(link => {
    const text = link.textContent.trim();
    link.setAttribute('aria-label', `انتقل إلى قسم ${text}`);
});

// Focus management for mobile menu
navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        navLinks[0].focus();
    }
});

// ===================================
// Console Welcome Message
// ===================================

console.log('%c👋 مرحباً بك في حافظة أعمال مصطفى رجب', 'color: #1e3a8a; font-size: 20px; font-weight: bold;');
console.log('%c📧 للتواصل: morgb1997@gmail.com', 'color: #10b981; font-size: 14px;');
console.log('%c📱 الهاتف: +20 1028248115', 'color: #10b981; font-size: 14px;');

// ===================================
// Easter Egg - Konami Code
// ===================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 5000);
    }
});

// Rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
