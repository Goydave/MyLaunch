// src/lib/firebase-admin.ts
import * as admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminApp = admin.apps[0] as admin.app.App;
export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
