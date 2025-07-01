
import { CategoryCardSkeleton } from './CategoryCardSkeleton';

export function CategoryGridSkeleton() {
  return (
    <section>
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 text-foreground">Nuestras Categorías</h2>
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <CategoryCardSkeleton key={i} />
                ))}
            </div>
        </div>
    </section>
  );
}
