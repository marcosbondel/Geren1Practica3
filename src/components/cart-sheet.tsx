"use client";

import Link from "next/link";
import { MinusIcon, PlusIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react";
import { useCarrito } from "@/components/cart-provider";
import { ProductIllustration } from "@/components/product-illustration";
import { Resumen } from "@/components/resumen";
import { Button } from "@/components/ui/button";
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
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-base">
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
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid size-12 place-items-center rounded-xl border border-border">
              <ShoppingCartIcon className="size-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              Explora el catálogo y agrega el producto que necesites.
            </p>
            <Button asChild variant="outline" onClick={() => setAbierto(false)}>
              <Link href="/productos">Ver productos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <ul>
                {detalle.map(({ producto, cantidad, importe }) => (
                  <li
                    key={producto.slug}
                    className="flex gap-3.5 border-b border-border py-4 last:border-b-0"
                  >
                    <div className="size-16 shrink-0 overflow-hidden rounded-md bg-card ring-1 ring-border">
                      <ProductIllustration slug={producto.slug} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/productos/${producto.slug}`}
                        onClick={() => setAbierto(false)}
                        className="font-heading text-sm leading-tight font-medium tracking-[-0.02em] decoration-1 underline-offset-4 hover:underline"
                      >
                        {producto.nombre}
                      </Link>
                      <p className="label-tec mt-1.5 text-muted-foreground">
                        {producto.modalidad === "descarga"
                          ? "Descarga"
                          : "En línea"}
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <div className="flex items-center rounded-md border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 rounded-r-none"
                            aria-label={`Quitar una unidad de ${producto.nombre}`}
                            onClick={() =>
                              actualizar(producto.slug, cantidad - 1)
                            }
                          >
                            <MinusIcon className="size-3" />
                          </Button>
                          <span className="cifra w-7 text-center text-sm">
                            {cantidad}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 rounded-l-none"
                            aria-label={`Agregar una unidad de ${producto.nombre}`}
                            onClick={() =>
                              actualizar(producto.slug, cantidad + 1)
                            }
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
                    <div className="cifra text-right text-sm font-medium">
                      {quetzales(importe)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="gap-4 border-t border-border">
              <Resumen subtotal={subtotal} iva={iva} total={total} />
              <div className="flex flex-col gap-2.5">
                <Button asChild className="h-11" onClick={() => setAbierto(false)}>
                  <Link href="/checkout">Continuar al pago</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11"
                  onClick={() => setAbierto(false)}
                >
                  <Link href="/carrito">Ver carrito completo</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
