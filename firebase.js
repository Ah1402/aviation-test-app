// Firebase and Push Notifications Setup

// Firebase config - REPLACE WITH YOUR ACTUAL CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyCD5JUp91H9fDeGqJInqOoFxQl4skbsUa8",
    authDomain: "aviation-test-app.firebaseapp.com",
    projectId: "aviation-test-app",
    storageBucket: "aviation-test-app.firebasestorage.app",
    messagingSenderId: "819905924428",
    appId: "1:819905924428:web:0c8f50aa85d336918fd3e9"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Request notification permission and get token
async function requestNotificationPermission() {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await messaging.getToken({
                vapidKey: 'BRc8OQ2xDIaA4xvFiuEziH21Y1dADscXQDDRI3qdnSg' // Get from Firebase Console > Cloud Messaging > Web Push certificates
            });
            console.log('FCM Token:', token);
            // Store token on server for sending notifications
            localStorage.setItem('fcmToken', token);
        }
    } catch (error) {
        console.error('Error getting FCM token:', error);
    }
}

// Handle foreground messages
messaging.onMessage((payload) => {
    console.log('Message received:', payload);
    if (Notification.permission === 'granted') {
        new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: '/ahmed.png'
        });
    }
});

// Capacitor Push Notifications
if (typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.PushNotifications) {
    Capacitor.Plugins.PushNotifications.register();

    Capacitor.Plugins.PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
        localStorage.setItem('pushToken', token.value);
    });

    Capacitor.Plugins.PushNotifications.addListener('registrationError', (error) => {
        console.error('Push registration failed:', error);
    });

    Capacitor.Plugins.PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push received:', notification);
        // Handle notification when app is open
    });

    Capacitor.Plugins.PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push action performed:', notification);
        // Handle when user taps notification
    });
}

// Request permissions on app load
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered successfully:', registration);

        requestNotificationPermission();
    }).catch((error) => {
        console.error('Service Worker registration failed:', error);
    });
} else {
    console.warn('Service Worker not supported');
    requestNotificationPermission();
}