
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageSquare } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ProductComments } from './_components/ProductComments';
import { ProductReactions } from './_components/ProductReactions';

interface ProductDetailPageProps {
  params: { id: string };
}

// Generate dynamic metadata for SEO
export async function generateMetadata(
  { params }: ProductDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name} - Code Faker`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl, ...previousImages],
    },
  };
}


export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const whatsappMessage = `Hola, estoy interesado en el producto: ${product.name} (ID: ${product.id}). ¿Podrían darme más información?`;
  const whatsappLink = `https://wa.me/573157513325?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{objectFit: "cover"}}
            priority 
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{product.name}</h1>
          {product.price && <p className="text-3xl font-semibold text-foreground">{product.price}</p>}
          <p className="text-lg text-muted-foreground">{product.description}</p>
          {product.longDescription && <p className="text-md text-foreground whitespace-pre-line">{product.longDescription}</p>}
          
          <div className="flex flex-wrap gap-2">
            {product.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="flex-1 bg-green-500 hover:bg-green-600 text-white">
              <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" /> Contactar por WhatsApp
              </Link>
            </Button>
            <ProductReactions productId={product.id} />
          </div>
        </div>
      </section>

      <Separator />
      
      <ProductComments productId={product.id} />
      
    </div>
  );
}
