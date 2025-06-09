
import type { Product } from './types';

export const allProducts: Product[] = [
  // Servicios
  {
    id: 's1',
    name: 'Gestión de Documentos Legales',
    description: 'Asesoramiento y gestión completa para la obtención y legalización de documentos importantes. Simplificamos el proceso para ti.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'legal documents stamp',
    price: 'Consultar',
    category: 'Servicios',
    subCategory: 'Gestión Documental',
    tags: ['legal', 'documentos', 'trámites'],
  },
  {
    id: 's2',
    name: 'Trámites Administrativos',
    description: 'Realizamos todo tipo de trámites administrativos ante entidades públicas y privadas, ahorrándote tiempo y esfuerzo.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'office paperwork form',
    category: 'Servicios',
    subCategory: 'Trámites',
    tags: ['administrativo', 'papeleo', 'gestión'],
  },
  {
    id: 's3',
    name: 'Asesoría Personalizada',
    description: 'Ofrecemos asesoría detallada y personalizada para tus necesidades específicas de gestión y trámites.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'consultation meeting handshake',
    category: 'Servicios',
    subCategory: 'Asesorías',
    tags: ['consultoría', 'personalizado', 'ayuda'],
  },
  {
    id: 's4',
    name: 'Registro de Marcas y Patentes',
    description: 'Protege tu propiedad intelectual con nuestro servicio experto en registro de marcas y patentes.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'trademark patent protection',
    price: 'Consultar',
    category: 'Servicios',
    subCategory: 'Propiedad Intelectual',
    tags: ['marcas', 'patentes', 'protección'],
  },
  // Dibujos y Arte
  {
    id: 'd1',
    name: 'Figura Artística "Cosmos"',
    description: 'Figura detallada con un diseño inspirado en el cosmos, pintada a mano con colores vibrantes.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'galaxy sculpture art',
    price: '$45.00',
    category: 'Arte y Colecciones',
    subCategory: 'Figuras',
    tags: ['arte', 'escultura', 'cosmos'],
  },
  {
    id: 'd2',
    name: 'Ilustración Personalizada',
    description: 'Encarga una ilustración digital o tradicional basada en tu foto o idea. Ideal para regalos únicos.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'custom portrait drawing',
    price: 'Desde $30.00',
    category: 'Arte y Colecciones',
    subCategory: 'Ilustraciones',
    tags: ['dibujo', 'personalizado', 'retrato'],
  },
  {
    id: 'd3',
    name: 'Set de Pegatinas Fantasía',
    description: 'Colección de pegatinas de vinilo con diseños originales de criaturas fantásticas y motivos mágicos.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fantasy stickers art',
    price: '$12.50',
    category: 'Arte y Colecciones',
    subCategory: 'Pegatinas',
    tags: ['stickers', 'fantasía', 'mágico'],
  },
  {
    id: 'd4',
    name: 'Cuadro Decorativo "Naturaleza Viva"',
    description: 'Lienzo impreso con un dibujo digital de alta resolución que captura la belleza de la naturaleza.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'nature landscape painting',
    price: '$60.00',
    category: 'Arte y Colecciones',
    subCategory: 'Cuadros',
    tags: ['decoración', 'naturaleza', 'lienzo'],
  },
  // Confecciones
  {
    id: 'c1',
    name: 'Vestido Floral "Primavera"',
    description: 'Elegante vestido confeccionado a medida con tela de algodón y estampado floral. Perfecto para ocasiones especiales.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'floral dress fashion',
    price: '$75.00',
    category: 'Confecciones',
    subCategory: 'Ropa',
    tags: ['vestido', 'floral', 'moda'],
  },
  {
    id: 'c2',
    name: 'Peluche Osito "Abrazos"',
    description: 'Adorable osito de peluche hecho a mano con materiales hipoalergénicos. Suave y perfecto para regalar.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'teddy bear plush toy',
    price: '$25.00',
    category: 'Confecciones',
    subCategory: 'Peluches',
    tags: ['peluche', 'osito', 'regalo'],
  },
  {
    id: 'c3',
    name: 'Camisa Casual "Aventura"',
    description: 'Camisa de lino cómoda y fresca, ideal para el día a día. Diseño moderno y versátil.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'casual shirt men fashion',
    price: '$40.00',
    category: 'Confecciones',
    subCategory: 'Ropa',
    tags: ['camisa', 'lino', 'casual'],
  },
  {
    id: 'c4',
    name: 'Peluche Zorrito "Astuto"',
    description: 'Simpático zorrito de peluche con detalles bordados. Un compañero de juegos ideal para niños.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fox plush toy kids',
    price: '$22.00',
    category: 'Confecciones',
    subCategory: 'Peluches',
    tags: ['peluche', 'zorro', 'niños'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'Todos') return allProducts;
  return allProducts.filter(product => product.category === category);
};

export const getProductsBySubCategory = (subCategory: string): Product[] => {
  return allProducts.filter(product => product.subCategory === subCategory);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(allProducts.map(p => p.category));
  return ['Todos', ...Array.from(categories)];
};

export const getAllSubCategories = (category?: string): string[] => {
  let productsToFilter = allProducts;
  if (category && category !== 'Todos') {
    productsToFilter = allProducts.filter(p => p.category === category);
  }
  const subCategories = new Set(productsToFilter.map(p => p.subCategory).filter(Boolean as any as (value: string | undefined) => value is string));
  return ['Todas', ...Array.from(subCategories)];
};
