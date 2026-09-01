"use client";

import { useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";
import { useCarrito } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import type { Producto } from "@/lib/products";

export function AddToCartButton({
  producto,
  className,
  size = "default",
}: {
  producto: Producto;
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const { agregar, setAbierto } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  return (
    <Button
      size={size}
      className={className}
      onClick={() => {
        agregar(producto.slug, 1);
        setAgregado(true);
        window.setTimeout(() => setAgregado(false), 1400);
        toast.success(`${producto.nombre} agregado al carrito`, {
          action: { label: "Ver carrito", onClick: () => setAbierto(true) },
        });
      }}
    >
      {agregado ? (
        <CheckIcon className="size-4" />
      ) : (
        <ShoppingCartIcon className="size-4" />
      )}
      {agregado ? "Agregado" : "Agregar al carrito"}
    </Button>
  );
}

export function AddToCartPanel({ producto }: { producto: Producto }) {
  const { agregar, setAbierto } = useCarrito();
  const [cantidad, setCantidad] = useState(1);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Cantidad</span>
        <div className="flex items-center rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-r-none"
            aria-label="Disminuir cantidad"
            disabled={cantidad <= 1}
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
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
            aria-label="Aumentar cantidad"
            disabled={cantidad >= 99}
            onClick={() => setCantidad((c) => Math.min(99, c + 1))}
          >
            <PlusIcon className="size-3.5" />
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        onClick={() => {
          agregar(producto.slug, cantidad);
          toast.success(
            `${cantidad} × ${producto.nombre} agregado al carrito`,
            { action: { label: "Ver carrito", onClick: () => setAbierto(true) } },
          );
          setCantidad(1);
        }}
      >
        <ShoppingCartIcon className="size-4" />
        Agregar al carrito
      </Button>
    </div>
  );
}
