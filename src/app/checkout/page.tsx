"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  InfoIcon,
  Loader2Icon,
  LockIcon,
  ShoppingCartIcon,
  WandSparklesIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useCarrito } from "@/components/cart-provider";
import { Ficha, Rotulo } from "@/components/ficha";
import { ProductIllustration } from "@/components/product-illustration";
import { Resumen } from "@/components/resumen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { quetzales } from "@/lib/format";
import {
  generarLlave,
  generarNumeroOrden,
  guardarOrden,
  type LineaOrden,
} from "@/lib/orden";

const DEPARTAMENTOS = [
  "Guatemala",
  "Sacatepéquez",
  "Quetzaltenango",
  "Escuintla",
  "Alta Verapaz",
  "Petén",
  "Izabal",
  "Huehuetenango",
  "San Marcos",
  "Chimaltenango",
];

type Formulario = {
  nombre: string;
  correo: string;
  telefono: string;
  empresa: string;
  nit: string;
  direccion: string;
  departamento: string;
  titular: string;
  tarjeta: string;
  vence: string;
  cvv: string;
};

const VACIO: Formulario = {
  nombre: "",
  correo: "",
  telefono: "",
  empresa: "",
  nit: "",
  direccion: "",
  departamento: "",
  titular: "",
  tarjeta: "",
  vence: "",
  cvv: "",
};

const PRUEBA: Formulario = {
  nombre: "Ana Lucía Rodríguez",
  correo: "compras@distribuidoralaceiba.gt",
  telefono: "5512 8834",
  empresa: "Distribuidora La Ceiba, S.A.",
  nit: "4839201-6",
  direccion: "12 calle 3-45 zona 10, Edificio Atrium, oficina 502",
  departamento: "Guatemala",
  titular: "ANA L RODRIGUEZ",
  tarjeta: "4242 4242 4242 4242",
  vence: "12/29",
  cvv: "123",
};

function soloDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

