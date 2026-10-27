import type { Metadata } from "next";
import Image from "next/image";
import { HandHeart, Leaf, Sprout } from "lucide-react";
import { AboutStats } from "@/components/brand-stats";
import { Reveal } from "@/components/reveal";
import { IMAGES, img } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "La historia, los valores y el impacto de CEIBA.",
};

const valores = [
  {
    icon: Sprout,
    titulo: "Raíces",
    texto: "Rescatamos técnicas textiles tradicionales y las llevamos a siluetas contemporáneas.",
  },
  {
    icon: HandHeart,
    titulo: "Comercio justo",
    texto: "Trabajamos directamente con talleres locales, con precios justos y relaciones de largo plazo.",
  },
  {
    icon: Leaf,
    titulo: "Menos, pero mejor",
    texto: "Dos colecciones al año, fibras naturales y prendas diseñadas para durar décadas.",
  },
];

const hitos = [
  { anio: "2018", texto: "Nace CEIBA en un pequeño taller de Barranco con 12 prendas." },
  { anio: "2020", texto: "Primera alianza con cooperativas textiles de Cusco y Puno." },
  { anio: "2023", texto: "Lanzamos el programa de reparación y recompra de prendas." },
  { anio: "2026", texto: "Llegamos a más de 120 ciudades en Latinoamérica y Europa." },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 md:px-6 md:pt-24">
        <Reveal>
          <p className="text-xs tracking-[0.25em] text-primary uppercase">Nuestra historia</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            Como la ceiba, crecemos desde la raíz.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            La ceiba es un árbol sagrado en muchas culturas latinoamericanas: une
            la tierra con el cielo. Así entendemos la moda — un puente entre el
            saber de nuestras artesanas y la forma en que vestimos hoy.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3 md:px-6">
        {[
          { id: IMAGES.tienda, alt: "Interior de la tienda CEIBA" },
          { id: IMAGES.vitrina, alt: "Vitrina con abrigos en tonos tierra" },
          { id: IMAGES.abrigoCuadros, alt: "Mujer caminando con abrigo a cuadros" },
        ].map((f, i) => (
          <Reveal key={f.id} delay={i * 0.1} className={i === 1 ? "md:translate-y-10" : ""}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-md">
              <Image src={img(f.id, 800)} alt={f.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <Reveal>
          <h2 className="text-4xl md:text-5xl">Lo que nos mueve</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {valores.map(({ icon: Icon, titulo, texto }, i) => (
            <Reveal key={titulo} delay={i * 0.1} className="border-t border-foreground/15 pt-6">
              <Icon className="size-7 text-primary" />
              <h3 className="mt-5 text-2xl">{titulo}</h3>
              <p className="mt-3 text-muted-foreground">{texto}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <AboutStats />

      <section className="mx-auto max-w-4xl px-4 py-24 md:px-6">
        <Reveal>
          <h2 className="text-center text-4xl md:text-5xl">Nuestro camino</h2>
        </Reveal>
        <ol className="relative mt-14 border-l border-border pl-8">
          {hitos.map((h, i) => (
            <Reveal key={h.anio} delay={i * 0.08}>
              <li className="relative pb-10 last:pb-0">
                <span className="absolute top-2 -left-[37px] size-2.5 rounded-full bg-primary ring-4 ring-background" />
                <p className="font-serif text-3xl text-primary">{h.anio}</p>
                <p className="mt-2 text-muted-foreground">{h.texto}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
