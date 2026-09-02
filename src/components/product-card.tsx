import Link from "next/link";
import { ArrowRightIcon, CloudIcon, DownloadIcon } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart";
import { Ficha } from "@/components/ficha";
import { ProductIllustration } from "@/components/product-illustration";
import { Button } from "@/components/ui/button";
import { quetzales } from "@/lib/format";
import type { Producto } from "@/lib/products";

export function ProductCard({ producto }: { producto: Producto }) {
  const Icono = producto.modalidad === "descarga" ? DownloadIcon : CloudIcon;
  const ahorro = producto.precioAntes
    ? Math.round((1 - producto.precio / producto.precioAntes) * 100)
    : null;

  return (
    <article className="group flex flex-col rounded-xl bg-card ring-1 ring-border transition-[box-shadow,transform,--tw-ring-color] duration-200 hover:-translate-y-0.5 hover:ring-primary/40 hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_28px_-12px_rgb(0_0_0/0.12)]">
      <Link
        href={`/productos/${producto.slug}`}
        className="relative block aspect-16/10 overflow-hidden rounded-t-xl border-b border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={`Ver detalle de ${producto.nombre}`}
      >
        <ProductIllustration slug={producto.slug} />
        <span className="label-tec absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-card/90 px-2 py-1 text-foreground/80 backdrop-blur-sm">
          <Icono className="size-3" />
          {producto.modalidad === "descarga" ? "Descarga" : "En línea"}
        </span>
        {producto.destacado && (
          <span className="label-tec absolute right-3 top-3 rounded-md bg-signal px-2 py-1 text-signal-foreground">
            Más vendido
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="label-tec text-primary">{producto.servicioBase}</p>
          <h3 className="mt-2 text-lg leading-tight font-semibold">
            <Link
              href={`/productos/${producto.slug}`}
              className="decoration-1 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
            >
              {producto.nombre}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {producto.tagline}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {producto.descripcionCorta}
        </p>

        <Ficha
          filas={producto.fichaRapida}
          className="mt-auto border-t border-border pt-4"
        />

        <div>
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="cifra text-2xl font-medium">
              {quetzales(producto.precio)}
            </span>
            {producto.precioAntes && (
              <span className="cifra text-sm text-muted-foreground line-through">
                {quetzales(producto.precioAntes)}
              </span>
            )}
            {ahorro && (
              <span className="label-tec rounded bg-signal/12 px-1.5 py-0.5 text-signal">
                −{ahorro}%
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{producto.unidad}</p>
        </div>

        <div className="flex gap-2">
          <AddToCartButton
            producto={producto}
            className="h-10 flex-1"
            size="lg"
          />
          <Button
            asChild
            variant="outline"
            size="icon"
            className="size-10 shrink-0"
            aria-label={`Ver ficha completa de ${producto.nombre}`}
          >
            <Link href={`/productos/${producto.slug}`}>
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
