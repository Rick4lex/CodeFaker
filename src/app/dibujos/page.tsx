
import { Suspense } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductGridSkeleton } from '@/components/ProductGridSkeleton';

export default async function DibujosPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Arte y Colecciones</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explora nuestra galería de arte y encuentra piezas únicas que darán vida a tus espacios.
        </p>
      </section>

      <section>
        <Suspense fallback={<ProductGridSkeleton count={3} />}>
            <ProductGrid category="Arte y Colecciones" />
        </Suspense>
      </section>
    </div>
  );
}
