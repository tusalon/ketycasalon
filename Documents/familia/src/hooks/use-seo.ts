import { useEffect } from "react";

type UseSeoOptions = {
  title: string;
  description?: string;
  canonicalPath?: string;
};

function ensureMeta(name: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  return meta;
}

function ensureCanonical() {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  return link;
}

export function useSeo({ title, description, canonicalPath }: UseSeoOptions) {
  useEffect(() => {
    document.title = title;
    if (description) {
      ensureMeta("description").setAttribute("content", description);
    }
    if (canonicalPath) {
      const base = window.location.origin;
      ensureCanonical().setAttribute("href", `${base}${canonicalPath}`);
    }
  }, [title, description, canonicalPath]);
}
