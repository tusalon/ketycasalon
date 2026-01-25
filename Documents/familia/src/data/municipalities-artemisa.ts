export type Municipality = {
  id: number;
  name: string;
};

// Artemisa (Cuba) — 11 municipios oficiales.
// IMPORTANT: asumimos que `availableIn` usa estos IDs (1..11).
export const artemisaMunicipalities: Municipality[] = [
  { id: 1, name: "Artemisa" },
  { id: 2, name: "Bahía Honda" },
  { id: 3, name: "Bauta" },
  { id: 4, name: "Caimito" },
  { id: 5, name: "Candelaria" },
  { id: 6, name: "Guanajay" },
  { id: 7, name: "Güira de Melena" },
  { id: 8, name: "Alquízar" },
  { id: 9, name: "Mariel" },
  { id: 10, name: "San Antonio de los Baños" },
  { id: 11, name: "San Cristóbal" },
];
