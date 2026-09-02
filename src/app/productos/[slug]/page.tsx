import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckIcon,
  ChevronRightIcon,
  CloudIcon,
  DownloadIcon,
  PackageIcon,
} from "lucide-react";
import { AddToCartPanel } from "@/components/add-to-cart";
import { Ficha, Rotulo } from "@/components/ficha";
import { ProductCard } from "@/components/product-card";
import { ProductIllustration } from "@/components/product-illustration";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { quetzales } from "@/lib/format";
import { getProducto, IVA, productos } from "@/lib/products";

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) return { title: "Producto no encontrado" };
  return {
    title: producto.nombre,
    description: producto.descripcionCorta,
  };
}

export default async function ProductoPage({
  params,
}: PageProps<"/productos/[slug]">) {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();

  const Icono = producto.modalidad === "descarga" ? DownloadIcon : CloudIcon;
  const relacionados = productos.filter((p) => p.slug !== producto.slug);
  const conIva = producto.precio * (1 + IVA);
  const ahorro = producto.precioAntes
    ? Math.round((1 - producto.precio / producto.precioAntes) * 100)
    : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <nav
        aria-label="Ruta de navegación"
        className="label-tec flex items-center gap-1.5 text-muted-foreground"
      >
        <Link
          href="/"
          className="rounded-sm transition-colors hover:text-foreground"
        >
          Inicio
        </Link>
        <ChevronRightIcon className="size-3" />
        <Link
          href="/productos"
          className="rounded-sm transition-colors hover:text-foreground"
        >
          Productos
        </Link>
        <ChevronRightIcon className="size-3" />
        <span className="text-foreground">{producto.nombre}</span>
      </nav>

      {/*
        Tres áreas explícitas. En móvil se apilan como ilustración, panel de
        compra y ficha, de modo que el precio y el botón quedan al alcance sin
        recorrer toda la descripción. En escritorio el panel ocupa la columna
        derecha completa y se queda fijo al hacer scroll.
      */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-x-14">
        <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-card ring-1 ring-border lg:col-start-1 lg:row-start-1">
          <ProductIllustration slug={producto.slug} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div className="rounded-xl bg-card p-6 ring-1 ring-border">
            <div className="flex items-center justify-between gap-3">
              <span className="label-tec text-primary">
                {producto.servicioBase}
              </span>
              {producto.destacado && (
                <span className="label-tec rounded bg-signal/12 px-2 py-1 text-signal">
                  Más vendido
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-balance">
              {producto.nombre}
            </h1>
            <p className="mt-2 text-muted-foreground">{producto.tagline}</p>

            <div className="mt-7">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="cifra text-[2.5rem] leading-none font-medium">
                  {quetzales(producto.precio)}
                </span>
                {producto.precioAntes && (
                  <span className="cifra text-base text-muted-foreground line-through">
                    {quetzales(producto.precioAntes)}
                  </span>
                )}
                {ahorro && (
                  <span className="label-tec rounded bg-signal/12 px-1.5 py-0.5 text-signal">
                    −{ahorro}%
                  </span>
                )}
              </div>
              <p className="mt-2.5 text-sm text-muted-foreground">
                {producto.unidad}
              </p>
              <p className="cifra mt-1 text-xs text-muted-foreground">
                {quetzales(conIva)} con IVA incluido
              </p>
            </div>

            <Ficha
              filas={producto.fichaRapida}
              className="mt-6 border-t border-border pt-5"
            />

            <Separator className="my-6" />

            <AddToCartPanel producto={producto} />

            <Separator className="my-6" />

            <div className="flex flex-col gap-4 text-sm">
              <div className="flex gap-3">
                <Icono className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">{producto.modalidadLabel}</p>
                  <p className="mt-0.5 leading-relaxed text-muted-foreground">
                    {producto.entrega}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <PackageIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Entrega inmediata</p>
                  <p className="mt-0.5 leading-relaxed text-muted-foreground">
                    Disponible al confirmar el pago, sin tiempos de espera.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-start-1 lg:row-start-2">
          <div>
            <Rotulo>Descripción</Rotulo>
            <div className="mt-5 flex flex-col gap-4 leading-relaxed text-muted-foreground">
              {producto.descripcion.map((parrafo) => (
                <p key={parrafo.slice(0, 32)}>{parrafo}</p>
              ))}
            </div>
          </div>

          <Tabs defaultValue="funciones" className="mt-12">
            <TabsList>
              <TabsTrigger value="funciones">Funciones</TabsTrigger>
              <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
              <TabsTrigger value="especificaciones">Ficha técnica</TabsTrigger>
            </TabsList>

            <TabsContent value="funciones" className="mt-8">
              <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {producto.funciones.map((f) => (
                  <li key={f.titulo} className="border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="size-3.5 shrink-0 text-primary" />
                      <h3 className="text-sm font-semibold">{f.titulo}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.detalle}
                    </p>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="beneficios" className="mt-8">
              <ul className="flex flex-col">
                {producto.beneficios.map((b) => (
                  <li
                    key={b.titulo}
                    className="grid gap-1.5 border-t border-border py-5 sm:grid-cols-[15rem_1fr] sm:gap-6"
                  >
                    <h3 className="text-sm font-semibold">{b.titulo}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {b.detalle}
                    </p>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="especificaciones" className="mt-8">
              <Ficha
                filas={producto.especificaciones}
                className="gap-3 border-t border-border pt-5"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <section className="mt-20 border-t border-border pt-12">
        <Rotulo>También te puede interesar</Rotulo>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {relacionados.map((p) => (
            <ProductCard key={p.slug} producto={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
