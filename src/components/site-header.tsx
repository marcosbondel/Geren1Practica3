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
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="QuetzalDev, ir al inicio">
          <Logo />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 sm:flex">
          {enlaces.map((e) => {
            const activo =
              e.href === "/" ? ruta === "/" : ruta.startsWith(e.href);
            return (
              <Link
                key={e.href}
                href={e.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  activo
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {e.etiqueta}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="outline"
            className="relative gap-2"
            onClick={() => setAbierto(true)}
            aria-label={`Abrir carrito, ${unidades} artículos`}
          >
            <ShoppingCartIcon className="size-4" />
            <span className="hidden sm:inline">Carrito</span>
            {hidratado && unidades > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground tabular-nums">
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
