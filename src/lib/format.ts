const formatter = new Intl.NumberFormat("es-GT", {
  style: "currency",
  currency: "GTQ",
  minimumFractionDigits: 2,
});

export function quetzales(monto: number) {
  return formatter.format(monto).replace("GTQ", "Q").trim();
}
