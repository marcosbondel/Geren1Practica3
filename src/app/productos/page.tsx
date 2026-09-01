import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { productos } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description:
    "Los tres productos de software de QuetzalDev: QuetzalERP Core, TiendaQuetzal Builder y QuetzalApp Kit.",
};

export default function CatalogoPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">Catálogo</h1>
        <p className="mt-3 text-lg text-muted-foreground text-pretty">
          Tres productos derivados de nuestros servicios base. Todos incluyen
          ilustración, precio, descripción, funciones y beneficios en su ficha.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productos.map((producto) => (
          <ProductCard key={producto.slug} producto={producto} />
        ))}
      </div>
    </div>
  );
}
