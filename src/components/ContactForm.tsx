
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/actions";
import type { ContactFormData } from "@/lib/types";
import { servicesList } from "@/lib/servicesList";
import { Loader2, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";


const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  phone: z.string().optional().refine(value => !value || /^\+?[0-9\s-()]{7,20}$/.test(value), {
    message: "Número de teléfono inválido."
  }),
  selectedServices: z.array(z.string()).min(1, { message: "Debes seleccionar al menos un servicio." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
  fileLink: z.string().url({ message: "Por favor, introduce una URL válida para el enlace." }).optional().or(z.literal('')),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      selectedServices: [],
      message: "",
      fileLink: "",
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
        let description = result.message;
        if (result.errors) {
            const errorMessages = Object.values(result.errors).flat().join("\n");
            if (errorMessages) description += `\n${errorMessages}`;
        }
        toast({
          title: "Error al Enviar",
          description: description || "Hubo un problema con los datos enviados.",
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
          Completa el formulario para solicitar servicios o realizar consultas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono de Contacto (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+57 300 123 4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="selectedServices"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel className="text-base">Servicios de Interés</FormLabel>
                  <FormDescription>Selecciona uno o más servicios que te interesan.</FormDescription>
                  <ScrollArea className="h-64 rounded-md border p-4 bg-background">
                    {servicesList.map((category) => (
                      <div key={category.linea} className="mb-4">
                        <h3 className="font-semibold text-md mb-2 text-primary">{category.linea}</h3>
                        {category.services.map((service) => (
                          <FormField
                            key={service.id}
                            control={form.control}
                            name="selectedServices"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1.5">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(service.name)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), service.name])
                                          : field.onChange(
                                              (field.value || []).filter(
                                                (value) => value !== service.name
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {service.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje Adicional</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe tu solicitud o consulta con más detalle aquí..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace a Archivos (Opcional)</FormLabel>
                   <FormDescription>
                    Si necesitas compartir archivos (ej. para ilustraciones, diseños), puedes pegar un enlace de Google Drive, Dropbox, etc.
                  </FormDescription>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="https://drive.google.com/..." {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando Solicitud...
                </>
              ) : (
                "Enviar Solicitud"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Dummy Card components from original file, for completeness if not already global
// In a real scenario these would be from '@/components/ui/card'
// const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
//   <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>{children}</div>
// );
// const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
// const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => <div className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</div>;
// const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => <div className={cn("text-sm text-muted-foreground", className)}>{children}</div>;
// const CardContent = ({ children }: { children: React.ReactNode }) => <div className="p-6 pt-0">{children}</div>;

// // cn utility function if not available globally
// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
