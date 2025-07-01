
import { Suspense } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductGridSkeleton } from '@/components/ProductGridSkeleton';


export default async function ConfeccionesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Confecciones</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Diseños exclusivos y personalizados en ropa y peluches, hechos con dedicación y materiales de calidad.
        </p>
      </section>

      <section>
        <Suspense fallback={<ProductGridSkeleton count={3} />}>
          <ProductGrid category="Confecciones" />
        </Suspense>
      </section>
    </div>
  );
}
