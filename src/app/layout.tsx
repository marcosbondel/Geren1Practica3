import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { CarritoProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Archivo: grotesca industrial para titulares.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

// IBM Plex Sans: cuerpo de texto con herencia de documentación técnica.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// IBM Plex Mono: precios, llaves de licencia y rótulos de ficha técnica.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "QuetzalDev · Tienda de productos de software",
    template: "%s · QuetzalDev",
  },
  description:
    "Productos de software listos para usar de QuetzalDev: ERP instalable, constructor de tiendas en línea y kit de apps móviles. Precios publicados en quetzales, compra en línea con carrito y checkout.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CarritoProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <Toaster position="bottom-right" />
          </CarritoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
