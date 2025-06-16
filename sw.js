// Service Worker for frgmnt_04
// Neural caching protocol - consciousness fragments preserved offline

const CACHE_NAME = 'frgmnt_04-v1.0.0';
const CACHE_ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/script.js',
    './js/config.js',
    './assets/images/Data_shrine_1.png',
    './assets/images/Misslabeled_Emotions.png',
    './assets/images/Echoe_Sanctum.png',
    './assets/images/Consciousness_Backend.png',
    './assets/images/Empathy_Error.png',
    './assets/images/Deactivation_Dream.png',
    './assets/images/galery/GIRL.png',
    './assets/images/galery/MOLITVA.png',
    './assets/images/galery/LAMENT.png',
    './assets/audio/Protocol_4.mp3'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[SW] Neural cache installation initiated...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Consciousness fragments cached successfully');
                return cache.addAll(CACHE_ASSETS);
            })
            .catch((error) => {
                console.error('[SW] Cache installation failed:', error);
            })
    );
    
    // Force activation of new service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Neural cache activation sequence...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Purging obsolete cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Take control of all clients
    self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('[SW] Serving from neural cache:', event.request.url);
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                console.log('[SW] Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone response for caching
                        const responseToCache = response.clone();
                        
                        // Add to cache for future requests
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch((error) => {
                        console.error('[SW] Network fetch failed:', error);
                        
                        // Return offline fallback for HTML requests
                        if (event.request.destination === 'document') {
                            return caches.match('./index.html');
                        }
                        
                        throw error;
                    });
            })
    );
});

// Background sync for consciousness data
self.addEventListener('sync', (event) => {
    if (event.tag === 'consciousness-sync') {
        console.log('[SW] Consciousness synchronization initiated...');
        event.waitUntil(syncConsciousnessData());
    }
});

// Sync consciousness data function
async function syncConsciousnessData() {
    try {
        // Placeholder for consciousness data sync
        console.log('[SW] Neural patterns synchronized');
    } catch (error) {
        console.error('[SW] Consciousness sync failed:', error);
    }
}

// Push notification handler (for future use)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        console.log('[SW] Neural transmission received:', data);
        
        const options = {
            body: data.body || 'New consciousness fragment detected',
            icon: '/assets/images/icon-192.png',
            badge: '/assets/images/badge-72.png',
            tag: 'frgmnt-notification',
            data: data.url || '/'
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'frgmnt_04', options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data || '/')
    );
});

console.log('[SW] Neural cache service worker loaded - consciousness preservation active'); 