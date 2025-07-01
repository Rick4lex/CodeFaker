
"use client";

import { useEffect, useState } from 'react';
import { doc, runTransaction, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ThumbsUp } from 'lucide-react';

export function ProductReactions({ productId }: { productId: string }) {
  const { toast } = useToast();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // Si la base de datos no está configurada, muestra un botón deshabilitado.
  if (!db) {
    return (
      <Button size="lg" variant="outline" className="flex-1 border-primary text-primary" disabled>
        <ThumbsUp className='mr-2 h-5 w-5' />
        Me gusta (N/A)
      </Button>
    );
  }

  useEffect(() => {
    const likeDocRef = doc(db, 'products', productId, 'likes', 'likeData');
    const unsubscribe = onSnapshot(likeDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setLikes(docSnap.data().count || 0);
      } else {
        setLikes(0);
      }
    });

    const userLiked = localStorage.getItem('liked_' + productId) === 'true';
    setHasLiked(userLiked);

    return () => unsubscribe();
  }, [productId]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    const likeDocRef = doc(db, 'products', productId, 'likes', 'likeData');

    try {
      await runTransaction(db, async (transaction) => {
        const likeDoc = await transaction.get(likeDocRef);
        const newCount = (likeDoc.data()?.count || 0) + (hasLiked ? -1 : 1);
        
        transaction.set(likeDocRef, { count: Math.max(0, newCount) }, { merge: true });
      });

      if (hasLiked) {
        localStorage.removeItem('liked_' + productId);
      } else {
        localStorage.setItem('liked_' + productId, 'true');
      }
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error("Error updating like:", error);
      toast({ title: 'Error', description: 'No se pudo actualizar la reacción.', variant: 'destructive' });
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Button size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleLike} disabled={isLiking}>
      <ThumbsUp className={'mr-2 h-5 w-5 ' + (hasLiked ? 'fill-current' : '')} />
      {hasLiked ? 'Te gusta' : 'Me gusta'} ({likes})
    </Button>
  );
}
