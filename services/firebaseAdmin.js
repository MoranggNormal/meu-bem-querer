import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_ADMIN);

export const verifyToken = (token) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      throw err;
    });
};
