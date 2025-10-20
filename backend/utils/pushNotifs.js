import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let firebaseInitialized = false;

if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  try {
    const serviceAccountKey = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
    });
    firebaseInitialized = true;
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Failed to parse Firebase service account key:', error.message);
  }
} else {
  console.log('Firebase service account not configured - push notifications will be disabled');
}

//sending push notifs
export const sendPushNotification = async (deviceToken, event) => {
  if (!firebaseInitialized) {
    console.log('Push notifications are disabled - Firebase not configured');
    return;
  }

  if (!event.title || !event.date) {
    console.error('Invalid event object:', event);
    return;
  }

  const message = {
    token: deviceToken,
    notification: {
      title: `RSVP Confirmation: ${event.title}`,
      body: `You successfully RSVPed for the event on ${event.date}.`,
    },
  };

  try {
    await admin.messaging().send(message);
    console.log(`Push Notification Sent to token: ${deviceToken}`);
  } catch (error) {
    console.error(
      `Error sending push notification to token: ${deviceToken}, Error: ${error.message}`
    );
  }
};