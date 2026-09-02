import { cn } from "@/lib/utils";

/**
 * Rótulo de sección. Es el mismo objeto en toda la tienda: una regla corta,
 * el texto en monoespaciada versalita y, opcionalmente, un contador a la
 * derecha. Marca dónde empieza cada bloque sin recurrir a bandas de color.
 */
export function Rotulo({
  children,
  contador,
  className,
}: {
  children: React.ReactNode;
  contador?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-6 bg-primary" />
      <span className="label-tec text-primary">{children}</span>
      {contador && (
        <>
          <span aria-hidden className="h-px flex-1 bg-border" />
          <span className="label-tec text-muted-foreground">{contador}</span>
        </>
      )}
    </div>
  );
}

/**
 * Ficha técnica: filas de rótulo y valor unidas por una guía punteada. Es el
 * elemento firma del catálogo y se repite igual en la tarjeta, en el detalle
 * del producto, en el carrito y en la confirmación, de modo que el mismo dato
 * se lee siempre en el mismo lugar.
 */
export function Ficha({
  filas,
  className,
}: {
  filas: { etiqueta: string; valor: string }[];
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-col gap-1.5", className)}>
      {filas.map((fila) => (
        <div key={fila.etiqueta} className="flex items-baseline gap-2 text-xs">
          <dt className="label-tec shrink-0 text-muted-foreground">
            {fila.etiqueta}
          </dt>
          <span aria-hidden className="guia" />
          <dd className="cifra shrink-0 text-right font-medium">{fila.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
