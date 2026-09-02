import Link from "next/link";
import { Logo } from "@/components/logo";
import { quetzales } from "@/lib/format";
import { productos } from "@/lib/products";

const tienda = [
  { href: "/productos", etiqueta: "Catálogo" },
  { href: "/carrito", etiqueta: "Carrito" },
  { href: "/checkout", etiqueta: "Checkout" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            QuetzalDev empaqueta su experiencia en ERP, desarrollo web y apps
            móviles en productos de software listos para comprar, descargar y
            usar.
          </p>
        </div>

        <div>
          <h3 className="label-tec text-muted-foreground">Productos</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {productos.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/productos/${p.slug}`}
                  className="flex items-baseline justify-between gap-3 rounded-sm transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>{p.nombre}</span>
                  <span className="cifra shrink-0 text-xs text-muted-foreground">
                    {quetzales(p.precio)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-tec text-muted-foreground">Tienda</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {tienda.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="rounded-sm transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="label-tec text-muted-foreground">
            © {new Date().getFullYear()} QuetzalDev
          </p>
          <p className="label-tec text-muted-foreground">
            Sitio demostrativo · Práctica 3 · SOG1 · USAC
          </p>
        </div>
      </div>
    </footer>
  );
}
