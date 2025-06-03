import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';

const drawings: Product[] = [
  {
    id: 'd1',
    name: 'Figura Artística "Cosmos"',
    description: 'Figura detallada con un diseño inspirado en el cosmos, pintada a mano con colores vibrantes.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'galaxy sculpture art',
    price: '$45.00',
  },
  {
    id: 'd2',
    name: 'Ilustración Personalizada',
    description: 'Encarga una ilustración digital o tradicional basada en tu foto o idea. Ideal para regalos únicos.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'custom portrait drawing',
    price: 'Desde $30.00',
  },
  {
    id: 'd3',
    name: 'Set de Pegatinas Fantasía',
    description: 'Colección de pegatinas de vinilo con diseños originales de criaturas fantásticas y motivos mágicos.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fantasy stickers art',
    price: '$12.50',
  },
  {
    id: 'd4',
    name: 'Cuadro Decorativo "Naturaleza Viva"',
    description: 'Lienzo impreso con un dibujo digital de alta resolución que captura la belleza de la naturaleza.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'nature landscape painting',
    price: '$60.00',
  },
];

export default function DibujosPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Arte y Colecciones</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explora nuestra galería de arte y encuentra piezas únicas que darán vida a tus espacios.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {drawings.map((drawing) => (
            <ProductCard key={drawing.id} product={drawing} />
          ))}
        </div>
      </section>
    </div>
  );
}
