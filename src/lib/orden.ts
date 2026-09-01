import type { Modalidad } from "@/lib/products";

const ORDEN_KEY = "quetzaldev.ultimaOrden.v1";

export type LineaOrden = {
  slug: string;
  nombre: string;
  modalidad: Modalidad;
  modalidadLabel: string;
  entrega: string;
  cantidad: number;
  precio: number;
  importe: number;
  llaves: string[];
};

export type Orden = {
  numero: string;
  fechaISO: string;
  cliente: {
    nombre: string;
    correo: string;
    empresa: string;
    nit: string;
    telefono: string;
    direccion: string;
  };
  pago: {
    metodo: string;
    referencia: string;
  };
  lineas: LineaOrden[];
  subtotal: number;
  iva: number;
  total: number;
};

const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function bloque(largo: number) {
  let salida = "";
  const bytes = new Uint32Array(largo);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < largo; i++) {
    salida += ALFABETO[bytes[i] % ALFABETO.length];
  }
  return salida;
}

export function generarNumeroOrden() {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  return `QD-${anio}-${bloque(6)}`;
}

export function generarLlave(slug: string) {
  const prefijo = slug.slice(0, 3).toUpperCase();
  return `${prefijo}-${bloque(4)}-${bloque(4)}-${bloque(4)}`;
}

function leerOrden(): Orden | null {
  try {
    const crudo = window.sessionStorage.getItem(ORDEN_KEY);
    return crudo ? (JSON.parse(crudo) as Orden) : null;
  } catch {
    return null;
  }
}

/**
 * La última orden se guarda en sessionStorage y se expone como almacén externo
 * para leerla con useSyncExternalStore. `undefined` significa "todavía no se ha
 * leído" (lo que ve el servidor) y `null` significa "no hay orden".
 */
let cache: Orden | null | undefined;
const oyentes = new Set<() => void>();

export function guardarOrden(orden: Orden) {
  cache = orden;
  try {
    window.sessionStorage.setItem(ORDEN_KEY, JSON.stringify(orden));
  } catch {
    /* sin almacenamiento de sesión la orden solo vive en memoria */
  }
  for (const oyente of oyentes) oyente();
}

export function suscribirOrden(oyente: () => void) {
  oyentes.add(oyente);
  if (cache === undefined) {
    cache = leerOrden();
    for (const o of oyentes) o();
  }
  return () => {
    oyentes.delete(oyente);
  };
}

export function obtenerOrden() {
  return cache;
}

export function obtenerOrdenServidor(): Orden | null | undefined {
  return undefined;
}
