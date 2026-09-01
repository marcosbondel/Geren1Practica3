import { productos } from "@/lib/products";

const STORAGE_KEY = "quetzaldev.carrito.v1";

export type LineaCarrito = { slug: string; cantidad: number };
export type EstadoCarrito = { lineas: LineaCarrito[]; hidratado: boolean };

const VACIO: EstadoCarrito = { lineas: [], hidratado: false };

/**
 * Almacén externo del carrito. Vive fuera de React para que los componentes
 * puedan leerlo con useSyncExternalStore: así la primera pintura coincide con
 * el HTML del servidor y la lectura de localStorage ocurre después de hidratar,
 * sin encadenar renders desde un efecto.
 */
let estado: EstadoCarrito = VACIO;
const oyentes = new Set<() => void>();

function limpiar(cantidad: number) {
  return Math.min(Math.max(1, Math.trunc(cantidad)), 99);
}

function leerAlmacenamiento(): LineaCarrito[] {
  try {
    const crudo = window.localStorage.getItem(STORAGE_KEY);
    if (!crudo) return [];
    const datos: unknown = JSON.parse(crudo);
    if (!Array.isArray(datos)) return [];
    return datos
      .filter(
        (l): l is LineaCarrito =>
          typeof (l as LineaCarrito)?.slug === "string" &&
          typeof (l as LineaCarrito)?.cantidad === "number" &&
          productos.some((p) => p.slug === (l as LineaCarrito).slug),
      )
      .map((l) => ({ slug: l.slug, cantidad: limpiar(l.cantidad) }));
  } catch {
    return [];
  }
}

function escribirAlmacenamiento(lineas: LineaCarrito[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lineas));
  } catch {
    /* sin localStorage el carrito sigue funcionando solo en memoria */
  }
}

function publicar(lineas: LineaCarrito[]) {
  estado = { lineas, hidratado: true };
  for (const oyente of oyentes) oyente();
}

function aplicar(transformar: (lineas: LineaCarrito[]) => LineaCarrito[]) {
  const lineas = transformar(estado.lineas);
  escribirAlmacenamiento(lineas);
  publicar(lineas);
}

export function suscribir(oyente: () => void) {
  oyentes.add(oyente);
  if (!estado.hidratado) publicar(leerAlmacenamiento());

  const alCambiarOtraPestania = (evento: StorageEvent) => {
    if (evento.key === STORAGE_KEY) publicar(leerAlmacenamiento());
  };
  window.addEventListener("storage", alCambiarOtraPestania);

  return () => {
    oyentes.delete(oyente);
    window.removeEventListener("storage", alCambiarOtraPestania);
  };
}

export function obtenerEstado() {
  return estado;
}

export function obtenerEstadoServidor() {
  return VACIO;
}

export function agregar(slug: string, cantidad = 1) {
  aplicar((lineas) => {
    const existente = lineas.find((l) => l.slug === slug);
    if (existente) {
      return lineas.map((l) =>
        l.slug === slug ? { ...l, cantidad: limpiar(l.cantidad + cantidad) } : l,
      );
    }
    return [...lineas, { slug, cantidad: limpiar(cantidad) }];
  });
}

export function actualizar(slug: string, cantidad: number) {
  aplicar((lineas) =>
    cantidad <= 0
      ? lineas.filter((l) => l.slug !== slug)
      : lineas.map((l) =>
          l.slug === slug ? { ...l, cantidad: limpiar(cantidad) } : l,
        ),
  );
}

export function quitar(slug: string) {
  aplicar((lineas) => lineas.filter((l) => l.slug !== slug));
}

export function vaciar() {
  aplicar(() => []);
}
