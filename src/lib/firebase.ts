
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth'; // If you need auth

// ============================================================================
// ¡¡¡ACCIÓN URGENTE REQUERIDA!!!
// ============================================================================
// El error "invalid-api-key" significa que tus variables de entorno de Firebase
// no están configuradas. Debes proporcionarlas para que la aplicación funcione.
//
// 1. **Para Desarrollo Local**:
//    - Crea un archivo llamado `.env.local` en la raíz de tu proyecto.
//    - Añade tus claves de configuración de Firebase a este archivo.
//
// 2. **Para Producción (Vercel)**:
//    - Ve a la configuración de tu proyecto en Vercel.
//    - Añade las mismas claves en la sección "Environment Variables".
//
// --- Ejemplo para tu archivo .env.local o Vercel ---
// NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
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

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

// Solo inicializamos Firebase si la clave de API está presente.
if (firebaseConfig.apiKey) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
} else {
    console.warn(`
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!  ADVERTENCIA: VARIABLES DE ENTORNO DE FIREBASE NO CONFIGURADAS                 !!
    !!                                                                              !!
    !!  La aplicación se ejecutará, pero las funciones que dependen de Firebase      !!
    !!  (productos, admin, comentarios) no funcionarán correctamente.               !!
    !!                                                                              !!
    !!  Para solucionarlo, añade tus credenciales de Firebase a la configuración     !!
    !!  de tu proyecto en Vercel o en un archivo local .env.local.                   !!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    `);
}


export { app, db , auth };


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
    match /contactSubmissions/{submissionId} {
        allow create: if true; // Permitir que cualquiera envíe el formulario de contacto
    }
  }
}
*/
