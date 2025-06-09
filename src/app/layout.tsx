
import type { Metadata } from 'next';
// Removed incorrect Geist font imports
import { Belanosima } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

// Removed geistSans and geistMono setup

const belanosima = Belanosima({
  variable: '--font-belanosima',
  subsets: ['latin'],
  weight: ['400', '700'], // Load regular and bold weights
});

export const metadata: Metadata = {
  title: 'Code Faker - Portafolio',
  description: 'Portafolio CF: Servicios, Dibujos y Confecciones.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${belanosima.variable} antialiased flex flex-col min-h-screen`}> {/* Removed geist variables */}
        <ThemeProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <ThemeToggleButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
