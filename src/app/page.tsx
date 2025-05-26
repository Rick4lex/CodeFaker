import { CategoryCard } from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import type { Category } from '@/lib/types';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories: Category[] = [
  {
    id: 'servicios',
    title: 'Servicios de Trámites',
    description: 'Facilitamos tus gestiones y trámites con eficiencia y profesionalismo. Consulta nuestro catálogo de servicios.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'legal documents paperwork',
    linkUrl: '/servicios',
  },
  {
    id: 'dibujos',
    title: 'Venta de Figuras con Dibujos',
    description: 'Descubre nuestra colección única de figuras y artículos personalizados con diseños artísticos y creativos.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'artistic figures drawings',
    linkUrl: '/dibujos',
  },
  {
    id: 'confecciones',
    title: 'Confecciones y Peluches',
    description: 'Ropa a medida y peluches adorables hechos con amor y materiales de alta calidad. Diseños únicos y personalizados.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'custom clothing plush toys',
    linkUrl: '/confecciones',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-accent/30 rounded-lg shadow-sm">
        <div className="container mx-auto px-4">
          <Sparkles className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Bienvenido a <span className="text-primary">Code Foco</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Tu portafolio de soluciones creativas y servicios profesionales. Descubre un mundo de posibilidades.
          </p>
          <div className="mt-8">
            <Link href="/contacto" passHref>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Contáctanos <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 text-foreground">Nuestras Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
