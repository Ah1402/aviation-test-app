// Service Worker for Offline Support
// Improvements:
// - Cache-first for assets
// - Navigation fallback to cached index.html / offline.html for SPA-like behavior
// - Dynamic caching for runtime resources (CDNs)

const CACHE_VERSION = 'v68';
const CACHE_NAME = `aviation-test-app-${CACHE_VERSION}`;

const urlsToCache = [
    './',
    './index.html',
    './offline.html',
    // Styles & images
    './src/styles/main.css',
    './src/images/logo.jpg',
    // Data files (LAST403 and helpers)
    './src/data/last403_explanations_import.js',
    './src/data/testData.js',
    './src/data/agk_word_import.js',
    './src/data/instrumentation_source.html',
    './src/data/fixed_questions.html',
    './fixed questions.htm',
    // Core scripts
    './src/scripts/build_from_last403_only.js',
    './src/scripts/merge_added_imports.js',
    './src/scripts/merge_import.js',
    './src/scripts/aiProviders.js',
    './src/scripts/aiInit.js',
    './src/scripts/testEngine.js',
    './src/scripts/searchIndex.js',
    './src/scripts/searchEngineUpdater.js',
    './src/scripts/cameraSearch.js',
    './src/scripts/ui.js',
    './src/scripts/main.js',
    './src/scripts/syncVerbatim.js',
    './src/scripts/applyCorrections.js',
    './src/scripts/sanitizeImports.js',
    './src/scripts/dataExtractor.js',
    './src/scripts/init.js',
    './src/scripts/updateStats.js',
    './src/scripts/specialTests.js',
    // CDN fallback (will be cached during install if reachable)
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install - pre-cache the app shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching app shell');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Activate - remove old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('Service Worker: Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch - navigation requests: return cached index.html or offline.html
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // For navigation requests (HTML pages), try network then fallback to cache, finally offline.html
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // If we got a valid response, update the cache and return it
                    if (response && response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', responseClone));
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match('./index.html').then((cached) => cached || caches.match('./offline.html'));
                })
        );
        return;
    }

    // For other requests, use cache-first strategy, then network fallback and dynamic cache
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request)
                .then((networkResponse) => {
                    // Only cache valid GET responses
                    if (!networkResponse || networkResponse.status !== 200 || request.method !== 'GET') {
                        return networkResponse;
                    }

                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone).catch((err) => {
                            // Some requests (opaque responses from CDN) may fail to be put; ignore
                            console.warn('Service Worker: Dynamic cache put failed', err);
                        });
                    });

                    return networkResponse;
                })
                .catch(() => {
                    // If request is for an image, optionally return a placeholder; otherwise, nothing
                    if (request.destination === 'image') {
                        return caches.match('./src/images/logo.jpg');
                    }
                    return caches.match(request);
                });
        })
    );
});

// Allow the page to trigger skipWaiting via postMessage
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
