/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  Palette as PaletteIcon,
  LayoutTemplate,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  EyeOff,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Monitor,
  PenLine,
  Search,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Scope = "responsive" | "contacto" | "seo" | "textos" | "hosting";
type Device = "mobile" | "tablet" | "desktop";
type SectionKey = "top" | "inicio" | "servicios" | "contacto" | "footer";

const scopeItems: {
  key: Scope;
  icon: LucideIcon;
  titulo: string;
  resumen: string;
  detalle: string[];
  target: SectionKey;
}[] = [
  {
    key: "responsive",
    icon: Smartphone,
    titulo: "Diseño responsive",
    resumen: "Móvil, tablet y escritorio",
    detalle: [
      "Se adapta solo a cualquier tamaño de pantalla",
      "Menú tipo hamburguesa en móvil",
      "Imágenes y textos optimizados por dispositivo",
      "Pruébalo con los botones Móvil / Tablet / Escritorio",
    ],
    target: "top",
  },
  {
    key: "contacto",
    icon: MessageCircle,
    titulo: "Formulario y WhatsApp",
    resumen: "Tus clientes te escriben en un clic",
    detalle: [
      "Formulario con nombre, contacto y mensaje",
      "Los mensajes llegan a tu correo",
      "Botón de WhatsApp con mensaje prellenado",
      "Botón flotante visible en toda la página",
    ],
    target: "contacto",
  },
  {
    key: "seo",
    icon: Search,
    titulo: "SEO técnico básico",
    resumen: "Para que Google te encuentre",
    detalle: [
      "Título y descripción para buscadores",
      "Estructura de encabezados (un solo H1)",
      "Sitemap.xml y robots.txt",
      "Etiquetas para compartir en redes (Open Graph)",
      "Texto alternativo en imágenes y carga rápida",
    ],
    target: "inicio",
  },
  {
    key: "textos",
    icon: PenLine,
    titulo: "Redacción profesional",
    resumen: "Textos listos para convencer",
    detalle: [
      "Titulares claros y orientados a contacto",
      "Textos de las 3 secciones, header y footer",
      "Tono alineado con tu marca",
      "Revisión ortográfica y de estilo",
    ],
    target: "inicio",
  },
  {
    key: "hosting",
    icon: Server,
    titulo: "Hosting, dominio y SSL",
    resumen: "Primer año incluido",
    detalle: [
      "Alojamiento web durante el primer año",
      "Dominio propio (ej. tunegocio.com)",
      "Certificado SSL: candado y https",
      "Renovación posterior según el plan vigente",
    ],
    target: "footer",
  },
];

const estructura: {
  n: string;
  titulo: string;
  texto: string;
  tags: Scope[];
}[] = [
  {
    n: "H",
    titulo: "Header",
    texto: "Logo, menú de navegación y botón de contacto. Siempre visible al hacer scroll.",
    tags: ["responsive", "textos"],
  },
  {
    n: "1",
    titulo: "Sección Inicio",
    texto: "Mensaje principal, propuesta de valor y llamada a la acción.",
    tags: ["textos", "seo", "contacto"],
  },
  {
    n: "2",
    titulo: "Sección Servicios",
    texto: "Tres bloques con lo que ofreces, redactados para vender.",
    tags: ["textos", "responsive"],
  },
  {
    n: "3",
    titulo: "Sección Contacto",
    texto: "Formulario, botón de WhatsApp y datos del negocio.",
    tags: ["contacto"],
  },
  {
    n: "F",
    titulo: "Footer",
    texto: "Enlaces, datos legales y sello de sitio seguro (SSL).",
    tags: ["hosting", "seo"],
  },
];

const confirmaciones = [
  "Identifico el header, las 3 secciones y el footer de la estructura.",
  "Entiendo que el sitio se verá bien en móvil, tablet y escritorio.",
  "Verifico el formulario de contacto y el botón de WhatsApp.",
  "Conozco lo que incluye el SEO técnico básico.",
  "Acepto que hosting, dominio y SSL están incluidos el primer año.",
];

const devices: { key: Device; label: string; icon: LucideIcon; width: number }[] = [
  { key: "mobile", label: "Móvil", icon: Smartphone, width: 390 },
  { key: "tablet", label: "Tablet", icon: Tablet, width: 768 },
  { key: "desktop", label: "Escritorio", icon: Monitor, width: 1400 },
];


type HeroKey =
  | "dividido"
  | "centrado"
  | "inmersivo"
  | "formulario"
  | "tipografico"
  | "carrusel"
  | "album"
  | "dinamico"
  | "marquesina"
  | "mosaico";

