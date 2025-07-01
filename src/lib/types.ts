
import type { Timestamp } from "firebase/firestore";

export interface Category {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  imageHint: string;
  visible?: boolean; // Added for 2.1
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string; // For detail page
  imageUrl: string;
  galleryImages?: string[]; // For detail page
  price?: string;
  imageHint: string;
  category: string; // Main category like "Servicios", "Arte y Colecciones", "Confecciones"
  subCategory?: string; // More specific like "Ropa", "Peluches", "Ilustraciones"
  tags?: string[]; // For filtering or search
  // Potentially other fields for enriched product details
  sku?: string;
  stock?: number;
  relatedProducts?: string[]; // array of product IDs
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Service extends Product {}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string; // Added
  selectedServices: string[]; // Changed from subject
  message: string;
  fileLink?: string; // Added
}

export interface Comment {
  id: string;
  productId: string;
  userId: string; // Or userName if not using auth
  userName: string;
  text: string;
  timestamp: any; // Firestore Timestamp
  avatarUrl?: string;
}

export interface Reaction {
  count: number;
}
