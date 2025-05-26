import { ProductCard } from '@/components/ProductCard';
import type { Service } from '@/lib/types';

const services: Service[] = [
  {
    id: 's1',
    name: 'Gestión de Documentos Legales',
    description: 'Asesoramiento y gestión completa para la obtención y legalización de documentos importantes. Simplificamos el proceso para ti.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'legal documents stamp',
    price: 'Consultar',
  },
  {
    id: 's2',
    name: 'Trámites Administrativos',
    description: 'Realizamos todo tipo de trámites administrativos ante entidades públicas y privadas, ahorrándote tiempo y esfuerzo.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'office paperwork form',
  },
  {
    id: 's3',
    name: 'Asesoría Personalizada',
    description: 'Ofrecemos asesoría detallada y personalizada para tus necesidades específicas de gestión y trámites.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'consultation meeting handshake',
  },
   {
    id: 's4',
    name: 'Registro de Marcas y Patentes',
    description: 'Protege tu propiedad intelectual con nuestro servicio experto en registro de marcas y patentes.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'trademark patent protection',
    price: 'Consultar',
  },
];

export default function ServiciosPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Servicios de Trámites</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Soluciones eficientes y confiables para todas tus necesidades de gestión y trámites.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <ProductCard key={service.id} product={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
