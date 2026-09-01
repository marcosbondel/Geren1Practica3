import Link from "next/link";
import {
  ArrowRightIcon,
  CreditCardIcon,
  HeadsetIcon,
  PackageCheckIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { productos } from "@/lib/products";

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
    numero: "01",
    titulo: "Elige tu producto",
    detalle:
      "Compara funciones, beneficios y modalidad de entrega en el catálogo.",
  },
  {
    numero: "02",
    titulo: "Agrégalo al carrito",
    detalle:
      "Ajusta cantidades de licencias y revisa el desglose con IVA antes de pagar.",
  },
  {
    numero: "03",
    titulo: "Completa el pago",
    detalle:
      "Un checkout de dos pasos con datos de facturación y método de pago.",
  },
  {
    numero: "04",
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
      <section className="relative overflow-hidden border-b">
        <div className="brand-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="gap-1.5">
              <SparklesIcon className="size-3.5" />
              Nuevo: catálogo de productos empaquetados
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Software listo para usar,{" "}
              <span className="text-primary">construido en Guatemala</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              Empaquetamos catorce años de proyectos de ERP, desarrollo web y
              aplicaciones móviles en tres productos que puedes comprar hoy,
              instalar mañana y poner a producir esta semana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/productos">
                  Ver catálogo
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/productos/quetzalerp-core">
                  Conocer QuetzalERP Core
                </Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {[
                { k: "3", v: "productos empaquetados" },
                { k: "+40", v: "implementaciones previas" },
                { k: "8x5", v: "soporte en español" },
              ].map((item) => (
                <div key={item.v}>
                  <dt className="text-3xl font-semibold tabular-nums">
                    {item.k}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Nuestros productos
            </h2>
            <p className="mt-2 text-muted-foreground">
              Cada uno nace de un servicio que ya prestamos: ERP, desarrollo web
              y desarrollo de apps móviles.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/productos">
              Ver catálogo completo
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            Por qué comprar un producto y no un proyecto
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciadores.map((d) => (
              <div key={d.titulo} className="flex flex-col gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <d.icono className="size-5" />
                </div>
                <h3 className="font-semibold">{d.titulo}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {d.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex items-center gap-2 text-primary">
          <PackageCheckIcon className="size-5" />
          <span className="text-sm font-medium uppercase tracking-wide">
            Cómo funciona
          </span>
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          De la vitrina a la licencia en cuatro pasos
        </h2>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso) => (
            <li key={paso.numero} className="relative border-t pt-5">
              <span className="text-sm font-semibold tabular-nums text-primary">
                {paso.numero}
              </span>
              <h3 className="mt-2 font-semibold">{paso.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {paso.detalle}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            Preguntas frecuentes
          </h2>
          <Accordion type="single" collapsible className="mt-6">
            {preguntas.map((q) => (
              <AccordionItem key={q.p} value={q.p}>
                <AccordionTrigger className="text-left">{q.p}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
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
