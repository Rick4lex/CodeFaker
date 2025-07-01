
import { Suspense } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductGridSkeleton } from '@/components/ProductGridSkeleton';

export default async function ServiciosPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Servicios</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Soluciones eficientes y confiables para todas tus necesidades de gestión y trámites.
        </p>
      </section>

      <section>
        <Suspense fallback={<ProductGridSkeleton count={3} />}>
            <ProductGrid category="Servicios" />
        </Suspense>
      </section>
    </div>
  );
}
