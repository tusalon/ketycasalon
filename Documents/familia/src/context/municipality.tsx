import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Municipality } from "@/data/municipalities-artemisa";

type MunicipalityContextValue = {
  municipality: Municipality | null;
  setMunicipality: (m: Municipality | null) => void;
};

const MunicipalityContext = createContext<MunicipalityContextValue | null>(null);

const STORAGE_KEY = "tudespensa25_municipality_v1";

function safeLoad(): Municipality | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Municipality;
    if (!parsed || typeof parsed.id !== "number" || typeof parsed.name !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function MunicipalityProvider({ children }: { children: React.ReactNode }) {
  const [municipality, setMunicipalityState] = useState<Municipality | null>(() => safeLoad());

  const setMunicipality = (m: Municipality | null) => {
    setMunicipalityState(m);
  };

  useEffect(() => {
    try {
      if (!municipality) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(municipality));
    } catch {
      // ignore
    }
  }, [municipality]);

  const value = useMemo<MunicipalityContextValue>(() => ({ municipality, setMunicipality }), [municipality]);

  return <MunicipalityContext.Provider value={value}>{children}</MunicipalityContext.Provider>;
}

export function useMunicipality() {
  const ctx = useContext(MunicipalityContext);
  if (!ctx) throw new Error("useMunicipality debe usarse dentro de <MunicipalityProvider>");
  return ctx;
}
