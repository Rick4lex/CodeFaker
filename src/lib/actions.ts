
"use server";

import type { ContactFormData } from "./types";
import { z } from "zod";

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

// !!! IMPORTANT ACTION REQUIRED BY USER !!!
// 1. Create a Google Apps Script project.
// 2. Deploy it as a Web App.
//    - Execute as: Me
//    - Who has access: Anyone (even anonymous) or Anyone within your GSuite domain if applicable.
// 3. Replace GOOGLE_APPS_SCRIPT_WEB_APP_URL with your Web App URL.
//
// Example Apps Script code (doPost function):
/*
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Solicitudes"); // Or create one if it doesn't exist
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Solicitudes");
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Selected Services", "Message", "File Link", "Generated Subject"]);
    }
    
    var params = JSON.parse(e.postData.contents);
    
    var timestamp = new Date();
    var name = params.name || "";
    var email = params.email || "";
    var phone = params.phone || "";
    var selectedServices = params.selectedServices ? params.selectedServices.join(", ") : ""; // Join array into string
    var message = params.message || "";
    var fileLink = params.fileLink || "";
    var generatedSubject = params.generatedSubject || "";

    sheet.appendRow([timestamp, name, email, phone, selectedServices, message, fileLink, generatedSubject]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Data saved to sheet." })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log(error.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Error saving data: " + error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
*/
const GOOGLE_APPS_SCRIPT_WEB_APP_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"; // <--- REPLACE THIS!

export async function submitContactForm(formData: ContactFormData) {
  const validatedFields = contactFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, corrige los errores en el formulario.",
    };
  }

  if (GOOGLE_APPS_SCRIPT_WEB_APP_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
    console.error("Google Apps Script URL not configured in src/lib/actions.ts");
    return {
      success: false,
      message: "Error de configuración del servidor. Por favor, contacta al administrador.",
    };
  }

  const { name, email, phone, selectedServices, message, fileLink } = validatedFields.data;
  
  // Generate a subject line from selected services for the sheet, or for potential email notifications from Apps Script
  const generatedSubject = `Solicitud de Servicios: ${selectedServices.slice(0, 2).join(', ')}${selectedServices.length > 2 ? ' y otros...' : ''}`;

  const payload = {
    name,
    email,
    phone: phone || '', // Ensure phone is always a string, even if empty
    selectedServices, // Send as array, Apps Script can join if needed
    message,
    fileLink: fileLink || '', // Ensure fileLink is always a string
    generatedSubject,
    timestamp: new Date().toISOString(), // Add a timestamp from server action
  };

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
      method: "POST",
      mode: "cors", // Required for cross-origin requests to Apps Script if not on same domain (though Apps Script handles this with its deployment settings)
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      // redirect: "follow", // Apps Script doPost usually returns a response, not a redirect
    });

    // Apps Script usually returns JSON. If it's plain text, adjust accordingly.
    const result = await response.json(); 

    if (response.ok && result.success) {
      return {
        success: true,
        message: "¡Gracias por tu solicitud! Ha sido registrada y nos pondremos en contacto contigo pronto.",
      };
    } else {
      return {
        success: false,
        message: result.message || "Hubo un error al registrar tu solicitud. Inténtalo de nuevo.",
      };
    }
  } catch (error) {
    console.error("Error submitting to Google Apps Script:", error);
    return {
      success: false,
      message: "Ocurrió un error de red al enviar tu solicitud. Por favor, verifica tu conexión e inténtalo de nuevo.",
    };
  }
}
