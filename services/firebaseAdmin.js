import admin from "firebase-admin";

export const verifyToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASEADMIN_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASEADMIN_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASEADMIN_PRIVATE_KEY
          ? process.env.NEXT_PUBLIC_FIREBASEADMIN_PRIVATE_KEY.replace(
              /\\n/gm,
              "\n"
            )
          : undefined,
      }),
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      throw err;
    });
};
