import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CarritoProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "QuetzalDev · Tienda de productos de software",
    template: "%s · QuetzalDev",
  },
  description:
    "Productos de software listos para usar de QuetzalDev: ERP instalable, constructor de tiendas en línea y kit de apps móviles. Compra en línea con carrito y checkout.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
