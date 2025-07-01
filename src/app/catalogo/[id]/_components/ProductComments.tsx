
"use client";

import { useEffect, useState } from 'react';
import type { Comment as CommentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const DUMMY_USER = { id: 'guestUser', name: 'Visitante' };

export function ProductComments({ productId }: { productId: string }) {
    const { toast } = useToast();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    
    // Si la base de datos no está configurada, no muestra la sección de comentarios.
    if (!db) {
        return (
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Comentarios</h2>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-muted-foreground text-center">
                            La sección de comentarios no está disponible en este momento.
                        </p>
                    </CardContent>
                </Card>
            </section>
        );
    }

    useEffect(() => {
        const commentsQuery = query(collection(db, 'products', productId, 'comments'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            const fetchedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommentType));
            setComments(fetchedComments);
        });
        return () => unsubscribe();
    }, [productId]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setIsSubmittingComment(true);
        try {
        await addDoc(collection(db, 'products', productId, 'comments'), {
            productId: productId,
            userId: DUMMY_USER.id,
            userName: DUMMY_USER.name,
            avatarUrl: 'https://avatar.vercel.sh/' + DUMMY_USER.name + '.png',
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


    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Comentarios ({comments.length})</h2>
            <Card>
            <CardContent className="p-6">
                <form onSubmit={handleCommentSubmit} className="flex gap-4 items-start">
                <Avatar className="mt-1">
                    <AvatarImage src={'https://avatar.vercel.sh/' + DUMMY_USER.name + '.png'} alt={DUMMY_USER.name} />
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
                        <AvatarImage src={comment.avatarUrl || 'https://avatar.vercel.sh/' + comment.userName + '.png'} alt={comment.userName} />
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
    );
}
