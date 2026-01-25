function stripDiacritics(input: string) {
  return input.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function normalizeText(input: string) {
  return stripDiacritics(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function bigrams(s: string) {
  const out: string[] = [];
  if (s.length < 2) return out;
  for (let i = 0; i < s.length - 1; i++) out.push(s.slice(i, i + 2));
  return out;
}

/**
 * Similaridad (0..1) basada en Dice coefficient sobre bigramas.
 * Barata y suficiente para “buscar productos similares” sin dependencias.
 */
export function fuzzyScore(queryRaw: string, candidateRaw: string) {
  const q = normalizeText(queryRaw);
  const c = normalizeText(candidateRaw);
  if (!q || !c) return 0;
  if (c === q) return 1;
  if (c.includes(q)) return 0.92;

  const qb = bigrams(q);
  const cb = bigrams(c);
  if (qb.length === 0 || cb.length === 0) return 0;

  const counts = new Map<string, number>();
  for (const b of cb) counts.set(b, (counts.get(b) ?? 0) + 1);

  let intersection = 0;
  for (const b of qb) {
    const n = counts.get(b) ?? 0;
    if (n > 0) {
      intersection++;
      counts.set(b, n - 1);
    }
  }

  return (2 * intersection) / (qb.length + cb.length);
}

export function filterAndSortByQuery<T>(items: T[], query: string, getText: (item: T) => string) {
  const q = normalizeText(query);
  if (!q) return items;

  const scored = items
    .map((item) => {
      const text = getText(item);
      const score = fuzzyScore(q, text);
      // Bonus por match completo de palabra.
      const normText = normalizeText(text);
      const tokenBonus = normText.split(" ").includes(q) ? 0.08 : 0;
      return { item, score: Math.min(1, score + tokenBonus) };
    })
    // Umbral para evitar ruido.
    .filter((x) => x.score >= 0.25)
    .sort((a, b) => b.score - a.score);

  return scored.map((x) => x.item);
}
