import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useSeo } from "@/hooks/use-seo";

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre").max(80),
  email: z.string().trim().email("Email inválido").max(120),
  mensaje: z.string().trim().min(10, "Cuéntanos un poco más").max(1000),
});

type Values = z.infer<typeof schema>;

export default function Contact() {
  useSeo({
    title: "Contacto | Soporte por WhatsApp",
    description: "Escríbenos por WhatsApp o envía un mensaje. Te ayudamos a completar tu compra.",
    canonicalPath: "/contacto",
  });

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { nombre: "", email: "", mensaje: "" },
  });

  const onSubmit = (values: Values) => {
    // Demo: en producción, enviarías esto a un backend (Cloud) con validación server-side.
    toast({
      title: "Mensaje enviado",
      description: "Gracias. Te responderemos lo antes posible.",
    });
    form.reset(values);
  };

  return (
    <main className="container py-10">
      <header className="max-w-2xl">
        <h1 className="font-serif text-3xl">Contacto</h1>
        <p className="mt-2 text-muted-foreground">
          Estamos para ayudarte. Si prefieres, usa el botón flotante de WhatsApp.
        </p>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Envíanos un mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mensaje"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="¿En qué podemos ayudarte?" className="min-h-28" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="cta" className="w-full">
                  Enviar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Redes y horario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Horario:</span> Lun–Sáb 9:00–18:00 · Dom 10:00–14:00
            </p>
            <p>
              <span className="font-medium text-foreground">Instagram:</span> @combosfamilia
            </p>
            <p>
              <span className="font-medium text-foreground">Facebook:</span> /combosfamilia
            </p>
            <p>
              <span className="font-medium text-foreground">Email:</span> soporte@combosfamilia.com
            </p>
            <p className="rounded-lg border bg-background p-3">
              Consejo: si estás comprando desde el extranjero, WhatsApp suele ser la forma más rápida de confirmar dirección y
              horario de entrega.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
