
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// ============================================================================
// ¡¡¡CAMBIO TEMPORAL IMPORTANTE!!!
// ============================================================================
// Para desbloquear el desarrollo, hemos insertado tus credenciales de Firebase
// directamente aquí. ESTO NO ES SEGURO PARA PRODUCCIÓN.
//
// ANTES DE PUBLICAR TU SITIO, DEBES:
// 1. Revertir este archivo para que lea las variables de entorno (process.env).
// 2. Configurar estas claves de forma segura en las "Environment Variables"
//    de tu proveedor de hosting (ej. Vercel).
//
// Exponer estas claves directamente en el código es un riesgo de seguridad.
// ============================================================================

const firebaseConfig = {
  apiKey: "AIzaSyD8O_6HQMXCwO40GXcDvfVqiM9xCH2QG80",
  authDomain: "code-faker.firebaseapp.com",
  projectId: "code-faker",
  // NOTA: Se corrigió el valor de storageBucket. El formato correcto es .appspot.com
  storageBucket: "code-faker.appspot.com",
  messagingSenderId: "618883006228",
  appId: "1:618883006228:web:870953512be1a3661f0c01"
};


// --- Inicialización de Firebase ---
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

// Verificamos si ya hay una app de Firebase inicializada para evitar errores en hot-reloads
if (getApps().length) {
  app = getApp();
} else {
  app = initializeApp(firebaseConfig);
}

db = getFirestore(app);
auth = getAuth(app);

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
