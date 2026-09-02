import type { Metadata } from "next";
import { Rotulo } from "@/components/ficha";
import { ProductCard } from "@/components/product-card";
import { productos } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description:
    "Los tres productos de software de QuetzalDev: QuetzalERP Core, TiendaQuetzal Builder y QuetzalApp Kit. Precios publicados en quetzales.",
};

export default function CatalogoPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
      <header className="max-w-2xl">
        <Rotulo contador={`${productos.length} productos`}>Catálogo</Rotulo>
        <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">
          Tres productos, tres precios
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
          Cada ficha publica su precio, su modalidad de entrega y sus
          especificaciones completas. Nada queda para una cotización posterior.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productos.map((producto) => (
          <ProductCard key={producto.slug} producto={producto} />
        ))}
      </div>
    </div>
  );
}
