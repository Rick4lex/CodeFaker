
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/products';

export default function DibujosPage() {
  const drawings = getProductsByCategory('Arte y Colecciones');

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Arte y Colecciones</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explora nuestra galería de arte y encuentra piezas únicas que darán vida a tus espacios.
        </p>
      </section>

      <section>
        {drawings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {drawings.map((drawing) => (
              <ProductCard key={drawing.id} product={drawing} />
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground">No hay arte disponible en este momento.</p>
        )}
      </section>
    </div>
  );
}

