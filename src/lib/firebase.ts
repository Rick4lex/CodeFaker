
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// --- Inicialización de Firebase ---
let app: FirebaseApp;
let db: Firestore | null = null;
let auth: Auth | null = null;

// Validar que todas las variables de entorno necesarias estén presentes.
const allVarsSet = Object.values(firebaseConfig).every(Boolean);

if (allVarsSet) {
  // Si las variables están, inicializamos Firebase.
  if (getApps().length) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }
  db = getFirestore(app);
  auth = getAuth(app);
} else {
  // Si faltan variables, la app no se bloqueará, pero Firebase no funcionará.
  // Se mostrará una advertencia en la consola del servidor.
  console.warn(
    '\n' +
    '******************************************************************\n' +
    '*** ADVERTENCIA DE CONFIGURACIÓN DE FIREBASE ***\n' +
    '******************************************************************\n' +
    'No se encontraron todas las variables de entorno de Firebase.\n' +
    'La aplicación se ejecutará, pero las funcionalidades que dependen\n' +
    'de la base de datos (productos, comentarios, admin, etc.) estarán\n' +
    'DESHABILITADAS.\n\n' +
    'Para solucionarlo:\n' +
    '1. Asegúrate de que TODAS las variables NEXT_PUBLIC_FIREBASE_* \n' +
    '   estén configuradas en tu archivo .env.local (local) o en Vercel.\n' +
    '2. Si las añadiste en Vercel, asegúrate de haber hecho un "Redeploy"\n' +
    '   para que los cambios tomen efecto.\n' +
    '******************************************************************\n'
  );
}


export { app, db, auth };


/*
Nota: Tus reglas de seguridad de Firestore deben configurarse en la consola de Firebase.
Ejemplo de reglas:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null; // Para acciones de admin

      match /comments/{commentId} {
        allow read: if true;
        allow create: if true; // Permitir comentarios anónimos
      }
       match /likes/{likeId} {
        allow read: if true;
        allow write: if true; // Permitir que cualquiera dé "me gusta"
      }
    }
  }
}
*/
