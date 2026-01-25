import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSeo } from "@/hooks/use-seo";

export default function About() {
  useSeo({
    title: "Nosotros | TuDespensa25",
    description: "Una tienda creada para acercar familias: tú compras, nosotros entregamos con cuidado.",
    canonicalPath: "/nosotros",
  });

  return (
    <main className="container py-10">
      <header className="max-w-2xl">
        <h1 className="font-serif text-3xl">Nosotros</h1>
        <p className="mt-2 text-muted-foreground">
          Nacimos para ayudar a las familias a mantenerse unidas, incluso cuando la distancia los separa.
        </p>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Nuestra misión</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Hacer que enviar ayuda sea simple y confiable: combos claros, pagos seguros en USD y entrega coordinada con tu
            familia.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Cómo trabajamos</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Seleccionamos combos listos, confirmamos dirección y coordinamos entrega local. Si algo cambia por disponibilidad,
            siempre mantenemos el valor y te avisamos.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
