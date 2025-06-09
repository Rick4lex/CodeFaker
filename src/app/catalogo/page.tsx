
"use client";

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { allProducts, getAllCategories, getAllSubCategories } from '@/lib/products';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Todas');

  const categories = useMemo(() => getAllCategories(), []);
  const subCategories = useMemo(() => getAllSubCategories(selectedCategory), [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    if (selectedCategory !== 'Todos') {
      products = products.filter(p => p.category === selectedCategory);
    }

    if (selectedSubCategory !== 'Todas' && selectedCategory !== 'Todos') {
       products = products.filter(p => p.subCategory === selectedSubCategory);
    } else if (selectedSubCategory !== 'Todas' && selectedCategory === 'Todos') {
       products = products.filter(p => p.subCategory === selectedSubCategory);
    }


    if (searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    return products;
  }, [searchTerm, selectedCategory, selectedSubCategory]);

   // Reset subcategory when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory('Todas');
  };


  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Catálogo de Productos</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explora todos nuestros productos y servicios. Usa los filtros para encontrar exactamente lo que buscas.
        </p>
      </section>

      {/* Filters Section */}
      <section className="p-4 md:p-6 bg-card rounded-lg shadow-md sticky top-16 z-40 backdrop-blur-sm bg-card/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nombre, descripción, etiquetas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory} disabled={selectedCategory === 'Todos' && subCategories.length <=1}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por subcategoría" />
            </SelectTrigger>
            <SelectContent>
              {subCategories.map(subCategory => (
                <SelectItem key={subCategory} value={subCategory}>{subCategory}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-10">
            No se encontraron productos que coincidan con tus criterios de búsqueda.
          </p>
        )}
      </section>
    </div>
  );
}
