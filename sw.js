// sw.js - PWA Service Worker for Background Functionality
const CACHE_NAME = 'safety-tracker-v1';
const urlsToCache = [
    '/',
    '/index.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Background sync for SOS (when network returns)
self.addEventListener('sync', event => {
    if (event.tag === 'sos-sync') {
        event.waitUntil(syncSOSData());
    }
});

async function syncSOSData() {
    // Sync pending SOS data when online
    console.log('Syncing SOS data...');
}
