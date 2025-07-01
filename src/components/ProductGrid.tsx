
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/products';

export async function ProductGrid({ category }: { category: string }) {
    const products = await getProductsByCategory(category);

    if (!products || products.length === 0) {
        return <p className="text-center text-muted-foreground">No hay productos disponibles en esta categoría en este momento.</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    )
}
