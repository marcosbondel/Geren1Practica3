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
import { Rotulo } from "@/components/ficha";
import { ProductIllustration } from "@/components/product-illustration";
import { Resumen } from "@/components/resumen";
import { Button } from "@/components/ui/button";
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
      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <div className="grid size-14 place-items-center rounded-xl border border-border">
            <ShoppingCartIcon className="size-6 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold">Tu carrito está vacío</h1>
          <p className="text-muted-foreground text-pretty">
            Agrega alguno de nuestros tres productos para continuar con la
            compra.
          </p>
          <Button asChild className="h-11 px-5">
            <Link href="/productos">Ir al catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Rotulo
            contador={`${unidades} ${unidades === 1 ? "licencia" : "licencias"}`}
          >
            Carrito
          </Rotulo>
          <h1 className="mt-6 text-4xl font-semibold">Tu carrito</h1>
        </div>
        <Button
          variant="ghost"
          onClick={vaciar}
          className="h-9 text-muted-foreground"
        >
          <Trash2Icon className="size-4" />
          Vaciar carrito
        </Button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="border-t border-border">
          {detalle.map(({ producto, cantidad, importe }) => (
            <li
              key={producto.slug}
              className="flex flex-col gap-5 border-b border-border py-6 sm:flex-row"
            >
              <Link
                href={`/productos/${producto.slug}`}
                className="h-24 w-full shrink-0 overflow-hidden rounded-lg bg-card ring-1 ring-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-40"
              >
                <ProductIllustration slug={producto.slug} />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="label-tec text-primary">
                  {producto.servicioBase}
                </p>
                <Link
                  href={`/productos/${producto.slug}`}
                  className="font-heading text-base font-semibold tracking-[-0.02em] decoration-1 underline-offset-4 hover:underline"
                >
                  {producto.nombre}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {producto.modalidadLabel} · {producto.unidad}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                  <div className="flex items-center rounded-md border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-r-none"
                      aria-label={`Quitar una unidad de ${producto.nombre}`}
                      onClick={() => actualizar(producto.slug, cantidad - 1)}
                    >
                      <MinusIcon className="size-3.5" />
                    </Button>
                    <span className="cifra w-10 text-center text-sm font-medium">
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
                    className="h-9 text-muted-foreground"
                    onClick={() => quitar(producto.slug)}
                  >
                    <Trash2Icon className="size-3.5" />
                    Eliminar
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="cifra text-lg font-medium">
                  {quetzales(importe)}
                </p>
                <p className="cifra mt-1 text-xs text-muted-foreground">
                  {quetzales(producto.precio)} c/u
                </p>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="label-tec text-muted-foreground">
              Resumen del pedido
            </h2>

            <Resumen
              className="mt-5"
              subtotal={subtotal}
              iva={iva}
              total={total}
              extra={[
                {
                  etiqueta: "Entrega",
                  valor: (
                    <span className="text-primary">Digital · inmediata</span>
                  ),
                },
              ]}
            />

            <div className="mt-6 flex flex-col gap-2.5">
              <Button asChild className="h-11">
                <Link href="/checkout">Continuar al pago</Link>
              </Button>
              <Button asChild variant="outline" className="h-11">
                <Link href="/productos">
                  <ArrowLeftIcon className="size-4" />
                  Seguir comprando
                </Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
