import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
          <path
            d="M12 3.2 4.6 7.3v9.4L12 20.8l7.4-4.1V7.3L12 3.2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M8.6 13.4 12 15.4l3.4-2v-3.9L12 7.6 8.6 9.5v3.9Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-base font-semibold tracking-tight">
        Quetzal<span className="text-primary">Dev</span>
      </span>
    </span>
  );
}
