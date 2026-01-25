export type StoreCategoryNode = {
  id: string;
  label: string;
  children?: StoreCategoryNode[];
};

// Jerarquía propuesta (2 niveles) a partir de tu lista.
// Nota: el catálogo está estructurado por categorías; iremos poblando productos progresivamente.
export const storeCategories: StoreCategoryNode[] = [
  {
    id: "combos",
    label: "Combos",
    children: [
      { id: "combos-familiares", label: "Combos familiares" },
      { id: "combos-premium", label: "Combos premium" },
      { id: "combos-especiales", label: "Combos especiales" },
      { id: "mini-combos-economicos", label: "Mini-combos económicos" },
    ],
  },
  {
    id: "carnicos-y-embutidos",
    label: "Cárnicos y embutidos",
    children: [
      { id: "pollo", label: "Pollo" },
      { id: "cerdo", label: "Cerdo" },
      { id: "res", label: "Res" },
      { id: "embutidos", label: "Embutidos" },
    ],
  },
  {
    id: "cereales-pastas-y-granos",
    label: "Cereales, pastas y granos",
    children: [
      { id: "arroz", label: "Arroz" },
      { id: "frijoles", label: "Frijoles" },
      { id: "azucar", label: "Azúcar" },
      { id: "harinas", label: "Harinas" },
      { id: "pastas", label: "Pastas" },
    ],
  },
  {
    id: "lacteos-y-huevos",
    label: "Lácteos y huevos",
    children: [
      { id: "leche", label: "Leche" },
      { id: "huevos", label: "Huevos" },
      { id: "yogurt", label: "Yogurt" },
      { id: "helados", label: "Helados" },
    ],
  },
  {
    id: "conservas-y-enlatados",
    label: "Conservas y enlatados",
    children: [
      { id: "pastas-de-tomate", label: "Pastas de tomate" },
      { id: "mayonesa", label: "Mayonesa" },
      { id: "enlatados-varios", label: "Enlatados varios" },
    ],
  },
  {
    id: "mercado",
    label: "Mercado",
    children: [
      { id: "aceite", label: "Aceite" },
      { id: "cafe", label: "Café" },
      { id: "chocolate", label: "Chocolate" },
      { id: "refrescos", label: "Refrescos" },
      { id: "condimentos", label: "Condimentos" },
    ],
  },
  {
    id: "aseo",
    label: "Aseo",
    children: [
      { id: "jabon", label: "Jabón" },
      { id: "detergente", label: "Detergente" },
      { id: "papel-higienico", label: "Papel higiénico" },
      { id: "productos-de-limpieza", label: "Productos de limpieza" },
    ],
  },
  {
    id: "agro-viandas-y-vegetales",
    label: "Agro (viandas y vegetales)",
    children: [
      { id: "malanga", label: "Malanga" },
      { id: "boniato", label: "Boniato" },
      { id: "ajo", label: "Ajo" },
      { id: "productos-frescos", label: "Productos frescos" },
    ],
  },
  {
    id: "liquidos",
    label: "Líquidos",
    children: [
      { id: "cervezas", label: "Cervezas" },
      { id: "maltas", label: "Maltas" },
      { id: "bebidas", label: "Bebidas" },
      { id: "licores", label: "Licores" },
    ],
  },
  {
    id: "electrodomesticos",
    label: "Electrodomésticos",
    children: [
      { id: "ollas", label: "Ollas" },
      { id: "arroceras", label: "Arroceras" },
      { id: "fogones", label: "Fogones" },
      { id: "lavadoras", label: "Lavadoras" },
      { id: "refrigeracion", label: "Refrigeración" },
      { id: "tvs-y-pequenos-electrodomesticos", label: "TVs y pequeños electrodomésticos" },
    ],
  },
];

export function flattenStoreCategories(nodes: StoreCategoryNode[]) {
  const out: Array<{ id: string; label: string; parentId?: string }> = [];
  for (const n of nodes) {
    out.push({ id: n.id, label: n.label });
    for (const c of n.children ?? []) out.push({ id: c.id, label: c.label, parentId: n.id });
  }
  return out;
}
