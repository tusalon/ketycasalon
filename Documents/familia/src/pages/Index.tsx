import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSeo } from "@/hooks/use-seo";
import { products } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";
import { Link } from "react-router-dom";
import { HeartHandshake, ShieldCheck, Truck, Zap } from "lucide-react";

const Index = () => {
  useSeo({
    title: "TuDespensa25 | Envío de productos a tu familia",
    description:
      "Envía alimentos, esenciales y productos del hogar a tu familia desde el extranjero. Compra rápida y segura en USD con entrega local.",
    canonicalPath: "/",
  });

  const destacados = products.slice(0, 3);

  return (
    <main className="bg-background">
      <header className="border-b bg-card">
        <section className="container py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Entrega local</Badge>
                <Badge variant="secondary">Pagos internacionales</Badge>
                <Badge variant="secondary">USD</Badge>
              </div>

              <h1 className="text-balance font-serif text-4xl leading-tight sm:text-5xl">
                Ayuda a tu familia desde la distancia, nosotros nos encargamos del resto
              </h1>
              <p className="text-pretty text-lg text-muted-foreground">
                Compra alimentos, esenciales y productos del hogar de forma rápida, segura y confiable. Tu familia lo recibe, tú te quedas tranquilo.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="cta" size="lg">
                  <Link to="/tienda">Ver tienda</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/tienda">Comprar ahora</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <TrustPill icon={Truck} title="Entregas rápidas" />
                <TrustPill icon={ShieldCheck} title="Pagos seguros" />
                <TrustPill icon={Zap} title="Catálogo listo" />
                <TrustPill icon={HeartHandshake} title="Atención humana" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {destacados.map((p) => (
                <ComboMiniCard key={p.id} id={p.id} name={p.name} price={p.priceUsd} image={p.image} />
              ))}
            </div>
          </div>
        </section>
      </header>

      <section className="container py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl">Destacados</h2>
            <p className="mt-1 text-muted-foreground">
              Opciones listas para enviar hoy. Elige una y agrega al carrito en segundos.
            </p>
          </div>
          <Button asChild variant="link" className="hidden sm:inline-flex">
            <Link to="/tienda">Ver catálogo completo</Link>
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {destacados.map((product) => (
              <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container pb-12 sm:pb-16">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="font-serif">Confianza que se siente</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Compra sin complicaciones"
              description="Catálogo claro, precios en USD y checkout en 3 pasos. Comprar es fácil, ayudar también."
            />
            <ValueCard
              title="Entrega coordinada"
              description="Compartes la dirección, nosotros coordinamos la entrega local con tu familia."
            />
            <ValueCard
              title="Soporte por WhatsApp"
              description="¿Dudas? Escríbenos y te acompañamos en todo el proceso."
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

function TrustPill({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="rounded-lg border bg-background px-3 py-2 text-sm">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="font-medium">{title}</span>
      </div>
    </div>
  );
}

function ComboMiniCard({
  id,
  name,
  price,
  image,
}: {
  id: string;
  name: string;
  price: number;
  image: string;
}) {
  return (
    <Card className="group overflow-hidden">
      <div className="grid grid-cols-[110px_1fr]">
        <img
          src={image}
          alt={`Imagen del ${name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <p className="text-sm font-medium">{name}</p>
          <p className="mt-1 text-sm text-muted-foreground">Desde ${price.toFixed(2)} USD</p>
          <Button asChild variant="link" className="mt-2 h-auto p-0">
            <Link to={`/tienda?cat=combos#${id}`}>Ver detalle</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="font-medium">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default Index;
