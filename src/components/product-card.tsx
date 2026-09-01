import Link from "next/link";
import { ArrowRightIcon, CloudIcon, DownloadIcon } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart";
import { ProductIllustration } from "@/components/product-illustration";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { quetzales } from "@/lib/format";
import type { Producto } from "@/lib/products";

export function ProductCard({ producto }: { producto: Producto }) {
  const Icono = producto.modalidad === "descarga" ? DownloadIcon : CloudIcon;

  return (
    <Card className="flex flex-col overflow-hidden pt-0 transition-shadow hover:shadow-lg">
      <Link
        href={`/productos/${producto.slug}`}
        className="relative block aspect-16/10 overflow-hidden border-b"
        aria-label={`Ver detalle de ${producto.nombre}`}
      >
        <ProductIllustration slug={producto.slug} />
        {producto.destacado && (
          <Badge className="absolute left-3 top-3">Más vendido</Badge>
        )}
      </Link>

      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{producto.servicioBase}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Icono className="size-3.5" />
            {producto.modalidadLabel}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            <Link
              href={`/productos/${producto.slug}`}
              className="hover:underline"
            >
              {producto.nombre}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">{producto.tagline}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {producto.descripcionCorta}
        </p>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums">
              {quetzales(producto.precio)}
            </span>
            {producto.precioAntes && (
              <span className="text-sm text-muted-foreground line-through tabular-nums">
                {quetzales(producto.precioAntes)}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{producto.unidad}</p>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <AddToCartButton producto={producto} className="flex-1" />
        <Button asChild variant="outline" size="icon" aria-label="Ver detalle">
          <Link href={`/productos/${producto.slug}`}>
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
