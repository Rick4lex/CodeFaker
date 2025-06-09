
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth'; // If you need auth

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const auth = getAuth(app); // If you need auth

export { app, db /*, auth*/ };

// IMPORTANT: Ensure you have set up these environment variables in your Vercel project
// NEXT_PUBLIC_FIREBASE_API_KEY
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
// NEXT_PUBLIC_FIREBASE_PROJECT_ID
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
// NEXT_PUBLIC_FIREBASE_APP_ID

// Also, ensure your Firestore security rules are set up correctly. For comments and reactions:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection (assuming product metadata is not in Firestore for now)
    match /products/{productId} {
      // Allow reading product metadata if you ever move it here
      // allow read: if true;

      // Comments subcollection
      match /comments/{commentId} {
        allow read: if true;
        allow create: if request.auth != null; // Example: Only authenticated users can comment
        // allow update, delete: if request.auth.uid == resource.data.userId; // Example: Users can only edit/delete their own comments
      }

      // Reactions (like count) - if storing as a field on product document
      // allow update: if request.auth != null; // Example: Authenticated users can react (use transactions)

      // Or, if reactions are a subcollection (e.g., to store who liked)
      match /reactions/{userId} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
       match /likes/{likeId} { // Or a general 'likes' subcollection
        allow read: if true;
        allow create: if request.auth != null; // Allow authenticated users to like
        // Potentially allow delete if you want to support unliking by specific user
      }
    }
  }
}
*/
