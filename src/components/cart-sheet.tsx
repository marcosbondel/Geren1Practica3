"use client";

import Link from "next/link";
import { MinusIcon, PlusIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react";
import { useCarrito } from "@/components/cart-provider";
import { ProductIllustration } from "@/components/product-illustration";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { quetzales } from "@/lib/format";

export function CartSheet() {
  const {
    abierto,
    setAbierto,
    detalle,
    unidades,
    subtotal,
    iva,
    total,
    actualizar,
    quitar,
  } = useCarrito();

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCartIcon className="size-4" />
            Tu carrito
          </SheetTitle>
          <SheetDescription>
            {unidades === 0
              ? "Aún no has agregado licencias."
              : `${unidades} ${unidades === 1 ? "licencia" : "licencias"} en el carrito.`}
          </SheetDescription>
        </SheetHeader>

        {detalle.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-muted">
              <ShoppingCartIcon className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Explora el catálogo y agrega el producto que necesites.
            </p>
            <Button asChild variant="outline" onClick={() => setAbierto(false)}>
              <Link href="/productos">Ver productos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="flex flex-col gap-4">
                {detalle.map(({ producto, cantidad, importe }) => (
                  <li key={producto.slug} className="flex gap-3">
                    <div className="size-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <ProductIllustration slug={producto.slug} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/productos/${producto.slug}`}
                        onClick={() => setAbierto(false)}
                        className="text-sm font-medium leading-tight hover:underline"
                      >
                        {producto.nombre}
                      </Link>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {producto.modalidadLabel}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-md border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 rounded-r-none"
                            aria-label={`Quitar una unidad de ${producto.nombre}`}
                            onClick={() => actualizar(producto.slug, cantidad - 1)}
                          >
                            <MinusIcon className="size-3" />
                          </Button>
                          <span className="w-7 text-center text-sm tabular-nums">
                            {cantidad}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 rounded-l-none"
                            aria-label={`Agregar una unidad de ${producto.nombre}`}
                            onClick={() => actualizar(producto.slug, cantidad + 1)}
                          >
                            <PlusIcon className="size-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-muted-foreground"
                          aria-label={`Eliminar ${producto.nombre} del carrito`}
                          onClick={() => quitar(producto.slug)}
                        >
                          <Trash2Icon className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right text-sm font-medium tabular-nums">
                      {quetzales(importe)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="gap-3 border-t">
              <dl className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{quetzales(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>IVA (12%)</dt>
                  <dd className="tabular-nums">{quetzales(iva)}</dd>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{quetzales(total)}</dd>
                </div>
              </dl>
              <Button asChild size="lg" onClick={() => setAbierto(false)}>
                <Link href="/checkout">Continuar al pago</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                onClick={() => setAbierto(false)}
              >
                <Link href="/carrito">Ver carrito completo</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
