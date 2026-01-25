import { Button } from "@/components/ui/button";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const href = buildWhatsAppHref(
    "Hola, necesito ayuda para enviar productos. ¿Me pueden asesorar, por favor?",
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button asChild variant="cta" className="shadow-lg">
        <a href={href} target="_blank" rel="noreferrer" aria-label="Soporte por WhatsApp">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </Button>
    </div>
  );
}
