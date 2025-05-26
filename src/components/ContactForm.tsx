"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/actions";
import type { ContactFormData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        toast({
          title: "Formulario Enviado",
          description: result.message,
        });
        form.reset();
      } else {
        // This part handles potential server-side validation errors not caught by client-side Zod
        // (though in this setup, they should mostly align)
        let description = result.message;
        if (result.errors) {
            const errorMessages = Object.values(result.errors).flat().join("\n");
            if (errorMessages) description += `\n${errorMessages}`;
        }
        toast({
          title: "Error al Enviar",
          description: description,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error Inesperado",
        description: "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">Ponte en Contacto</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          ¿Tienes alguna pregunta o solicitud? Rellena el formulario y te responderemos lo antes posible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Asunto de tu mensaje" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe tu mensaje aquí..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Mensaje"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Dummy Card components to avoid errors if not imported from ui
// In a real scenario these would be from '@/components/ui/card'
const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>{children}</div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => <div className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</div>;
const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => <div className={cn("text-sm text-muted-foreground", className)}>{children}</div>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div className="p-6 pt-0">{children}</div>;

// cn utility function if not available globally
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
