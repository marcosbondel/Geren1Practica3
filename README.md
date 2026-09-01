# QuetzalDev · Plataforma E-commerce

Tienda en línea de **QuetzalDev** desarrollada para la Práctica 3 de Sistemas
Organizacionales y Gerenciales 1 (USAC). Vende tres productos de software
ideados a partir de los servicios base de la empresa (ERP, Desarrollo Web y
Desarrollo de Apps Móviles), con **carrito de compras** y **simulación de
compra** completa.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com) (base Radix, preset Nova)

## Productos del catálogo

| Producto | Servicio base | Modalidad | Precio |
| --- | --- | --- | --- |
| QuetzalERP Core | ERP | Descarga e instalación | Q 12,500.00 / año |
| TiendaQuetzal Builder | Desarrollo Web | Consumo en línea (SaaS) | Q 4,750.00 / año |
| QuetzalApp Kit | Desarrollo de Apps Móviles | Descarga e instalación | Q 2,300.00 perpetua |

Cada ficha incluye ilustración, precio, descripción, funciones, beneficios y
ficha técnica, según lo pedido en el enunciado.

## Arquitectura de información

```
/                             Portada: propuesta de valor, catálogo, cómo funciona, FAQ
/productos                    Catálogo completo
/productos/[slug]             Ficha del producto (descripción, funciones, beneficios, ficha técnica)
/carrito                      Carrito con edición de cantidades y desglose
/checkout                     Datos de facturación + método de pago (simulado)
/checkout/confirmacion        Orden generada, llaves de licencia y comprobante
```

## Flujo de compra simulado

1. Agregar productos desde el catálogo, la ficha o el panel lateral del carrito.
2. Ajustar cantidades; el carrito persiste en `localStorage` y se sincroniza
   entre pestañas.
3. Checkout con validación de formulario, IVA del 12% desglosado y dos métodos
   de pago (tarjeta o transferencia).
4. Autorización simulada (~1.8 s) que genera número de orden, llaves de
   licencia y comprobante imprimible. **No se procesa ningún cobro real.**

> Tarjeta de prueba: `4242 4242 4242 4242`, cualquier fecha futura y CVV `123`.
> El botón «Usar datos de prueba» rellena el formulario completo.

## Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # build de producción
pnpm lint     # ESLint
```

## Estructura del código

```
src/
├── app/                    Rutas (App Router)
├── components/
│   ├── ui/                 Componentes de shadcn/ui
│   ├── cart-provider.tsx   Contexto del carrito sobre el almacén externo
│   ├── cart-sheet.tsx      Panel lateral del carrito
│   └── product-*.tsx       Tarjeta e ilustraciones SVG de producto
└── lib/
    ├── products.ts         Catálogo (fuente única de verdad)
    ├── cart-store.ts       Almacén externo con persistencia en localStorage
    ├── orden.ts            Generación y persistencia de la orden
    └── format.ts           Formato de moneda GTQ
```

Las ilustraciones de producto son SVG generados en código con los tokens de
color del tema, por lo que se adaptan a modo claro y oscuro sin activos
externos.
