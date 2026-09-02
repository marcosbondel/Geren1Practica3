import { expect, test, type Page } from "@playwright/test";

/**
 * Recorrido de la tienda de extremo a extremo. Cubre lo que un comprador hace
 * de verdad: leer el precio publicado, agregar licencias, revisar el desglose
 * con IVA y completar la compra simulada hasta recibir las llaves.
 *
 * Cada prueba arranca con el carrito vacío: vive en localStorage, así que se
 * limpia antes de cargar la aplicación.
 */
async function conCarritoVacio(page: Page) {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
}

const PRECIO_ERP = 12500;
const IVA = 0.12;

function botonCarrito(page: Page) {
  return page.getByRole("button", { name: /Abrir carrito/ });
}

test.describe("catálogo", () => {
  test("la portada publica el precio de los tres productos", async ({ page }) => {
    await conCarritoVacio(page);

    await expect(
      page.getByRole("heading", { name: /No cotizamos/ }),
    ).toBeVisible();

    const lista = page.getByRole("list", { name: "Lista de precios" });
    await expect(lista.getByRole("listitem")).toHaveCount(3);
    await expect(lista.getByText(/12,500\.00/)).toBeVisible();
    await expect(lista.getByText(/4,750\.00/)).toBeVisible();
    await expect(lista.getByText(/2,300\.00/)).toBeVisible();
  });

  test("la lista de precios lleva a la ficha del producto", async ({ page }) => {
    await conCarritoVacio(page);

    await page
      .getByRole("list", { name: "Lista de precios" })
      .getByRole("link", { name: /QuetzalERP Core/ })
      .click();

    await expect(page).toHaveURL(/\/productos\/quetzalerp-core$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "QuetzalERP Core" }),
    ).toBeVisible();
    // La ficha técnica es el elemento firma del catálogo.
    await expect(page.getByText("4.2 LTS")).toBeVisible();
  });

  test("el catálogo lista los tres productos", async ({ page }) => {
    await conCarritoVacio(page);
    await page.goto("/productos");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Tres productos",
    );
    await expect(
      page.getByRole("button", { name: "Agregar al carrito" }),
    ).toHaveCount(3);
  });
});

test.describe("carrito", () => {
  test("agregar licencias actualiza la insignia y el desglose con IVA", async ({
    page,
  }) => {
    await conCarritoVacio(page);
    await page.goto("/productos/quetzalerp-core");

    // Dos licencias: el panel de compra vive en el aside, separado de las
    // tarjetas de productos relacionados que repiten el mismo botón.
    const panel = page.locator("aside");
    await panel.getByRole("button", { name: "Aumentar cantidad" }).click();
    await panel.getByRole("button", { name: "Agregar al carrito" }).click();

    await expect(botonCarrito(page)).toContainText("2");

    await page.goto("/carrito");

    const subtotal = PRECIO_ERP * 2;
    const iva = subtotal * IVA;
    const total = subtotal + iva;

    const resumen = page.getByRole("complementary");
    await expect(resumen.getByText(new RegExp(miles(subtotal)))).toBeVisible();
    await expect(resumen.getByText(new RegExp(miles(iva)))).toBeVisible();
    await expect(resumen.getByText(new RegExp(miles(total)))).toBeVisible();
  });

  test("cambiar la cantidad desde el carrito recalcula el total", async ({
    page,
  }) => {
    await conCarritoVacio(page);
    await page.goto("/productos/quetzalapp-kit");
    await page
      .locator("aside")
      .getByRole("button", { name: "Agregar al carrito" })
      .click();

    await page.goto("/carrito");
    await page
      .getByRole("button", { name: /Agregar una unidad de QuetzalApp Kit/ })
      .click();

    // 2 × Q2,300 = Q4,600 + 12% = Q5,152
    await expect(
      page.getByRole("complementary").getByText(/5,152\.00/),
    ).toBeVisible();
  });

  test("vaciar el carrito muestra el estado vacío", async ({ page }) => {
    await conCarritoVacio(page);
    await page.goto("/productos/quetzalapp-kit");
    await page
      .locator("aside")
      .getByRole("button", { name: "Agregar al carrito" })
      .click();

    await page.goto("/carrito");
    await page.getByRole("button", { name: "Vaciar carrito" }).click();

    await expect(
      page.getByRole("heading", { name: "Tu carrito está vacío" }),
    ).toBeVisible();
  });
});

test.describe("checkout", () => {
  test("el formulario vacío no deja confirmar la compra", async ({ page }) => {
    await conCarritoVacio(page);
    await page.goto("/productos/quetzalapp-kit");
    await page
      .locator("aside")
      .getByRole("button", { name: "Agregar al carrito" })
      .click();

    await page.goto("/checkout");
    await page.getByRole("button", { name: "Confirmar compra" }).click();

    await expect(page.getByText("Escribe tu nombre completo.")).toBeVisible();
    await expect(
      page.getByText("Escribe un correo electrónico válido."),
    ).toBeVisible();
    await expect(page.getByText("Selecciona un departamento.")).toBeVisible();
    // Sigue en el checkout: no avanzó a la confirmación.
    await expect(page).toHaveURL(/\/checkout$/);
  });

  test("la compra completa entrega una llave por licencia y vacía el carrito", async ({
    page,
  }) => {
    await conCarritoVacio(page);
    await page.goto("/productos/quetzalerp-core");

    const panel = page.locator("aside");
    await panel.getByRole("button", { name: "Aumentar cantidad" }).click();
    await panel.getByRole("button", { name: "Agregar al carrito" }).click();

    await page.goto("/checkout");
    await page.getByRole("button", { name: "Usar datos de prueba" }).click();
    await page.getByRole("button", { name: "Confirmar compra" }).click();

    await page.waitForURL(/\/checkout\/confirmacion$/, { timeout: 15_000 });

    await expect(
      page.getByRole("heading", { name: "¡Gracias por tu compra!" }),
    ).toBeVisible();

    // Número de orden con el formato QD-<año>-<6 caracteres>.
    await expect(page.getByText(/QD-\d{4}-[A-Z0-9]{6}/)).toBeVisible();

    // Dos licencias compradas, dos llaves entregadas.
    const llaves = page.locator("code");
    await expect(llaves).toHaveCount(2);
    await expect(llaves.first()).toHaveText(/^QUE-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);

    await expect(page.getByText(/28,000\.00/).first()).toBeVisible();

    // El carrito quedó vacío después de cobrar.
    await expect(botonCarrito(page)).not.toContainText("2");
  });
});

/** Formatea un monto como aparece en pantalla, para construir la expresión. */
function miles(monto: number) {
  return monto
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .replace(".", "\\.");
}
