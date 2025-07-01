
import { getAllCategories } from '@/lib/products';
import type { Category } from '@/lib/types';
import { CategoryCard } from '@/components/CategoryCard';

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

const categoryLinkMap: Record<string, string> = {
    'Servicios': '/servicios',
    'Arte y Colecciones': '/dibujos',
    'Confecciones': '/confecciones',
};

export async function CategorySection() {
    const categoryNames = await getAllCategories();

    if (!categoryNames) {
        return null;
    }

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
                linkUrl: categoryLinkMap[name] || `/catalogo?category=${encodeURIComponent(name)}`,
            };
        });

    if (displayedCategories.length === 0) {
        return null;
    }

    const getGridCols = () => {
        switch (displayedCategories.length) {
            case 1:
                return "md:grid-cols-1 lg:grid-cols-1 max-w-md";
            case 2:
                return "md:grid-cols-2 lg:grid-cols-2 max-w-4xl";
            default:
                return "md:grid-cols-2 lg:grid-cols-3 max-w-7xl";
        }
    }
    
    return (
        <section>
            <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 text-foreground">Nuestras Categorías</h2>
            <div className="flex justify-center">
                <div className={`grid grid-cols-1 gap-6 md:gap-8 mx-auto ${getGridCols()}`}>
                    {displayedCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
