import { quetzales } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Desglose de importes. Se usa igual en el carrito, en el panel lateral, en el
 * checkout y en la confirmación, de modo que el subtotal, el IVA y el total
 * siempre ocupan la misma posición y se leen con la misma tipografía tabular.
 */
export function Resumen({
  subtotal,
  iva,
  total,
  etiquetaSubtotal = "Subtotal",
  etiquetaTotal = "Total",
  extra,
  className,
}: {
  subtotal: number;
  iva: number;
  total: number;
  etiquetaSubtotal?: string;
  etiquetaTotal?: string;
  extra?: { etiqueta: string; valor: React.ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-col gap-2.5 text-sm", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted-foreground">{etiquetaSubtotal}</dt>
        <dd className="cifra">{quetzales(subtotal)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted-foreground">IVA (12%)</dt>
        <dd className="cifra">{quetzales(iva)}</dd>
      </div>
      {extra?.map((fila) => (
        <div
          key={fila.etiqueta}
          className="flex items-baseline justify-between gap-4"
        >
          <dt className="text-muted-foreground">{fila.etiqueta}</dt>
          <dd>{fila.valor}</dd>
        </div>
      ))}
      <div className="mt-1.5 flex items-baseline justify-between gap-4 border-t border-border pt-3.5">
        <dt className="font-heading text-base font-semibold">{etiquetaTotal}</dt>
        <dd className="cifra text-xl font-medium">{quetzales(total)}</dd>
      </div>
    </dl>
  );
}
