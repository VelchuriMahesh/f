import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

const serviceAccountPath = new URL('./shrusara-e11e4-firebase-adminsdk-fbsvc-bade3a3032.json', import.meta.url);
const serviceAccount = JSON.parse(await readFile(serviceAccountPath));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("🚀 Firebase Admin initialized with Master Permissions");
}

export const db = admin.firestore();
export const Timestamp = admin.firestore.Timestamp;

export function serializeFirestore(value) {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(serializeFirestore);
  if (value && typeof value.toDate === 'function') return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object' && value.constructor.name === 'Object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, serializeFirestore(nestedValue)])
    );
  }
  return value;
}

export function mapDocument(snapshot) {
  if (!snapshot.exists) return null;
  return {
    id: snapshot.id,
    ...serializeFirestore(snapshot.data())
  };
}