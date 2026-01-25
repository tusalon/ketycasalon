import comboBasico from "@/assets/combos/combo-basico.jpg";
import comboFamiliar from "@/assets/combos/combo-familiar.jpg";
import comboPremium from "@/assets/combos/combo-premium.jpg";
import comboHigiene from "@/assets/combos/combo-higiene.jpg";
import comboEconomico from "@/assets/combos/combo-economico.jpg";
import comboDesayuno from "@/assets/combos/combo-desayuno.jpg";

export type ComboCategory = "economicos" | "familiares" | "premium";

export type Combo = {
  id: string;
  name: string;
  shortDescription: string;
  included: string[];
  priceUsd: number;
  category: ComboCategory;
  image: string;
};

export const combos: Combo[] = [
  {
    id: "basico",
    name: "Combo Básico",
    shortDescription: "Esenciales para la semana: base sólida y práctica.",
    included: ["Arroz", "Pasta", "Aceite", "Harina", "Lentejas", "Azúcar"],
    priceUsd: 29.99,
    category: "economicos",
    image: comboBasico,
  },
  {
    id: "economico",
    name: "Combo Económico",
    shortDescription: "Lo esencial, al mejor precio. Ideal para emergencias.",
    included: ["Arroz", "Harina", "Pasta", "Enlatados básicos"],
    priceUsd: 19.99,
    category: "economicos",
    image: comboEconomico,
  },
  {
    id: "familiar",
    name: "Combo Familiar",
    shortDescription: "Para compartir: variedad y cantidad para el hogar.",
    included: ["Arroz", "Pasta", "Frijoles", "Enlatados", "Leche", "Galletas"],
    priceUsd: 54.99,
    category: "familiares",
    image: comboFamiliar,
  },
  {
    id: "desayuno",
    name: "Combo Desayuno",
    shortDescription: "Empieza el día con tranquilidad: básicos del desayuno.",
    included: ["Cereal", "Leche", "Café", "Azúcar", "Galletas", "Mermelada"],
    priceUsd: 34.99,
    category: "familiares",
    image: comboDesayuno,
  },
  {
    id: "higiene",
    name: "Combo Higiene & Limpieza",
    shortDescription: "Cuidado del hogar y la familia. Todo en un solo envío.",
    included: ["Jabón", "Detergente", "Papel higiénico", "Champú", "Desinfectante"],
    priceUsd: 39.99,
    category: "familiares",
    image: comboHigiene,
  },
  {
    id: "premium",
    name: "Combo Premium",
    shortDescription: "Una ayuda especial: marcas y productos seleccionados.",
    included: ["Café", "Aceite de oliva", "Atún", "Cereal", "Chocolate", "Snacks"],
    priceUsd: 79.99,
    category: "premium",
    image: comboPremium,
  },
];

export const categoryLabels: Record<ComboCategory, string> = {
  economicos: "Económicos",
  familiares: "Familiares",
  premium: "Premium",
};
