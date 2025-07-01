
'use server';

import { z } from 'zod';
import { getSession } from './auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

// --- Login / Logout Actions ---

const loginSchema = z.object({
  password: z.string().min(1, 'La contraseña es requerida.'),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Por favor, introduce una contraseña.',
    };
  }

  if (validatedFields.data.password !== process.env.ADMIN_PASSWORD) {
    return {
      error: 'Contraseña incorrecta.',
    };
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();
  redirect('/admin/dashboard');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/admin/login');
}


// --- Product CRUD Actions ---

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.'),
  longDescription: z.string().optional(),
  imageUrl: z.string().url('URL de imagen no válida.').or(z.literal('')),
  imageHint: z.string().optional(),
  price: z.string().optional(),
  category: z.string().min(1, 'La categoría es requerida.'),
  subCategory: z.string().optional(),
  tags: z.string().optional(), // Input as comma-separated string
});


export async function saveProduct(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.isAdmin) {
    return { success: false, message: 'No autorizado.' };
  }

  if (!db) {
    return { success: false, message: 'Error: La base de datos no está configurada. Revisa las variables de entorno de Firebase.' };
  }

  const rawData = {
    id: formData.get('id') as string || undefined,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    longDescription: formData.get('longDescription') as string,
    imageUrl: formData.get('imageUrl') as string,
    imageHint: formData.get('imageHint') as string,
    price: formData.get('price') as string,
    category: formData.get('category') as string,
    subCategory: formData.get('subCategory') as string,
    tags: formData.get('tags') as string,
  };

  const validatedFields = productSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Por favor corrige los errores.',
    };
  }
  
  const { id, tags, ...productData } = validatedFields.data;

  const dataToSave = {
    ...productData,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    imageUrl: productData.imageUrl || 'https://placehold.co/600x400.png',
  };


  try {
    if (id) {
      // Update existing product
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, {
        ...dataToSave,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create new product
      await addDoc(collection(db, 'products'), {
        ...dataToSave,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/catalogo');
    revalidatePath('/');
    
    return { success: true, message: `Producto ${id ? 'actualizado' : 'creado'} con éxito.` };

  } catch (error) {
    console.error("Error guardando el producto:", error);
    return { success: false, message: 'Error en la base de datos.', error: (error as Error).message };
  }
}

export async function deleteProduct(id: string) {
    const session = await getSession();
    if (!session.isAdmin) {
        return { success: false, message: 'No autorizado.' };
    }

    if (!db) {
        return { success: false, message: 'Error: La base de datos no está configurada.' };
    }

    if (!id) {
        return { success: false, message: 'ID de producto no válido.' };
    }

    try {
        await deleteDoc(doc(db, 'products', id));
        revalidatePath('/admin/dashboard');
        revalidatePath('/catalogo');
        revalidatePath('/');
        return { success: true, message: 'Producto eliminado con éxito.' };
    } catch (error) {
        console.error("Error eliminando el producto:", error);
        return { success: false, message: 'Ocurrió un error al eliminar el producto.' };
    }
}
