/**
 * Kevin Phon Portfolio - Functional Logic
 * Simple, efficient, and framework-free.
 */

document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // --- Mobile Navigation Toggle ---
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Basic animation for the hamburger menu
            mobileNavToggle.classList.toggle('open');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileNavToggle.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // --- Smooth Scrolling for Navigation ---
    // (Already handled by CSS scroll-behavior: smooth, but this handles offset for sticky header)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to sections
    document.querySelectorAll('.section-padding').forEach(section => {
        section.classList.add('fade-in-hidden');
        fadeInObserver.observe(section);
    });
});

// Add these styles dynamically for the fade-in effect
const style = document.createElement('style');
style.textContent = `
    .fade-in-hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: white;
            padding: 20px;
            border-bottom: 1px solid var(--border);
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        
        .mobile-nav-toggle.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .mobile-nav-toggle.open span:nth-child(2) { opacity: 0; }
        .mobile-nav-toggle.open span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
    }
`;
document.head.appendChild(style);
