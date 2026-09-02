"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CheckIcon,
  CloudIcon,
  CopyIcon,
  DownloadIcon,
  MailIcon,
  PrinterIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Ficha, Rotulo } from "@/components/ficha";
import { Resumen } from "@/components/resumen";
import { Button } from "@/components/ui/button";
import { quetzales } from "@/lib/format";
import {
  obtenerOrden,
  obtenerOrdenServidor,
  suscribirOrden,
} from "@/lib/orden";

export default function ConfirmacionPage() {
  const orden = useSyncExternalStore(
    suscribirOrden,
    obtenerOrden,
    obtenerOrdenServidor,
  );

  if (orden === undefined) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <div className="h-10 w-64 animate-pulse rounded-md bg-muted" />
        <div className="mt-8 h-80 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!orden) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold">
          No encontramos una orden reciente
        </h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          La confirmación solo está disponible justo después de completar una
          compra en esta misma sesión.
        </p>
        <Button asChild className="mt-7 h-11 px-5">
          <Link href="/productos">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }

  const fecha = new Date(orden.fechaISO).toLocaleString("es-GT", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <header>
        <Rotulo>Orden confirmada</Rotulo>
        <div className="mt-6 flex items-start gap-4">
          <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <CheckIcon className="size-4" />
          </span>
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              ¡Gracias por tu compra!
            </h1>
            <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
              Tu orden quedó registrada. Enviamos la confirmación y los accesos
              a{" "}
              <strong className="font-medium text-foreground">
                {orden.cliente.correo}
              </strong>
              .
            </p>
          </div>
        </div>
      </header>

      {/* Cabecera de la orden: los datos que el comprador cita al pedir soporte. */}
      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-card p-5 ring-1 ring-border">
        <div>
          <p className="label-tec text-muted-foreground">Número de orden</p>
          <p className="cifra mt-1.5 text-lg font-medium">{orden.numero}</p>
        </div>
        <div>
          <p className="label-tec text-muted-foreground">Fecha</p>
          <p className="mt-1.5 text-sm">{fecha}</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => {
              navigator.clipboard
                ?.writeText(orden.numero)
                .then(() => toast.success("Número de orden copiado."))
                .catch(() => toast.error("No se pudo copiar el número."));
            }}
          >
            <CopyIcon className="size-3.5" />
            Copiar número
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => window.print()}
          >
            <PrinterIcon className="size-3.5" />
            Imprimir
          </Button>
        </div>
      </div>

      <section className="mt-12">
        <Rotulo contador={`${orden.lineas.length} ${orden.lineas.length === 1 ? "producto" : "productos"}`}>
          Tus accesos y licencias
        </Rotulo>

        <ul className="mt-6 flex flex-col gap-5">
          {orden.lineas.map((linea) => {
            const Icono =
              linea.modalidad === "descarga" ? DownloadIcon : CloudIcon;
            return (
              <li
                key={linea.slug}
                className="rounded-xl bg-card p-5 ring-1 ring-border"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-base font-semibold tracking-[-0.02em]">
                      {linea.nombre}
                    </h3>
                    <p className="label-tec mt-2 inline-flex items-center gap-1.5 text-muted-foreground">
                      <Icono className="size-3" />
                      {linea.modalidadLabel} · {linea.cantidad}{" "}
                      {linea.cantidad === 1 ? "licencia" : "licencias"}
                    </p>
                  </div>
                  <span className="cifra font-medium">
                    {quetzales(linea.importe)}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {linea.entrega}
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                  {linea.llaves.map((llave) => (
                    <li
                      key={llave}
                      className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2.5"
                    >
                      <span className="label-tec shrink-0 text-muted-foreground">
                        Licencia
                      </span>
                      <code className="cifra flex-1 text-sm tracking-wide">
                        {llave}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 shrink-0 print:hidden"
                        aria-label={`Copiar llave ${llave}`}
                        onClick={() => {
                          navigator.clipboard
                            ?.writeText(llave)
                            .then(() => toast.success("Llave copiada."))
                            .catch(() => toast.error("No se pudo copiar."));
                        }}
                      >
                        <CopyIcon className="size-3.5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <Rotulo>Facturación</Rotulo>
          <Ficha
            className="mt-5 gap-2.5"
            filas={[
              { etiqueta: "Nombre", valor: orden.cliente.nombre },
              ...(orden.cliente.empresa
                ? [{ etiqueta: "Empresa", valor: orden.cliente.empresa }]
                : []),
              { etiqueta: "NIT", valor: orden.cliente.nit },
              { etiqueta: "Teléfono", valor: orden.cliente.telefono },
            ]}
          />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {orden.cliente.direccion}
          </p>
        </div>

        <div>
          <Rotulo>Pago</Rotulo>
          <Ficha
            className="mt-5 gap-2.5"
            filas={[
              { etiqueta: "Método", valor: orden.pago.metodo },
              { etiqueta: "Referencia", valor: orden.pago.referencia },
            ]}
          />
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MailIcon className="size-3.5" />
            Comprobante enviado por correo
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-card p-6 ring-1 ring-border">
        <h2 className="label-tec text-muted-foreground">Total de la orden</h2>
        <Resumen
          className="mt-5"
          subtotal={orden.subtotal}
          iva={orden.iva}
          total={orden.total}
          etiquetaTotal="Total pagado"
        />
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-3 print:hidden">
        <Button asChild className="h-11 px-5">
          <Link href="/productos">Seguir explorando el catálogo</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 px-5">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
