import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccountKey;
try {
  serviceAccountKey = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
  );
} catch (error) {
  console.error('Failed to parse Firebase service account key:', error.message);
  process.exit(1); 
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

//sending push notifs for events only
export const sendPushNotification = async (deviceToken, event) => {
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