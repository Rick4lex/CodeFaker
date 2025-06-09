
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, FileText, Palette, Shirt, Mail, Sparkles, ShoppingBag } from 'lucide-react'; // Added ShoppingBag for Catalog

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/catalogo', label: 'Catálogo', icon: ShoppingBag }, // Added Catalog link
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
    <nav className={`flex ${mobile ? 'flex-col space-y-2' : 'space-x-2 items-center'}`}>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} passHref>
          <Button
            variant="ghost"
            className={`justify-start text-foreground hover:text-primary ${mobile ? 'w-full' : ''} ${mobile ? 'text-sm px-2 py-1.5' : 'text-sm px-3 py-1.5'}`}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
          >
            <item.icon className="mr-2 h-4 w-4" /> {/* Adjusted icon size for space */}
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );

  if (!mounted) {
    return ( 
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-[#E08C79]">
          <div className="h-7 w-7"><img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1748304382/codefaker-04_pjvwsp.png" alt="CFBND Logo"></img></div>
            <span>CFBND</span>
          </Link>
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse sm:hidden"></div>
          <div className="hidden sm:flex space-x-2"> {/* Adjusted space-x */}
            {[...Array(navItems.length)].map((_, i) => <div key={i} className="h-6 w-20 bg-muted rounded-md animate-pulse"></div>)}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-[#E08C79] hover:opacity-80 transition-opacity">
          <div className="h-7 w-7"><img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1748304382/codefaker-04_pjvwsp.png" alt="CFBND Logo"></img></div>
          <span>CFBND</span>
        </Link>

        <div className="hidden sm:block">
          <NavLinks />
        </div>

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
                <Link href="/" className="mb-6 flex items-center space-x-2 text-xl font-bold text-[#E08C79]" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="h-6 w-6"><img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1748304382/codefaker-04_pjvwsp.png" alt="CFBND Logo"></img></div>
                  <span>CFBND</span>
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
