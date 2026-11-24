import ecommerce from "./ecommerce";
import aiagents from "./aiagents";

// Two SEO articles. To add a post: add one more object here and one more content file.
export const BLOGS = [
  {
    slug: "why-build-an-ecommerce-website",
    title: "Why Build an E-commerce Website in 2026? The Complete Guide for Indian Businesses",
    short: "Why build an e-commerce website?",
    description: "Why build an e-commerce website in India? 10 reasons, real market data, e-commerce website cost in India, must-have features and a step-by-step start guide.",
    keywords: ["why build an e-commerce website", "e-commerce website cost in India", "start an online store in India", "e-commerce website development India", "sell online India"],
    category: "E-commerce",
    date: "2026-11-21", dateLabel: "21 Nov 2026",
    cover: "/img/blog-ecommerce.jpg",
    body: ecommerce,
  },
  {
    slug: "how-to-build-and-work-with-ai-agents",
    title: "How to Build and Work With AI Agents: A Practical Guide for Business Owners",
    short: "How to build and work with AI agents",
    description: "Learn what AI agents are, how to build an AI agent step by step, how to work with it safely, costs in India and real use cases for small businesses.",
    keywords: ["how to build AI agents", "AI agents for business", "AI automation for small business India", "WhatsApp AI agent", "AI agent development India"],
    category: "AI agents",
    date: "2026-11-21", dateLabel: "21 Nov 2026",
    cover: "/img/blog-ai.jpg",
    body: aiagents,
  },
].map(b => {
  const words = b.body.split(/\s+/).filter(Boolean).length;
  return { ...b, words, minutes: Math.max(1, Math.round(words / 200)) };
});

// ---- tiny markdown reader: turns the text above into blocks the page can draw ----
export function parse(md) {
  const blocks = []; let list = null;
  const flush = () => { if (list) { blocks.push(list); list = null; } };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    let m;
    if ((m = line.match(/^## (.+)/))) { flush(); blocks.push({ t: "h2", text: m[1] }); }
    else if ((m = line.match(/^### (.+)/))) { flush(); blocks.push({ t: "h3", text: m[1] }); }
    else if ((m = line.match(/^- (.+)/))) { if (!list || list.t !== "ul") { flush(); list = { t: "ul", items: [] }; } list.items.push(m[1]); }
    else if ((m = line.match(/^\d+\. (.+)/))) { if (!list || list.t !== "ol") { flush(); list = { t: "ol", items: [] }; } list.items.push(m[1]); }
    else if ((m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))) { flush(); blocks.push({ t: "img", alt: m[1], src: m[2] }); }
    else if ((m = line.match(/^> (.+)/))) { flush(); blocks.push({ t: "quote", text: m[1] }); }
    else { flush(); blocks.push({ t: "p", text: line }); }
  }
  flush();
  return blocks;
}
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// FAQ questions inside a post (used for Google FAQ rich results)
export function faqOf(blocks) {
  const i = blocks.findIndex(b => b.t === "h2" && /frequently asked/i.test(b.text));
  if (i < 0) return [];
  const out = [];
  for (let k = i + 1; k < blocks.length && blocks[k].t !== "h2"; k++) {
    if (blocks[k].t === "h3") out.push({ q: blocks[k].text, a: blocks[k + 1]?.t === "p" ? blocks[k + 1].text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*/g, "") : "" });
  }
  return out;
}
