
import { CategoryCard } from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import type { Category } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllCategories } from '@/lib/products';

// Category data is now fetched dynamically from products in Firestore.
// The visibility is managed by adding/removing products of a category in the admin panel.
const categoryDetails: Omit<Category, 'id' | 'linkUrl' | 'title'>[] = [
    {
      description: 'Facilitamos tus gestiones y trámites con eficiencia y profesionalismo. Consulta nuestro catálogo de servicios.',
      imageUrl: 'https://res.cloudinary.com/dyeppbrfl/image/upload/v1748926185/Rick_bra_nd_e7wn4b.png',
      imageHint: 'legal documents paperwork',
    },
    {
      description: 'Descubre nuestra colección única de figuras y artículos personalizados con diseños artísticos y creativos.',
      imageUrl: 'https://res.cloudinary.com/dyeppbrfl/image/upload/v1748927897/David_bra_nd_yptryg.png',
      imageHint: 'artistic figures drawings',
    },
    {
      description: 'Ropa a medida y peluches adorables hechos con amor y materiales de alta calidad. Diseños únicos y personalizados.',
      imageUrl: 'https://res.cloudinary.com/dyeppbrfl/image/upload/v1748927537/Alexa_bra_nd_jbwzrn.png',
      imageHint: 'custom clothing plush toys',
    },
];

const categoryNameToDetailsMap: Record<string, Omit<Category, 'id' | 'linkUrl' | 'title'>> = {
  'Servicios': categoryDetails[0],
  'Arte y Colecciones': categoryDetails[1],
  'Confecciones': categoryDetails[2],
};


export default async function HomePage() {
  const categoryNames = await getAllCategories();

  // Filter out "Todos" and create full category objects
  const displayedCategories: Category[] = categoryNames
    .filter(name => name !== 'Todos')
    .map(name => {
        const details = categoryNameToDetailsMap[name] || {
            description: `Explora nuestros productos en la categoría ${name}.`,
            imageUrl: 'https://placehold.co/600x400.png',
            imageHint: 'product category',
        };
        return {
            ...details,
            id: name.toLowerCase().replace(/ /g, '-'),
            title: name,
            linkUrl: `/${name.toLowerCase().replace(/ /g, '-')}`, // e.g. /arte-y-colecciones - ensure you have pages for these or link to catalog
        };
    })
    // A temporary filter to hide "Confecciones" as requested previously.
    // To show it again, just remove this .filter() line.
    .filter(cat => cat.title !== 'Confecciones');

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
      {displayedCategories.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 text-foreground">Nuestras Categorías</h2>
          <div className="flex justify-center">
            <div className={`grid grid-cols-1 gap-6 md:gap-8 ${
                displayedCategories.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'
              } ${
                displayedCategories.length === 1 ? 'lg:grid-cols-1' :
                displayedCategories.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
              }`}>
              {displayedCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
