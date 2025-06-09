
export interface ServiceItem {
  id: string;
  name: string;
}

export interface ServiceCategory {
  linea: string;
  services: ServiceItem[];
}

export const servicesList: ServiceCategory[] = [
  {
    linea: "Línea 1: Servicios de Trámites y Asesoría Digital",
    services: [
      { id: "s1-1", name: "Afiliación al régimen contributivo en salud (EPS)" },
      { id: "s1-2", name: "Afiliación a ARL para independientes" },
      { id: "s1-3", name: "Liquidación y corrección de planilla PILA" },
      { id: "s1-4", name: "Reporte de novedades a seguridad social" },
      { id: "s1-5", name: "Asesoría para transición de régimen subsidiado a contributivo" },
      { id: "s1-6", name: "Diagnóstico de estado de afiliaciones" },
      { id: "s1-7", name: "Soporte para uso de plataformas como SOI, Mi Seguridad Social, RUAF" },
      { id: "s1-8", name: "Actualización de datos en EPS, ARL o Caja de Compensación" },
      { id: "s1-9", name: "Acompañamiento digital paso a paso (modalidad virtual)" },
    ],
  },
  {
    linea: "Línea 2: Confección, Moda y Accesorios",
    services: [
      { id: "s2-1", name: "Diseño y confección de prendas personalizadas" },
      { id: "s2-2", name: "Ropa por encargo: blusas, trajes de baño, conjuntos" },
      { id: "s2-3", name: "Accesorios tejidos a crochet (top, bolsos, accesorios de moda)" },
      { id: "s2-4", name: "Arreglo o modificación de ropa existente" },
      { id: "s2-5", name: "Asesoría en diseño de colecciones para emprendimientos de moda" },
      { id: "s2-6", name: "Producción de prendas a pequeña escala (sostenible)" },
      { id: "s2-7", name: "Creación de prototipos de prendas o patrones" },
      { id: "s2-8", name: "Reparación o restauración de bisutería artesanal" },
    ],
  },
  {
    linea: "Línea 3: Arte, Diseño y Productos Creativos",
    services: [
      { id: "s3-1", name: "Ilustraciones personalizadas (digitales o impresas)" },
      { id: "s3-2", name: "Diseño de stickers (individuales o en paquetes temáticos)" },
      { id: "s3-3", name: "Arte para redes sociales o portadas" },
      { id: "s3-4", name: "Diseño y maquetación de marca personal (branding visual)" },
      { id: "s3-5", name: "Desarrollo de piezas para impresión (tarjetas, habladores, etiquetas)" },
      { id: "s3-6", name: "Taller de arte" },
      // Assuming the last item was missing from the prompt or was combined. If it's "Taller de arte personalizado" or similar, adjust.
      // For now, I'm adding a placeholder for the 7th item if it was intended to be separate.
      // Or if "Taller de arte" is the 6th, and there's no 7th, this list is fine.
      // If the prompt meant 7 items, and "Taller de arte" is the 6th and 7th merged, then it is fine.
      // The prompt lists 6 items for Line 3. I will stick to that.
    ],
  },
];
