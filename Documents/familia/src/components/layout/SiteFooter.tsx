import { Link } from "react-router-dom";
import siteLogo from "@/assets/logo-tudespensa25.png";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img
              src={siteLogo}
              alt="Logo de TuDespensa25"
              className="h-8 w-8 rounded-md object-contain"
              loading="lazy"
              decoding="async"
            />
            <p className="font-serif text-lg">TuDespensa25</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Nacimos para ayudar a las familias a mantenerse unidas, incluso cuando la distancia los separa.
          </p>
        </div>

        <div className="grid gap-2 text-sm">
          <p className="font-medium">Enlaces</p>
          <Link className="text-muted-foreground hover:text-foreground" to="/tienda">
            Ver tienda
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" to="/preguntas">
            Preguntas frecuentes
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" to="/contacto">
            Contacto
          </Link>
        </div>

        <div className="grid gap-2 text-sm">
          <p className="font-medium">Horario</p>
          <p className="text-muted-foreground">Lun–Sáb: 9:00–18:00</p>
          <p className="text-muted-foreground">Dom: 10:00–14:00</p>
          <p className="text-muted-foreground">Soporte por WhatsApp</p>
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col gap-2 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TuDespensa25. Todos los derechos reservados.</p>
          <p>Pagos seguros · Entrega local · Precios en USD</p>
        </div>
      </div>
    </footer>
  );
}
