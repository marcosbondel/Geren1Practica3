import { cn } from "@/lib/utils";

/**
 * Marca: un paquete isométrico. La empresa vende software empaquetado, así que
 * el símbolo es literalmente la caja, dibujada con trazo fino para que lea como
 * un plano y no como el ícono de una aplicación.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-md border border-primary/30 bg-primary/8 text-primary">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M12 2.9 20.2 7.2v9.6L12 21.1 3.8 16.8V7.2L12 2.9Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M3.8 7.2 12 11.6l8.2-4.4M12 11.6v9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <path d="M7.9 5.05 16.1 9.4v3.1" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
        </svg>
      </span>
      <span className="font-heading text-[0.975rem] font-semibold tracking-[-0.03em]">
        Quetzal<span className="text-primary">Dev</span>
      </span>
    </span>
  );
}
