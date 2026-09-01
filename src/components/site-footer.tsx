import Link from "next/link";
import { Logo } from "@/components/logo";
import { productos } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            QuetzalDev empaqueta su experiencia en ERP, desarrollo web y apps
            móviles en productos de software listos para comprar, descargar y
            usar.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Productos</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            {productos.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/productos/${p.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {p.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Tienda</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/productos" className="transition-colors hover:text-foreground">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/carrito" className="transition-colors hover:text-foreground">
                Carrito
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="transition-colors hover:text-foreground">
                Checkout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} QuetzalDev. Todos los derechos reservados.</p>
          <p>
            Sitio demostrativo · Práctica 3, Sistemas Organizacionales y
            Gerenciales 1 · USAC
          </p>
        </div>
      </div>
    </footer>
  );
}
