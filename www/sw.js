// Service Worker for Offline Support
// Mirror of root sw.js: cache-first assets, navigation fallback and dynamic caching

const CACHE_VERSION = 'v66';
const CACHE_NAME = `aviation-test-app-${CACHE_VERSION}`;

const urlsToCache = [
    './',
    './index.html',
    './offline.html',
    './src/styles/main.css',
    './src/images/logo.jpg',
    './src/data/last403_explanations_import.js',
    './src/data/testData.js',
    './src/data/agk_word_import.js',
    './src/data/instrumentation_source.html',
    './src/data/fixed_questions.html',
    './fixed questions.htm',
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
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(keys.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })))
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).then((response) => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', clone));
                }
                return response;
            }).catch(() => caches.match('./index.html').then((c) => c || caches.match('./offline.html')))
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cached) => cached || fetch(request).then((netRes) => {
            if (netRes && netRes.status === 200 && request.method === 'GET') {
                const clone = netRes.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, clone).catch(() => {}));
            }
            return netRes;
        }).catch(() => (request.destination === 'image' ? caches.match('./src/images/logo.jpg') : caches.match(request))))
    );
});

self.addEventListener('message', (ev) => {
    if (ev.data && ev.data.type === 'SKIP_WAITING') self.skipWaiting();
});
