#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function setupFirebase() {
    console.log('🔥 Firebase Push Notifications Setup for Aviation Test App\n');

    console.log('This script will help you configure Firebase for push notifications.');
    console.log('You need to have created a Firebase project first.\n');

    // Get Firebase config
    console.log('📋 Step 1: Firebase Web App Config');
    console.log('Go to Firebase Console > Project Settings > General > Your apps > Web app');
    console.log('Copy the config object from there.\n');

    const apiKey = await ask('Enter your API Key: ');
    const authDomain = await ask('Enter your Auth Domain: ');
    const projectId = await ask('Enter your Project ID: ');
    const storageBucket = await ask('Enter your Storage Bucket: ');
    const messagingSenderId = await ask('Enter your Messaging Sender ID: ');
    const appId = await ask('Enter your App ID: ');

    console.log('\n📋 Step 2: Web Push Certificate');
    console.log('Go to Firebase Console > Project Settings > Cloud Messaging > Web Push certificates');
    console.log('Generate or copy your VAPID key.\n');

    const vapidKey = await ask('Enter your VAPID Key: ');

    console.log('\n📋 Step 3: Service Account Key');
    console.log('Go to Firebase Console > Project Settings > Service accounts');
    console.log('Generate a new private key and download the JSON file.');
    console.log('Place it in the project root and enter the filename.\n');

    const serviceAccountFile = await ask('Enter the service account JSON filename (e.g., service-account-key.json): ');

    // Update index.html
    const indexPath = path.join(__dirname, 'index.html');
    let indexContent = fs.readFileSync(indexPath, 'utf8');

    const firebaseConfig = `    const firebaseConfig = {
        apiKey: "${apiKey}",
        authDomain: "${authDomain}",
        projectId: "${projectId}",
        storageBucket: "${storageBucket}",
        messagingSenderId: "${messagingSenderId}",
        appId: "${appId}"
    };`;

    // Replace placeholder config
    indexContent = indexContent.replace(
        /const firebaseConfig = \{\s*apiKey: "your-api-key-here",[\s\S]*?appId: "your-app-id"\s*\};/,
        firebaseConfig
    );

    // Replace VAPID key
    indexContent = indexContent.replace(
        /vapidKey: 'your-vapid-key-here'/,
        `vapidKey: '${vapidKey}'`
    );

    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ Updated index.html with Firebase config');

    // Update send_notification.js
    const sendNotificationPath = path.join(__dirname, 'send_notification.js');
    let sendContent = fs.readFileSync(sendNotificationPath, 'utf8');

    sendContent = sendContent.replace(
        /const serviceAccount = require\('\.\/path-to-your-service-account-key\.json'\);/,
        `const serviceAccount = require('./${serviceAccountFile}');`
    );

    fs.writeFileSync(sendNotificationPath, sendContent);
    console.log('✅ Updated send_notification.js with service account key');

    // Create .env file for sensitive data (optional)
    const envContent = `FIREBASE_API_KEY=${apiKey}
FIREBASE_AUTH_DOMAIN=${authDomain}
FIREBASE_PROJECT_ID=${projectId}
FIREBASE_STORAGE_BUCKET=${storageBucket}
FIREBASE_MESSAGING_SENDER_ID=${messagingSenderId}
FIREBASE_APP_ID=${appId}
FIREBASE_VAPID_KEY=${vapidKey}
FIREBASE_SERVICE_ACCOUNT_KEY=${serviceAccountFile}
`;

    fs.writeFileSync(path.join(__dirname, '.env'), envContent);
    console.log('✅ Created .env file with Firebase configuration');

    console.log('\n🎉 Firebase setup complete!');
    console.log('\nNext steps:');
    console.log('1. Build and run your app: npx cap run android');
    console.log('2. Check console for FCM tokens');
    console.log('3. Test notifications: node send_notification.js');

    rl.close();
}

setupFirebase().catch(console.error);