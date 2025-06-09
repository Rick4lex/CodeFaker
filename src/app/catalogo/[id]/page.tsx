
// @ts-nocheck
// TODO: Arreglar ts-nocheck. Demora demasiado en la ejecución.
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById } from '@/lib/products';
import type { Product as ProductType, Comment as CommentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  runTransaction,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { Heart, MessageCircle, Send, Share2, ShoppingCart, ThumbsUp, User, Zap, ExternalLink, MessageSquare, MessageSquarePlus, MessagesSquare } from 'lucide-react'; // Added Send
import { useToast } from '@/hooks/use-toast';
import { notFound } from 'next/navigation';

// Dummy user for comments - replace with actual auth user if implemented
const DUMMY_USER = { id: 'guestUser', name: 'Visitante' };

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false); // Track if current user has liked
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchedProduct = getProductById(params.id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      // Handle product not found, e.g., redirect or show a 404 page
      // For now, just log and set product to null
      console.error("Product not found");
      // return notFound(); // This would render the nearest not-found.js page
    }
  }, [params.id]);

  useEffect(() => {
    if (!product) return;

    // Fetch comments
    const commentsQuery = query(collection(db, `products/${product.id}/comments`), orderBy('timestamp', 'desc'));
    const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommentType));
      setComments(fetchedComments);
    });

    // Fetch likes
    const likeDocRef = doc(db, `products/${product.id}/likes`, 'likeData'); // Using a specific doc for likes
    const unsubscribeLikes = onSnapshot(likeDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setLikes(docSnap.data().count || 0);
        // Check if DUMMY_USER (or actual user) has liked
        // This is a simplified check; a real system would store user IDs who liked.
        // For this example, we'll use localStorage to simulate for the guest.
        const userLiked = localStorage.getItem(`liked_${product.id}_${DUMMY_USER.id}`) === 'true';
        setHasLiked(userLiked);
      } else {
        setLikes(0);
      }
    });
    
    return () => {
      unsubscribeComments();
      unsubscribeLikes();
    };
  }, [product]);


  if (!product) {
     // You could return a loading skeleton here
    return <div className="container mx-auto px-4 py-8 text-center">Cargando producto...</div>;
  }
  // If after attempting to fetch, product is still null (e.g., invalid ID not caught by getProductById)
  // This check is after the useEffect, so product could have been set to null if not found
  if (product === null && params.id) { // Check params.id to ensure it's not initial render
    notFound();
  }


  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !product) return;
    setIsSubmittingComment(true);
    try {
      await addDoc(collection(db, `products/${product.id}/comments`), {
        productId: product.id,
        userId: DUMMY_USER.id, // Replace with actual user ID from auth
        userName: DUMMY_USER.name, // Replace with actual user name
        avatarUrl: `https://avatar.vercel.sh/${DUMMY_USER.name}.png`,
        text: newComment,
        timestamp: serverTimestamp(),
      });
      setNewComment('');
      toast({ title: 'Comentario añadido', description: 'Gracias por tu comentario.' });
    } catch (error) {
      console.error("Error adding comment: ", error);
      toast({ title: 'Error', description: 'No se pudo añadir el comentario.', variant: 'destructive' });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLike = async () => {
    if (!product || isLiking) return;
    setIsLiking(true);
    const likeDocRef = doc(db, `products/${product.id}/likes`, 'likeData');

    try {
      await runTransaction(db, async (transaction) => {
        const likeDoc = await transaction.get(likeDocRef);
        let newCount = 0;
        if (!likeDoc.exists()) {
          newCount = 1; // First like
        } else {
          newCount = (likeDoc.data().count || 0) + (hasLiked ? -1 : 1);
        }
        
        if (newCount < 0) newCount = 0; // Prevent negative likes

        transaction.set(likeDocRef, { count: newCount }, { merge: true });

        // Update local state for hasLiked (simulated for guest)
        if (hasLiked) {
          localStorage.removeItem(`liked_${product.id}_${DUMMY_USER.id}`);
        } else {
          localStorage.setItem(`liked_${product.id}_${DUMMY_USER.id}`, 'true');
        }
        setHasLiked(!hasLiked); // Toggle local state
      });
      // setLikes will update via onSnapshot
    } catch (error) {
      console.error("Error updating like: ", error);
      toast({ title: 'Error', description: 'No se pudo actualizar la reacción.', variant: 'destructive' });
    } finally {
      setIsLiking(false);
    }
  };
  
  const whatsappMessage = `Hola, estoy interesado en el producto: ${product.name} (ID: ${product.id}). ¿Podrían darme más información?`;
  const whatsappLink = `https://wa.me/573157513325?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Product Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{objectFit: "cover"}}
            priority // For LCP
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{product.name}</h1>
          {product.price && <p className="text-3xl font-semibold text-foreground">{product.price}</p>}
          <p className="text-lg text-muted-foreground">{product.description}</p>
          {product.longDescription && <p className="text-md text-foreground whitespace-pre-line">{product.longDescription}</p>}
          
          <div className="flex flex-wrap gap-2">
            {product.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="flex-1 bg-green-500 hover:bg-green-600 text-white">
              <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" /> Contactar por WhatsApp
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleLike} disabled={isLiking}>
              <ThumbsUp className={`mr-2 h-5 w-5 ${hasLiked ? 'fill-current' : ''}`} /> 
              {hasLiked ? 'Te gusta' : 'Me gusta'} ({likes})
            </Button>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <Separator />
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Comentarios ({comments.length})</h2>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleCommentSubmit} className="flex gap-4 items-start">
              <Avatar className="mt-1">
                <AvatarImage src={`https://avatar.vercel.sh/${DUMMY_USER.name}.png`} alt={DUMMY_USER.name} />
                <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="Escribe tu comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="flex-grow"
                required
              />
              <Button type="submit" disabled={isSubmittingComment || !newComment.trim()}>
                {isSubmittingComment ? 'Enviando...' : <Send className="h-5 w-5" />}
              </Button>
            </form>
            <Separator className="my-6" />
            <div className="space-y-4">
              {comments.length > 0 ? comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={comment.avatarUrl || `https://avatar.vercel.sh/${comment.userName}.png`} alt={comment.userName} />
                    <AvatarFallback>{comment.userName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted/50 p-3 rounded-lg flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-sm text-foreground">{comment.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {comment.timestamp ? new Date((comment.timestamp as Timestamp).toDate()).toLocaleDateString() : 'Hace un momento'}
                      </p>
                    </div>
                    <p className="text-sm text-foreground">{comment.text}</p>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground text-center">Sé el primero en comentar.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Related Products (Optional) */}
      {/* 
      <Separator />
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">También te podría interesar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          { Render ProductCard for related products }
        </div>
      </section>
      */}
    </div>
  );
}

// Add a not-found.tsx or handle it globally if you prefer for better UX
// For example, create src/app/catalogo/[id]/not-found.tsx
/*
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      <p>El producto que buscas no existe o ha sido movido.</p>
      <Button asChild className="mt-4">
        <Link href="/catalogo">Volver al catálogo</Link>
      </Button>
    </div>
  );
}
*/

