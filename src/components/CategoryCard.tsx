import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Category } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out bg-card">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={category.imageUrl}
            alt={category.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            data-ai-hint={category.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-xl lg:text-2xl font-semibold mb-2 text-primary">{category.title}</CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-3">{category.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={category.linkUrl} passHref legacyBehavior>
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Ver Más <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
