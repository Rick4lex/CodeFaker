
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // If you need auth


// ============================================================================
// IMPORTANT: How to Fix the "(auth/invalid-api-key)" Error
// ============================================================================
// This error means your Firebase environment variables are not set correctly.
// You need to provide them so the application can connect to Firebase.
//
// 1. **For Local Development**:
//    - Create a file named `.env.local` in the root of your project.
//    - Add your Firebase configuration keys to this file.
//
// 2. **For Deployment (Vercel, etc.)**:
//    - Go to your project settings on your hosting provider (e.g., Vercel).
//    - Add the same keys as "Environment Variables".
//
// You can get these keys from your Firebase project settings page.
//
// --- Example for your .env.local file ---
// NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
// NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef...
// ============================================================================


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
const auth = getAuth(app); // If you need auth

export { app, db , auth };


/*
Note: Your Firestore security rules should be set in the Firebase console, not here.
Example rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null; // For admin actions

      match /comments/{commentId} {
        allow read: if true;
        allow create: if true; // Allow anonymous comments
      }
       match /likes/{likeId} {
        allow read: if true;
        allow write: if true; // Allow anyone to like/unlike
      }
    }
    match /contactSubmissions/{submissionId} {
        allow create: if true; // Allow anyone to submit the contact form
    }
  }
}
*/
