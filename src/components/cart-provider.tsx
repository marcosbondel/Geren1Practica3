"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  actualizar,
  agregar,
  obtenerEstado,
  obtenerEstadoServidor,
  quitar,
  suscribir,
  vaciar,
  type LineaCarrito,
} from "@/lib/cart-store";
import { IVA, productos, type Producto } from "@/lib/products";

export type LineaDetallada = {
  producto: Producto;
  cantidad: number;
  importe: number;
};

type CarritoContexto = {
  lineas: LineaCarrito[];
  detalle: LineaDetallada[];
  unidades: number;
  subtotal: number;
  iva: number;
  total: number;
  hidratado: boolean;
  agregar: typeof agregar;
  actualizar: typeof actualizar;
  quitar: typeof quitar;
  vaciar: typeof vaciar;
  abierto: boolean;
  setAbierto: (v: boolean) => void;
};

const Ctx = createContext<CarritoContexto | null>(null);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const { lineas, hidratado } = useSyncExternalStore(
    suscribir,
    obtenerEstado,
    obtenerEstadoServidor,
  );
  const [abierto, setAbierto] = useState(false);

  const valor = useMemo<CarritoContexto>(() => {
    const detalle: LineaDetallada[] = lineas.flatMap((linea) => {
      const producto = productos.find((p) => p.slug === linea.slug);
      if (!producto) return [];
      return [
        {
          producto,
          cantidad: linea.cantidad,
          importe: producto.precio * linea.cantidad,
        },
      ];
    });
    const subtotal = detalle.reduce((acc, l) => acc + l.importe, 0);
    const iva = Math.round(subtotal * IVA * 100) / 100;

    return {
      lineas,
      detalle,
      unidades: detalle.reduce((acc, l) => acc + l.cantidad, 0),
      subtotal,
      iva,
      total: subtotal + iva,
      hidratado,
      agregar,
      actualizar,
      quitar,
      vaciar,
      abierto,
      setAbierto,
    };
  }, [lineas, hidratado, abierto]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useCarrito() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
}
