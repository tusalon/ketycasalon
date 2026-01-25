import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSeo } from "@/hooks/use-seo";
import { flattenStoreCategories, storeCategories } from "@/data/categories";
import { normalizeCategoryId } from "@/data/legacy-catalog";
import { useMunicipality } from "@/context/municipality";
import { artemisaMunicipalities } from "@/data/municipalities-artemisa";
import { filterAndSortByQuery } from "@/lib/search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

type StoreCategoryId = ReturnType<typeof flattenStoreCategories>[number]["id"];

const flatCategories = flattenStoreCategories(storeCategories);
const topLevelFilters: Array<{ id: StoreCategoryId; label: string }> = storeCategories.map(
  (c) => ({ id: c.id as StoreCategoryId, label: c.label }),
);

export default function Combos() {
  useSeo({
    title: "Tienda | Catálogo en USD",
    description:
      "Explora productos por categorías y compra en USD con entrega local. Agrega al carrito y completa el pago en 3 pasos.",
    canonicalPath: "/tienda",
  });

  const { municipality, setMunicipality } = useMunicipality();
  const [municipalityDraftId, setMunicipalityDraftId] = useState<string>(municipality ? String(municipality.id) : "");

  const [query, setQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const initial = normalizeCategoryId(searchParams.get("cat") || "combos") as StoreCategoryId;
  const [filter, setFilter] = useState<StoreCategoryId>(initial);

  useEffect(() => {
    const cat = normalizeCategoryId(searchParams.get("cat") || "combos") as StoreCategoryId;
    setFilter(cat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filtered = useMemo(() => {
    const parentById = new Map(flatCategories.map((c) => [c.id, c.parentId] as const));
    const isTopLevel = storeCategories.some((c) => c.id === filter);
    const byCategory = products.filter((p) => {
      if (p.categoryId === filter) return true;
      if (!isTopLevel) return false;
      const parent = parentById.get(p.categoryId);
      return parent === filter;
    });

    // Filtrado por municipio: si el producto tiene `availableIn`, debe incluir el id.
    // Si no tiene `availableIn`, asumimos disponibilidad general en Artemisa.
    if (!municipality) return byCategory;
    return byCategory.filter((p) => !p.availableIn?.length || p.availableIn.includes(municipality.id));
  }, [filter, municipality]);

  const filteredAndSearched = useMemo(() => {
    // Si hay búsqueda, NO la limitamos a la categoría seleccionada.
    // Mantiene el filtro por municipio (disponibilidad).
    if (query.trim()) {
      const base = !municipality
        ? products
        : products.filter((p) => !p.availableIn?.length || p.availableIn.includes(municipality.id));
      return filterAndSortByQuery(base, query, (p) => p.name);
    }

    // Sin búsqueda: respetamos categoría + municipio.
    return filtered;
  }, [filtered, query, municipality]);

  const filterLabel =
    flatCategories.find((c) => c.id === filter)?.label ?? "Tienda";

  return (
    <main className="container py-10">
      <Dialog open={!municipality}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="font-serif">Selecciona tu municipio</DialogTitle>
            <DialogDescription>
              Entregamos en toda la provincia Artemisa (Cuba). Elige tu municipio para mostrar solo lo disponible.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Select value={municipalityDraftId} onValueChange={setMunicipalityDraftId}>
              <SelectTrigger>
                <SelectValue placeholder="Elige un municipio" />
              </SelectTrigger>
              <SelectContent>
                {artemisaMunicipalities.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Puedes cambiar el municipio después desde la tienda.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="cta"
              disabled={!municipalityDraftId}
              onClick={() => {
                const next = artemisaMunicipalities.find((m) => String(m.id) === municipalityDraftId) ?? null;
                setMunicipality(next);
              }}
            >
              Ver productos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl">Tienda · {filterLabel}</h1>
          <p className="mt-2 text-muted-foreground">
            Entregamos en toda la provincia Artemisa (Cuba).{municipality ? ` Municipio: ${municipality.name}.` : ""}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
          <div className="relative w-full sm:w-[320px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos (por nombre)…"
              className="h-9 pl-9 pr-9"
              aria-label="Buscar productos"
            />
            {query ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
          <Select
            value={municipality ? String(municipality.id) : ""}
            onValueChange={(v) => {
              const next = artemisaMunicipalities.find((m) => String(m.id) === v) ?? null;
              setMunicipality(next);
              setMunicipalityDraftId(v);
            }}
          >
            <SelectTrigger className="h-9 w-[220px]">
              <SelectValue placeholder="Municipio" />
            </SelectTrigger>
            <SelectContent>
              {artemisaMunicipalities.map((m) => (
                <SelectItem key={m.id} value={String(m.id)}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {topLevelFilters.map((c) => (
            <Button
              key={c.id}
              variant={filter === c.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFilter(c.id);
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  next.set("cat", c.id);
                  return next;
                });
              }}
              className="whitespace-nowrap"
            >
              {c.label}
            </Button>
          ))}
          </div>
        </div>
      </header>

      {filteredAndSearched.length > 0 ? (
        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {filteredAndSearched.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <section className="mt-8 rounded-lg border bg-card p-6">
          {query ? (
            <>
              <p className="font-medium">No encontramos resultados</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Prueba con menos palabras o un nombre similar (ej: “pollo”, “arroz”, “aceite”).
              </p>
            </>
          ) : (
            <>
              <p className="font-medium">Aún no hay productos en esta categoría</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ya dejamos la estructura lista. ¿Quieres que empecemos a cargar el inventario para “{filterLabel}”?
              </p>
            </>
          )}
        </section>
      )}
    </main>
  );
}

