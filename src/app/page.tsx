import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  CloudIcon,
  CreditCardIcon,
  DownloadIcon,
  HeadsetIcon,
  ShieldCheckIcon,
  XIcon,
  ZapIcon,
} from "lucide-react";
import { Rotulo } from "@/components/ficha";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { quetzales } from "@/lib/format";
import { productos } from "@/lib/products";

/**
 * La tabla comparativa es el argumento central de la empresa puesto en forma de
 * dato: las cifras de la columna izquierda son las mismas que aparecen en las
 * descripciones de los productos.
 */
const comparacion = [
  {
    criterio: "Tiempo de arranque",
    proyecto: "4 a 8 meses",
    producto: "El mismo día",
  },
  {
    criterio: "Inversión inicial",
    proyecto: "Q45,000 – Q120,000",
    producto: "Desde Q2,300",
  },
  {
    criterio: "Alcance",
    proyecto: "Se define en reuniones",
    producto: "Publicado en la ficha técnica",
  },
  {
    criterio: "Mantenimiento",
    proyecto: "Contrato aparte",
    producto: "Incluido en la licencia",
  },
  {
    criterio: "Dependencia del proveedor",
    proyecto: "Alta",
    producto: "Código abierto para tu equipo",
  },
];

const diferenciadores = [
  {
    icono: ZapIcon,
    titulo: "Listo para usar",
    detalle:
      "Productos empaquetados, no proyectos a la medida. Instalas o activas y empiezas el mismo día.",
  },
  {
    icono: CreditCardIcon,
    titulo: "Precio transparente",
    detalle:
      "Precios publicados en quetzales, sin cotizaciones eternas ni costos ocultos por hora.",
  },
  {
    icono: ShieldCheckIcon,
    titulo: "Hecho para Guatemala",
    detalle:
      "Facturación FEL, métodos de pago y couriers locales configurados de fábrica.",
  },
  {
    icono: HeadsetIcon,
    titulo: "Soporte en español",
    detalle:
      "Un equipo en el mismo huso horario, con documentación y capacitación en español.",
  },
];

const pasos = [
  {
    titulo: "Elige tu producto",
    detalle:
      "Compara funciones, beneficios y modalidad de entrega en el catálogo.",
  },
  {
    titulo: "Agrégalo al carrito",
    detalle:
      "Ajusta cantidades de licencias y revisa el desglose con IVA antes de pagar.",
  },
  {
    titulo: "Completa el pago",
    detalle:
      "Un checkout de dos pasos con datos de facturación y método de pago.",
  },
  {
    titulo: "Recibe tu licencia",
    detalle:
      "Llave de licencia y enlace de descarga, o acceso al espacio de trabajo en línea.",
  },
];

const preguntas = [
  {
    p: "¿Cuál es la diferencia entre descarga y consumo en línea?",
    r: "Los productos de descarga se instalan en tu propia infraestructura y los datos nunca salen de tus servidores. Los de consumo en línea se usan desde el navegador con una suscripción, sin que tengas que administrar servidores, respaldos ni certificados.",
  },
  {
    p: "¿Los precios incluyen IVA?",
    r: "Los precios del catálogo se muestran sin IVA. El impuesto del 12% se calcula y se muestra por separado en el carrito y en el resumen del checkout, antes de confirmar la compra.",
  },
  {
    p: "¿Puedo comprar varias licencias del mismo producto?",
    r: "Sí. En la página de cada producto puedes definir la cantidad de licencias antes de agregarla al carrito, y ajustarla después desde el carrito.",
  },
  {
    p: "¿Qué pasa después de confirmar la compra?",
    r: "Se genera una orden con su número de referencia y se despliega el detalle de entrega de cada producto: llave de licencia y enlace de descarga para los instalables, o URL y credenciales para los que se consumen en línea.",
  },
];

