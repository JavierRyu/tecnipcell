import { Controller, type Control, type FieldPath } from "react-hook-form";
import type { FichaFormValues } from "@/schemas/ficha.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CampoProps = {
  control: Control<FichaFormValues>;
  name: FieldPath<FichaFormValues>;
  label: string;
  tipo?: "input" | "textarea";
};

export function Campo({ control, name, label, tipo = "input" }: CampoProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {tipo === "textarea" ? (
            <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} />
          ) : (
            <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
          )}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}