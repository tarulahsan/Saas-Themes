// performance-optimization.js - Advanced Performance Optimizations for AI SaaS Templates
// Designed to achieve PageSpeed Score ≥97 and Core Web Vitals 2025 compliance

"use strict";

// Critical Performance Optimizations
(function() {
    // 1. Preload Critical Resources
    function preloadCriticalResources() {
        const criticalResources = [
            { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', as: 'style' },
            { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css', as: 'style' },
            { href: 'main.css', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    // 2. Optimize Font Loading
    function optimizeFontLoading() {
        // Use font-display: swap for better performance
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Inter:wght@400;700&family=Lexend:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap';
        fontLink.media = 'print';
        fontLink.onload = function() { this.media = 'all'; };
        document.head.appendChild(fontLink);
    }

    // 3. Defer Non-Critical JavaScript
    function deferNonCriticalJS() {
        const nonCriticalScripts = [
            'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
            'https://cdn.jsdelivr.net/npm/chart.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
        ];

        nonCriticalScripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            script.async = false;
            document.head.appendChild(script);
        });
    }

    // 4. Optimize Images with WebP Support
    function optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            // Check WebP support
            const supportsWebP = (function() {
                const canvas = document.createElement('canvas');
                return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            })();

            if (supportsWebP && img.dataset.src) {
                const webpSrc = img.dataset.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                img.dataset.src = webpSrc;
            }
        });
    }

    // 5. Implement Service Worker for Caching
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        }
    }

    // 6. Optimize Critical Rendering Path
    function optimizeCriticalRenderingPath() {
        // Remove render-blocking resources
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => {
            if (!link.href.includes('bootstrap') && !link.href.includes('main.css')) {
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
            }
        });
    }

    // 7. Implement Resource Hints
    function addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//cdn.jsdelivr.net' },
            { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    // 8. Optimize Third-Party Scripts
    function optimizeThirdPartyScripts() {
        // Delay third-party scripts until user interaction
        let userInteracted = false;
        
        const loadThirdPartyScripts = () => {
            if (userInteracted) return;
            userInteracted = true;

            // Load analytics and other third-party scripts
            const scripts = [
                // Add third-party script URLs here
            ];

            scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                document.head.appendChild(script);
            });
        };

        ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
            document.addEventListener(event, loadThirdPartyScripts, { once: true, passive: true });
        });
    }

    // 9. Implement Intersection Observer for Performance
    function implementIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-viewport');
                    // Trigger any performance-related actions
                }
            });
        }, observerOptions);

        // Observe sections for performance tracking
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    // 10. Core Web Vitals Optimization
    function optimizeCoreWebVitals() {
        // Largest Contentful Paint (LCP) optimization
        const lcpElements = document.querySelectorAll('img, video, .hero-section');
        lcpElements.forEach(element => {
            if (element.tagName === 'IMG') {
                element.loading = 'eager';
                element.fetchPriority = 'high';
            }
        });

        // Cumulative Layout Shift (CLS) optimization
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.width || !img.height) {
                img.style.aspectRatio = '16/9'; // Default aspect ratio
            }
        });

        // First Input Delay (FID) optimization
        document.addEventListener('DOMContentLoaded', () => {
            // Defer heavy computations
            requestIdleCallback(() => {
                // Initialize non-critical features
                console.log('Non-critical features initialized');
            });
        });
    }

    // Initialize all optimizations
    function init() {
        // Run immediately
        addResourceHints();
        preloadCriticalResources();
        optimizeFontLoading();
        optimizeCriticalRenderingPath();

        // Run after DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            optimizeImages();
            implementIntersectionObserver();
            optimizeCoreWebVitals();
            deferNonCriticalJS();
            optimizeThirdPartyScripts();
            
            // Register service worker after everything else
            setTimeout(registerServiceWorker, 1000);
        });
    }

    // Start optimization
    init();
})();

// Performance Monitoring
(function() {
    // Monitor Core Web Vitals
    function monitorCoreWebVitals() {
        // LCP
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });

        // CLS
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('CLS:', clsValue);
                }
            });
        }).observe({ entryTypes: ['layout-shift'] });
    }

    // Initialize monitoring
    if (typeof PerformanceObserver !== 'undefined') {
        monitorCoreWebVitals();
    }
})();
