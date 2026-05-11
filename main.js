document.addEventListener('DOMContentLoaded', () => {
    const asciiBackground = document.getElementById('ascii-background');
    const flowers = [
        "  @\n\\|/\n |",
        " .:.\n- : -\n ' '",
        " ( )\n-+- \n( )",
        "  *\n / \\\n  |",
        "  _\n ( )\n  |"
    ];

    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'ascii-flower';
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        
        const startX = Math.random() * 100 + 'vw';
        const endX = (Math.random() * 100 - 10) + 'vw';
        const duration = (Math.random() * 20 + 15) + 's';
        const opacity = Math.random() * 0.5 + 0.3;
        const size = (Math.random() * 0.5 + 0.8) + 'rem';

        flower.style.setProperty('--startX', startX);
        flower.style.setProperty('--endX', endX);
        flower.style.setProperty('--duration', duration);
        flower.style.opacity = opacity;
        flower.style.fontSize = size;
        flower.style.left = startX;

        asciiBackground.appendChild(flower);

        // Remove flower after animation ends
        setTimeout(() => {
            flower.remove();
        }, parseFloat(duration) * 1000);
    }

    // Initial batch
    for(let i=0; i<40; i++) {
        setTimeout(createFlower, Math.random() * 5000);
    }

    // Continue spawning
    setInterval(createFlower, 1000);

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
