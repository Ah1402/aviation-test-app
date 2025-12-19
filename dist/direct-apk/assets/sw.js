// Aviation Test App - Service Worker
// Version 4.4.0 - Auto-update notifications and enhanced monitoring
const CACHE_VERSION = 'v4.4.0';
const CACHE_NAME = `aviation-test-${CACHE_VERSION}`;
const DATA_CACHE = `aviation-data-${CACHE_VERSION}`;

// Update notification system
let lastDataVersion = null;
const UPDATE_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes

function checkForDataUpdates() {
    // Check if testData has been updated
    if (typeof window !== 'undefined' && window.testData) {
        const currentVersion = window.testData.version || '1.0.0';

        if (lastDataVersion && lastDataVersion !== currentVersion) {
            // Data has been updated!
            showUpdateNotification();
        }

        lastDataVersion = currentVersion;
    }
}

function showUpdateNotification() {
    if (Notification.permission !== 'granted') {
        console.log('[ServiceWorker] Cannot show update notification - permission not granted');
        return;
    }

    const notificationOptions = {
        body: 'New aviation questions and updates are now available! Refresh to get the latest content.',
        icon: '/ahmed.png',
        badge: '/ahmed.png',
        tag: 'app-update',
        requireInteraction: true,
        silent: false,
        actions: [
            { action: 'refresh', title: 'Refresh Now' },
            { action: 'dismiss', title: 'Later' }
        ],
        data: { type: 'update', timestamp: Date.now() }
    };

    self.registration.showNotification('✈️ Aviation Test App Updated!', notificationOptions);
    console.log('[ServiceWorker] Update notification sent');
}

// Import Firebase scripts for messaging
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCD5JUp91H9fDeGqJInqOoFxQl4skbsUa8",
    authDomain: "aviation-test-app.firebaseapp.com",
    projectId: "aviation-test-app",
    messagingSenderId: "819905924428",
    appId: "1:819905924428:web:0c8f50aa85d336918fd3e9"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[ServiceWorker] Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'Aviation Test App';
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new notification',
        icon: '/ahmed.png',
        badge: '/ahmed.png',
        tag: 'aviation-notification', // Prevents duplicate notifications
        requireInteraction: true, // Keeps notification visible until user interacts
        data: payload.data || {}
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('[ServiceWorker] Notification click received:', event);

    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window/tab open with the target URL
            for (let client of windowClients) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, open a new window/tab with the target URL
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

// All assets to cache for complete offline functionality
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './ahmed.png'
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
  console.log('[ServiceWorker] ✨ ACTIVATING NEW VERSION:', CACHE_VERSION);
  console.log('[ServiceWorker] This is a NEW UPDATE! Will send notification...');

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
      console.log('[ServiceWorker] ✅ Activation complete');
      console.log('[ServiceWorker] 📱 Attempting to send notification NOW...');

      // Try to send notification - this works even if app is closed on Android
      // On iOS, it only works if app is in background (not completely terminated)
      return self.registration.showNotification('New Update Available! 🚀', {
        body: 'Aviation Test App v' + CACHE_VERSION + ' is now installed and ready to use!',
        icon: '/ahmed.png',
        badge: '/ahmed.png',
        tag: 'update-v' + CACHE_VERSION,
        requireInteraction: true,  // Keeps notification visible until user interacts
        vibrate: [300, 200, 300],  // Stronger vibration
        renotify: true,  // Force notification even if tag exists
        silent: false,
        timestamp: Date.now(),
        data: {
          url: '/',
          version: CACHE_VERSION,
          updateTime: new Date().toISOString()
        }
      }).then(() => {
        console.log('[ServiceWorker] ✅✅✅ NOTIFICATION SENT SUCCESSFULLY! ✅✅✅');
        console.log('[ServiceWorker] Version:', CACHE_VERSION);
        return self.clients.claim();
      }).catch(err => {
        console.error('[ServiceWorker] ❌ Notification failed:', err);
        console.error('[ServiceWorker] Error details:', err.message);
        // Still claim clients even if notification fails
        return self.clients.claim();
      });
    })
  );

  // Start update checking
  setTimeout(() => {
    checkForDataUpdates();
    setInterval(checkForDataUpdates, UPDATE_CHECK_INTERVAL);
  }, 30000); // Start checking after 30 seconds
});// Fetch event - Cache-first strategy for offline-first functionality
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
    icon: '/ahmed.png',
    badge: '/ahmed.png',
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
      { action: 'open', title: 'Open App', icon: '/ahmed.png' }
    ];
  }
  
  event.waitUntil(
    self.registration.showNotification(title, options)
      .then(() => console.log('[ServiceWorker] Notification displayed'))
      .catch(err => console.error('[ServiceWorker] Notification failed:', err))
  );
});