const photoHeroes: HeroKey[] = ["carrusel", "album", "marquesina", "mosaico"];
const words = ["clientes", "reservas", "ventas", "consultas", "confianza"];
const slides = [
  { t: "Tu negocio, a un clic de tus próximos clientes.", s: "Una web rápida y clara que convierte visitas en conversaciones." },
  { t: "Servicios que generan confianza desde el primer vistazo.", s: "Presenta lo que haces con textos claros y un diseño profesional." },
  { t: "Atención directa, a un mensaje de distancia.", s: "Formulario y WhatsApp siempre a la mano para tus clientes." },
];
const captions = ["Equipo", "Proceso", "Resultados", "Clientes", "Detalles"];
const rnd = (seed: number, i: number) => {
  const x = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const heroes: { key: HeroKey; label: string; desc: string }[] = [
  { key: "mosaico", label: "Mosaico", desc: "Cuadrícula de fotos y datos estilo bento. Moderno y ordenado." },
  { key: "marquesina", label: "Marquesina", desc: "Galería de fotos en movimiento continuo. Ideal para mostrar trabajos." },
  { key: "dinamico", label: "Dinámico", desc: "Palabras que cambian solas sobre un fondo animado." },
  { key: "album", label: "Álbum de fotos", desc: "Fotos tipo polaroid que puedes arrastrar. Transmite cercanía y confianza." },
  { key: "carrusel", label: "Carrusel", desc: "Diapositivas a pantalla completa que cambian solas. Usa las flechas o los puntos." },
  { key: "tipografico", label: "Tipográfico", desc: "Titular grande y cifras. Ideal para servicios profesionales." },
  { key: "formulario", label: "Con formulario", desc: "Captura datos desde el primer vistazo." },
  { key: "inmersivo", label: "Inmersivo", desc: "Fondo de color a todo ancho. Máximo impacto de marca." },
  { key: "centrado", label: "Centrado", desc: "Mensaje al centro con visual debajo. Directo y elegante." },
  { key: "dividido", label: "Dividido", desc: "Texto a la izquierda, visual a la derecha. El más versátil." },
];

const light = (h: number, primary: string, mid: string, accent: string): Record<string, string> => ({
  "--background": `oklch(0.978 0.01 ${h})`,
  "--foreground": `oklch(0.22 0.02 ${h})`,
  "--card": `oklch(0.995 0.005 ${h})`,
  "--primary": primary,
  "--primary-foreground": "oklch(0.985 0.01 90)",
  "--secondary": `oklch(0.94 0.025 ${h})`,
  "--secondary-foreground": `oklch(0.3 0.04 ${h})`,
  "--muted": `oklch(0.95 0.015 ${h})`,
  "--muted-foreground": `oklch(0.5 0.025 ${h})`,
  "--border": `oklch(0.88 0.02 ${h})`,
  "--input": `oklch(0.88 0.02 ${h})`,
  "--tpl-mid": mid,
  "--tpl-accent": accent,
});

const palettes: { key: string; label: string; swatch: [string, string]; vars: Record<string, string> }[] = [
  {
    key: "vivo",
    label: "Vivo",
    swatch: ["oklch(0.55 0.22 275)", "oklch(0.78 0.14 220)"],
    vars: {
      ...light(280, "oklch(0.55 0.22 275)", "oklch(0.62 0.21 305)", "oklch(0.78 0.14 220)"),
      "--background": "oklch(1 0 0)",
      "--card": "oklch(1 0 0)",
      "--foreground": "oklch(0.22 0.06 275)",
      "--secondary": "oklch(0.96 0.03 280)",
      "--muted": "oklch(0.965 0.02 280)",
      "--border": "oklch(0.91 0.03 280)",
    },
  },
  {
    key: "neutro",
    label: "Neutro",
    swatch: ["oklch(0.38 0.03 255)", "oklch(0.8 0.02 230)"],
    vars: {
      ...light(250, "oklch(0.38 0.03 255)", "oklch(0.52 0.03 255)", "oklch(0.8 0.02 230)"),
      "--background": "oklch(1 0 0)",
      "--card": "oklch(1 0 0)",
      "--secondary": "oklch(0.97 0.002 250)",
      "--muted": "oklch(0.97 0.002 250)",
      "--border": "oklch(0.92 0.003 250)",
    },
  },
  {
    key: "terracota",
    label: "Terracota",
    swatch: ["oklch(0.52 0.13 40)", "oklch(0.78 0.12 80)"],
    vars: light(80, "oklch(0.52 0.13 40)", "oklch(0.62 0.14 55)", "oklch(0.78 0.12 80)"),
  },
  {
    key: "oceano",
    label: "Océano",
    swatch: ["oklch(0.5 0.14 250)", "oklch(0.8 0.1 200)"],
    vars: light(240, "oklch(0.5 0.14 250)", "oklch(0.6 0.13 230)", "oklch(0.8 0.1 200)"),
  },
  {
    key: "bosque",
    label: "Bosque",
    swatch: ["oklch(0.45 0.09 155)", "oklch(0.82 0.12 120)"],
    vars: light(130, "oklch(0.45 0.09 155)", "oklch(0.58 0.11 150)", "oklch(0.82 0.12 120)"),
  },
  {
    key: "violeta",
    label: "Violeta",
    swatch: ["oklch(0.5 0.2 295)", "oklch(0.8 0.13 350)"],
    vars: light(300, "oklch(0.5 0.2 295)", "oklch(0.6 0.2 320)", "oklch(0.8 0.13 350)"),
  },
  {
    key: "noche",
    label: "Noche",
    swatch: ["oklch(0.17 0.02 270)", "oklch(0.72 0.15 190)"],
    vars: {
      "--background": "oklch(0.17 0.02 270)",
      "--foreground": "oklch(0.96 0.01 270)",
      "--card": "oklch(0.22 0.025 270)",
      "--primary": "oklch(0.72 0.15 190)",
      "--primary-foreground": "oklch(0.18 0.03 220)",
      "--secondary": "oklch(0.26 0.03 270)",
      "--secondary-foreground": "oklch(0.92 0.01 270)",
      "--muted": "oklch(0.27 0.03 270)",
      "--muted-foreground": "oklch(0.72 0.03 270)",
      "--border": "oklch(1 0 0 / 13%)",
      "--input": "oklch(1 0 0 / 16%)",
      "--tpl-mid": "oklch(0.55 0.15 230)",
      "--tpl-accent": "oklch(0.45 0.18 290)",
    },
  },
];

const scopeLabel: Record<Scope, string> = {
  responsive: "Responsive",
  contacto: "Formulario + WhatsApp",
  seo: "SEO",
  textos: "Textos",
  hosting: "Hosting + SSL",
};

export function AlcanceViewer() {
  const [active, setActive] = useState<Scope | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [labels, setLabels] = useState(true);
  const [paletteKey, setPaletteKey] = useState("vivo");
  const [hero, setHero] = useState<HeroKey>("dividido");
  const [seed, setSeed] = useState(7);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [word, setWord] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [checks, setChecks] = useState<boolean[]>(confirmaciones.map(() => false));
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const width = devices.find((d) => d.key === device)!.width;
  const confirmed = checks.filter(Boolean).length;

  const hl = (keys: Scope[]) =>
    active
      ? keys.includes(active)
        ? "ring-2 ring-primary ring-offset-4 ring-offset-background rounded-xl"
        : "opacity-30 saturate-50"
      : "";

  const goTo = (key: SectionKey) => {
    const frame = frameRef.current;
    if (!frame) return;
    if (key === "top") {
      frame.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    const el = frame.querySelector<HTMLElement>(`[data-sec="${key}"]`);
    if (!el) return;
    frame.scrollTo({
      top: key === "footer" ? frame.scrollHeight : Math.max(el.offsetTop - 64, 0),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const pick = (key: Scope) => {
    const next = active === key ? null : key;
    setActive(next);
    if (next) goTo(scopeItems.find((s) => s.key === next)!.target);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };


  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => {
        if (hero === "carrusel" && !paused) setSlide((v) => (v + 1) % slides.length);
        if (hero === "dinamico") setWord((v) => (v + 1) % words.length);
      },
      hero === "dinamico" ? 2200 : 5000,
    );
    return () => clearInterval(id);
  }, [hero, paused, reduce, slide]);

  const waText = [
    "Hola, vengo desde la maqueta web y quiero mi sitio con esta configuración:",
    `• Paleta de colores: ${palettes.find((pl) => pl.key === paletteKey)!.label}`,
    `• Tipo de hero (portada): ${heroes.find((h) => h.key === hero)!.label}`,
    `• Estructura: header, 3 secciones (Inicio, Servicios, Contacto) y footer`,
    `• Alcance validado: ${confirmed}/${confirmaciones.length} puntos`,
    "¿Me pueden enviar una propuesta?",
  ].join("\n");
  const WA = `https://wa.me/51940733418?text=${encodeURIComponent(waText)}`;

  const renderHero = () => {
    const dark = hero === "inmersivo";
    const center = hero === "centrado";
    const heroLabel = heroes.find((h) => h.key === hero)!.label;

    const badge = (
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
          dark ? "bg-white/15 text-white" : "bg-secondary text-secondary-foreground"
        }`}
      >
        <span className={`size-1.5 rounded-full ${dark ? "bg-white" : "bg-primary"}`} />
        Atención personalizada
      </p>
    );

    const titleSize =
      hero === "tipografico"
        ? "text-5xl @2xl:text-6xl @4xl:text-8xl"
        : "text-4xl @2xl:text-5xl @4xl:text-6xl";

    const texto = (
      <div className={`transition-all duration-300 ${hl(["textos", "seo"])}`}>
        {badge}
        <h1 className={`mt-5 leading-[1.05] ${titleSize} ${dark ? "text-white" : ""}`}>
          Tu negocio, a un clic de tus{" "}
          <em className={dark ? "text-white/75" : "text-primary"}>próximos clientes</em>.
        </h1>
        <p
          className={`mt-5 max-w-md @2xl:text-lg ${center ? "mx-auto" : ""} ${
            dark ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          Una web rápida, clara y pensada para convertir visitas en conversaciones. Cuéntanos qué
          necesitas y te respondemos hoy.
        </p>
      </div>
    );

    const ctas = (
      <div
        className={`mt-8 flex flex-wrap gap-3 transition-all duration-300 ${center ? "justify-center" : ""} ${hl(["contacto"])}`}
      >
        <a
          href={WA}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25d366] px-6 text-sm font-medium text-[#04290f] transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="size-4" />
          Escríbenos por WhatsApp
        </a>
        <button
          type="button"
          onClick={() => goTo("servicios")}
          className={`inline-flex h-12 items-center gap-2 rounded-full border px-6 text-sm transition-colors ${
            dark ? "border-white/40 text-white hover:bg-white/10" : "border-foreground/20 hover:bg-secondary"
          }`}
        >
          Ver servicios <ArrowRight className="size-4" />
        </button>
      </div>
    );

    const visual = (ratio: string) => (
      <div className={`relative w-full transition-all duration-300 ${ratio} ${hl(["responsive"])}`}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-[var(--tpl-mid)] to-[var(--tpl-accent)]" />
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,white/25,transparent_55%)]" />
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] left-[8%] w-[62%] rounded-2xl bg-card/95 p-4 shadow-xl"
        >
          <div className="h-2 w-1/3 rounded bg-primary/70" />
          <div className="mt-3 h-2 w-full rounded bg-muted" />
          <div className="mt-2 h-2 w-4/5 rounded bg-muted" />
          <div className="mt-4 h-8 w-24 rounded-full bg-foreground" />
        </motion.div>
        <motion.div
          animate={reduce ? undefined : { y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute right-[6%] bottom-[10%] flex items-center gap-3 rounded-2xl bg-card/95 p-3 pr-5 shadow-xl"
        >
          <span className="grid size-10 place-items-center rounded-full bg-[#25d366] text-[#04290f]">
            <MessageCircle className="size-5" />
          </span>
          <span>
            <span className="block text-xs font-medium">Nuevo mensaje</span>
            <span className="block text-[11px] text-muted-foreground">«Hola, quiero cotizar»</span>
          </span>
        </motion.div>
        <motion.div
          animate={reduce ? undefined : { rotate: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] right-[8%] grid size-14 place-items-center rounded-2xl bg-foreground text-background shadow-xl"
        >
          <Zap className="size-6" />
        </motion.div>
      </div>
    );

    const ph = (i: number, w: number, h: number) =>
      `https://picsum.photos/seed/m${seed}-${i}/${w}/${h}`;

    let body: React.ReactNode;
    if (hero === "carrusel") {
      body = (
        <div
          className="relative h-[460px] overflow-hidden @2xl:h-[580px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence>
            <motion.img
              key={`${seed}-${slide}`}
              src={ph(slide, 1400, 800)}
              alt="Foto de ejemplo"
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-5 pb-16 text-white @2xl:p-8 @2xl:pb-20">
            <div className={`max-w-2xl transition-all duration-300 ${hl(["textos", "seo"])}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45 }}
                >
                  <h1 className="text-3xl leading-[1.08] @2xl:text-5xl @4xl:text-6xl">{slides[slide].t}</h1>
                  <p className="mt-3 max-w-lg text-white/80 @2xl:text-lg">{slides[slide].s}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className={`transition-all duration-300 ${hl(["contacto"])}`}>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-[#25d366] px-6 text-sm font-medium text-[#04290f] transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" />
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-5 flex items-center justify-between px-5 @2xl:px-8">
            <div className="flex gap-2" role="tablist" aria-label="Diapositivas">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={slide === i}
                  aria-label={`Diapositiva ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className="relative h-1.5 w-10 overflow-hidden rounded-full bg-white/35"
                >
                  {slide === i && (
                    <motion.span
                      key={`${paused}-${slide}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused || reduce ? 0 : 5, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-white"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => setSlide((v) => (v - 1 + slides.length) % slides.length)}
                className="grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => setSlide((v) => (v + 1) % slides.length)}
                className="grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      );
    } else if (hero === "album") {
      const spots = [
        { left: "4%", top: "6%", w: "44%" },
        { left: "46%", top: "2%", w: "40%" },
        { left: "20%", top: "34%", w: "46%" },
        { left: "56%", top: "42%", w: "38%" },
        { left: "6%", top: "62%", w: "38%" },
      ];
      body = (
        <div className="grid items-center gap-12 @2xl:grid-cols-2">
          <div>
            {texto}
            {ctas}
            <p className="mt-4 text-xs text-muted-foreground">Arrastra las fotos y pulsa «Mezclar imágenes».</p>
          </div>
          <div className={`relative mx-auto aspect-square w-full max-w-md transition-all duration-300 @2xl:max-w-none ${hl(["responsive"])}`}>
            {spots.map((sp, i) => (
              <motion.figure
                key={`${seed}-${i}`}
                drag
                dragMomentum={false}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: (rnd(seed, i) - 0.5) * 22 }}
                whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
                whileDrag={{ scale: 1.08, zIndex: 40, cursor: "grabbing" }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.08 }}
                className="absolute cursor-grab bg-white p-2 pb-7 shadow-xl shadow-black/20"
                style={{ left: sp.left, top: sp.top, width: sp.w }}
              >
                <img
                  src={ph(i + 10, 400, 400)}
                  alt={`Foto de ejemplo: ${captions[i]}`}
                  draggable={false}
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-1.5 text-center font-serif text-[11px] text-neutral-600">
                  {captions[i]}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      );
    } else if (hero === "dinamico") {
      body = (
        <div className="relative text-center">
          <motion.div
            aria-hidden
            animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-16 -left-10 size-64 rounded-full bg-primary/30 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-10 bottom-0 size-72 rounded-full bg-[var(--tpl-accent)]/40 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <div className={`transition-all duration-300 ${hl(["textos", "seo"])}`}>
              {badge}
              <h1 className="mt-5 text-4xl leading-[1.05] @2xl:text-6xl @4xl:text-7xl">
                Tu negocio, listo para conseguir más
                <span className="mt-1 block h-[1.15em] overflow-hidden text-primary italic">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={word}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="block"
                    >
                      {words[word]}.
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-md text-muted-foreground @2xl:text-lg">
                Una web rápida, clara y pensada para convertir visitas en conversaciones.
              </p>
            </div>
            {ctas}
          </div>
        </div>
      );
    } else if (hero === "marquesina") {
      const row = (offset: number, dir: 1 | -1) => (
        <div className="overflow-hidden">
          <motion.div
            animate={reduce ? undefined : { x: dir === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-4"
          >
            {[0, 1].flatMap((k) =>
              [0, 1, 2, 3, 4, 5].map((i) => (
                <img
                  key={`${k}-${i}`}
                  src={ph(offset + i, 360, 240)}
                  alt="Foto de ejemplo"
                  draggable={false}
                  className="h-28 w-44 shrink-0 rounded-2xl object-cover @2xl:h-36 @2xl:w-56"
                />
              )),
            )}
          </motion.div>
        </div>
      );
      body = (
        <div className="text-center">
          <div className="mx-auto max-w-2xl">{texto}</div>
          {ctas}
          <div className={`-mx-5 mt-12 space-y-4 transition-all duration-300 @2xl:-mx-8 ${hl(["responsive"])}`}>
            {row(20, 1)}
            {row(40, -1)}
          </div>
        </div>
      );
    } else if (hero === "mosaico") {
      const tile = "overflow-hidden rounded-2xl";
      body = (
        <div>
          <div className="max-w-2xl">
            {texto}
            {ctas}
          </div>
          <div
            className={`mt-12 grid auto-rows-[120px] grid-flow-dense grid-cols-2 gap-3 transition-all duration-300 @2xl:auto-rows-[150px] @2xl:grid-cols-4 ${hl(["responsive"])}`}
          >
            <img src={ph(30, 500, 600)} alt="Foto de ejemplo" className={`${tile} size-full object-cover row-span-2`} />
            <img src={ph(31, 800, 300)} alt="Foto de ejemplo" className={`${tile} size-full object-cover col-span-1 @2xl:col-span-2`} />
            <div className={`${tile} flex flex-col justify-between bg-primary p-4 text-primary-foreground`}>
              <Zap className="size-5" />
              <div>
                <p className="font-serif text-3xl">24 h</p>
                <p className="text-xs opacity-80">respuesta (ejemplo)</p>
              </div>
            </div>
            <img src={ph(32, 400, 300)} alt="Foto de ejemplo" className={`${tile} size-full object-cover`} />
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className={`${tile} flex flex-col justify-between bg-[#25d366] p-4 text-[#04290f] transition-transform hover:-translate-y-0.5`}
            >
              <MessageCircle className="size-5" />
              <p className="text-sm font-medium">Escríbenos por WhatsApp</p>
            </a>
            <img src={ph(33, 400, 300)} alt="Foto de ejemplo" className={`${tile} size-full object-cover`} />
          </div>
        </div>
      );
    } else if (hero === "centrado") {
      body = (
        <div className="text-center">
          <div className="mx-auto max-w-2xl">{texto}</div>
          {ctas}
          <div className="mx-auto mt-12 max-w-3xl">{visual("aspect-[16/9]")}</div>
        </div>
      );
    } else if (hero === "inmersivo") {
      body = (
        <div className="grid items-center gap-10 @2xl:grid-cols-[1.3fr_1fr]">
          <div>
            {texto}
            {ctas}
          </div>
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden rounded-3xl border border-white/25 bg-white/10 p-6 text-white backdrop-blur-md @2xl:block"
          >
            <p className="text-sm text-white/70">Respuesta promedio</p>
            <p className="mt-1 font-serif text-5xl">&lt; 24 h</p>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/15 p-3">
              <span className="grid size-10 place-items-center rounded-full bg-[#25d366] text-[#04290f]">
                <MessageCircle className="size-5" />
              </span>
              <span className="text-xs">«Hola, quiero cotizar»</span>
            </div>
          </motion.div>
        </div>
      );
    } else if (hero === "formulario") {
      body = (
        <div className="grid items-center gap-10 @2xl:grid-cols-2">
          <div>
            {texto}
            {ctas}
          </div>
          <div
            className={`rounded-2xl border border-border bg-card p-5 shadow-xl shadow-primary/10 transition-all duration-300 @2xl:p-7 ${hl(["contacto"])}`}
          >
            <p className="font-serif text-2xl">Solicita tu cotización</p>
            <p className="mt-1 text-sm text-muted-foreground">Te respondemos en menos de 24 horas.</p>
            <div className="mt-5 space-y-3">
              <input
                aria-label="Nombre"
                placeholder="Tu nombre"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <input
                aria-label="Teléfono"
                placeholder="Tu teléfono"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="button"
                onClick={() => goTo("contacto")}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                Quiero que me contacten <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      );
    } else if (hero === "tipografico") {
      body = (
        <div>
          <div className="max-w-4xl">
            {texto}
            {ctas}
          </div>
          <div className="mt-14 grid gap-6 border-t border-border pt-8 @xl:grid-cols-3">
            {[
              ["+120", "proyectos entregados"],
              ["24 h", "tiempo de respuesta"],
              ["98%", "clientes satisfechos"],
            ].map(([n, t]) => (
              <div key={t}>
                <p className="font-serif text-5xl text-primary">{n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t} <span className="opacity-60">(ejemplo)</span></p>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      body = (
        <div className="grid items-center gap-12 @2xl:grid-cols-2">
          <div>
            {texto}
            {ctas}
          </div>
          {visual("aspect-[5/4]")}
        </div>
      );
    }

    return (
      <section
        data-sec="inicio"
        className={`relative overflow-hidden ${
          hero === "carrusel" ? "" : "px-5 pt-14 pb-16 @2xl:px-8 @2xl:pt-20 @2xl:pb-24"
        } ${
          dark ? "bg-gradient-to-br from-primary via-[var(--tpl-mid)] to-[var(--tpl-accent)] text-white @2xl:py-28" : ""
        } ${sectionBox(labels)}`}
      >
        {labels && <Chip n="1" text={`Sección Inicio · ${heroLabel}`} className="top-5 left-2" />}
        {body}
      </section>
    );
  };

  const sectionBox = (on: boolean) =>
    on ? "outline-2 -outline-offset-2 outline-dashed outline-primary/50" : "";

  return (
    <>
      <section id="visor" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* Panel de alcance */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <p className="text-xs tracking-[0.25em] text-primary uppercase">Qué incluye</p>
            <h2 className="mt-2 text-3xl">Alcance del proyecto</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Toca cada punto y resaltamos dónde se ve en la maqueta.
            </p>

            <ul className="mt-5 space-y-2">
              {scopeItems.map((s, i) => {
                const on = active === s.key;
                const Icon = s.icon;
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      onClick={() => pick(s.key)}
                      aria-expanded={on}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${
                        on
                          ? "border-primary bg-card shadow-lg shadow-primary/10"
                          : "border-border bg-card/60 hover:border-primary/40 hover:bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid size-10 shrink-0 place-items-center rounded-lg transition-colors ${
                            on ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                          }`}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">
                            <span className="mr-1.5 text-muted-foreground">0{i + 1}</span>
                            {s.titulo}
                          </span>
                          <span className="block text-xs text-muted-foreground">{s.resumen}</span>
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-4 space-y-2 border-t border-border pt-4">
                              {s.detalle.map((d) => (
                                <li key={d} className="flex gap-2 text-sm text-foreground/80">
                                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                                  {d}
                                </li>
                              ))}
                            </ul>

                            {s.key === "seo" && (
                              <div className="mt-4 rounded-lg border border-border bg-background p-3">
                                <p className="text-[11px] text-muted-foreground">
                                  tunegocio.com › inicio
                                </p>
                                <p className="mt-0.5 text-[15px] leading-tight text-[#1a0dab]">
                                  Tu Negocio | Servicios profesionales en tu ciudad
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  Soluciones claras, atención directa y resultados medibles. Escríbenos
                                  hoy y recibe una propuesta sin costo.
                                </p>
                                <p className="mt-2 text-[11px] text-muted-foreground italic">
                                  Así se verá tu resultado en Google. Sienta las bases técnicas; no
                                  garantiza una posición específica.
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Visor */}
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div
                role="group"
                aria-label="Dispositivo"
                className="inline-flex rounded-full border border-border bg-card p-1"
              >
                {devices.map((d) => {
                  const Icon = d.icon;
                  const on = device === d.key;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => {
                        setDevice(d.key);
                        setMenuOpen(false);
                      }}
                      aria-pressed={on}
                      className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm transition-colors ${
                        on
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span className="hidden sm:inline">{d.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setLabels((v) => !v)}
                aria-pressed={labels}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm transition-colors hover:border-primary/50"
              >
                {labels ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                Etiquetas de sección
              </button>
            </div>


            <div className="mb-4 grid gap-4 rounded-2xl border border-border bg-card/70 p-4 md:grid-cols-[auto_1fr] md:items-start">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  <PaletteIcon className="size-4" /> Paleta de colores
                </p>
                <div className="flex gap-2" role="group" aria-label="Paleta de colores">
                  {palettes.map((pl) => {
                    const on = paletteKey === pl.key;
                    return (
                      <button
                        key={pl.key}
                        type="button"
                        title={pl.label}
                        aria-label={pl.label}
                        aria-pressed={on}
                        onClick={() => setPaletteKey(pl.key)}
                        className={`relative size-10 rounded-full border-2 transition-all hover:scale-110 ${
                          on ? "border-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background" : "border-transparent"
                        }`}
                        style={{ background: `linear-gradient(135deg, ${pl.swatch[0]} 50%, ${pl.swatch[1]} 50%)` }}
                      />
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {palettes.find((pl) => pl.key === paletteKey)!.label}
                </p>
              </div>
              <div className="min-w-0">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  <LayoutTemplate className="size-4" /> Tipo de hero (portada)
                </p>
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Tipo de hero">
                  {heroes.map((h) => (
                    <button
                      key={h.key}
                      type="button"
                      aria-pressed={hero === h.key}
                      onClick={() => {
                        setHero(h.key);
                        goTo("top");
                      }}
                      className={`h-9 shrink-0 rounded-full border px-4 text-sm transition-colors ${
                        hero === h.key
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <p className="text-xs text-muted-foreground">
                    {heroes.find((h) => h.key === hero)!.desc}
                  </p>
                  {photoHeroes.includes(hero) && (
                    <button
                      type="button"
                      onClick={() => setSeed(Math.floor(Math.random() * 100000))}
                      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-primary/40 px-3 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Shuffle className="size-3.5" /> Mezclar imágenes
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div
              className="mx-auto w-full transition-[max-width] duration-500 ease-out"
              style={{ maxWidth: width }}
            >
              <div
                style={palettes.find((pl) => pl.key === paletteKey)!.vars as CSSProperties}
                className="overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl shadow-foreground/10 transition-colors duration-500"
              >
                {/* Barra de navegador */}
                <div className="flex items-center gap-3 border-b border-border bg-secondary/70 px-4 py-2.5">
                  <div className="hidden gap-1.5 sm:flex">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div
                    className={`mx-auto flex min-w-0 max-w-sm flex-1 items-center gap-2 rounded-full bg-background px-3 py-1.5 text-xs transition-all ${hl(["hosting"])}`}
                  >
                    <Lock className="size-3 shrink-0 text-emerald-600" />
                    <span className="truncate">
                      <span className="text-emerald-700">https://</span>tunegocio.com
                    </span>
                  </div>
                  <span className="w-10 shrink-0 text-right text-[10px] text-muted-foreground tabular-nums">
                    {device === "desktop" ? "100%" : `${width}px`}
                  </span>
                </div>

                {/* Pantalla */}
                <div
                  ref={frameRef}
                  className="@container h-[min(78vh,800px)] overflow-y-auto overscroll-contain bg-background"
                >
                  <div className="relative">
                    {/* HEADER */}
                    <header
                      data-sec="header"
                      className={`sticky top-0 z-30 border-b border-border bg-background ${sectionBox(labels)}`}
                    >
                      {labels && <Chip n="H" text="Header" className="-bottom-3 left-3" />}
                      <div className={`flex h-16 items-center justify-between px-5 transition-all duration-300 @2xl:px-8 ${hl(["responsive"])}`}>
                        <button
                          type="button"
                          onClick={() => goTo("top")}
                          className="flex items-center gap-2 font-serif text-xl"
                        >
                          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                            <Sparkles className="size-4" />
                          </span>
                          Tu Marca
                        </button>

                        <nav className="hidden items-center gap-7 text-sm @2xl:flex">
                          <button type="button" onClick={() => goTo("inicio")} className="hover:text-primary">
                            Inicio
                          </button>
                          <button type="button" onClick={() => goTo("servicios")} className="hover:text-primary">
                            Servicios
                          </button>
                          <button type="button" onClick={() => goTo("contacto")} className="hover:text-primary">
                            Contacto
                          </button>
                          <button
                            type="button"
                            onClick={() => goTo("contacto")}
                            className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-background transition-opacity hover:opacity-90"
                          >
                            Cotizar
                          </button>
                        </nav>

                        <button
                          type="button"
                          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                          aria-expanded={menuOpen}
                          onClick={() => setMenuOpen((v) => !v)}
                          className="grid size-10 place-items-center rounded-lg border border-border @2xl:hidden"
                        >
                          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                      </div>

                      <AnimatePresence>
                        {menuOpen && (
                          <motion.nav
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-border @2xl:hidden"
                          >
                            <div className="flex flex-col px-5 py-3 text-sm">
                              {(
                                [
                                  ["inicio", "Inicio"],
                                  ["servicios", "Servicios"],
                                  ["contacto", "Contacto"],
                                ] as const
                              ).map(([k, t]) => (
                                <button
                                  key={k}
                                  type="button"
                                  onClick={() => {
                                    setMenuOpen(false);
                                    goTo(k);
                                  }}
                                  className="py-3 text-left"
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </motion.nav>
                        )}
                      </AnimatePresence>
                    </header>

                    {renderHero()}


                    {/* SECCIÓN 2 · SERVICIOS */}
                    <section
                      data-sec="servicios"
                      className={`relative bg-secondary/50 px-5 py-16 @2xl:px-8 @2xl:py-24 ${sectionBox(labels)}`}
                    >
                      {labels && <Chip n="2" text="Sección Servicios" />}
                      <div className={`transition-all duration-300 ${hl(["textos"])}`}>
                        <p className="text-xs tracking-[0.25em] text-primary uppercase">Servicios</p>
                        <h2 className="mt-3 max-w-xl text-3xl @2xl:text-4xl">
                          Todo lo que necesitas, explicado sin rodeos
                        </h2>
                      </div>
                      <div
                        className={`mt-10 grid gap-4 transition-all duration-300 @2xl:grid-cols-3 ${hl(["responsive"])}`}
                      >
                        {[
                          {
                            icon: Search,
                            t: "Diagnóstico inicial",
                            d: "Conocemos tu negocio y definimos el mejor camino para atraer clientes.",
                          },
                          {
                            icon: Sparkles,
                            t: "Servicio principal",
                            d: "La solución que más valoran tus clientes, con un proceso simple y transparente.",
                          },
                          {
                            icon: ShieldCheck,
                            t: "Acompañamiento",
                            d: "Soporte cercano para resolver dudas y mantener todo funcionando.",
                          },
                        ].map(({ icon: Icon, t, d }, i) => (
                          <motion.article
                            key={t}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, root: frameRef, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                          >
                            <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <Icon className="size-6" />
                            </span>
                            <h3 className="mt-5 text-2xl">{t}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                          </motion.article>
                        ))}
                      </div>
                    </section>

                    {/* SECCIÓN 3 · CONTACTO */}
                    <section
                      data-sec="contacto"
                      className={`relative px-5 py-16 @2xl:px-8 @2xl:py-24 ${sectionBox(labels)}`}
                    >
                      {labels && <Chip n="3" text="Sección Contacto" />}
                      <div className="grid gap-10 @2xl:grid-cols-[1fr_1.1fr]">
                        <div className={`transition-all duration-300 ${hl(["textos"])}`}>
                          <p className="text-xs tracking-[0.25em] text-primary uppercase">Contacto</p>
                          <h2 className="mt-3 text-3xl @2xl:text-4xl">Hablemos de tu proyecto</h2>
                          <p className="mt-4 text-muted-foreground">
                            Déjanos tus datos y te contactamos en menos de 24 horas, o escríbenos
                            directo por WhatsApp.
                          </p>
                          <div className={`mt-6 w-fit transition-all duration-300 ${hl(["contacto"])}`}>
                            <a
                              href={WA}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25d366] px-6 text-sm font-medium text-[#04290f] transition-transform hover:-translate-y-0.5"
                            >
                              <MessageCircle className="size-4" />
                              Abrir WhatsApp
                            </a>
                          </div>
                        </div>

                        <form
                          onSubmit={onSubmit}
                          className={`rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 @2xl:p-7 ${hl(["contacto"])}`}
                        >
                          {sent ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="py-8 text-center"
                            >
                              <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                                <Check className="size-7" />
                              </span>
                              <h3 className="mt-4 text-2xl">¡Mensaje enviado!</h3>
                              <p className="mt-2 text-sm text-muted-foreground">
                                En la web final este mensaje llega directo a tu correo.
                              </p>
                              <button
                                type="button"
                                onClick={() => setSent(false)}
                                className="mt-5 text-sm text-primary underline-offset-4 hover:underline"
                              >
                                Probar de nuevo
                              </button>
                            </motion.div>
                          ) : (
                            <div className="space-y-4">
                              <div className="grid gap-4 @lg:grid-cols-2">
                                <Field id="f-nombre" label="Nombre" placeholder="Tu nombre" />
                                <Field
                                  id="f-contacto"
                                  label="Correo o teléfono"
                                  placeholder="tucorreo@ejemplo.com"
                                />
                              </div>
                              <div>
                                <label htmlFor="f-msg" className="mb-1.5 block text-xs font-medium">
                                  Mensaje
                                </label>
                                <textarea
                                  id="f-msg"
                                  required
                                  rows={4}
                                  placeholder="Cuéntanos cómo podemos ayudarte"
                                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
                                />
                              </div>
                              <button
                                type="submit"
                                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm text-background transition-opacity hover:opacity-90"
                              >
                                <Send className="size-4" /> Enviar mensaje
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    </section>

                    {/* FOOTER */}
                    <footer
                      data-sec="footer"
                      className={`relative bg-foreground px-5 py-12 text-background @2xl:px-8 ${sectionBox(labels)}`}
                    >
                      {labels && <Chip n="F" text="Footer" />}
                      <div className="flex flex-col gap-8 @2xl:flex-row @2xl:items-end @2xl:justify-between">
                        <div className={`transition-all duration-300 ${hl(["seo", "textos"])}`}>
                          <p className="font-serif text-2xl">Tu Marca</p>
                          <p className="mt-2 max-w-xs text-sm text-background/60">
                            Soluciones claras para negocios que quieren crecer.
                          </p>
                          <p className="mt-4 flex items-center gap-2 text-sm text-background/70">
                            <Mail className="size-4" /> hola@tunegocio.com
                          </p>
                        </div>
                        <div className={`transition-all duration-300 ${hl(["hosting"])}`}>
                          <span className="inline-flex items-center gap-2 rounded-full border border-background/20 px-4 py-2 text-xs">
                            <ShieldCheck className="size-4 text-emerald-400" />
                            Sitio seguro · SSL activo
                          </span>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-col gap-2 border-t border-background/15 pt-6 text-xs text-background/50 @lg:flex-row @lg:justify-between">
                        <span>© 2026 Tu Marca. Todos los derechos reservados.</span>
                        <span>Política de privacidad · Términos</span>
                      </div>
                    </footer>

                    {/* WhatsApp flotante */}
                    <div className="pointer-events-none sticky bottom-4 z-40 h-0">
                      <a
                        href={WA}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Escribir por WhatsApp"
                        className={`pointer-events-auto absolute right-4 bottom-0 grid size-14 place-items-center rounded-full bg-[#25d366] text-[#04290f] shadow-xl shadow-black/20 transition-all duration-300 hover:scale-110 ${hl(["contacto"])}`}
                      >
                        <MessageCircle className="size-7" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {active && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Resaltando:{" "}
                <strong className="font-medium text-primary">{scopeLabel[active]}</strong> ·{" "}
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  quitar resaltado
                </button>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Estructura */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <p className="text-xs tracking-[0.25em] text-primary uppercase">Estructura</p>
          <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">
            3 secciones, un header y un footer. Nada más, nada menos.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {estructura.map((e, i) => (
              <motion.div
                key={e.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-5"
              >
                <span className="grid size-10 place-items-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
                  {e.n}
                </span>
                <h3 className="mt-4 text-2xl">{e.titulo}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{e.texto}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground"
                    >
                      {scopeLabel[t]}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Confirmación */}
      <section className="mx-auto max-w-4xl px-4 py-20 md:px-6">
        <p className="text-xs tracking-[0.25em] text-primary uppercase">Validación</p>
        <h2 className="mt-3 text-4xl md:text-5xl">¿Todo está claro?</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Esta es una maqueta estándar. El desarrollo se ajustará a esta estructura y al alcance
          acotado; cualquier sección o función adicional se cotiza por separado.
        </p>

        <ul className="mt-8 space-y-3">
          {confirmaciones.map((c, i) => (
            <li key={c}>
              <label
                className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                  checks[i] ? "border-primary bg-card" : "border-border bg-card/60 hover:border-primary/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checks[i]}
                  onChange={() => setChecks((p) => p.map((v, j) => (j === i ? !v : v)))}
                  className="peer sr-only"
                />
                <span
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50 ${
                    checks[i] ? "border-primary bg-primary text-primary-foreground" : "border-input"
                  }`}
                >
                  {checks[i] && <Check className="size-4" />}
                </span>
                <span className="text-sm md:text-base">{c}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${(confirmed / confirmaciones.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-sm tabular-nums text-muted-foreground">
            {confirmed}/{confirmaciones.length}
          </span>
        </div>
        {confirmed === confirmaciones.length && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-primary"
          >
            <Check className="size-4" /> Alcance validado. Puedes avisarnos para iniciar.
          </motion.p>
        )}
      </section>
    </>
  );
}

function Chip({ n, text, className = "top-5 left-2" }: { n: string; text: string; className?: string }) {
  return (
    <span className={`pointer-events-none absolute ${className} z-20 inline-flex items-center gap-1.5 rounded-full bg-primary py-0.5 pr-3 pl-0.5 text-[11px] font-medium text-primary-foreground shadow-md`}>
      <span className="grid size-5 place-items-center rounded-full bg-background/90 text-[10px] text-primary">
        {n}
      </span>
      {text}
    </span>
  );
}

function Field({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium">
        {label}
      </label>
      <input
        id={id}
        required
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}
