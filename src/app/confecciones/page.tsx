
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/products';

export default async function ConfeccionesPage() {
  const confecciones = await getProductsByCategory('Confecciones');
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Confecciones</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Diseños exclusivos y personalizados en ropa y peluches, hechos con dedicación y materiales de calidad.
        </p>
      </section>

      <section>
        {confecciones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {confecciones.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No hay confecciones disponibles en este momento.</p>
        )}
      </section>
    </div>
  );
}
