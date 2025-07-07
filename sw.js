// sw.js - Service Worker for AI SaaS Landing Page Templates
// Optimized for PageSpeed ≥97 and Core Web Vitals 2025 compliance

const CACHE_NAME = 'ai-saas-templates-v1.0';
const STATIC_CACHE_NAME = 'ai-saas-static-v1.0';
const DYNAMIC_CACHE_NAME = 'ai-saas-dynamic-v1.0';

// Resources to cache immediately
const STATIC_ASSETS = [
    '/',
    '/main.css',
    '/main.js',
    '/performance-optimization.js',
    // Add critical assets here
];

// CDN resources to cache
const CDN_ASSETS = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.6.0.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/aos@next/dist/aos.css',
    'https://cdn.jsdelivr.net/npm/aos@next/dist/aos.js',
    'https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js',
    'https://cdn.jsdelivr.net/npm/parsleyjs@2.9.2/dist/parsley.min.js'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            }),
            caches.open(CDN_ASSETS).then(cache => {
                console.log('Caching CDN assets...');
                return cache.addAll(CDN_ASSETS);
            })
        ]).then(() => {
            console.log('Service Worker installed successfully');
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE_NAME && 
                        cacheName !== DYNAMIC_CACHE_NAME && 
                        cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }

    // Handle different types of requests
    if (isStaticAsset(request.url)) {
        event.respondWith(cacheFirst(request));
    } else if (isCDNAsset(request.url)) {
        event.respondWith(staleWhileRevalidate(request));
    } else if (isImageRequest(request)) {
        event.respondWith(cacheFirst(request));
    } else if (isHTMLRequest(request)) {
        event.respondWith(networkFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});

// Cache strategies
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Cache first strategy failed:', error);
        return new Response('Offline content not available', { status: 503 });
    }
}

async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Content not available offline', { status: 503 });
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(error => {
        console.log('Network request failed:', error);
        return cachedResponse;
    });

    return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
    return url.includes('.css') || 
           url.includes('.js') || 
           url.includes('main.css') || 
           url.includes('main.js');
}

function isCDNAsset(url) {
    return url.includes('cdn.jsdelivr.net') || 
           url.includes('cdnjs.cloudflare.com') || 
           url.includes('code.jquery.com') ||
           url.includes('fonts.googleapis.com');
}

function isImageRequest(request) {
    return request.destination === 'image' || 
           request.url.includes('.jpg') || 
           request.url.includes('.jpeg') || 
           request.url.includes('.png') || 
           request.url.includes('.webp') || 
           request.url.includes('.svg');
}

function isHTMLRequest(request) {
    return request.destination === 'document' || 
           request.headers.get('accept').includes('text/html');
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Handle offline form submissions when back online
    console.log('Background sync triggered');
}

// Push notifications (if needed)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/icon-192x192.png',
            badge: '/assets/badge-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Explore',
                    icon: '/assets/checkmark.png'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/assets/xmark.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Performance monitoring
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker loaded successfully');