export default function Home() {
  return (
    <>
      {/* Portada: el argumento de la empresa es que publica sus precios, así que
          la lista de precios es lo primero que se ve. */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:py-24">
          <div className="flex flex-col justify-center">
            <Rotulo>Software empaquetado · Guatemala</Rotulo>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-semibold text-balance sm:text-6xl">
              No cotizamos.
              <br />
              Publicamos
              <br />
              <span className="text-primary">el precio</span>.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
              Catorce años de proyectos de ERP, desarrollo web y aplicaciones
              móviles, empaquetados en tres productos que compras hoy, instalas
              mañana y pones a producir esta semana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-11 px-5 text-[0.9rem]">
                <Link href="/productos">
                  Ver catálogo
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 px-5 text-[0.9rem]"
              >
                <Link href="#como-funciona">Cómo funciona</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-card ring-1 ring-border">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <span className="label-tec text-muted-foreground">
                Lista de precios
              </span>
              <span className="label-tec text-muted-foreground">GTQ</span>
            </div>

            <ul aria-label="Lista de precios">
              {productos.map((producto) => {
                const Icono =
                  producto.modalidad === "descarga" ? DownloadIcon : CloudIcon;
                return (
                  <li key={producto.slug} className="border-b border-border">
                    <Link
                      href={`/productos/${producto.slug}`}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-[0.95rem] font-medium tracking-[-0.02em]">
                          {producto.nombre}
                        </p>
                        <p className="label-tec mt-1.5 flex items-center gap-1.5 text-muted-foreground">
                          <Icono className="size-3" />
                          {producto.servicioBase}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="cifra text-base font-medium">
                          {quetzales(producto.precio)}
                        </p>
                        {producto.precioAntes && (
                          <p className="cifra mt-0.5 text-xs text-muted-foreground line-through">
                            {quetzales(producto.precioAntes)}
                          </p>
                        )}
                      </div>
                      <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="px-5 py-3.5 text-xs leading-relaxed text-muted-foreground">
              Precios por licencia, sin IVA. El 12% se calcula y se muestra por
              separado en el carrito.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Rotulo contador={`${productos.length} productos`}>Catálogo</Rotulo>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">
            Cada producto nace de un servicio que ya prestamos
          </h2>
          <Button asChild variant="ghost" className="h-9">
            <Link href="/productos">
              Ver catálogo completo
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>
      </section>

      {/* El argumento producto-vs-proyecto, en forma de tabla comparable. */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Rotulo>La diferencia</Rotulo>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Lo mismo que cotizabas, ya construido
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-pretty">
            Las cifras de la izquierda son las de nuestros propios proyectos a la
            medida, después de más de 40 implementaciones.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="label-tec py-3 pr-4 text-muted-foreground">
                    Criterio
                  </th>
                  <th scope="col" className="label-tec px-4 py-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <XIcon className="size-3" />
                      Proyecto a la medida
                    </span>
                  </th>
                  <th scope="col" className="label-tec px-4 py-3 text-primary">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckIcon className="size-3" />
                      Producto QuetzalDev
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparacion.map((fila) => (
                  <tr key={fila.criterio} className="border-b border-border">
                    <th
                      scope="row"
                      className="py-4 pr-4 text-sm font-medium align-top"
                    >
                      {fila.criterio}
                    </th>
                    <td className="px-4 py-4 text-sm text-muted-foreground align-top">
                      {fila.proyecto}
                    </td>
                    <td className="bg-primary/4 px-4 py-4 text-sm font-medium align-top">
                      {fila.producto}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciadores.map((d) => (
              <div key={d.titulo} className="border-t border-border pt-5">
                <d.icono className="size-4 text-primary" />
                <h3 className="mt-3 text-sm font-semibold">{d.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-20"
      >
        <Rotulo>Cómo funciona</Rotulo>
        <h2 className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl">
          De la vitrina a la licencia en cuatro pasos
        </h2>

        {/* Aquí la numeración sí informa: los pasos ocurren en este orden. */}
        <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso, i) => (
            <li key={paso.titulo} className="border-t border-border pt-5">
              <span className="cifra text-sm text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-sm font-semibold">{paso.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {paso.detalle}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <Rotulo>Preguntas frecuentes</Rotulo>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
              Antes de comprar
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Si te queda una duda que no está aquí, el equipo de soporte
              responde en español dentro del mismo día hábil.
            </p>
          </div>

          <Accordion type="single" collapsible className="lg:mt-2">
            {preguntas.map((q) => (
              <AccordionItem key={q.p} value={q.p}>
                <AccordionTrigger className="text-left text-[0.95rem] font-medium">
                  {q.p}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {q.r}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
