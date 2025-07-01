
import { getIronSession } from 'iron-session';
import type { IronSession, IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData extends IronSessionData {
  isAdmin?: boolean;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'cfbnd-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    return session;
}

// Helper function to check if the session secret is set, especially for development.
export function checkSessionSecret(): void {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    throw new Error(
      '\n' +
      '**********************************************************************\n' +
      '*** ERROR CRÍTICO DE CONFIGURACIÓN DEL PANEL DE ADMINISTRACIÓN ***\n' +
      '**********************************************************************\n' +
      'La variable de entorno "SESSION_SECRET" no está configurada o es\n' +
      'demasiado corta (debe tener al menos 32 caracteres).\n\n' +
      'El panel de administración NO FUNCIONARÁ sin esta clave.\n\n' +
      'Para solucionarlo, añade SESSION_SECRET a tus variables de entorno.\n' +
      'Puedes generar una clave segura aquí: https://generate-secret.vercel.app/32\n' +
      '**********************************************************************\n'
    );
  }
   if (!process.env.ADMIN_PASSWORD) {
    throw new Error(
      '\n' +
      '**********************************************************************\n' +
      '*** ERROR CRÍTICO DE CONFIGURACIÓN DEL PANEL DE ADMINISTRACIÓN ***\n' +
      '**********************************************************************\n' +
      'La variable de entorno "ADMIN_PASSWORD" no está configurada.\n\n' +
      'El panel de administración NO FUNCIONARÁ sin esta clave.\n\n' +
      'Para solucionarlo, añade ADMIN_PASSWORD a tus variables de entorno\n' +
      'con la contraseña que desees usar para el login.\n' +
      '**********************************************************************\n'
    );
  }
}
