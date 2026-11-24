// Sets the page title, description, canonical link, social tags and Google structured data (JSON-LD) for each page.
import { useEffect } from "react";
import { SITE } from "./data";

const setMeta = (sel, attr, key, value) => {
  let el = document.head.querySelector(sel);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", value);
};

export function useSEO({ title, description, path = "/", image = "/img/og.jpg", jsonLd }) {
  useEffect(() => {
    const full = title ? title + " | Website Shopping" : "Website Shopping | Websites, E-commerce and AI Agents in India";
    document.title = full;
    const url = SITE + path, img = image.startsWith("http") ? image : SITE + image;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", full);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", img);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", full);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = url;
    let script = document.getElementById("ld-json");
    if (jsonLd) {
      if (!script) { script = document.createElement("script"); script.id = "ld-json"; script.type = "application/ld+json"; document.head.appendChild(script); }
      script.textContent = JSON.stringify(jsonLd);
    } else script?.remove();
    return () => document.getElementById("ld-json")?.remove();
  }, [title, description, path, image, JSON.stringify(jsonLd)]);
}
