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
import { ProductCard } from "@/components/product-card";
import { ProductIllustration } from "@/components/product-illustration";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <nav
        aria-label="Ruta de navegación"
        className="flex items-center gap-1 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground">
          Inicio
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <Link href="/productos" className="hover:text-foreground">
          Productos
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <span className="text-foreground">{producto.nombre}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <div className="relative aspect-16/10 overflow-hidden rounded-xl border bg-muted">
            <ProductIllustration slug={producto.slug} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight">Descripción</h2>
            <div className="mt-3 flex flex-col gap-4 leading-relaxed text-muted-foreground">
              {producto.descripcion.map((parrafo) => (
                <p key={parrafo.slice(0, 32)}>{parrafo}</p>
              ))}
            </div>
          </div>

          <Tabs defaultValue="funciones" className="mt-10">
            <TabsList>
              <TabsTrigger value="funciones">Funciones</TabsTrigger>
              <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
              <TabsTrigger value="especificaciones">Ficha técnica</TabsTrigger>
            </TabsList>

            <TabsContent value="funciones" className="mt-6">
              <ul className="grid gap-5 sm:grid-cols-2">
                {producto.funciones.map((f) => (
                  <li key={f.titulo} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <CheckIcon className="size-3.5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{f.titulo}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {f.detalle}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="beneficios" className="mt-6">
              <ul className="grid gap-4">
                {producto.beneficios.map((b) => (
                  <li
                    key={b.titulo}
                    className="rounded-lg border bg-card p-4"
                  >
                    <h3 className="text-sm font-semibold">{b.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {b.detalle}
                    </p>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="especificaciones" className="mt-6">
              <dl className="divide-y rounded-lg border">
                {producto.especificaciones.map((e) => (
                  <div
                    key={e.etiqueta}
                    className="flex flex-wrap justify-between gap-2 px-4 py-3 text-sm"
                  >
                    <dt className="text-muted-foreground">{e.etiqueta}</dt>
                    <dd className="font-medium">{e.valor}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{producto.servicioBase}</Badge>
                {producto.destacado && <Badge>Más vendido</Badge>}
              </div>

              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-balance">
                  {producto.nombre}
                </h1>
                <p className="mt-1.5 text-muted-foreground">
                  {producto.tagline}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-4xl font-semibold tabular-nums">
                    {quetzales(producto.precio)}
                  </span>
                  {producto.precioAntes && (
                    <span className="text-lg text-muted-foreground line-through tabular-nums">
                      {quetzales(producto.precioAntes)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {producto.unidad}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {quetzales(conIva)} con IVA incluido
                </p>
              </div>

              <Separator />

              <AddToCartPanel producto={producto} />

              <Separator />

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex gap-3">
                  <Icono className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{producto.modalidadLabel}</p>
                    <p className="text-muted-foreground">{producto.entrega}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <PackageIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Entrega inmediata</p>
                    <p className="text-muted-foreground">
                      Disponible al confirmar el pago, sin tiempos de espera.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          También te puede interesar
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {relacionados.map((p) => (
            <ProductCard key={p.slug} producto={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
