import type { FichaFormValues } from "../schemas/ficha.schema";
import { dolaresACentavos } from "./dinero";

const opcional = (valor: string) => {
  const limpio = valor.trim();
  return limpio === "" ? undefined : limpio;
};

export function construirPayload(v: FichaFormValues) {
  return {
    cliente: {
      nombre: v.nombre.trim(),
      cedula: v.cedula.trim(),
      telefono: v.telefono.trim(),
    },
    ficha: {
      dispositivo: v.dispositivo.trim(),
      marca: v.marca.trim(),
      modelo: v.modelo.trim(),
      servicio: v.servicio.trim(),
      problema: v.problema.trim(),
      imei: opcional(v.imei),
      bloqueo: opcional(v.bloqueo),
      descripcion: opcional(v.descripcion),
      observaciones: opcional(v.observaciones),
      costo: dolaresACentavos(v.costo),
      anticipo: dolaresACentavos(v.anticipo),
    },
  };
}