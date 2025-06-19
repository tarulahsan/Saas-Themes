// main.js - Core JavaScript functionalities for AI SaaS Landing Page Templates
// Document Version: 1.0
// Last Updated: $(date +%Y-%m-%d)

// Strict mode helps catch common coding errors and "unsafe" actions.
"use strict";

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed. Initializing scripts...');

    // 1. Initialize Lozad.js for Lazy Loading
    // --------------------------------------------------
    // Lozad.js is a light-weight, high-performance lazy loader.
    // It observes elements with the class 'lozad'.
    // - For images: use data-src="path/to/image.jpg"
    // - For background images: use data-background-image="path/to/image.jpg"
    // - For responsive images: data-src="image.png" data-srcset="image.png 1x, image-2x.png 2x"
    if (typeof lozad !== 'undefined') {
        const observer = lozad('.lozad', {
            rootMargin: '200px 0px', // Start loading 200px before element enters viewport
            threshold: 0.1,        // Load when at least 10% of the element is visible
            enableAutoReload: true, // Useful for dynamically added content
            loaded: function(el) {
                el.classList.add('is-loaded'); // Optional: Add a class when loaded
                // Example for background images if using a different attribute for the final src
                // if (el.hasAttribute('data-background-image-set')) {
                //     el.style.backgroundImage = 'url(' + el.getAttribute('data-background-image-set') + ')';
                // }
                console.log('Lozad loaded:', el.tagName, el.dataset.src || el.dataset.backgroundImage);
            }
        });
        observer.observe();
        console.log('Lozad.js initialized.');
    } else {
        console.warn('Lozad.js library not found.');
    }

    // 2. Initialize AOS (Animate On Scroll)
    // --------------------------------------------------
    // AOS library handles animations that trigger on scroll.
    // Add 'data-aos="animation-name"' to HTML elements.
    // E.g., data-aos="fade-up", data-aos-delay="100", data-aos-duration="1000"
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,          // Default animation duration in ms
            easing: 'ease-in-out',  // Default easing function
            once: true,             // Whether animation should happen only once - while scrolling down
            mirror: false,          // Whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // Defines which position of the element regarding window should trigger animation
            // offset: 120,         // Optional: offset (in px) from the original trigger point
        });
        console.log('AOS (Animate On Scroll) initialized.');
    } else {
        console.warn('AOS library not found.');
    }

    // 3. Initialize Parsley.js for Form Validation
    // --------------------------------------------------
    // Parsley.js is a powerful, UX-focused JavaScript form validation library.
    // - Add 'data-parsley-validate' to your <form> element.
    // - Add validation attributes to form fields (e.g., required, data-parsley-type="email").
    // - IMPORTANT: Parsley needs to be initialized on each specific form.
    //   Example (typically done in the HTML template's script tag or a page-specific JS file):
    //   if ($('#yourFormId').length) {
    //       $('#yourFormId').parsley().on('form:submit', function() {
    //           // Handle successful form submission (e.g., AJAX call)
    //           // return false; // To prevent default browser submission
    //       }).on('form:error', function() {
    //           // Handle form errors
    //       });
    //   }
    if (typeof $ !== 'undefined' && typeof $.fn.parsley !== 'undefined') {
        console.log('Parsley.js loaded and ready. Ensure forms are initialized individually (e.g., $("#formId").parsley()).');
    } else {
        console.warn('Parsley.js or jQuery not fully loaded. Parsley initialization might fail.');
    }

    // 4. Mobile Navigation Toggle (Example for Custom Navigation)
    // --------------------------------------------------
    // The templates primarily use Bootstrap's built-in navbar, which handles its own toggling.
    // This is a generic example if a custom mobile navigation solution were implemented.
    const customNavToggle = document.querySelector('.custom-mobile-nav-toggle'); // Example class
    const customPrimaryNav = document.querySelector('.custom-primary-navigation'); // Example class

    if (customNavToggle && customPrimaryNav) {
        customNavToggle.addEventListener('click', () => {
            const isVisible = customPrimaryNav.getAttribute('data-visible') === 'true';
            customPrimaryNav.setAttribute('data-visible', !isVisible);
            customNavToggle.setAttribute('aria-expanded', !isVisible);
            console.log('Custom mobile navigation toggled.');
        });
    }

    // 5. GSAP (GreenSock Animation Platform) Availability
    // --------------------------------------------------
    // GSAP core is included via CDN in common_head.html.
    // Specific animations using GSAP should be implemented per template or component
    // due to their custom nature.
    if (typeof gsap !== 'undefined') {
        console.log('GSAP library loaded and available for custom animations.');
        // Example: gsap.to(".some-element", { duration: 1, x: 100 });
    } else {
        console.warn('GSAP library not found.');
    }

    // 6. Chart.js Availability
    // --------------------------------------------------
    // Chart.js is included via CDN.
    // Specific charts should be initialized in the template where they are used.
    // Example:
    // const ctx = document.getElementById('myChart');
    // if (ctx) {
    //   new Chart(ctx, { type: 'bar', data: {...}, options: {...} });
    // }
    if (typeof Chart !== 'undefined') {
        console.log('Chart.js library loaded and available for creating charts.');
        // You can set global defaults here if needed:
        // Chart.defaults.font.family = "'Inter', sans-serif";
        // Chart.defaults.borderColor = 'rgba(0,0,0,0.1)';
    } else {
        console.warn('Chart.js library not found.');
    }

    console.log('main.js: All primary initializations complete.');
}); // End of DOMContentLoaded

// --- Three.js Hero Background Example ---
// To use this, ensure you have a div with id, e.g., <div id="threejs-hero-background"></div>
// in your HTML, and then call: initThreeJSExample('threejs-hero-background');
// This is a VERY basic example. For complex scenes, manage scripts per template.
// This function is defined globally for potential use but is commented out by default
// to prevent errors if THREE is not always needed or if a template has its own setup.
/*
function initThreeJSExample(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('Three.js example: Container not found:', containerId);
        return;
    }
    if (typeof THREE === 'undefined') {
        console.warn('Three.js library not found. Cannot initialize example for:', containerId);
        return;
    }

    // Basic scene setup
    const scene = new THREE.Scene();

    // Adjust camera based on container aspect ratio
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha: true for transparent background over HTML
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Adjust for device pixel ratio
    container.innerHTML = ''; // Clear any placeholder content
    container.appendChild(renderer.domElement);

    // Example: A simple rotating group of cubes
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // Smaller cubes
    for (let i = 0; i < 5; i++) {
        const material = new THREE.MeshStandardMaterial({
            color: Math.random() * 0xffffff,
            roughness: 0.5,
            metalness: 0.5
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
        );
        cube.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        group.add(cube);
    }
    scene.add(group);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        group.rotation.x += 0.003;
        group.rotation.y += 0.003;
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize to keep the scene responsive
    const onWindowResize = () => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    }
    window.addEventListener('resize', onWindowResize, false);

    console.log('Basic Three.js example initialized for container:', containerId);

    // Return a cleanup function if needed for SPAs or dynamic content removal
    return () => {
        window.removeEventListener('resize', onWindowResize);
        if(renderer.domElement.parentElement) renderer.domElement.parentElement.removeChild(renderer.domElement);
        renderer.dispose(); // Dispose of resources
        // Any other cleanup
    };
}

// Example of how you might call it on a specific page after DOMContentLoaded:
// document.addEventListener('DOMContentLoaded', function() {
//     const heroBackground = document.getElementById('threejs-hero-background');
//     if (heroBackground) {
//         initThreeJSExample('threejs-hero-background');
//     }
// });
*/
