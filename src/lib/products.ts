
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import type { Product } from './types';

// IMPORTANT: The static product list has been removed.
// All product data is now fetched from Firestore.
// Please use the new admin panel at /admin/dashboard to add, edit, or delete products.

// Helper to convert Firestore doc to Product object
const mapDocToProduct = (doc: any): Product => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    // Convert Firestore Timestamps to Dates if they exist
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  } as Product;
};

export const getProducts = async (): Promise<Product[]> => {
  if (!db) {
    console.warn("Firestore (db) no está inicializado. Devolviendo lista de productos vacía.");
    return [];
  }
  try {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(mapDocToProduct);
    return productList;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
   if (!db) {
    console.warn(`Firestore (db) no está inicializado. No se puede obtener el producto con id: ${id}.`);
    return undefined;
  }
  try {
    const productDocRef = doc(db, 'products', id);
    const productSnap = await getDoc(productDocRef);

    if (productSnap.exists()) {
      return mapDocToProduct(productSnap);
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return undefined;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  if (!db) {
    console.warn(`Firestore (db) no está inicializado. No se pueden obtener productos para la categoría: ${category}.`);
    return [];
  }
  if (category === 'Todos') return getProducts();
  try {
    const q = query(collection(db, 'products'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToProduct);
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
};

export const getAllCategories = async (): Promise<string[]> => {
   if (!db) {
    console.warn("Firestore (db) no está inicializado. No se pueden obtener las categorías.");
    return ['Todos'];
  }
  const products = await getProducts();
  const categories = new Set(products.map(p => p.category));
  return ['Todos', ...Array.from(categories)];
};

export const getAllSubCategories = async (category?: string): Promise<string[]> => {
  if (!db) {
    console.warn("Firestore (db) no está inicializado. No se pueden obtener las subcategorías.");
    return ['Todas'];
  }
  let productsToFilter = await getProducts();
  if (category && category !== 'Todos') {
    productsToFilter = productsToFilter.filter(p => p.category === category);
  }
  const subCategories = new Set(productsToFilter.map(p => p.subCategory).filter(Boolean as any as (value: string | undefined) => value is string));
  return ['Todas', ...Array.from(subCategories)];
};
