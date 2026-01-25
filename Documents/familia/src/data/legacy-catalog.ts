export type LegacyCategory = {
  id:
    | "combo"
    | "carnicos"
    | "cereales"
    | "lacteos"
    | "conserva"
    | "mercado"
    | "aseo"
    | "agro"
    | "liquido"
    | "electro";
  name: string;
  icon: string;
  backgroundImage: string;
};

// Catálogo legacy (ids cortos + icono + backgroundImage) tal como lo compartiste.
export const legacyCategories: LegacyCategory[] = [
  { id: "combo", name: "Combos", icon: "icon-basket", backgroundImage: "/images/aseo.png" },
  {
    id: "carnicos",
    name: "Cárnicos y embutidos",
    icon: "icon-beef",
    backgroundImage: "/images/carnicos.png",
  },
  {
    id: "cereales",
    name: "Cereales, pastas y granos",
    icon: "icon-wheat",
    backgroundImage: "/images/cereales.png",
  },
  { id: "lacteos", name: "Lácteos y huevos", icon: "icon-milk", backgroundImage: "/images/lacteos.png" },
  { id: "conserva", name: "Conserva y enlatados", icon: "icon-can", backgroundImage: "/images/conserva.png" },
  { id: "mercado", name: "Mercado", icon: "icon-basket", backgroundImage: "/images/mercado.png" },
  { id: "aseo", name: "Aseo", icon: "icon-broom", backgroundImage: "/images/aseo.png" },
  // Ojo: en tu snippet dice "Agrito"; lo normalizamos a Agro.
  { id: "agro", name: "Agro", icon: "icon-basket", backgroundImage: "/images/aseo.png" },
  { id: "liquido", name: "Líquidos", icon: "icon-basket", backgroundImage: "/images/aseo.png" },
  { id: "electro", name: "Electrodomésticos", icon: "icon-basket", backgroundImage: "/images/aseo.png" },
];

// Mapeo de ids legacy → ids del árbol de categorías actual (storeCategories).
export const legacyCategoryIdToStoreCategoryId: Record<LegacyCategory["id"], string> = {
  combo: "combos",
  carnicos: "carnicos-y-embutidos",
  cereales: "cereales-pastas-y-granos",
  lacteos: "lacteos-y-huevos",
  conserva: "conservas-y-enlatados",
  mercado: "mercado",
  aseo: "aseo",
  agro: "agro-viandas-y-vegetales",
  liquido: "liquidos",
  electro: "electrodomesticos",
};

export function normalizeCategoryId(id: string) {
  return legacyCategoryIdToStoreCategoryId[id as LegacyCategory["id"]] ?? id;
}
