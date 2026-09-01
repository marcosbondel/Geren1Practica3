"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CheckCircle2Icon,
  CloudIcon,
  CopyIcon,
  DownloadIcon,
  KeyRoundIcon,
  MailIcon,
  PrinterIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
      <div className="mx-auto w-full max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          No encontramos una orden reciente
        </h1>
        <p className="mt-2 text-muted-foreground">
          La confirmación solo está disponible justo después de completar una
          compra en esta misma sesión.
        </p>
        <Button asChild size="lg" className="mt-6">
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
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2Icon className="size-8" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            ¡Gracias por tu compra!
          </h1>
          <p className="mt-2 text-muted-foreground text-pretty">
            Tu orden quedó registrada. Enviamos la confirmación y los accesos a{" "}
            <strong className="text-foreground">{orden.cliente.correo}</strong>.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary" className="font-mono text-sm">
            {orden.numero}
          </Badge>
          <span className="text-sm text-muted-foreground">{fecha}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2 print:hidden">
          <Button
            variant="outline"
            size="sm"
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
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <PrinterIcon className="size-3.5" />
            Imprimir comprobante
          </Button>
        </div>
      </div>

      <Card className="mt-10">
        <CardContent className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold">Tus accesos y licencias</h2>

          <ul className="flex flex-col gap-5">
            {orden.lineas.map((linea) => {
              const Icono =
                linea.modalidad === "descarga" ? DownloadIcon : CloudIcon;
              return (
                <li key={linea.slug} className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{linea.nombre}</h3>
                      <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icono className="size-3.5" />
                        {linea.modalidadLabel} · {linea.cantidad}{" "}
                        {linea.cantidad === 1 ? "licencia" : "licencias"}
                      </p>
                    </div>
                    <span className="font-medium tabular-nums">
                      {quetzales(linea.importe)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {linea.entrega}
                  </p>

                  <ul className="mt-3 flex flex-col gap-2">
                    {linea.llaves.map((llave) => (
                      <li
                        key={llave}
                        className="flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2"
                      >
                        <KeyRoundIcon className="size-3.5 shrink-0 text-primary" />
                        <code className="flex-1 font-mono text-xs tracking-wider">
                          {llave}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 print:hidden"
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

          <Separator />

          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">{quetzales(orden.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">IVA (12%)</dt>
              <dd className="tabular-nums">{quetzales(orden.iva)}</dd>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between text-lg font-semibold">
              <dt>Total pagado</dt>
              <dd className="tabular-nums">{quetzales(orden.total)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col gap-2 text-sm">
            <h2 className="font-semibold">Facturación</h2>
            <p>{orden.cliente.nombre}</p>
            {orden.cliente.empresa && (
              <p className="text-muted-foreground">{orden.cliente.empresa}</p>
            )}
            <p className="text-muted-foreground">NIT: {orden.cliente.nit}</p>
            <p className="text-muted-foreground">{orden.cliente.telefono}</p>
            <p className="text-muted-foreground">{orden.cliente.direccion}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2 text-sm">
            <h2 className="font-semibold">Pago</h2>
            <p>{orden.pago.metodo}</p>
            <p className="font-mono text-muted-foreground">
              {orden.pago.referencia}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-muted-foreground">
              <MailIcon className="size-3.5" />
              Comprobante enviado por correo
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3 print:hidden">
        <Button asChild size="lg">
          <Link href="/productos">Seguir explorando el catálogo</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
