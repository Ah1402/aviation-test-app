# Push Notifications Setup Guide

This guide will help you set up push notifications for your Aviation Test App using Firebase Cloud Messaging (FCM).

## Quick Start

✅ **Firebase project created and app added!**
✅ **VAPID key configured!**
✅ **Service worker updated for PWA support!**

**Remaining steps:**
1. Test notifications: `npm run debug-notifications`
2. For production: Deploy to HTTPS

## PWA Push Notifications

For Progressive Web App (PWA) push notifications, additional setup is required:

### Service Worker Configuration
- ✅ Service worker updated with Firebase messaging
- ✅ Background message handling implemented
- ✅ Notification click handling implemented

### HTTPS Requirement
**Important**: Push notifications only work over HTTPS or localhost.

- **Development**: Works on `localhost` or `127.0.0.1`
- **Production**: Must be served over HTTPS

### Testing PWA Notifications

Use the debug tool to troubleshoot:

```bash
npm run debug-notifications
```

This will check:
- HTTPS/Localhost requirement
- Service worker registration
- Notification permissions
- Firebase messaging support

## Detailed Setup

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing one
3. Enable Google Analytics if prompted (optional)
4. Wait for project creation

## Step 2: Add Your App to Firebase

### For Web App:
1. In Firebase Console, click the web icon (`</>`) to add a web app
2. Enter your app nickname (e.g., "Aviation Test Web")
3. **Important**: Check "Also set up Firebase Hosting" if you plan to deploy
4. Click "Register app"
5. Copy the Firebase config object - you'll need this later

### For iOS App:
1. Click the iOS icon to add iOS app
2. Enter Bundle ID (from your Capacitor config or Xcode)
3. Download `GoogleService-Info.plist`
4. Place it in `ios/App/App/` (if using iOS)

### For Android App:
1. Click the Android icon to add Android app
2. Enter Package name (from `android/app/src/main/AndroidManifest.xml`)
3. Download `google-services.json`
4. Place it in `android/app/`

## Step 3: Enable Cloud Messaging

1. In Firebase Console, go to "Cloud Messaging" in the left sidebar
2. Click "Send your first message" (optional)
3. Go to "Project Settings" > "Cloud Messaging"
4. Generate a Web Push certificate (VAPID key) - copy this key

## Step 4: Configure Your App

### Option 1: Automated Setup (Recommended)

Run the automated setup script:

```bash
npm run setup-firebase
```

This interactive script will:
- Prompt you for your Firebase config values
- Update `index.html` with your Firebase configuration
- Update `send_notification.js` with your service account key
- Create a `.env` file for configuration

### Option 2: Manual Setup

#### Update Firebase Config in `index.html`

Replace the placeholder config in `index.html` (around line 30235) with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

Also replace the VAPID key:
```javascript
vapidKey: 'your-actual-vapid-key'
```

### Service Account Key for Server

1. In Firebase Console, go to "Project Settings" > "Service accounts"
2. Click "Generate new private key"
3. Download the JSON file
4. Place it in your project root (e.g., `service-account-key.json`)
5. Update `send_notification.js` to point to this file:
   ```javascript
   const serviceAccount = require('./service-account-key.json');
   ```

## Step 5: Build and Test

### For Web:
- Open your app in a browser
- Check console for FCM token
- Use the token to test notifications

### For Mobile:
1. Run `npx cap sync` (if not done already)
2. Build for iOS/Android: `npx cap build ios` or `npx cap build android`
3. Open in Xcode/Android Studio and run

### Test Notifications:
1. Get a device token from your app's console logs
2. Run: `npm run test-notification <your-token>`
3. Check your device for the notification

## Troubleshooting

### PWA Issues
- **HTTPS Required**: Push notifications only work over HTTPS. Use `localhost` for development.
- **Service Worker**: Ensure `/sw.js` is accessible and Firebase messaging is imported.
- **Debug Tool**: Run `npm run debug-notifications` to diagnose issues.

### Common Issues
- **Notifications not received**: Check browser console for errors, verify FCM token validity.
- **iOS issues**: Ensure APNs certificates are correctly configured in Firebase Console.
- **Android issues**: Check `google-services.json` placement and Capacitor sync.
- **Web issues**: Ensure HTTPS, service worker registration, and VAPID key.

### Debug Commands
```bash
# Check all notification components
npm run debug-notifications

# Send test notification
npm run test-notification <fcm-token>

# Check service worker in browser console
navigator.serviceWorker.getRegistrations().then(registrations => console.log(registrations))
```

## Step 6: Production Considerations

- **APNs Certificates**: For iOS production, upload your APNs certificate in Firebase Console
- **Security**: Never commit service account keys to version control
- **Token Management**: Store device tokens securely on your server
- **Rate Limits**: FCM has rate limits; plan accordingly

## Troubleshooting

- **Notifications not received**: Check device token validity and permissions
- **iOS issues**: Ensure APNs certificates are correctly configured
- **Android issues**: Check google-services.json placement
- **Web issues**: Ensure HTTPS and service worker registration

## Example: Send Notification from Server

```javascript
const { sendNotification } = require('./send_notification');

const deviceToken = 'device-fcm-token-here';
sendNotification(deviceToken, 'Daily Quiz Reminder', 'Time for your aviation quiz!')
  .then(() => console.log('Sent!'))
  .catch(console.error);
```

For more help, check the [Firebase documentation](https://firebase.google.com/docs/cloud-messaging).