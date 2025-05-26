export interface Category {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  imageHint: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price?: string;
  imageHint: string;
  category?: string; // e.g., 'ropa', 'peluche' for Confecciones
}

export interface Service extends Product {} // Services can share the Product structure

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
