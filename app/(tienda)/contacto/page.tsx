import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos o visita nuestras tiendas CEIBA.",
};

const tiendas = [
  { nombre: "CEIBA Barranco", direccion: "Av. Grau 312, Barranco, Lima", horario: "Lun a Sáb · 10:00 – 20:00" },
  { nombre: "CEIBA Cusco", direccion: "Calle Plateros 145, Cusco", horario: "Todos los días · 9:00 – 21:00" },
];

export default function ContactoPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-4 py-16 md:grid-cols-5 md:px-6 md:py-24">
      <div className="md:col-span-2">
        <p className="text-xs tracking-[0.25em] text-primary uppercase">Contacto</p>
        <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">Conversemos</h1>
        <p className="mt-6 text-muted-foreground">
          ¿Dudas sobre tallas, un pedido o quieres colaborar con nosotros? Nuestro
          equipo está aquí para ayudarte.
        </p>

        <ul className="mt-10 space-y-4 text-sm">
          <li className="flex items-center gap-3"><Mail className="size-4 text-primary" /> hola@ceiba.pe</li>
          <li className="flex items-center gap-3"><Phone className="size-4 text-primary" /> +51 1 555 0192</li>
        </ul>

        <div className="mt-12 space-y-6">
          {tiendas.map((t) => (
            <div key={t.nombre} className="border-t border-border pt-5">
              <h2 className="text-2xl">{t.nombre}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" /> {t.direccion}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="size-4" /> {t.horario}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-3">
        <ContactForm />
      </div>
    </section>
  );
}
