"use server";

import type { ContactFormData } from "./types";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export async function submitContactForm(formData: ContactFormData) {
  const validatedFields = contactFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, corrige los errores en el formulario.",
    };
  }

  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just log it and simulate a successful submission.
  console.log("Form data received:", validatedFields.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.",
  };
}
