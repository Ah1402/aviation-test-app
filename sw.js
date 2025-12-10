// Aviation Test App - Service Worker
// Version 3.1.0 - Background Notifications (App Closed)
const CACHE_VERSION = 'v3.1.0';
const CACHE_NAME = `aviation-test-${CACHE_VERSION}`;
const DATA_CACHE = `aviation-data-${CACHE_VERSION}`;

// All assets to cache for complete offline functionality
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './logo-192.png',
  './logo-512.png',
  './logo-1024.png'
];

// External CDN resources to cache
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-regular-400.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2'
];

// Install event - cache all essential files for offline use
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing version', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(CACHE_NAME).then(cache => {
        console.log('[ServiceWorker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache CDN assets
      caches.open(CACHE_NAME).then(cache => {
        console.log('[ServiceWorker] Caching CDN assets');
        return Promise.all(
          CDN_ASSETS.map(url => {
            return fetch(url, { mode: 'cors' })
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              })
              .catch(err => {
                console.warn('[ServiceWorker] Failed to cache CDN asset:', url, err);
              });
          })
        );
      })
    ]).then(() => {
      console.log('[ServiceWorker] Installation complete');
      // Force the waiting service worker to become the active service worker
      return self.skipWaiting();
    }).catch(err => {
      console.error('[ServiceWorker] Installation failed:', err);
    })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating version', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches
          if (cacheName.startsWith('aviation-') && 
              cacheName !== CACHE_NAME && 
              cacheName !== DATA_CACHE) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[ServiceWorker] Activation complete');
      
      // Send notification about the update - WORKS EVEN IF APP IS CLOSED!
      console.log('[ServiceWorker] Sending update notification (app can be closed)...');
      return self.registration.showNotification('Update Installed! 🎉', {
        body: 'Aviation Test App has been updated to the latest version. Open the app to see what\'s new!',
        icon: '/logo-192.png',
        badge: '/logo-192.png',
        tag: 'sw-activation-update',
        requireInteraction: true,  // Keeps notification visible
        vibrate: [200, 100, 200],
        data: {
          url: '/',
          timestamp: Date.now(),
          version: CACHE_VERSION
        },
        actions: [
          { action: 'open', title: 'Open App', icon: '/logo-192.png' }
        ]
      }).then(() => {
        console.log('[ServiceWorker] Update notification sent (even if app closed)!');
        // Take control of all pages immediately
        return self.clients.claim();
      }).catch(err => {
        console.error('[ServiceWorker] Failed to send notification:', err);
        // Still claim clients even if notification fails
        return self.clients.claim();
      });
    })
  );
});

// Fetch event - Cache-first strategy for offline-first functionality
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Handle different types of requests
  if (request.method === 'GET') {
    // For HTML requests, use network-first with cache fallback
    if (request.headers.get('accept')?.includes('text/html')) {
      event.respondWith(networkFirstStrategy(request));
    }
    // For API/data requests, use network-first with cache fallback
    else if (url.pathname.endsWith('.json') || url.pathname.includes('/api/')) {
      event.respondWith(networkFirstStrategy(request, DATA_CACHE));
    }
    // For static assets (CSS, JS, images, fonts), use cache-first
    else if (
      request.headers.get('accept')?.includes('text/css') ||
      request.headers.get('accept')?.includes('application/javascript') ||
      request.headers.get('accept')?.includes('image/') ||
      url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/)
    ) {
      event.respondWith(cacheFirstStrategy(request));
    }
    // For CDN resources, use cache-first
    else if (url.origin !== location.origin) {
      event.respondWith(cacheFirstStrategy(request));
    }
    // Default: network-first with cache fallback
    else {
      event.respondWith(networkFirstStrategy(request));
    }
  }
});

// Cache-first strategy: Try cache first, fallback to network
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Return cached version immediately
      console.log('[ServiceWorker] Serving from cache:', request.url);
      
      // Update cache in background if online
      if (navigator.onLine) {
        updateCacheInBackground(request);
      }
      
      return cachedResponse;
    }
    
    // Not in cache, fetch from network
    console.log('[ServiceWorker] Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache the response for future use
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[ServiceWorker] Cache-first strategy failed:', error);
    
    // Return a fallback response if available
    return new Response('Offline - Resource not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
}

// Network-first strategy: Try network first, fallback to cache
async function networkFirstStrategy(request, cacheName = CACHE_NAME) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[ServiceWorker] Network failed, trying cache:', request.url);
    
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('[ServiceWorker] Serving from cache (offline):', request.url);
      return cachedResponse;
    }
    
    // No cache available either
    console.error('[ServiceWorker] No cache available for:', request.url);
    
    // Return offline page for HTML requests
    if (request.headers.get('accept')?.includes('text/html')) {
      const offlineResponse = await caches.match('./index.html');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    return new Response('Offline - Resource not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
}

// Update cache in background without blocking the response
async function updateCacheInBackground(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse);
      console.log('[ServiceWorker] Updated cache in background:', request.url);
    }
  } catch (error) {
    // Silently fail - background update is not critical
    console.log('[ServiceWorker] Background update failed:', request.url);
  }
}

// Listen for messages from the client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[ServiceWorker] Received SKIP_WAITING message');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    console.log('[ServiceWorker] Received CACHE_URLS message');
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});

// Push notification support - Enhanced for mobile devices
self.addEventListener('push', event => {
  console.log('[ServiceWorker] Push notification received');
  
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'Aviation Test App', body: event.data.text() };
    }
  }
  
  const title = data.title || 'Aviation Test App';
  
  // Build notification options with mobile compatibility
  const options = {
    body: data.body || 'New notification from Aviation Test App',
    icon: '/logo-192.png',
    badge: '/logo-192.png',
    tag: data.tag || 'default',
    requireInteraction: false,
    silent: false,
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
      ...data.data
    }
  };
  
  // Add vibration for Android (iOS doesn't support it)
  if (self.clients && self.clients.matchAll) {
    options.vibrate = [200, 100, 200];
    options.actions = [
      { action: 'open', title: 'Open App', icon: '/logo-192.png' }
    ];
  }
  
  event.waitUntil(
    self.registration.showNotification(title, options)
      .then(() => console.log('[ServiceWorker] Notification displayed'))
      .catch(err => console.error('[ServiceWorker] Notification failed:', err))
  );
});

// Handle notification clicks - Enhanced for mobile
self.addEventListener('notificationclick', event => {
  console.log('[ServiceWorker] Notification clicked:', event.action);
  
  event.notification.close();
  
  // Get the URL from notification data or use default
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {
      console.log('[ServiceWorker] Found', clientList.length, 'client windows');
      
      // Check if there's already a window open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        console.log('[ServiceWorker] Client URL:', client.url);
        
        // If we find an open window, focus it
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          console.log('[ServiceWorker] Focusing existing window');
          return client.focus();
        }
      }
      
      // If no window is open, open a new one
      if (self.clients.openWindow) {
        console.log('[ServiceWorker] Opening new window:', urlToOpen);
        return self.clients.openWindow(urlToOpen);
      }
    }).catch(err => {
      console.error('[ServiceWorker] Error handling notification click:', err);
    })
  );
});
