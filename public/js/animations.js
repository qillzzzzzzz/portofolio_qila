// Scroll Animations using Intersection Observer

document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that we want to reveal on scroll
    const reveals = document.querySelectorAll('.reveal');

    // Configuration for the observer
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it enters fully
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to start CSS transition
                entry.target.classList.add('active');

                // If this is a skill card or container with skill-progress, trigger width animation
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                if (progressBars.length > 0) {
                    progressBars.forEach(bar => {
                        const percent = bar.getAttribute('data-percent');
                        if (percent) {
                            bar.style.width = percent;
                        }
                    });
                }

                // Stop observing this element once it is revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Start observing all reveal elements
    reveals.forEach(element => {
        revealObserver.observe(element);
    });

    // Fallback: If browser doesn't support IntersectionObserver, reveal all immediately
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(element => {
            element.classList.add('active');
            const progressBars = element.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                if (percent) bar.style.width = percent;
            });
        });
    }
});
