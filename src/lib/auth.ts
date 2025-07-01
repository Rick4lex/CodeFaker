
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
      'SESSION_SECRET environment variable is not set or is too short (must be at least 32 characters long).'
    );
  }
   if (!process.env.ADMIN_PASSWORD) {
    throw new Error(
      'ADMIN_PASSWORD environment variable is not set.'
    );
  }
}
