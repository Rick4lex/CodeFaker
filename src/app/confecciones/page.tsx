import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';

const confecciones: Product[] = [
  {
    id: 'c1',
    name: 'Vestido Floral "Primavera"',
    description: 'Elegante vestido confeccionado a medida con tela de algodón y estampado floral. Perfecto para ocasiones especiales.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'floral dress fashion',
    price: '$75.00',
    category: 'ropa',
  },
  {
    id: 'c2',
    name: 'Peluche Osito "Abrazos"',
    description: 'Adorable osito de peluche hecho a mano con materiales hipoalergénicos. Suave y perfecto para regalar.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'teddy bear plush toy',
    price: '$25.00',
    category: 'peluche',
  },
  {
    id: 'c3',
    name: 'Camisa Casual "Aventura"',
    description: 'Camisa de lino cómoda y fresca, ideal para el día a día. Diseño moderno y versátil.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'casual shirt men fashion',
    price: '$40.00',
    category: 'ropa',
  },
  {
    id: 'c4',
    name: 'Peluche Zorrito "Astuto"',
    description: 'Simpático zorrito de peluche con detalles bordados. Un compañero de juegos ideal para niños.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fox plush toy kids',
    price: '$22.00',
    category: 'peluche',
  },
];

export default function ConfeccionesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Confecciones</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Diseños exclusivos y personalizados en ropa y peluches, hechos con dedicación y materiales de calidad.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {confecciones.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
