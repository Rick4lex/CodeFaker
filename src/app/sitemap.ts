
import { getProducts } from '@/lib/products';
import type { MetadataRoute } from 'next';

const URL = 'https://code-faker-portafolio.vercel.app'; // Reemplaza con tu URL de producción

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const productEntries: MetadataRoute.Sitemap = products.map(({ id, updatedAt }) => ({
    url: `${URL}/catalogo/${id}`,
    lastModified: updatedAt ? updatedAt.toDate() : new Date(),
    // changeFrequency and priority can be added if needed
  }));

  return [
    {
      url: URL,
      lastModified: new Date(),
    },
    {
      url: `${URL}/catalogo`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/contacto`,
      lastModified: new Date(),
    },
    ...productEntries,
  ];
}
