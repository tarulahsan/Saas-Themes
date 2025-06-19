// main.js - Core JavaScript functionalities

// Wait for the DOM to be fully loaded before initializing scripts
document.addEventListener('DOMContentLoaded', function() {

    // 1. Initialize Lozad.js for Lazy Loading
    // --------------------------------------------------
    // It will observe elements with the class 'lozad'
    // data-src for images, data-background-image for background images
    const observer = lozad('.lozad', {
        rootMargin: '200px 0px', // Load elements 200px before they enter the viewport
        threshold: 0.1,        // Load when 10% of the element is visible
        enableAutoReload: true, // For dynamic content
        loaded: function(el) {
            // Custom class on load
            el.classList.add('is-loaded');
            if (el.hasAttribute('data-background-image-set')) {
                el.style.backgroundImage = 'url(' + el.getAttribute('data-background-image-set') + ')';
            }
        }
    });
    observer.observe();
    console.log('Lozad initialized.');

    // 2. Initialize AOS (Animate On Scroll)
    // --------------------------------------------------
    AOS.init({
        duration: 800,       // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true,          // whether animation should happen only once - while scrolling down
        mirror: false,       // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
    console.log('AOS initialized.');

    // 3. Initialize Parsley.js for Form Validation
    // --------------------------------------------------
    // Forms that need validation should have the 'data-parsley-validate' attribute.
    // Example: $('form[data-parsley-validate]').parsley();
    // This will be applied more specifically when forms are created in templates.
    // For now, we ensure Parsley is loaded and can be called.
    if (typeof $ !== 'undefined' && typeof $.fn.parsley !== 'undefined') {
        console.log('Parsley.js loaded and ready to be attached to forms.');
        // Example of global attachment if you want all forms with the attribute to be validated:
        // $('form[data-parsley-validate]').each(function() {
        //     $(this).parsley();
        // });
    } else {
        console.warn('Parsley.js or jQuery not fully loaded for initialization in main.js.');
    }

    // 4. Mobile Navigation Toggle (Example)
    // --------------------------------------------------
    // This is a generic example. Bootstrap's navbar component handles its own toggle.
    // Use this if you build a custom navigation.
    const navToggle = document.querySelector('.mobile-nav-toggle'); // Needs a .mobile-nav-toggle button
    const primaryNav = document.querySelector('.primary-navigation'); // Needs a .primary-navigation ul/nav

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const visibility = primaryNav.getAttribute('data-visible');
            if (visibility === "false") {
                primaryNav.setAttribute('data-visible', true);
                navToggle.setAttribute('aria-expanded', true);
            } else {
                primaryNav.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
            }
            // Example: primaryNav.classList.toggle('active');
            console.log('Mobile nav toggled.');
        });
    }

    // 5. Placeholder for common Three.js setup (if any)
    // --------------------------------------------------
    // Specific Three.js scenes will likely be initialized per template or component.
    // if (typeof THREE !== 'undefined') {
    //     console.log('Three.js loaded.');
    //     // Example: initCommonScene();
    // }

    // 6. Placeholder for common GSAP animations (if any)
    // --------------------------------------------------
    // if (typeof gsap !== 'undefined') {
    //     console.log('GSAP loaded.');
    //     // Example: initCommonAnimations();
    // }

    // 7. Placeholder for Chart.js common configurations or helper functions
    // --------------------------------------------------
    // if (typeof Chart !== 'undefined') {
    //     console.log('Chart.js loaded.');
    //     // Example: Chart.defaults.font.family = 'Inter';
    // }

    // Add other global initializations or helper functions below

    console.log('main.js DOMContentLoaded complete.');
});

// Example of a globally accessible helper function (if needed)
function globalHelperFunction() {
    console.log("Global helper function called.");
}
// Template Specific JS for NeuroVision.html might go here or be inlined.
// For example, if NeuroVision's hero needs a complex Three.js scene:
// import { initNeuroVisionHero } from './neurovision-hero.js';
// initNeuroVisionHero();
