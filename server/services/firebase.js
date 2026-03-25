import admin from "firebase-admin";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("🚀 Firebase Admin initialized (ENV based)");
}

export const db = admin.firestore();
export const Timestamp = admin.firestore.Timestamp;

// 🔁 Serialize Firestore data (unchanged logic)
export function serializeFirestore(value) {
  if (value === null || value === undefined) return value;

  if (Array.isArray(value)) {
    return value.map(serializeFirestore);
  }

  if (value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object" && value.constructor.name === "Object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        serializeFirestore(nestedValue),
      ])
    );
  }

  return value;
}

// 📄 Map Firestore document
export function mapDocument(snapshot) {
  if (!snapshot.exists) return null;

  return {
    id: snapshot.id,
    ...serializeFirestore(snapshot.data()),
  };
}