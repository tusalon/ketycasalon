import { combos } from "@/data/combos";

export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  priceUsd: number;
  image: string;
  /** id de subcategoría o categoría (según storeCategories) */
  categoryId: string;
  /** Lista opcional (útil para combos) */
  included?: string[];
  /**
   * IDs numéricos de municipio donde está disponible.
   * Si es undefined, asumimos disponible en toda la provincia.
   */
  availableIn?: number[];
};

const placeholder = "/placeholder.svg";

const comboCategoryToStoreCategoryId = {
  economicos: "mini-combos-economicos",
  familiares: "combos-familiares",
  premium: "combos-premium",
} as const;

const comboProducts: Product[] = combos.map((c) => ({
  id: `combo-${c.id}`,
  name: c.name,
  shortDescription: c.shortDescription,
  priceUsd: c.priceUsd,
  image: c.image,
  categoryId: comboCategoryToStoreCategoryId[c.category],
  included: c.included,
}));

// Productos demo para poblar TODAS las categorías/subcategorías.
// TODO: Sustituir por inventario real (SKU, unidad, stock, etc.).
export const products: Product[] = [
  ...comboProducts,

  // Cárnicos y embutidos
  { id: "pollo-pechuga", name: "Pechuga de pollo (1 kg)", shortDescription: "Corte magro, ideal para comidas rápidas.", priceUsd: 8.99, image: placeholder, categoryId: "pollo" },
  { id: "cerdo-lomo", name: "Lomo de cerdo (1 kg)", shortDescription: "Excelente para asar u hornear.", priceUsd: 10.5, image: placeholder, categoryId: "cerdo" },
  { id: "res-bistec", name: "Bistec de res (1 kg)", shortDescription: "Corte clásico para plancha.", priceUsd: 12.75, image: placeholder, categoryId: "res" },
  { id: "embutidos-jamon", name: "Jamón cocido (500 g)", shortDescription: "Perfecto para desayunos y sándwiches.", priceUsd: 6.25, image: placeholder, categoryId: "embutidos" },

  // Cereales, pastas y granos
  { id: "arroz-1kg", name: "Arroz (1 kg)", shortDescription: "Grano seleccionado para el día a día.", priceUsd: 2.25, image: placeholder, categoryId: "arroz" },
  { id: "frijoles-negros", name: "Frijoles negros (1 kg)", shortDescription: "Básico de la cocina.", priceUsd: 3.1, image: placeholder, categoryId: "frijoles" },
  { id: "azucar-1kg", name: "Azúcar (1 kg)", shortDescription: "Para café, postres y más.", priceUsd: 1.95, image: placeholder, categoryId: "azucar" },
  { id: "harina-1kg", name: "Harina (1 kg)", shortDescription: "Multiuso para panes y masas.", priceUsd: 2.05, image: placeholder, categoryId: "harinas" },
  { id: "pasta-espagueti", name: "Pasta espagueti (500 g)", shortDescription: "Rinde y se cocina rápido.", priceUsd: 1.75, image: placeholder, categoryId: "pastas" },

  // Lácteos y huevos
  { id: "leche-uht", name: "Leche UHT (1 L)", shortDescription: "Larga duración.", priceUsd: 2.4, image: placeholder, categoryId: "leche" },
  { id: "huevos-30", name: "Huevos (cartón 30)", shortDescription: "Para desayunos y cocina diaria.", priceUsd: 7.99, image: placeholder, categoryId: "huevos" },
  { id: "yogurt-natural", name: "Yogurt natural (1 L)", shortDescription: "Ideal para batidos.", priceUsd: 3.65, image: placeholder, categoryId: "yogurt" },
  { id: "helado-vainilla", name: "Helado de vainilla (1 L)", shortDescription: "Postre familiar.", priceUsd: 5.5, image: placeholder, categoryId: "helados" },

  // Conservas y enlatados
  { id: "pasta-tomate", name: "Pasta de tomate (400 g)", shortDescription: "Base para salsas.", priceUsd: 1.85, image: placeholder, categoryId: "pastas-de-tomate" },
  { id: "mayonesa-390", name: "Mayonesa (390 g)", shortDescription: "Clásica para ensaladas.", priceUsd: 2.95, image: placeholder, categoryId: "mayonesa" },
  { id: "enlatados-mixtos", name: "Enlatados surtidos", shortDescription: "Atún, sardinas y más (según disponibilidad).", priceUsd: 6.9, image: placeholder, categoryId: "enlatados-varios" },

  // Mercado
  { id: "aceite-1l", name: "Aceite vegetal (1 L)", shortDescription: "Cocina diaria.", priceUsd: 3.95, image: placeholder, categoryId: "aceite" },
  { id: "cafe-molido", name: "Café molido (250 g)", shortDescription: "Aroma intenso.", priceUsd: 4.2, image: placeholder, categoryId: "cafe" },
  { id: "chocolate-tableta", name: "Chocolate (tableta)", shortDescription: "Para merienda o repostería.", priceUsd: 2.15, image: placeholder, categoryId: "chocolate" },
  { id: "refresco-2l", name: "Refresco (2 L)", shortDescription: "Para compartir.", priceUsd: 2.75, image: placeholder, categoryId: "refrescos" },
  { id: "condimentos-mixtos", name: "Condimentos surtidos", shortDescription: "Sazón para tus comidas.", priceUsd: 3.6, image: placeholder, categoryId: "condimentos" },

  // Aseo
  { id: "jabon-barra", name: "Jabón de baño (barra)", shortDescription: "Uso diario.", priceUsd: 1.1, image: placeholder, categoryId: "jabon" },
  { id: "detergente-1kg", name: "Detergente (1 kg)", shortDescription: "Limpieza profunda.", priceUsd: 3.25, image: placeholder, categoryId: "detergente" },
  { id: "papel-higienico-4", name: "Papel higiénico (4 rollos)", shortDescription: "Paquete básico.", priceUsd: 2.4, image: placeholder, categoryId: "papel-higienico" },
  { id: "limpieza-desinfectante", name: "Desinfectante multiuso", shortDescription: "Para superficies del hogar.", priceUsd: 2.9, image: placeholder, categoryId: "productos-de-limpieza" },

  // Agro (viandas y vegetales)
  { id: "malanga-1kg", name: "Malanga (1 kg)", shortDescription: "Vianda tradicional.", priceUsd: 2.8, image: placeholder, categoryId: "malanga" },
  { id: "boniato-1kg", name: "Boniato (1 kg)", shortDescription: "Ideal para hervir o freír.", priceUsd: 2.3, image: placeholder, categoryId: "boniato" },
  { id: "ajo-250g", name: "Ajo (250 g)", shortDescription: "Base de la cocina.", priceUsd: 1.6, image: placeholder, categoryId: "ajo" },
  { id: "frescos-surtidos", name: "Productos frescos surtidos", shortDescription: "Según disponibilidad del día.", priceUsd: 6.5, image: placeholder, categoryId: "productos-frescos" },

  // Líquidos
  { id: "cerveza-6pack", name: "Cervezas (6 pack)", shortDescription: "Para celebraciones.", priceUsd: 7.2, image: placeholder, categoryId: "cervezas" },
  { id: "malta-1l", name: "Malta (1 L)", shortDescription: "Bebida clásica.", priceUsd: 2.2, image: placeholder, categoryId: "maltas" },
  { id: "bebida-jugo", name: "Bebida/Jugo (1 L)", shortDescription: "Para toda la familia.", priceUsd: 2.0, image: placeholder, categoryId: "bebidas" },
  { id: "licor-ron", name: "Licor (ron)", shortDescription: "Disponible según inventario.", priceUsd: 12.0, image: placeholder, categoryId: "licores" },

  // Electrodomésticos
  { id: "olla-presion", name: "Olla de presión", shortDescription: "Cocina más rápido.", priceUsd: 29.99, image: placeholder, categoryId: "ollas" },
  { id: "arrocera-basica", name: "Arrocera básica", shortDescription: "Ideal para el día a día.", priceUsd: 34.99, image: placeholder, categoryId: "arroceras" },
  { id: "fogon-electrico", name: "Fogón eléctrico", shortDescription: "Práctico y compacto.", priceUsd: 39.99, image: placeholder, categoryId: "fogones" },
  { id: "lavadora-compacta", name: "Lavadora compacta", shortDescription: "Para espacios reducidos.", priceUsd: 199.0, image: placeholder, categoryId: "lavadoras" },
  { id: "refrigerador-7p", name: "Refrigerador 7 pies", shortDescription: "Capacidad familiar.", priceUsd: 329.0, image: placeholder, categoryId: "refrigeracion" },
  { id: "tv-32", name: "TV 32\"", shortDescription: "Entretenimiento en casa.", priceUsd: 149.0, image: placeholder, categoryId: "tvs-y-pequenos-electrodomesticos" },

  // --- Inventario legacy (tal como lo compartiste) ---
  // Nota: estos productos apuntan a categorías TOP LEVEL (combo/carnicos/etc.)
  // y se verán al filtrar por la categoría correspondiente.
  { id: "legacy-carnicos-40", name: "Pollo caja de 33 lb de postas", shortDescription: "Caja de 33 lb de pollo", priceUsd: 38, image: "/images/pollo_caja33.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-42", name: "Lomo de Cerdo Importado", shortDescription: "Porción de 3 Lb", priceUsd: 11.2, image: "/images/lomo.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-2", name: "Pollo paquete de 10 lb", shortDescription: "Paquete de 10 lb de pollo", priceUsd: 11.4, image: "/images/pollo10lb.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-88-a", name: "Pollo paquete de 11 lb", shortDescription: "Paquete de 11 lb de pollo", priceUsd: 13.2, image: "/images/pollo10lb.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-3", name: "Pechuga paquete de 2 kg", shortDescription: "Pechuga de pollo 2 kg", priceUsd: 14, image: "/images/pechuga2kg.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-5", name: "Chuleta de lomo deshuesado 2 lb", shortDescription: "Chuleta de lomo deshuesado", priceUsd: 8.5, image: "/images/chuletalomo.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-6", name: "Masas de cerdo 2 lb", shortDescription: "Masas de cerdo 2 lb", priceUsd: 8, image: "/images/masas.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-7", name: "Bistec de cerdo 2 lb", shortDescription: "Bistec de cerdo 2 lb", priceUsd: 9, image: "/images/bisteclomo.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-10", name: "Picadillo 400 gr de pollo", shortDescription: "Picadillo de pollo 400 gr", priceUsd: 1.85, image: "/images/picadillo.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-11", name: "Hamburguesas mixtas de pollo y cerdo", shortDescription: "Hamburguesas mixtas de pollo y cerdo", priceUsd: 2.3, image: "/images/hamburguesas.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-12", name: "Mortadella Seara de Pollo", shortDescription: "Mortadella de 500 gr", priceUsd: 2.3, image: "/images/seara500.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-13", name: "Mortadella clásica", shortDescription: "Mortadella clásica", priceUsd: 2.3, image: "/images/mortclasica.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-14", name: "Mortadela de queso", shortDescription: "Mortadella de queso", priceUsd: 2.3, image: "/images/mortqueso.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-15", name: "Mortadela de aceituna", shortDescription: "Mortadella con aceituna", priceUsd: 2.3, image: "/images/mortaceit.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-45", name: "Carne de Res troceada", shortDescription: "Bolsa de 1 Kg", priceUsd: 14.4, image: "/images/restroceada.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-17", name: "Hígado de pollo 1 kg", shortDescription: "Hígado de pollo 1 kg", priceUsd: 2.6, image: "/images/higado.png", categoryId: "carnicos-y-embutidos" },
  { id: "legacy-carnicos-18", name: "Salchichas", shortDescription: "Salchichas", priceUsd: 1.75, image: "/images/salchichas.png", categoryId: "carnicos-y-embutidos" },

  // Lácteos y huevos
  { id: "legacy-lacteos-19", name: "Leche entera 1 kg", shortDescription: "Leche entera 1 kg", priceUsd: 10, image: "/images/leche1kg.png", categoryId: "lacteos-y-huevos" },
  { id: "legacy-lacteos-20", name: "Cartón de huevos", shortDescription: "Cartón de huevos frescos", priceUsd: 8.5, image: "/images/huevo30.png", categoryId: "lacteos-y-huevos" },
  { id: "legacy-lacteos-22", name: "Leche condensada de cajita", shortDescription: "Leche condensada de cajita", priceUsd: 1.65, image: "/images/cajitaleche.png", categoryId: "lacteos-y-huevos" },
  { id: "legacy-lacteos-23", name: "Leche condensada lata", shortDescription: "Leche condensada lata", priceUsd: 1.8, image: "/images/nezkaleche.png", categoryId: "lacteos-y-huevos" },
  { id: "legacy-lacteos-55", name: "Helado", shortDescription: "Cubeta de 3L", priceUsd: 9, image: "/images/helado.png", categoryId: "lacteos-y-huevos" },
  { id: "legacy-lacteos-57", name: "Leche en Polvo", shortDescription: "Bolsa de 1 kg", priceUsd: 8.5, image: "/images/lechepolvomu.png", categoryId: "lacteos-y-huevos" },
  { id: "legacy-lacteos-58", name: "Cartón de huevos", shortDescription: "30 uds frescos 100% orgánicos", priceUsd: 9.4, image: "/images/huevo30.png", categoryId: "lacteos-y-huevos" },

  // Cereales, pastas y granos
  { id: "legacy-cereales-24", name: "Frijol negro 1 lb", shortDescription: "Frijol negro 1 lb", priceUsd: 1.2, image: "/images/frijol2lb.png", categoryId: "cereales-pastas-y-granos" },
  { id: "legacy-cereales-25", name: "Arroz Grano Largo", shortDescription: "Arroz bolsa 2 lb", priceUsd: 1.9, image: "/images/arroz2lb.png", categoryId: "cereales-pastas-y-granos" },
  { id: "legacy-cereales-26", name: "Sal 1 lb", shortDescription: "Sal 1 lb", priceUsd: 0.65, image: "/images/sal.png", categoryId: "cereales-pastas-y-granos" },
  { id: "legacy-cereales-27", name: "Azúcar 2 lb", shortDescription: "Azúcar 2 lb", priceUsd: 1.95, image: "/images/azucar2lb.png", categoryId: "cereales-pastas-y-granos" },
  { id: "legacy-cereales-28", name: "Spaguetis", shortDescription: "Spaguetis", priceUsd: 1.2, image: "/images/spaguetis.png", categoryId: "cereales-pastas-y-granos" },
  { id: "legacy-cereales-29", name: "Arroz Grano Largo 25 kg (55 lb)", shortDescription: "Saco de arroz 25 kg (55 lb)", priceUsd: 45, image: "/images/arroz25kgsur.png", categoryId: "cereales-pastas-y-granos" },
  { id: "legacy-cereales-44", name: "Arroz Grano Largo 25 kg (55 lb)", shortDescription: "Saco de arroz 25 kg (55 lb)", priceUsd: 45, image: "/images/Arroz55lbguy.png", categoryId: "cereales-pastas-y-granos" },
  { id: "legacy-cereales-30", name: "Harina de trigo 1 kg", shortDescription: "Harina de trigo 1 kg", priceUsd: 2.3, image: "/images/harinafresko.png", categoryId: "cereales-pastas-y-granos" },
  { id: "legacy-cereales-53", name: "Frijoles Blanco Del Campo", shortDescription: "Bolsa de 16 OZ", priceUsd: 2.4, image: "/images/alubiasdelcampo.png", categoryId: "cereales-pastas-y-granos" },

  // Conservas y enlatados
  { id: "legacy-conserva-31", name: "Pasta de tomate 400 gr", shortDescription: "Pasta de tomate 400 gr", priceUsd: 1.6, image: "/images/pasta400.png", categoryId: "conservas-y-enlatados" },
  { id: "legacy-conserva-43", name: "Pasta de tomate Vima 3 Kg", shortDescription: "Pasta de tomate 3 Kg", priceUsd: 9.4, image: "/images/vima3kg.png", categoryId: "conservas-y-enlatados" },
  { id: "legacy-conserva-32", name: "Pasta de tomate 800 gr", shortDescription: "Pasta de tomate 800 gr", priceUsd: 3.5, image: "/images/800gr.png", categoryId: "conservas-y-enlatados" },
  { id: "legacy-conserva-33", name: "Leche condensada cocinada", shortDescription: "Leche condensada cocinada", priceUsd: 2.2, image: "/images/cocinada.png", categoryId: "conservas-y-enlatados" },
  { id: "legacy-conserva-34", name: "Mayonesa celorio", shortDescription: "Mayonesa Celorio", priceUsd: 4.25, image: "/images/celorio.png", categoryId: "conservas-y-enlatados" },

  // Mercado
  { id: "legacy-mercado-35-a", name: "Aceite 1 L", shortDescription: "Aceite 1 L", priceUsd: 2.95, image: "/images/aceite1l.png", categoryId: "mercado" },
  { id: "legacy-mercado-35-b", name: "Aceite 900 ml", shortDescription: "Aceite 900 ml", priceUsd: 2.65, image: "/images/aceite900ml.png", categoryId: "mercado" },
  { id: "legacy-mercado-36", name: "Chocolate en polvo 500 gr", shortDescription: "Chocolate en polvo 500 gr", priceUsd: 2.9, image: "/images/chocopolvo.png", categoryId: "mercado" },
  { id: "legacy-mercado-37", name: "Gelatina", shortDescription: "Gelatina", priceUsd: 0.9, image: "/images/gelafresa.png", categoryId: "mercado" },
  { id: "legacy-mercado-46", name: "Café La LLave", shortDescription: "Café La Llave 10 oz", priceUsd: 6.9, image: "/images/cafelallave.png", categoryId: "mercado" },
  { id: "legacy-mercado-47", name: "Café La Carreta", shortDescription: "Café Prensado 10 oz", priceUsd: 6.4, image: "/images/cafelacarreta.png", categoryId: "mercado" },
  { id: "legacy-mercado-49", name: "Café Dufiltro", shortDescription: "Café Prensado 250 gr", priceUsd: 4.5, image: "/images/cafedufiltro.png", categoryId: "mercado" },
  { id: "legacy-mercado-51", name: "Refresco Zuko", shortDescription: "Caja de 8 sobres", priceUsd: 2.95, image: "/images/zuko.png", categoryId: "mercado" },
  { id: "legacy-mercado-52", name: "Maíz dulce en granos", shortDescription: "Lata de 445 gr", priceUsd: 1.7, image: "/images/maizdulce.png", categoryId: "mercado" },
  { id: "legacy-mercado-54", name: "Ketchup Kurtz", shortDescription: "Pomo de 10 OZ", priceUsd: 2.95, image: "/images/ketchupkurtz.png", categoryId: "mercado" },

  // Aseo
  { id: "legacy-aseo-38", name: "Papel higiénico", shortDescription: "Papel higiénico", priceUsd: 2.4, image: "/images/papelhigi.png", categoryId: "aseo" },
  { id: "legacy-aseo-39", name: "Jabón 100 gr", shortDescription: "Jabón de 100 gr", priceUsd: 0.48, image: "/images/jabon.png", categoryId: "aseo" },
  { id: "legacy-aseo-56", name: "Detergente polvo Multiuso", shortDescription: "Bolsa de 500 gr", priceUsd: 1.4, image: "/images/detergente.png", categoryId: "aseo" },

  // Agro
  { id: "legacy-agro-59", name: "Boniato", shortDescription: "Bolsa de 5 lb", priceUsd: 2.4, image: "/images/boniato.png", categoryId: "agro-viandas-y-vegetales" },
  { id: "legacy-agro-60", name: "Malanga", shortDescription: "Bolsa de 5 lb", priceUsd: 3.5, image: "/images/malanga.png", categoryId: "agro-viandas-y-vegetales" },
  { id: "legacy-agro-61", name: "Ajo", shortDescription: "Bolsa de 10 cabezas Importados", priceUsd: 2.7, image: "/images/ajo.png", categoryId: "agro-viandas-y-vegetales" },

  // Líquidos
  { id: "legacy-liquidos-62", name: "Whisky Old Star", shortDescription: "Botella de 1 Lts", priceUsd: 7, image: "/images/old.png", categoryId: "liquidos" },
  { id: "legacy-liquidos-63", name: "Cerveza Cristal", shortDescription: "Caja de 24 uds", priceUsd: 24, image: "/images/cristal.png", categoryId: "liquidos" },
  { id: "legacy-liquidos-64", name: "Cerveza Económica", shortDescription: "Caja de 24 uds", priceUsd: 20, image: "/images/timber.png", categoryId: "liquidos" },
  { id: "legacy-liquidos-69", name: "Malta Guajira (330 ml)", shortDescription: "Botella de 330 ml", priceUsd: 0.75, image: "/images/guajira.png", categoryId: "liquidos" },
  { id: "legacy-liquidos-70", name: "Malta Guajira (blister)", shortDescription: "Blister de 6 uds", priceUsd: 4.4, image: "/images/guajirablister.png", categoryId: "liquidos" },

  // Combos (legacy)
  { id: "legacy-combo-88", name: "Combo Navideño 1", shortDescription: "2 Sobres de Spaguetis 500gr, 2 Mortadella Seara 500 gr, 2 Pasta de tomate 400 gr, Botella de aceite 1 Lt", priceUsd: 11.45, image: "/images/navidad1.png", categoryId: "combos" },
  { id: "legacy-combo-65", name: "Combo 1", shortDescription: "Combo surtido (ver descripción completa en imagen/listado).", priceUsd: 89.45, image: "/images/combo1.png", categoryId: "combos" },
  { id: "legacy-combo-66", name: "Combo 2", shortDescription: "Pollo, picadillo, salchichas, huevos, yogurt y leches condensadas.", priceUsd: 34.45, image: "/images/combo2.png", categoryId: "combos" },
  { id: "legacy-combo-67", name: "Combo 3", shortDescription: "Arroz + frijol negro + azúcar.", priceUsd: 17.35, image: "/images/combo3.jpg", categoryId: "combos" },
  { id: "legacy-combo-68", name: "Combo 4", shortDescription: "Cerdo + mortadelas + aceite + gelatina + jabón + malanga gratis.", priceUsd: 37.65, image: "/images/combo4.png", categoryId: "combos" },
  { id: "legacy-combo-71", name: "Combo 5", shortDescription: "12 maltas guajiras + 6 leches condensadas.", priceUsd: 22.6, image: "/images/combo5.png", categoryId: "combos" },
  { id: "legacy-combo-72", name: "Combo 6", shortDescription: "Combo grande surtido (cerdo, arroz, huevos, aseo, etc.).", priceUsd: 65.99, image: "/images/combo6.png", categoryId: "combos" },
  { id: "legacy-combo-73", name: "Combo 7 descuento 10%", shortDescription: "Arroz + frijol + azúcar + aceite.", priceUsd: 30.99, image: "/images/combo7.png", categoryId: "combos" },
  { id: "legacy-combo-74", name: "Combo 8", shortDescription: "Combo surtido con cerdo, básicos, malta y leches condensadas.", priceUsd: 60.99, image: "/images/combo8.png", categoryId: "combos" },

  // Electrodomésticos
  { id: "legacy-electro-76", name: "Olla reina Milexus", shortDescription: "Olla reina de 6L Milexus", priceUsd: 68, image: "/images/reina.png", categoryId: "electrodomesticos" },
  { id: "legacy-electro-77", name: "Olla Arrocera", shortDescription: "Olla arrocera de 1,8 l Milexus", priceUsd: 48, image: "/images/arrocera.png", categoryId: "electrodomesticos" },
  { id: "legacy-electro-80", name: "Fogon Infrarrojo", shortDescription: "Fogon Infrarrojo 1300 W", priceUsd: 58, image: "/images/infra.png", categoryId: "electrodomesticos" },
  { id: "legacy-electro-81", name: "Lavadora Semiautomática Milexus 7 L", shortDescription: "Lavadora semiautomatica 7 L", priceUsd: 210, image: "/images/semi7.png", categoryId: "electrodomesticos" },
  { id: "legacy-electro-82", name: "Split milexus", shortDescription: "Milexus 1200 btu", priceUsd: 285, image: "/images/split.png", categoryId: "electrodomesticos" },
  { id: "legacy-electro-83", name: "Frezeer", shortDescription: "Milexus 3.5 pies", priceUsd: 215, image: "/images/freezer4p.png", categoryId: "electrodomesticos" },
  { id: "legacy-electro-84", name: "Frezeer", shortDescription: "Milexus 4.2 pies", priceUsd: 230, image: "/images/freezer6p.png", categoryId: "electrodomesticos" },
  { id: "legacy-electro-85", name: "Tv de 32", shortDescription: "Tv inteligente 32 pulgadas", priceUsd: 220, image: "/images/32.png", categoryId: "electrodomesticos" },
  { id: "legacy-electro-86", name: "Batidora Milexus", shortDescription: "Batidora 1.5 Lt vaso de cristal", priceUsd: 45, image: "/images/batidora.png", categoryId: "electrodomesticos" },
];
