import type { Metadata } from "next";
import Image from "next/image";
import { CatalogGrid } from "@/components/catalog-grid";
import { IMAGES, img } from "@/lib/data";

export const metadata: Metadata = {
  title: "Colección",
  description: "Descubre la colección Otoño — Invierno 2026 de CEIBA.",
};

export default function ColeccionPage() {
  return (
    <>
      <section className="relative h-[42vh] min-h-72 overflow-hidden">
        <Image
          src={img(IMAGES.percheroClaro, 1800)}
          alt="Prendas claras colgadas en un perchero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 text-white md:px-6">
          <p className="text-xs tracking-[0.25em] uppercase">Otoño — Invierno 2026</p>
          <h1 className="mt-3 text-5xl md:text-7xl">La colección</h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <CatalogGrid />
      </section>
    </>
  );
}
