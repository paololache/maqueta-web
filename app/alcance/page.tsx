import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { AlcanceViewer } from "@/components/alcance-viewer";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: { absolute: "Maqueta de alcance · Sitio web de 3 secciones" },
  description:
    "Revisa la estructura estándar de tu sitio web: header, 3 secciones y footer, con diseño responsive, formulario, WhatsApp, SEO técnico y hosting incluido.",
};

export default function AlcancePage() {
  return (
    <div className="theme-neutro flex-1 bg-background text-foreground">
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <span className="font-serif text-xl">Maqueta de alcance</span>
          <a
            href="#visor"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Ver la maqueta
          </a>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 md:px-6 md:pt-24 md:pb-20">
          <Reveal immediate>
            <p className="text-xs tracking-[0.25em] text-primary uppercase">Propuesta · Sitio web</p>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] md:text-7xl">
              Así se verá tu web: <em className="text-primary">simple, rápida</em> y lista para
              recibir clientes.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.2}>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Una estructura estándar de <strong className="font-medium text-foreground">header,
              3 secciones y footer</strong>. Explora la maqueta, cambia de dispositivo y verifica que
              cada punto del alcance esté donde debe.
            </p>
          </Reveal>
          <Reveal immediate delay={0.3} className="mt-9">
            <a
              href="#visor"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-sm text-background transition-opacity hover:opacity-90"
            >
              Explorar la maqueta <ArrowDown className="size-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <AlcanceViewer />
    </div>
  );
}
