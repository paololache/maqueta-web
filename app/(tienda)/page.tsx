import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, RefreshCcw, Truck } from "lucide-react";
import { HomeStats } from "@/components/brand-stats";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { IMAGES, img, productos } from "@/lib/data";

const colecciones = [
  { titulo: "Mujer", texto: "Siluetas fluidas y tejidos nobles", imagen: IMAGES.abrigoAzul },
  { titulo: "Hombre", texto: "Esenciales con carácter urbano", imagen: IMAGES.chaquetaUrbana },
  { titulo: "Tejidos", texto: "Alpaca y algodón hechos a mano", imagen: IMAGES.tejidos },
];

const beneficios = [
  { icon: Truck, titulo: "Envío gratis", texto: "En compras desde S/ 250" },
  { icon: RefreshCcw, titulo: "Cambios sin costo", texto: "Hasta 30 días después" },
  { icon: Leaf, titulo: "Fibras naturales", texto: "Pima, alpaca y lino" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-16 md:grid-cols-12 md:px-6 md:pt-16 md:pb-24">
        <div className="flex flex-col justify-center md:col-span-6">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-primary uppercase">
              Colección Otoño — Invierno 2026
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-5xl leading-[1.02] md:text-7xl">
              Ropa hecha <em className="text-primary">con raíces</em>, pensada para durar.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
              Prendas atemporales tejidas por talleres latinoamericanos. Menos
              temporadas, más historias que contar.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/coleccion"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-foreground px-6 text-sm text-background transition-opacity hover:opacity-90"
            >
              Ver la colección <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/nosotros"
              className="inline-flex h-12 items-center rounded-md border border-foreground/20 px-6 text-sm transition-colors hover:bg-secondary"
            >
              Nuestra historia
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image
              src={img(IMAGES.hero, 1200)}
              alt="Modelo con abrigo color vino de la colección CEIBA"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 rounded-md bg-card px-5 py-4 shadow-xl md:-left-8">
            <p className="text-xs text-muted-foreground">Abrigo Vino de alpaca</p>
            <p className="font-serif text-2xl">S/ 589</p>
          </div>
        </Reveal>
      </section>

      {/* Beneficios */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 md:px-6">
          {beneficios.map(({ icon: Icon, titulo, texto }) => (
            <div key={titulo} className="flex items-center gap-4">
              <Icon className="size-6 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">{titulo}</p>
                <p className="text-xs text-muted-foreground">{texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Colecciones */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl">Explora por colección</h2>
          <Link href="/coleccion" className="hidden text-sm underline-offset-4 hover:underline sm:block">
            Ver todo
          </Link>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {colecciones.map((c, i) => (
            <Reveal key={c.titulo} delay={i * 0.1}>
              <Link href="/coleccion" className="group relative block aspect-[3/4] overflow-hidden rounded-md">
                <Image
                  src={img(c.imagen, 800)}
                  alt={`Colección ${c.titulo}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute right-5 bottom-5 left-5 text-white">
                  <h3 className="text-3xl">{c.titulo}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
                    {c.texto} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <Reveal className="mb-10">
          <p className="text-xs tracking-[0.25em] text-primary uppercase">Lo más querido</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Favoritos de la temporada</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {productos.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} producto={p} index={i} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <HomeStats />

      {/* Lookbook */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <Reveal className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={img(IMAGES.percheroNeutro, 1000)}
            alt="Perchero con prendas en tonos tierra"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs tracking-[0.25em] text-primary uppercase">Lookbook</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Tonos de tierra, texturas que abrigan</h2>
          <p className="mt-5 text-muted-foreground">
            Inspirada en los paisajes del sur andino, esta colección combina
            crudos, terracotas y marrones profundos en prendas que se combinan
            entre sí. Arma un armario pequeño, versátil y tuyo.
          </p>
          <Link
            href="/coleccion"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Descubrir el lookbook <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <Newsletter />
    </>
  );
}
