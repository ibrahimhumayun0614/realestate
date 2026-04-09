// Hero Video Logic
// Local video is handled by HTML5 video tag attributes (autoplay, loop, muted)

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Simple Log for Debugging
console.log('Saif Belhasa Real Estate Loaded');

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const navOverlay = document.getElementById('nav-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navOverlay.classList.toggle('active');
        // Prevent scroll when menu is open
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Portfolio Auto-Scroll Logic
const portfolioScroll = document.querySelector('.portfolio-scroll-container');
const portfolioGrid = document.querySelector('.portfolio-grid');
let scrollSpeed = 0.8; // Speed of the glide
let scrollPosition = 0;
let isHovered = false;

const startPortfolioAutoScroll = () => {
    if (!portfolioScroll || !portfolioGrid) return;
    
    // Clone items once for a seamless loop
    const items = Array.from(portfolioGrid.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        portfolioGrid.appendChild(clone);
    });

    const animateScroll = () => {
        if (!isHovered) {
            scrollPosition += scrollSpeed;
            if (scrollPosition >= portfolioGrid.scrollWidth / 2) {
                scrollPosition = 0;
            }
            portfolioScroll.scrollLeft = scrollPosition;
        }
        requestAnimationFrame(animateScroll);
    };

    portfolioScroll.addEventListener('mouseenter', () => isHovered = true);
    portfolioScroll.addEventListener('mouseleave', () => isHovered = false);
    portfolioScroll.addEventListener('touchstart', () => isHovered = true);
    portfolioScroll.addEventListener('touchend', () => isHovered = false);

    requestAnimationFrame(animateScroll);
};

// Initial trigger
window.addEventListener('load', () => {
    startPortfolioAutoScroll();
});

// Counter Animation Logic


// Counter Animation Logic
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Intersection Observer for Stats
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

// Phone Input Initialization
const phoneInput = document.querySelector("#phone");
if (phoneInput) {
    window.intlTelInput(phoneInput, {
        initialCountry: "ae",
        separateDialCode: true,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    });
}
