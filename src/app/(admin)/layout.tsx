
import { getSession, checkSessionSecret } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  checkSessionSecret(); // Checks for ENV VARS on server start
  const session = await getSession();

  if (!session.isAdmin) {
     return redirect('/admin/login');
  }

  return <>{children}</>;
}
