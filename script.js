document.addEventListener('DOMContentLoaded', () => {

    // Header scroll effect
    const header = document.querySelector('#main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for nav links (already handled by CSS html { scroll-behavior: smooth; })
    // If more complex logic is needed, it can be added here.

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        fadeInObserver.observe(element);
    });

    // Project Accordion
    document.querySelectorAll('.accordion-toggle').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const accordionContent = button.closest('.project-card').querySelector('.accordion-content');
            const isOpening = !accordionContent.classList.contains('open');

            // Optional: Close all other accordions
            document.querySelectorAll('.accordion-content.open').forEach(openAccordion => {
                if (openAccordion !== accordionContent) {
                    openAccordion.classList.remove('open');
                    const otherButton = openAccordion.closest('.project-card').querySelector('.accordion-toggle');
                    otherButton.innerHTML = 'View Details &darr;';
                }
            });

            accordionContent.classList.toggle('open');
            button.innerHTML = isOpening ? 'Hide Details &uarr;' : 'View Details &darr;';
        });
    });

});
