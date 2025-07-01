
'use client';

import { useFormState } from 'react-dom';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { saveProduct } from '@/lib/admin-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Product } from '@/lib/types';

export function ProductFormModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [state, formAction] = useFormState(saveProduct, undefined);
  
  const isModalOpen = searchParams.get('modal') === 'true';
  const action = searchParams.get('action'); // 'add' or 'edit'
  const productId = searchParams.get('id');

  // This is a simple way to pass product data to the modal.
  // A more robust solution might involve a state manager or fetching directly.
  const productData = searchParams.get('productData');
  const product: Product | null = productData ? JSON.parse(productData) : null;
  
  useEffect(() => {
    if (state?.message && !state?.errors) {
      handleClose();
      // Maybe show a success toast here
    }
  }, [state]);

  const handleClose = () => {
    router.back();
    formRef.current?.reset();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{action === 'edit' ? 'Editar' : 'Añadir'} Producto</DialogTitle>
          <DialogDescription>
            Completa los detalles del producto. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef} className="grid gap-4 py-4">
          <input type="hidden" name="id" value={product?.id || ''} />
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nombre</Label>
            <Input id="name" name="name" defaultValue={product?.name} className="col-span-3" />
            {state?.errors?.name && <p className="col-span-4 text-sm text-destructive">{state.errors.name[0]}</p>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Descripción Corta</Label>
            <Textarea id="description" name="description" defaultValue={product?.description} className="col-span-3" />
             {state?.errors?.description && <p className="col-span-4 text-sm text-destructive">{state.errors.description[0]}</p>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="longDescription" className="text-right">Descripción Larga</Label>
            <Textarea id="longDescription" name="longDescription" defaultValue={product?.longDescription} className="col-span-3" rows={5} />
          </div>
          
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">URL de Imagen</Label>
            <Input id="imageUrl" name="imageUrl" defaultValue={product?.imageUrl} className="col-span-3" placeholder="https://placehold.co/600x400.png" />
             {state?.errors?.imageUrl && <p className="col-span-4 text-sm text-destructive">{state.errors.imageUrl[0]}</p>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageHint" className="text-right">Pista de Imagen (AI)</Label>
            <Input id="imageHint" name="imageHint" defaultValue={product?.imageHint} className="col-span-3" placeholder="ej: modern office" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="price" className="text-right">Precio</Label>
                <Input id="price" name="price" defaultValue={product?.price} className="col-span-1" placeholder="ej: $25.00 o Consultar" />
             </div>
             <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="category" className="text-right">Categoría</Label>
                <Input id="category" name="category" defaultValue={product?.category} className="col-span-1" placeholder="ej: Servicios" />
                {state?.errors?.category && <p className="col-span-2 text-sm text-destructive">{state.errors.category[0]}</p>}
             </div>
          </div>

           <div className="grid grid-cols-2 gap-4">
             <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="subCategory" className="text-right">Subcategoría</Label>
                <Input id="subCategory" name="subCategory" defaultValue={product?.subCategory} className="col-span-1" placeholder="ej: Ropa" />
             </div>
             <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="tags" className="text-right">Etiquetas</Label>
                <Input id="tags" name="tags" defaultValue={product?.tags?.join(', ')} className="col-span-1" placeholder="tag1, tag2, tag3" />
             </div>
          </div>
        
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
           {state?.message && !state?.errors && <p className="text-sm text-green-600">{state.message}</p>}
           {state?.message && state?.errors && <p className="text-sm text-destructive">{state.message}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
