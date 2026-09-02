export type Modalidad = "descarga" | "linea";

export type Producto = {
  slug: string;
  nombre: string;
  tagline: string;
  servicioBase: string;
  modalidad: Modalidad;
  modalidadLabel: string;
  precio: number;
  precioAntes?: number;
  unidad: string;
  destacado?: boolean;
  descripcionCorta: string;
  descripcion: string[];
  funciones: { titulo: string; detalle: string }[];
  beneficios: { titulo: string; detalle: string }[];
  especificaciones: { etiqueta: string; valor: string }[];
  /** Tres datos cortos que se imprimen en la ficha de la tarjeta de catálogo. */
  fichaRapida: { etiqueta: string; valor: string }[];
  entrega: string;
};

export const MONEDA = "GTQ";
export const IVA = 0.12;

export const productos: Producto[] = [
  {
    slug: "quetzalerp-core",
    nombre: "QuetzalERP Core",
    tagline: "El ERP modular para la PyME guatemalteca",
    servicioBase: "ERP",
    modalidad: "descarga",
    modalidadLabel: "Descarga e instalación",
    precio: 12500,
    precioAntes: 15900,
    unidad: "licencia anual · hasta 25 usuarios",
    destacado: true,
    descripcionCorta:
      "Suite ERP preconstruida con inventario, facturación FEL, compras y contabilidad lista para instalar en tu propio servidor.",
    descripcion: [
      "QuetzalERP Core empaqueta la experiencia de más de 40 implementaciones ERP de QuetzalDev en un producto instalable en menos de una hora. En lugar de un proyecto a la medida de seis meses, recibes los módulos que el 90% de las PyMEs necesita —inventario, compras, ventas, facturación electrónica FEL y contabilidad— ya integrados entre sí.",
      "El producto se distribuye como un instalador para Docker o Windows Server, con base de datos PostgreSQL incluida y un asistente de configuración inicial que carga tu catálogo de productos y tu plan de cuentas desde una hoja de cálculo. Todo el código de los módulos es abierto para tu equipo, de modo que puedes extenderlo sin depender de nosotros.",
    ],
    funciones: [
      {
        titulo: "Facturación electrónica FEL",
        detalle:
          "Certificación con proveedores autorizados por la SAT, emisión de facturas, notas de crédito y débito, y anulaciones desde la misma pantalla de ventas.",
      },
      {
        titulo: "Inventario multi-bodega",
        detalle:
          "Control de existencias por bodega y lote, costeo promedio ponderado, alertas de mínimos y transferencias con documento de respaldo.",
      },
      {
        titulo: "Compras y cuentas por pagar",
        detalle:
          "Órdenes de compra con flujo de autorización de tres niveles, recepción parcial y programación de pagos a proveedores.",
      },
      {
        titulo: "Contabilidad integrada",
        detalle:
          "Cada movimiento operativo genera su partida contable automática. Balance de saldos, estado de resultados y libros exportables a Excel.",
      },
      {
        titulo: "Tablero gerencial",
        detalle:
          "Indicadores de ventas, margen bruto, rotación de inventario y antigüedad de saldos, actualizados en tiempo real.",
      },
      {
        titulo: "Motor de extensiones",
        detalle:
          "API REST documentada y sistema de plugins para añadir módulos propios sin tocar el núcleo ni perder las actualizaciones.",
      },
    ],
    beneficios: [
      {
        titulo: "Arranca en horas, no en meses",
        detalle:
          "Un ERP a la medida toma entre 4 y 8 meses. QuetzalERP Core queda operando el mismo día de la instalación.",
      },
      {
        titulo: "Costo hasta 70% menor",
        detalle:
          "Pagas una licencia anual en vez de un proyecto de consultoría completo, con el mismo alcance funcional.",
      },
      {
        titulo: "Tus datos en tu servidor",
        detalle:
          "Al instalarse on-premise, la información contable y fiscal nunca sale de tu infraestructura.",
      },
      {
        titulo: "Cumplimiento fiscal al día",
        detalle:
          "Las actualizaciones de normativa SAT se publican como parches durante toda la vigencia de la licencia.",
      },
      {
        titulo: "Sin dependencia del proveedor",
        detalle:
          "El código de los módulos es tuyo. Tu equipo interno puede mantenerlo y extenderlo libremente.",
      },
    ],
    especificaciones: [
      { etiqueta: "Versión", valor: "4.2 LTS" },
      { etiqueta: "Formato", valor: "Instalador Docker / Windows Server" },
      { etiqueta: "Base de datos", valor: "PostgreSQL 16 (incluida)" },
      { etiqueta: "Usuarios", valor: "Hasta 25 concurrentes" },
      { etiqueta: "Licencia", valor: "Anual, renovable" },
      { etiqueta: "Soporte", valor: "Correo y chat, 8x5, en español" },
      { etiqueta: "Tamaño de descarga", valor: "1.8 GB" },
    ],
    fichaRapida: [
      { etiqueta: "Versión", valor: "4.2 LTS" },
      { etiqueta: "Usuarios", valor: "25" },
      { etiqueta: "Entrega", valor: "Inmediata" },
    ],
    entrega:
      "Recibes por correo la llave de licencia, el enlace de descarga del instalador y el acceso al portal de documentación.",
  },
  {
    slug: "tiendaquetzal-builder",
    nombre: "TiendaQuetzal Builder",
    tagline: "Tu tienda en línea publicada en un fin de semana",
    servicioBase: "Desarrollo Web",
    modalidad: "linea",
    modalidadLabel: "Consumo en línea (SaaS)",
    precio: 4750,
    unidad: "suscripción anual · 1 tienda",
    descripcionCorta:
      "Constructor de tiendas en línea con pasarela de pagos local, catálogo ilimitado y editor visual sin escribir código.",
    descripcion: [
      "TiendaQuetzal Builder es la versión producto de nuestro servicio de desarrollo web. Es una plataforma en la nube donde armas tu tienda arrastrando bloques: portada, catálogo, carrito, checkout y páginas informativas. No necesitas servidor, ni certificados, ni un desarrollador de planta.",
      "Se consume completamente en línea desde el navegador. Cada tienda incluye un subdominio propio, o puedes conectar tu dominio comprado. La plataforma corre sobre una red de distribución de contenido, por lo que tu tienda carga rápido dentro y fuera de Guatemala.",
    ],
    funciones: [
      {
        titulo: "Editor visual por bloques",
        detalle:
          "Arrastra secciones, cambia colores y tipografías, y publica los cambios en vivo con un botón. Vista previa en escritorio y móvil.",
      },
      {
        titulo: "Pagos locales e internacionales",
        detalle:
          "Integración lista con Visa/Mastercard, transferencias bancarias locales y pago contra entrega, con conciliación automática.",
      },
      {
        titulo: "Catálogo ilimitado",
        detalle:
          "Productos con variantes, imágenes, existencias, descuentos y precios por temporada. Carga masiva desde CSV.",
      },
      {
        titulo: "Gestión de pedidos y envíos",
        detalle:
          "Panel de pedidos con estados, generación de guías con couriers locales y notificaciones automáticas al cliente.",
      },
      {
        titulo: "SEO y analítica incluidas",
        detalle:
          "Metadatos editables, mapa del sitio automático, y un tablero de visitas, conversión y productos más vistos.",
      },
      {
        titulo: "Sincronización con QuetzalERP",
        detalle:
          "Conector nativo de un clic para mantener existencias y precios alineados entre la tienda y tu ERP.",
      },
    ],
    beneficios: [
      {
        titulo: "Vende en días, no en trimestres",
        detalle:
          "Un e-commerce a la medida cuesta entre Q45,000 y Q120,000 y toma meses. Aquí publicas en un fin de semana.",
      },
      {
        titulo: "Cero mantenimiento técnico",
        detalle:
          "Hospedaje, certificados SSL, respaldos y actualizaciones de seguridad están incluidos en la suscripción.",
      },
      {
        titulo: "Escala sin sorpresas",
        detalle:
          "El precio no cambia con los picos de tráfico de temporada alta ni con el número de pedidos.",
      },
      {
        titulo: "Diseñado para el mercado local",
        detalle:
          "Precios en quetzales, facturación FEL, métodos de pago y couriers guatemaltecos configurados de fábrica.",
      },
      {
        titulo: "Sin quedarte encerrado",
        detalle:
          "Exporta tu catálogo, tus clientes y tu historial de pedidos en formatos abiertos cuando quieras.",
      },
    ],
    especificaciones: [
      { etiqueta: "Modalidad", valor: "Software como servicio (SaaS)" },
      { etiqueta: "Acceso", valor: "Navegador, sin instalación" },
      { etiqueta: "Dominio", valor: "Subdominio incluido o dominio propio" },
      { etiqueta: "Productos", valor: "Ilimitados" },
      { etiqueta: "Almacenamiento", valor: "50 GB de imágenes y archivos" },
      { etiqueta: "Disponibilidad", valor: "99.9% garantizado por contrato" },
      { etiqueta: "Soporte", valor: "Chat en vivo, 8x6, en español" },
    ],
    fichaRapida: [
      { etiqueta: "Disponibilidad", valor: "99.9%" },
      { etiqueta: "Productos", valor: "Ilimitados" },
      { etiqueta: "Entrega", valor: "Instantánea" },
    ],
    entrega:
      "Tu espacio de trabajo queda activo al instante: recibes la URL de tu tienda y las credenciales de administrador por correo.",
  },
  {
    slug: "quetzalapp-kit",
    nombre: "QuetzalApp Kit",
    tagline: "El punto de partida para tu app móvil",
    servicioBase: "Desarrollo de Apps Móviles",
    modalidad: "descarga",
    modalidadLabel: "Descarga e instalación",
    precio: 2300,
    unidad: "licencia perpetua · proyectos ilimitados",
    descripcionCorta:
      "Kit de código React Native con autenticación, pagos, notificaciones y 30 pantallas listas para publicar en ambas tiendas.",
    descripcion: [
      "QuetzalApp Kit es un proyecto base de React Native que resuelve por adelantado todo lo aburrido de arrancar una app: registro e inicio de sesión, navegación, manejo de estado, pagos dentro de la app, notificaciones push, modo oscuro y los scripts de publicación para App Store y Google Play.",
      "Se entrega como repositorio descargable con licencia perpetua para proyectos ilimitados, propios o de clientes. Cada pantalla está construida con componentes documentados, de modo que un equipo pequeño puede reemplazar la marca y la lógica de negocio sin pelearse con la arquitectura.",
    ],
    funciones: [
      {
        titulo: "30 pantallas preconstruidas",
        detalle:
          "Onboarding, autenticación, perfil, listados, detalle, carrito, checkout, chat y configuración, todas navegables desde el primer arranque.",
      },
      {
        titulo: "Autenticación completa",
        detalle:
          "Correo y contraseña, Google, Apple y biometría, con recuperación de contraseña y verificación por código.",
      },
      {
        titulo: "Pagos dentro de la app",
        detalle:
          "Módulos listos para compras dentro de la aplicación y para pasarelas de tarjeta, con pantallas de estado y recibos.",
      },
      {
        titulo: "Notificaciones push",
        detalle:
          "Registro de dispositivos, segmentación por etiquetas y pantalla de preferencias de notificación para el usuario.",
      },
      {
        titulo: "Sistema de diseño temático",
        detalle:
          "Tokens de color, tipografía y espaciado en un solo archivo. Cambias la marca completa editando una paleta.",
      },
      {
        titulo: "Publicación automatizada",
        detalle:
          "Flujos de integración continua ya configurados para generar y subir compilaciones a App Store Connect y Google Play.",
      },
    ],
    beneficios: [
      {
        titulo: "Ahorra 6 a 10 semanas",
        detalle:
          "El andamiaje que normalmente consume el primer sprint y medio ya viene resuelto y probado.",
      },
      {
        titulo: "Una base de código, dos tiendas",
        detalle:
          "iOS y Android desde el mismo proyecto, con la apariencia nativa que espera cada plataforma.",
      },
      {
        titulo: "Licencia perpetua",
        detalle:
          "Pagas una vez y lo usas en todos los proyectos que quieras, incluidos los de tus clientes.",
      },
      {
        titulo: "Código legible, no una caja negra",
        detalle:
          "Arquitectura documentada en español, con guía de contribución y pruebas de ejemplo.",
      },
      {
        titulo: "Actualizaciones por 12 meses",
        detalle:
          "Recibes las nuevas versiones del kit durante un año, incluyendo compatibilidad con nuevos SDK.",
      },
    ],
    especificaciones: [
      { etiqueta: "Versión", valor: "2.6" },
      { etiqueta: "Formato", valor: "Repositorio Git + archivo ZIP" },
      { etiqueta: "Tecnología", valor: "React Native 0.76 + TypeScript" },
      { etiqueta: "Plataformas", valor: "iOS 15+ y Android 8+" },
      { etiqueta: "Licencia", valor: "Perpetua, proyectos ilimitados" },
      { etiqueta: "Actualizaciones", valor: "12 meses incluidas" },
      { etiqueta: "Tamaño de descarga", valor: "240 MB" },
    ],
    fichaRapida: [
      { etiqueta: "Versión", valor: "2.6" },
      { etiqueta: "Plataformas", valor: "iOS + Android" },
      { etiqueta: "Licencia", valor: "Perpetua" },
    ],
    entrega:
      "Recibes acceso al repositorio privado, el archivo ZIP de respaldo y la llave de licencia perpetua.",
  },
];

export function getProducto(slug: string) {
  return productos.find((p) => p.slug === slug);
}
