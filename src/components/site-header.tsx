"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCartIcon } from "lucide-react";
import { useCarrito } from "@/components/cart-provider";
import { CartSheet } from "@/components/cart-sheet";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const enlaces = [
  { href: "/", etiqueta: "Inicio" },
  { href: "/productos", etiqueta: "Productos" },
  { href: "/carrito", etiqueta: "Carrito" },
] as const;

export function SiteHeader() {
  const ruta = usePathname();
  const { unidades, hidratado, setAbierto } = useCarrito();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link
          href="/"
          aria-label="QuetzalDev, ir al inicio"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo />
        </Link>

        <nav className="flex items-center gap-1">
          {enlaces.map((e) => {
            const activo =
              e.href === "/" ? ruta === "/" : ruta.startsWith(e.href);
            return (
              <Link
                key={e.href}
                href={e.href}
                aria-current={activo ? "page" : undefined}
                className={cn(
                  // El estado activo es una regla inferior, no una píldora de color:
                  // marca la posición sin agregar otra superficie a la barra.
                  "relative rounded-sm px-2 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-2.5",
                  "after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:transition-colors sm:after:inset-x-2.5",
                  activo
                    ? "font-medium text-foreground after:bg-primary"
                    : "text-muted-foreground after:bg-transparent hover:text-foreground",
                )}
              >
                {e.etiqueta}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            variant="outline"
            className="relative h-9 gap-2 px-3"
            onClick={() => setAbierto(true)}
            aria-label={`Abrir carrito, ${unidades} ${unidades === 1 ? "artículo" : "artículos"}`}
          >
            <ShoppingCartIcon className="size-4" />
            <span className="hidden sm:inline">Carrito</span>
            {hidratado && unidades > 0 && (
              <span className="cifra grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-medium text-primary-foreground">
                {unidades}
              </span>
            )}
          </Button>
        </div>
      </div>
      <CartSheet />
    </header>
  );
}
