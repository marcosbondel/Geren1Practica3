import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  className?: string;
  priority?: boolean;
};

/**
 * Ilustraciones vectoriales de cada producto. Se dibujan con los mismos tokens
 * de color del tema, de modo que responden al modo claro y oscuro sin activos
 * externos ni peticiones de red.
 */
export function ProductIllustration({ slug, className }: Props) {
  const id = `ilu-${slug}`;
  return (
    <svg
      viewBox="0 0 400 250"
      role="img"
      aria-label={`Ilustración de ${slug}`}
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <rect width="400" height="250" fill={`url(#${id}-bg)`} />

      {slug === "quetzalerp-core" && <ErpArt id={id} />}
      {slug === "tiendaquetzal-builder" && <WebArt id={id} />}
      {slug === "quetzalapp-kit" && <MobileArt id={id} />}
    </svg>
  );
}

/* ERP: tablero con barras, tarjetas de indicadores y barra lateral. */
function ErpArt({ id }: { id: string }) {
  const barras = [
    { x: 226, h: 30 },
    { x: 250, h: 52 },
    { x: 274, h: 40 },
    { x: 298, h: 68 },
    { x: 322, h: 56 },
  ];
  return (
    <g>
      <rect
        x="40"
        y="40"
        width="320"
        height="170"
        rx="12"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <rect x="40" y="40" width="72" height="170" rx="12" fill="var(--primary)" opacity="0.1" />
      <rect x="40" y="40" width="320" height="26" rx="12" fill="var(--primary)" opacity="0.12" />
      <circle cx="56" cy="53" r="4" fill="var(--primary)" />
      <circle cx="70" cy="53" r="4" fill="var(--primary)" opacity="0.4" />
      <circle cx="84" cy="53" r="4" fill="var(--primary)" opacity="0.2" />

      {[86, 106, 126, 146, 166, 186].map((y, i) => (
        <rect
          key={y}
          x="56"
          y={y}
          width={i === 1 ? 40 : 34}
          height="7"
          rx="3.5"
          fill="var(--primary)"
          opacity={i === 1 ? 0.75 : 0.28}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={128 + i * 76}
            y="82"
            width="64"
            height="42"
            rx="8"
            fill="var(--background)"
            stroke="var(--border)"
          />
          <rect
            x={138 + i * 76}
            y="93"
            width="24"
            height="6"
            rx="3"
            fill="var(--muted-foreground)"
            opacity="0.5"
          />
          <rect
            x={138 + i * 76}
            y="105"
            width={40 - i * 8}
            height="9"
            rx="4"
            fill="var(--primary)"
            opacity="0.85"
          />
        </g>
      ))}

      <rect
        x="128"
        y="136"
        width="76"
        height="58"
        rx="8"
        fill="var(--background)"
        stroke="var(--border)"
      />
      <path
        d="M140 180 L154 166 L168 172 L192 150"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="192" cy="150" r="4" fill="var(--primary)" />

      <rect
        x="214"
        y="136"
        width="132"
        height="58"
        rx="8"
        fill="var(--background)"
        stroke="var(--border)"
      />
      {barras.map((b) => (
        <rect
          key={b.x}
          x={b.x}
          y={186 - b.h}
          width="12"
          height={b.h}
          rx="3"
          fill={`url(#${id}-fill)`}
        />
      ))}
    </g>
  );
}

