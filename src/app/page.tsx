
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CategorySection } from '@/components/home/CategorySection';
import { CategoryGridSkeleton } from '@/components/CategoryGridSkeleton';


export default async function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-accent/30 rounded-lg shadow-sm">
        <div className="container mx-auto px-4">
          <div className="mx-auto h-16 w-16 text-[#E08C79] mb-4"> <img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1748304382/codefaker-04_pjvwsp.png" alt="CFBND Logo"/> </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Bienvenido a <span className="text-[#E08C79]">CFB</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Soluciones creativas y servicios profesionales.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <Link href="/contacto" passHref>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                Contáctanos <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/catalogo" passHref>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-foreground hover:bg-primary hover:text-primary-foreground dark:text-primary dark:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground w-full sm:w-auto"
              >
                Explorar Catálogo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategorySection />
      </Suspense>

    </div>
  );
}