function formatearTarjeta(valor: string) {
  return soloDigitos(valor).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatearVence(valor: string) {
  const d = soloDigitos(valor).slice(0, 4);
  return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { detalle, subtotal, iva, total, unidades, vaciar, hidratado } =
    useCarrito();
  const [form, setForm] = useState<Formulario>(VACIO);
  const [errores, setErrores] = useState<Partial<Record<keyof Formulario, string>>>({});
  const [metodo, setMetodo] = useState<"tarjeta" | "transferencia">("tarjeta");
  const [procesando, setProcesando] = useState(false);

  const set = (campo: keyof Formulario, valor: string) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  function validar() {
    const e: Partial<Record<keyof Formulario, string>> = {};

    if (form.nombre.trim().length < 3) e.nombre = "Escribe tu nombre completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.correo.trim()))
      e.correo = "Escribe un correo electrónico válido.";
    if (soloDigitos(form.telefono).length < 8)
      e.telefono = "El teléfono debe tener al menos 8 dígitos.";
    if (form.nit.trim().length < 2)
      e.nit = "Ingresa tu NIT o escribe CF si es consumidor final.";
    if (form.direccion.trim().length < 8)
      e.direccion = "Ingresa una dirección de facturación completa.";
    if (!form.departamento) e.departamento = "Selecciona un departamento.";

    if (metodo === "tarjeta") {
      if (form.titular.trim().length < 3)
        e.titular = "Escribe el nombre tal como aparece en la tarjeta.";
      if (soloDigitos(form.tarjeta).length !== 16)
        e.tarjeta = "El número de tarjeta debe tener 16 dígitos.";
      const [mm, aa] = form.vence.split("/");
      const mes = Number(mm);
      if (!mm || !aa || aa.length !== 2 || !(mes >= 1 && mes <= 12))
        e.vence = "Usa el formato MM/AA.";
      if (soloDigitos(form.cvv).length !== 3) e.cvv = "El CVV tiene 3 dígitos.";
    }

    setErrores(e);
    return Object.keys(e).length === 0;
  }

  async function confirmar(evento: React.FormEvent) {
    evento.preventDefault();
    if (detalle.length === 0) return;
    if (!validar()) {
      toast.error("Revisa los campos marcados antes de continuar.");
      return;
    }

    setProcesando(true);
    // Simulación de la autorización con la pasarela de pago.
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const lineas: LineaOrden[] = detalle.map(({ producto, cantidad, importe }) => ({
      slug: producto.slug,
      nombre: producto.nombre,
      modalidad: producto.modalidad,
      modalidadLabel: producto.modalidadLabel,
      entrega: producto.entrega,
      cantidad,
      precio: producto.precio,
      importe,
      llaves: Array.from({ length: cantidad }, () => generarLlave(producto.slug)),
    }));

    const orden = {
      numero: generarNumeroOrden(),
      fechaISO: new Date().toISOString(),
      cliente: {
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        empresa: form.empresa.trim(),
        nit: form.nit.trim().toUpperCase(),
        telefono: form.telefono.trim(),
        direccion: `${form.direccion.trim()}, ${form.departamento}`,
      },
      pago:
        metodo === "tarjeta"
          ? {
              metodo: "Tarjeta de crédito",
              referencia: `**** **** **** ${soloDigitos(form.tarjeta).slice(-4)}`,
            }
          : {
              metodo: "Transferencia bancaria",
              referencia: "Banco Industrial · cuenta 123-456789-0",
            },
      lineas,
      subtotal,
      iva,
      total,
    };

    guardarOrden(orden);
    vaciar();
    router.push("/checkout/confirmacion");
  }

  if (!hidratado) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
        <div className="mt-8 h-96 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (detalle.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <div className="grid size-14 place-items-center rounded-xl border border-border">
            <ShoppingCartIcon className="size-6 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold">No hay nada que pagar</h1>
          <p className="text-muted-foreground text-pretty">
            Tu carrito está vacío. Agrega un producto para poder simular la
            compra.
          </p>
          <Button asChild className="h-11 px-5">
            <Link href="/productos">Ir al catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <header>
        <Rotulo contador="Paso final">Checkout</Rotulo>
        <h1 className="mt-6 text-4xl font-semibold">
          Datos de facturación y pago
        </h1>
      </header>

      <div className="mt-8 flex flex-wrap items-start gap-4 rounded-xl border border-primary/25 bg-primary/5 p-5 text-sm">
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-primary" />
        <div className="min-w-56 flex-1">
          <p className="font-medium">Compra simulada</p>
          <p className="mt-1.5 leading-relaxed text-muted-foreground">
            Esta tienda es una demostración académica: no se procesa ningún
            cobro real ni se transmiten los datos a ninguna pasarela. Usa la
            tarjeta de prueba{" "}
            <code className="cifra text-foreground">4242 4242 4242 4242</code>.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9"
          onClick={() => {
            setForm(PRUEBA);
            setErrores({});
            toast.info("Formulario rellenado con datos de prueba.");
          }}
        >
          <WandSparklesIcon className="size-3.5" />
          Usar datos de prueba
        </Button>
      </div>

      <form
        onSubmit={confirmar}
        className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]"
      >
        <div className="flex flex-col gap-12">
          <section>
            <Rotulo>Datos de facturación</Rotulo>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Campo
                id="nombre"
                etiqueta="Nombre completo"
                valor={form.nombre}
                error={errores.nombre}
                onChange={(v) => set("nombre", v)}
                placeholder="Ana Lucía Rodríguez"
                autoComplete="name"
              />
              <Campo
                id="correo"
                etiqueta="Correo electrónico"
                tipo="email"
                valor={form.correo}
                error={errores.correo}
                onChange={(v) => set("correo", v)}
                placeholder="nombre@empresa.gt"
                autoComplete="email"
              />
              <Campo
                id="telefono"
                etiqueta="Teléfono"
                valor={form.telefono}
                error={errores.telefono}
                onChange={(v) => set("telefono", v)}
                placeholder="5512 8834"
                autoComplete="tel"
              />
              <Campo
                id="empresa"
                etiqueta="Empresa (opcional)"
                valor={form.empresa}
                onChange={(v) => set("empresa", v)}
                placeholder="Distribuidora La Ceiba, S.A."
                autoComplete="organization"
              />
              <Campo
                id="nit"
                etiqueta="NIT"
                valor={form.nit}
                error={errores.nit}
                onChange={(v) => set("nit", v)}
                placeholder="4839201-6 o CF"
              />
              <div className="flex flex-col gap-2">
                <Label htmlFor="departamento" className="label-tec text-muted-foreground">
                  Departamento
                </Label>
                <Select
                  value={form.departamento}
                  onValueChange={(v) => set("departamento", v)}
                >
                  <SelectTrigger id="departamento" className="h-10 w-full">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTAMENTOS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errores.departamento && (
                  <p className="text-xs text-destructive">
                    {errores.departamento}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <Campo
                  id="direccion"
                  etiqueta="Dirección de facturación"
                  valor={form.direccion}
                  error={errores.direccion}
                  onChange={(v) => set("direccion", v)}
                  placeholder="12 calle 3-45 zona 10, oficina 502"
                  autoComplete="street-address"
                />
              </div>
            </div>
          </section>

          <section>
            <Rotulo>Método de pago</Rotulo>

            <Tabs
              value={metodo}
              onValueChange={(v) => setMetodo(v as typeof metodo)}
              className="mt-6"
            >
              <TabsList>
                <TabsTrigger value="tarjeta">Tarjeta</TabsTrigger>
                <TabsTrigger value="transferencia">Transferencia</TabsTrigger>
              </TabsList>

              <TabsContent value="tarjeta" className="mt-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Campo
                      id="titular"
                      etiqueta="Nombre en la tarjeta"
                      valor={form.titular}
                      error={errores.titular}
                      onChange={(v) => set("titular", v.toUpperCase())}
                      placeholder="ANA L RODRIGUEZ"
                      autoComplete="cc-name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Campo
                      id="tarjeta"
                      etiqueta="Número de tarjeta"
                      valor={form.tarjeta}
                      error={errores.tarjeta}
                      onChange={(v) => set("tarjeta", formatearTarjeta(v))}
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      className="cifra"
                    />
                  </div>
                  <Campo
                    id="vence"
                    etiqueta="Vencimiento"
                    valor={form.vence}
                    error={errores.vence}
                    onChange={(v) => set("vence", formatearVence(v))}
                    placeholder="MM/AA"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    className="cifra"
                  />
                  <Campo
                    id="cvv"
                    etiqueta="CVV"
                    valor={form.cvv}
                    error={errores.cvv}
                    onChange={(v) => set("cvv", soloDigitos(v).slice(0, 3))}
                    placeholder="123"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    className="cifra"
                  />
                </div>
              </TabsContent>

              <TabsContent value="transferencia" className="mt-6">
                <div className="rounded-xl bg-card p-5 text-sm ring-1 ring-border">
                  <p className="font-medium">
                    Transfiere a la cuenta de QuetzalDev
                  </p>
                  <Ficha
                    className="mt-4 gap-2.5"
                    filas={[
                      { etiqueta: "Banco", valor: "Banco Industrial" },
                      { etiqueta: "Tipo de cuenta", valor: "Monetaria" },
                      { etiqueta: "Número", valor: "123-456789-0" },
                      { etiqueta: "A nombre de", valor: "QuetzalDev, S.A." },
                    ]}
                  />
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Al confirmar, recibirás la orden en estado{" "}
                    <strong className="text-foreground">
                      pendiente de acreditación
                    </strong>{" "}
                    junto con las instrucciones para enviar tu comprobante.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="label-tec text-muted-foreground">Tu pedido</h2>

            <ul className="mt-5 flex flex-col">
              {detalle.map(({ producto, cantidad, importe }) => (
                <li
                  key={producto.slug}
                  className="flex items-center gap-3 border-b border-border py-3 first:pt-0"
                >
                  <div className="size-11 shrink-0 overflow-hidden rounded-md ring-1 ring-border">
                    <ProductIllustration slug={producto.slug} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {producto.nombre}
                    </p>
                    <p className="label-tec mt-1 text-muted-foreground">
                      Cantidad {cantidad}
                    </p>
                  </div>
                  <span className="cifra text-sm font-medium">
                    {quetzales(importe)}
                  </span>
                </li>
              ))}
            </ul>

            <Resumen
              className="mt-5"
              subtotal={subtotal}
              iva={iva}
              total={total}
              etiquetaSubtotal={`Subtotal (${unidades} ${unidades === 1 ? "licencia" : "licencias"})`}
            />

            <Button type="submit" className="mt-6 h-11 w-full" disabled={procesando}>
              {procesando ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Procesando pago…
                </>
              ) : (
                <>
                  <LockIcon className="size-4" />
                  Confirmar compra
                </>
              )}
            </Button>

            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Al confirmar aceptas los términos de licencia de QuetzalDev.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Campo({
  id,
  etiqueta,
  valor,
  onChange,
  error,
  tipo = "text",
  ...resto
}: {
  id: string;
  etiqueta: string;
  valor: string;
  onChange: (valor: string) => void;
  error?: string;
  tipo?: string;
} & Omit<React.ComponentProps<typeof Input>, "onChange" | "value" | "id" | "type">) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="label-tec text-muted-foreground">
        {etiqueta}
      </Label>
      <Input
        id={id}
        type={tipo}
        className="h-10"
        value={valor}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        {...resto}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
