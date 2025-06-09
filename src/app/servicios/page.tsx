
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/products';

export default function ServiciosPage() {
  const services = getProductsByCategory('Servicios');

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Servicios</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Soluciones eficientes y confiables para todas tus necesidades de gestión y trámites.
        </p>
      </section>

      <section>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ProductCard key={service.id} product={service} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No hay servicios disponibles en este momento.</p>
        )}
      </section>
    </div>
  );
}
