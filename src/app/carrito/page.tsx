"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from "lucide-react";
import { useCarrito } from "@/components/cart-provider";
import { ProductIllustration } from "@/components/product-illustration";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { quetzales } from "@/lib/format";

export default function CarritoPage() {
  const {
    detalle,
    unidades,
    subtotal,
    iva,
    total,
    actualizar,
    quitar,
    vaciar,
    hidratado,
  } = useCarrito();

  if (!hidratado) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        <div className="mt-8 h-40 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (detalle.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="grid size-16 place-items-center rounded-full bg-muted">
            <ShoppingCartIcon className="size-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Tu carrito está vacío
          </h1>
          <p className="text-muted-foreground">
            Agrega alguno de nuestros tres productos para continuar con la
            compra.
          </p>
          <Button asChild size="lg">
            <Link href="/productos">Ir al catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tu carrito</h1>
          <p className="mt-1 text-muted-foreground">
            {unidades} {unidades === 1 ? "licencia" : "licencias"} ·{" "}
            {detalle.length} {detalle.length === 1 ? "producto" : "productos"}
          </p>
        </div>
        <Button variant="ghost" onClick={vaciar} className="text-muted-foreground">
          <Trash2Icon className="size-4" />
          Vaciar carrito
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col gap-4">
          {detalle.map(({ producto, cantidad, importe }) => (
            <li key={producto.slug}>
              <Card>
                <CardContent className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={`/productos/${producto.slug}`}
                    className="h-28 w-full shrink-0 overflow-hidden rounded-lg border bg-muted sm:w-44"
                  >
                    <ProductIllustration slug={producto.slug} />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{producto.servicioBase}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {producto.modalidadLabel}
                      </span>
                    </div>
                    <Link
                      href={`/productos/${producto.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {producto.nombre}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {producto.unidad}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                      <div className="flex items-center rounded-md border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9 rounded-r-none"
                          aria-label={`Quitar una unidad de ${producto.nombre}`}
                          onClick={() => actualizar(producto.slug, cantidad - 1)}
                        >
                          <MinusIcon className="size-3.5" />
                        </Button>
                        <span className="w-10 text-center text-sm font-medium tabular-nums">
                          {cantidad}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9 rounded-l-none"
                          aria-label={`Agregar una unidad de ${producto.nombre}`}
                          onClick={() => actualizar(producto.slug, cantidad + 1)}
                        >
                          <PlusIcon className="size-3.5" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() => quitar(producto.slug)}
                      >
                        <Trash2Icon className="size-3.5" />
                        Eliminar
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold tabular-nums">
                      {quetzales(importe)}
                    </p>
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {quetzales(producto.precio)} c/u
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Resumen del pedido</h2>
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-nums">{quetzales(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">IVA (12%)</dt>
                  <dd className="tabular-nums">{quetzales(iva)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Entrega</dt>
                  <dd className="text-primary">Digital · inmediata</dd>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between text-lg font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{quetzales(total)}</dd>
                </div>
              </dl>

              <Button asChild size="lg">
                <Link href="/checkout">Continuar al pago</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/productos">
                  <ArrowLeftIcon className="size-4" />
                  Seguir comprando
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
