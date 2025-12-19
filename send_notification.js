const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Download your service account key from Firebase Console > Project Settings > Service accounts
const serviceAccount = require('./aviation-test-app-firebase-adminsdk-fbsvc-b156c28bbb.json'); // REPLACE WITH YOUR KEY PATH

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

// Function to send notification to a device
async function sendNotification(token, title, body, data = {}) {
  const message = {
    token: token,
    notification: {
      title: title,
      body: body,
    },
    data: data,
    android: {
      priority: 'high',
      notification: {
        sound: 'default',
      },
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
          badge: 1,
        },
      },
    },
  };

  try {
    const response = await messaging.send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Function to send to multiple tokens
async function sendToMultipleTokens(tokens, title, body, data = {}) {
  const messages = tokens.map(token => ({
    token: token,
    notification: {
      title: title,
      body: body,
    },
    data: data,
    android: {
      priority: 'high',
      notification: {
        sound: 'default',
      },
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
          badge: 1,
        },
      },
    },
  }));

  try {
    const response = await messaging.sendAll(messages);
    console.log('Successfully sent messages:', response);
    return response;
  } catch (error) {
    console.error('Error sending messages:', error);
    throw error;
  }
}

// Example usage
if (require.main === module) {
  // Replace with actual token and message
  const deviceToken = 'your-device-fcm-token-here';
  sendNotification(deviceToken, 'Test Notification', 'This is a test push notification!')
    .then(() => console.log('Notification sent!'))
    .catch(console.error);
}

module.exports = { sendNotification, sendToMultipleTokens };