import { z } from "zod";

export const fichaFormSchema = z.object({
  // Cliente
  nombre: z.string().min(1, "El nombre es obligatorio"),
  cedula: z.string().min(1, "La cédula es obligatoria"),
  telefono: z.string().min(1, "El teléfono es obligatorio"),

  // Equipo y servicio
  dispositivo: z.string().min(1, "El dispositivo es obligatorio"),
  marca: z.string().min(1, "La marca es obligatoria"),
  modelo: z.string().min(1, "El modelo es obligatorio"),
  servicio: z.string().min(1, "El servicio es obligatorio"),
  problema: z.string().min(1, "Describe el problema"),

  // Opcionales (pueden quedar vacíos)
  imei: z.string(),
  bloqueo: z.string(),
  descripcion: z.string(),
  observaciones: z.string(),

  // Dinero, escrito en dólares como texto
  costo: z.string().regex(/^(\d+(\.\d{1,2})?)?$/, "Usa un número, por ejemplo 25.50"),
  anticipo: z.string().regex(/^(\d+(\.\d{1,2})?)?$/, "Usa un número, por ejemplo 25.50"),
});

export type FichaFormValues = z.infer<typeof fichaFormSchema>;