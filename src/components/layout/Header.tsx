
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, FileText, Palette, Shirt, Mail, Sparkles } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/servicios', label: 'Servicios', icon: FileText },
  { href: '/dibujos', label: 'Arte', icon: Palette },
  { href: '/confecciones', label: 'Confecciones', icon: Shirt },
  { href: '/contacto', label: 'Contacto', icon: Mail },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={`flex ${mobile ? 'flex-col space-y-2' : 'space-x-4 items-center'}`}>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} passHref>
          <Button
            variant="ghost"
            className={`justify-start text-foreground hover:text-primary ${mobile ? 'w-full' : ''}`}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );

  if (!mounted) {
    return ( // Render a placeholder or simplified header during server rendering / pre-hydration
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
          <div className="h-7 w-7"><img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1748304382/codefaker-04_pjvwsp.png"></img></div>
            <span>Code Faker</span>
          </Link>
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse sm:hidden"></div> {/* Placeholder for mobile menu button */}
          <div className="hidden sm:flex space-x-4"> {/* Placeholder for desktop nav links */}
            {[...Array(5)].map((_, i) => <div key={i} className="h-6 w-20 bg-muted rounded-md animate-pulse"></div>)}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          <div className="h-7 w-7"><img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1748304382/codefaker-04_pjvwsp.png"></img></div>
          <span>Code Faker</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <NavLinks />
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <div className="p-6">
                <Link href="/" className="mb-6 flex items-center space-x-2 text-xl font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="h-6 w-6"><img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1748304382/codefaker-04_pjvwsp.png"></img></div>
                  <span>Code Faker</span>
                </Link>
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
