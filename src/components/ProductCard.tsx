import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react'; // Or other relevant icon

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out bg-card">
      <CardHeader className="p-0">
        <div className="relative w-full h-56 sm:h-64">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            data-ai-hint={product.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-xl font-semibold mb-2 text-primary">{product.name}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm line-clamp-4">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        {product.price && (
          <p className="text-lg font-semibold text-foreground">{product.price}</p>
        )}
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
