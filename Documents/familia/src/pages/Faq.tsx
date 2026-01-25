import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useSeo } from "@/hooks/use-seo";

export default function Faq() {
  useSeo({
    title: "FAQ | Preguntas frecuentes",
    description: "Respuestas rápidas sobre pagos, entregas, zonas y soporte al cliente.",
    canonicalPath: "/preguntas",
  });

  return (
    <main className="container py-10">
      <header className="max-w-2xl">
        <h1 className="font-serif text-3xl">Preguntas frecuentes</h1>
        <p className="mt-2 text-muted-foreground">
          Queremos que comprar sea claro y sencillo. Aquí están las respuestas más comunes.
        </p>
      </header>

      <Card className="mt-6">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pago">
              <AccordionTrigger className="py-5 text-left">💳 ¿Qué métodos de pago aceptan?</AccordionTrigger>
              <AccordionContent>
                <p>Aceptamos pagos vía Zelle.</p>
                <p className="mt-2">
                  Cualquier otro método de pago disponible se gestiona de forma segura a través del checkout de nuestra página web.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tiempos">
              <AccordionTrigger className="py-5 text-left">⏱ ¿Cuál es el tiempo de entrega?</AccordionTrigger>
              <AccordionContent>
                <p>Nuestro tiempo de entrega es de 24 a 48 horas.</p>
                <p className="mt-2">Siempre que sea posible, tratamos de realizar la entrega el mismo día.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="zonas">
              <AccordionTrigger className="py-5 text-left">📍 ¿En qué zonas realizan entregas?</AccordionTrigger>
              <AccordionContent>
                <p>Realizamos entregas en toda la provincia de Artemisa.</p>
                <p className="mt-2">
                  La zona exacta se coordina en el momento del checkout, según la dirección del beneficiario.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="productos">
              <AccordionTrigger className="py-5 text-left">🛍 ¿Qué tipos de productos venden?</AccordionTrigger>
              <AccordionContent>
                <p>Ofrecemos una amplia variedad de productos:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Alimentos</li>
                  <li>Productos de aseo</li>
                  <li>Electrodomésticos</li>
                  <li>Combos familiares</li>
                  <li>Mini-combos económicos</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ofertas">
              <AccordionTrigger className="py-5 text-left">🎁 ¿Ofrecen descuentos u ofertas especiales?</AccordionTrigger>
              <AccordionContent>
                <p>Sí.</p>
                <p className="mt-2">
                  Contamos con ofertas, descuentos y promociones especiales durante el año, además de sorpresas para cumpleaños y
                  fechas especiales, ¡y mucho más!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="envio">
              <AccordionTrigger className="py-5 text-left">🚚 ¿Cuál es el costo del envío?</AccordionTrigger>
              <AccordionContent>
                <p>El envío puede ser gratis o con un costo muy bajo (máximo 5 USD), dependiendo del producto y la zona de entrega.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="soporte">
              <AccordionTrigger className="py-5 text-left">📞 ¿Cómo funciona el soporte al cliente?</AccordionTrigger>
              <AccordionContent>
                <p>Brindamos soporte antes, durante y después de la compra.</p>
                <p className="mt-2">Puedes contactarnos por WhatsApp o desde la página de contacto del sitio web.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
