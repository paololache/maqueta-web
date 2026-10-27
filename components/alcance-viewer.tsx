"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
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

            <div
              className="mx-auto w-full transition-[max-width] duration-500 ease-out"
              style={{ maxWidth: width }}
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10">
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

                    {/* SECCIÓN 1 · INICIO */}
                    <section
                      data-sec="inicio"
                      className={`relative overflow-hidden px-5 pt-14 pb-16 @2xl:px-8 @2xl:pt-20 @2xl:pb-24 ${sectionBox(labels)}`}
                    >
                      {labels && <Chip n="1" text="Sección Inicio" />}
                      <div className="grid items-center gap-12 @2xl:grid-cols-2">
                        <div className={`transition-all duration-300 ${hl(["textos", "seo"])}`}>
                          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                            <span className="size-1.5 rounded-full bg-primary" />
                            Atención personalizada
                          </p>
                          <h1 className="mt-5 text-4xl leading-[1.05] @2xl:text-5xl @4xl:text-6xl">
                            Tu negocio, a un clic de tus{" "}
                            <em className="text-primary">próximos clientes</em>.
                          </h1>
                          <p className="mt-5 max-w-md text-muted-foreground @2xl:text-lg">
                            Una web rápida, clara y pensada para convertir visitas en conversaciones.
                            Cuéntanos qué necesitas y te respondemos hoy.
                          </p>
                        </div>

                        <div className="@2xl:order-last">
                          <div className={`flex flex-wrap gap-3 transition-all duration-300 ${hl(["contacto"])}`}>
                            <a
                              href="https://wa.me/51900000000?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n"
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
                              className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm transition-colors hover:bg-secondary"
                            >
                              Ver servicios <ArrowRight className="size-4" />
                            </button>
                          </div>
                        </div>

                        {/* Visual abstracto */}
                        <div
                          className={`relative aspect-[5/4] w-full transition-all duration-300 @2xl:col-start-2 @2xl:row-start-1 @2xl:row-span-2 ${hl(["responsive"])}`}
                        >
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-[oklch(0.62_0.14_55)] to-[oklch(0.78_0.12_80)]" />
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
                              <span className="block text-[11px] text-muted-foreground">
                                «Hola, quiero cotizar»
                              </span>
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
                      </div>
                    </section>

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
                              href="https://wa.me/51900000000?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n"
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
                        href="https://wa.me/51900000000?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n"
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