/* Web: ventana de navegador con vitrina de productos y carrito. */
function WebArt({ id }: { id: string }) {
  return (
    <g>
      <rect
        x="36"
        y="34"
        width="300"
        height="182"
        rx="12"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <rect x="36" y="34" width="300" height="26" rx="12" fill="var(--primary)" opacity="0.12" />
      <circle cx="52" cy="47" r="4" fill="var(--primary)" opacity="0.5" />
      <circle cx="66" cy="47" r="4" fill="var(--primary)" opacity="0.3" />
      <circle cx="80" cy="47" r="4" fill="var(--primary)" opacity="0.2" />
      <rect x="96" y="42" width="180" height="10" rx="5" fill="var(--background)" />

      <rect x="56" y="76" width="120" height="12" rx="6" fill="var(--primary)" opacity="0.8" />
      <rect x="56" y="96" width="176" height="7" rx="3.5" fill="var(--muted-foreground)" opacity="0.35" />
      <rect x="56" y="110" width="140" height="7" rx="3.5" fill="var(--muted-foreground)" opacity="0.25" />
      <rect x="56" y="130" width="72" height="22" rx="11" fill={`url(#${id}-fill)`} />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={56 + i * 90}
            y="166"
            width="76"
            height="34"
            rx="8"
            fill="var(--background)"
            stroke="var(--border)"
          />
          <rect
            x={64 + i * 90}
            y="174"
            width="20"
            height="18"
            rx="4"
            fill="var(--primary)"
            opacity="0.25"
          />
          <rect
            x={90 + i * 90}
            y="177"
            width="32"
            height="5"
            rx="2.5"
            fill="var(--muted-foreground)"
            opacity="0.4"
          />
          <rect
            x={90 + i * 90}
            y="186"
            width="20"
            height="6"
            rx="3"
            fill="var(--primary)"
            opacity="0.8"
          />
        </g>
      ))}

      <circle cx="318" cy="176" r="34" fill="var(--background)" stroke="var(--border)" />
      <circle cx="318" cy="176" r="34" fill="var(--primary)" opacity="0.08" />
      <path
        d="M304 164 h6 l5 22 h18 l4 -14 h-23"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="318" cy="192" r="2.6" fill="var(--primary)" />
      <circle cx="330" cy="192" r="2.6" fill="var(--primary)" />
    </g>
  );
}

/* Móvil: dos dispositivos con tarjetas y notificación. */
function MobileArt({ id }: { id: string }) {
  return (
    <g>
      <g opacity="0.55">
        <rect
          x="76"
          y="58"
          width="94"
          height="164"
          rx="16"
          fill="var(--card)"
          stroke="var(--border)"
        />
        <rect x="94" y="66" width="58" height="6" rx="3" fill="var(--border)" />
        <rect x="88" y="84" width="70" height="34" rx="8" fill="var(--primary)" opacity="0.22" />
        {[126, 148, 170].map((y) => (
          <rect key={y} x="88" y={y} width="70" height="14" rx="6" fill="var(--muted)" />
        ))}
      </g>

      <rect
        x="164"
        y="34"
        width="112"
        height="192"
        rx="20"
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <rect x="196" y="43" width="48" height="6" rx="3" fill="var(--border)" />

      <rect x="176" y="60" width="88" height="44" rx="10" fill={`url(#${id}-fill)`} />
      <rect x="186" y="72" width="40" height="6" rx="3" fill="var(--primary-foreground)" opacity="0.75" />
      <rect x="186" y="84" width="58" height="9" rx="4.5" fill="var(--primary-foreground)" />

      {[112, 144, 176].map((y, i) => (
        <g key={y}>
          <rect
            x="176"
            y={y}
            width="88"
            height="26"
            rx="8"
            fill="var(--background)"
            stroke="var(--border)"
          />
          <circle cx="190" cy={y + 13} r="7" fill="var(--primary)" opacity={0.7 - i * 0.18} />
          <rect
            x="204"
            y={y + 7}
            width={48 - i * 8}
            height="5"
            rx="2.5"
            fill="var(--muted-foreground)"
            opacity="0.45"
          />
          <rect
            x="204"
            y={y + 16}
            width={32 - i * 6}
            height="5"
            rx="2.5"
            fill="var(--muted-foreground)"
            opacity="0.25"
          />
        </g>
      ))}

      <g>
        <rect
          x="252"
          y="52"
          width="86"
          height="38"
          rx="10"
          fill="var(--background)"
          stroke="var(--border)"
        />
        <circle cx="270" cy="71" r="9" fill="var(--primary)" opacity="0.85" />
        <path
          d="M266.5 71 l2.6 2.6 l5 -5.6"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="286" y="63" width="40" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.5" />
        <rect x="286" y="73" width="28" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.3" />
      </g>
    </g>
  );
}
