import * as React from "react";
import type { Product } from "@/data/products";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { toast } from "@/components/ui/use-toast";
import { formatUsd } from "@/lib/money";
import { flattenStoreCategories, storeCategories } from "@/data/categories";
import { useIsMobile } from "@/hooks/use-mobile";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const categoryLabelById = new Map(
  flattenStoreCategories(storeCategories).map((c) => [c.id, c.label] as const),
);

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const [qty, setQty] = React.useState(1);

  const badgeLabel = categoryLabelById.get(product.categoryId) ?? "Producto";

  return (
    <>
      <Card
        id={product.id}
        className="overflow-hidden"
        onClick={(e) => {
          if (!isMobile) return;
          if ((e.target as HTMLElement | null)?.closest("button,a")) return;
          setOpen(true);
        }}
        role={isMobile ? "button" : undefined}
        tabIndex={isMobile ? 0 : undefined}
        onKeyDown={(e) => {
          if (!isMobile) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={product.image}
            alt={`Imagen del ${product.name}`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            loading="lazy"
          />
        </div>

        {isMobile ? (
          <>
            <CardContent className="space-y-1 p-4">
              <CardTitle className="font-serif text-base leading-snug line-clamp-2">{product.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{badgeLabel}</p>
              <p className="pt-1 text-base font-semibold">{formatUsd(product.priceUsd)}</p>
            </CardContent>

            <CardFooter className="gap-2 p-4 pt-0">
              <div className="flex flex-1 items-center overflow-hidden rounded-md border bg-background">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 w-9 rounded-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQty((q) => Math.max(1, q - 1));
                  }}
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex h-9 flex-1 items-center justify-center text-sm font-medium tabular-nums">
                  {qty}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 w-9 rounded-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQty((q) => Math.min(99, q + 1));
                  }}
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                type="button"
                variant="cta"
                size="icon"
                className="h-9 w-9"
                onClick={(e) => {
                  e.stopPropagation();
                  add(product, qty);
                  toast({
                    title: "Agregado al carrito",
                    description: `${product.name} se agregó correctamente.`,
                  });
                }}
                aria-label="Agregar al carrito"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="font-serif text-xl">{product.name}</CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {badgeLabel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.shortDescription}</p>
            </CardHeader>

            <CardContent className="space-y-3">
              {product.included?.length ? (
                <div>
                  <p className="text-sm font-medium">Incluye</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {product.included.slice(0, 6).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p className="text-lg font-semibold">{formatUsd(product.priceUsd)}</p>
            </CardContent>

            <CardFooter className="gap-2">
              <Button
                variant="cta"
                className="w-full"
                onClick={() => {
                  add(product, 1);
                  toast({
                    title: "Agregado al carrito",
                    description: `${product.name} se agregó correctamente.`,
                  });
                }}
              >
                Agregar al carrito
              </Button>
            </CardFooter>
          </>
        )}
      </Card>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="font-serif">{product.name}</DrawerTitle>
              <DrawerDescription>{badgeLabel}</DrawerDescription>
            </DrawerHeader>

            <div className="px-4">
              <div className="aspect-[3/2] overflow-hidden rounded-lg border bg-card">
                <img
                  src={product.image}
                  alt={`Imagen del ${product.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <p className="mt-4 text-sm text-muted-foreground">{product.shortDescription}</p>

              {product.included?.length ? (
                <div className="mt-4">
                  <p className="text-sm font-medium">Incluye</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {product.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p className="mt-4 text-lg font-semibold">{formatUsd(product.priceUsd)}</p>
            </div>

            <DrawerFooter>
              <Button
                variant="cta"
                onClick={() => {
                  add(product, 1);
                  toast({
                    title: "Agregado al carrito",
                    description: `${product.name} se agregó correctamente.`,
                  });
                  setOpen(false);
                }}
              >
                Agregar al carrito
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : null}
    </>
  );
}

