import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  productId: string;
  name: string;
  priceUsd: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" };

const STORAGE_KEY = "combos_familia_cart_v1";

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const q = action.quantity ?? 1;
      const existing = state.items.find((i) => i.productId === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.product.id ? { ...i, quantity: i.quantity + q } : i,
          ),
        };
      }
      return {
        items: [
          {
            productId: action.product.id,
            name: action.product.name,
            priceUsd: action.product.priceUsd,
            image: action.product.image,
            quantity: q,
          },
          ...state.items,
        ],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    case "SET_QTY": {
      const qty = Math.max(1, Math.min(99, Math.floor(action.quantity || 1)));
      return {
        items: state.items.map((i) => (i.productId === action.productId ? { ...i, quantity: qty } : i)),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalUsd: number;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function safeLoad(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed?.items || !Array.isArray(parsed.items)) return { items: [] };
    return {
      items: parsed.items
        .filter(Boolean)
        .map((i) => ({
          productId: String((i as any).productId ?? (i as any).comboId ?? ""),
          name: String(i.name),
          priceUsd: Number(i.priceUsd),
          image: String(i.image),
          quantity: Number(i.quantity) || 1,
        }))
        .filter((i) => i.productId && i.name && Number.isFinite(i.priceUsd)),
    };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, safeLoad);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotalUsd = state.items.reduce((acc, i) => acc + i.quantity * i.priceUsd, 0);
    return {
      items: state.items,
      count,
      subtotalUsd,
      add: (product, quantity) => dispatch({ type: "ADD", product, quantity }),
      remove: (productId) => dispatch({ type: "REMOVE", productId }),
      setQty: (productId, quantity) => dispatch({ type: "SET_QTY", productId, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
