document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .content-section, .hero-illustration');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll for TOC links
    document.querySelectorAll('.toc-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for the hero illustration
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        const heroIllustration = document.querySelector('.hero-illustration');
        if (heroIllustration) {
            heroIllustration.style.transform = `translateY(${scroll * 0.15}px)`;
        }
    });
});
