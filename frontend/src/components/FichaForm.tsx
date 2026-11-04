import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fichaFormSchema, type FichaFormValues } from "@/schemas/ficha.schema";
import { construirPayload } from "@/lib/fichas";
import { Campo } from "@/components/campo";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";

const valoresIniciales: FichaFormValues = {
  nombre: "", cedula: "", telefono: "",
  dispositivo: "", marca: "", modelo: "", servicio: "", problema: "",
  imei: "", bloqueo: "", descripcion: "", observaciones: "",
  costo: "", anticipo: "",
};

export function FichaForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FichaFormValues>({
    resolver: zodResolver(fichaFormSchema),
    defaultValues: valoresIniciales,
  });

  function onSubmit(values: FichaFormValues) {
    console.log(construirPayload(values));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl p-6">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Cliente</FieldLegend>
          <FieldGroup>
            <Campo control={control} name="nombre" label="Nombre" />
            <Campo control={control} name="cedula" label="Cédula" />
            <Campo control={control} name="telefono" label="Teléfono" />
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Equipo</FieldLegend>
          <FieldGroup>
            <Campo control={control} name="dispositivo" label="Dispositivo" />
            <Campo control={control} name="marca" label="Marca" />
            <Campo control={control} name="modelo" label="Modelo" />
            <Campo control={control} name="imei" label="IMEI" />
            <Campo control={control} name="bloqueo" label="Bloqueo (clave o patrón)" />
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Servicio</FieldLegend>
          <FieldGroup>
            <Campo control={control} name="servicio" label="Servicio" />
            <Campo control={control} name="problema" label="Problema" />
            <Campo control={control} name="descripcion" label="Descripción" tipo="textarea" />
            <Campo control={control} name="observaciones" label="Observaciones" tipo="textarea" />
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Costos (en dólares)</FieldLegend>
          <FieldGroup>
            <Campo control={control} name="costo" label="Costo" />
            <Campo control={control} name="anticipo" label="Anticipo" />
          </FieldGroup>
        </FieldSet>

        <Button type="submit" disabled={isSubmitting}>
          Guardar ficha
        </Button>
      </FieldGroup>
    </form>
  );
}