// Handle notification clicks - Enhanced for mobile and updates
self.addEventListener('notificationclick', event => {
  console.log('[ServiceWorker] Notification clicked:', event.action);

  event.notification.close();

  // Handle update notification actions
  if (event.notification.data?.type === 'update') {
    if (event.action === 'refresh') {
      // User wants to refresh now
      event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(clients => {
          clients.forEach(client => {
            client.postMessage({ action: 'refresh-app' });
          });
        })
      );
      return;
    }
  }

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

          // If it's an update notification, also refresh the page
          if (event.notification.data?.type === 'update') {
            client.postMessage({ action: 'refresh-app' });
          }

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
});// Motivational Notifications System - Enhanced for background operation
let motivationalInterval = null;
let isAppClosed = false;
const MOTIVATIONAL_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds

const motivationalMessages = [
    "Keep pushing forward! Your aviation knowledge is growing stronger every day.",
    "Great job staying committed to your studies! Remember, every expert was once a beginner.",
    "Time for a quick aviation refresher! Your dedication will pay off.",
    "Stay focused and keep learning! You're building skills that will take you far.",
    "Another study session completed! Your persistence is inspiring.",
    "Remember: The more you practice, the more confident you'll become in aviation.",
    "Take a moment to review what you've learned today. You're doing amazing!",
    "Consistency is key! Keep up the excellent work on your aviation studies.",
    "Your hard work is building a strong foundation. Keep going!",
    "Short break, big gains! Ready to continue your aviation journey?"
];

function showMotivationalNotification() {
    if (Notification.permission !== 'granted') {
        console.log('[ServiceWorker] Notification permission not granted, skipping motivational notification');
        return;
    }

    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

    const notificationOptions = {
        body: randomMessage,
        icon: '/ahmed.png',
        badge: '/ahmed.png',
        tag: 'motivational-notification',
        requireInteraction: false,
        silent: false,
        data: { type: 'motivational', timestamp: Date.now() }
    };

    self.registration.showNotification('Aviation Study Motivation', notificationOptions);
    console.log('[ServiceWorker] Motivational notification sent at', new Date().toLocaleTimeString());
}

function startMotivationalTimer() {
    if (motivationalInterval) {
        clearInterval(motivationalInterval);
    }

    isAppClosed = true;
    console.log('[ServiceWorker] Starting motivational timer (every 30 minutes)');

    // Show first notification after 30 seconds for testing
    setTimeout(() => {
        if (isAppClosed) {
            showMotivationalNotification();
        }
    }, 30000); // 30 seconds for testing

    // Then every 30 minutes
    motivationalInterval = setInterval(() => {
        if (isAppClosed) {
            showMotivationalNotification();
        }
    }, MOTIVATIONAL_INTERVAL);
}

function stopMotivationalTimer() {
    isAppClosed = false;
    if (motivationalInterval) {
        console.log('[ServiceWorker] Stopping motivational timer');
        clearInterval(motivationalInterval);
        motivationalInterval = null;
    }
}

// Test function for manual triggering
function testMotivationalNotification() {
    console.log('[ServiceWorker] Testing motivational notification');
    showMotivationalNotification();
}

// Enhanced message handling
self.addEventListener('message', (event) => {
    const { action } = event.data;

    switch (action) {
        case 'start-motivational-timer':
            startMotivationalTimer();
            break;
        case 'stop-motivational-timer':
            stopMotivationalTimer();
            break;
        case 'test-motivational-notification':
            testMotivationalNotification();
            break;
        case 'app-closed':
            isAppClosed = true;
            console.log('[ServiceWorker] App marked as closed');
            break;
        case 'app-opened':
            isAppClosed = false;
            console.log('[ServiceWorker] App marked as opened');
            break;
        default:
            console.log('[ServiceWorker] Unknown message action:', action);
    }
});

// Handle app lifecycle - detect when app is closed
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Service Worker activated');

    // Start motivational timer by default when service worker is active
    // This will work when app is minimized but service worker stays active
    setTimeout(() => {
        startMotivationalTimer();
    }, 60000); // Start after 1 minute
});

// Expose test function globally for console access
self.testMotivationalNotification = testMotivationalNotification;
