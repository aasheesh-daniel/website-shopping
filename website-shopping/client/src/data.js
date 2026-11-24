// =====================================================================
//  All the words, prices and numbers of the website live in this file.
//  Edit here and the whole site updates.
// =====================================================================

// ---------- Contact ----------
export const PHONE = "8079009647", PHONE_SHOW = "+91 80790 09647";
export const SITE = "https://websiteshopping.in";
export const TEL = "tel:+91" + PHONE;
// WhatsApp link with a ready-made first message
export const wa = (text = "Hi, I would like to know more about your services.") => "https://wa.me/91" + PHONE + "?text=" + encodeURIComponent(text);

// ---------- Money ----------
export const rs = (n) => "Rs. " + Number(n).toLocaleString("en-IN");

// ---------- Artwork used when a plan has no photo ----------
const T = "#FB3640", M = "#FFD3D6", P = "#07180F", D = "#000F08", G = "#FFB627";
const art = () => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#07180F"/><stop offset="1" stop-color="${D}"/></linearGradient>
  <linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C81F2D"/><stop offset=".5" stop-color="${T}"/><stop offset="1" stop-color="#FF5560"/></linearGradient>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B97A0B"/><stop offset="1" stop-color="${G}"/></linearGradient></defs>
  <rect width="640" height="400" fill="url(#bg)"/>
  <rect x="40" y="36" width="560" height="328" rx="3" fill="#0D2218" stroke="#F6F0E6" stroke-opacity=".22"/><rect x="40" y="36" width="560" height="30" rx="3" fill="#07180F"/>
  <circle cx="58" cy="51" r="4.5" fill="${T}"/><circle cx="74" cy="51" r="4.5" fill="${G}"/><circle cx="90" cy="51" r="4.5" fill="#F6F0E6" opacity=".6"/>
  <rect x="60" y="88" width="260" height="150" fill="url(#t)"/><rect x="76" y="104" width="52" height="16" rx="2" fill="${G}"/>
  <rect x="344" y="92" width="230" height="14" rx="2" fill="#F6F0E6" opacity=".85"/><rect x="344" y="114" width="170" height="14" rx="2" fill="#F6F0E6" opacity=".85"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="344" y="${146 + i * 14}" width="${i === 5 ? 140 : 236}" height="6" rx="3" fill="${M}" opacity=".3"/>`).join("")}
  ${[0, 1, 2].map(i => `<rect x="${60 + i * 184}" y="262" width="168" height="2" fill="${i === 1 ? G : T}"/>` + [0, 1, 2, 3].map(j => `<rect x="${60 + i * 184}" y="${276 + j * 15}" width="${j === 3 ? 100 : 168}" height="6" rx="3" fill="${M}" opacity=".3"/>`).join("")).join("")}
  </svg>`);

// ---------- Plans (the services page, cart and home all read this list) ----------
// price / advance are numbers. from:true shows "Starting from".
export const PRODUCTS = [
  {
    id: "portfolio", icon: "Portfolio", name: "Simple Portfolio Website", short: "Portfolio Website",
    tag: "A clean, fast personal or business website that shows your work and brings enquiries.",
    price: 4999, advance: 1000, from: false, note: "One simple price for the complete website.",
    img: "/img/portfolio.jpg", fb: art(), badge: "Best for beginners",
    idealFor: ["Freelancers and creators", "Doctors, lawyers and consultants", "Small businesses starting online"],
    includes: ["Responsive on phone, tablet and desktop", "Sections for about, skills, projects and contact", "Contact form and WhatsApp button", "Basic SEO: titles, descriptions and sitemap", "Fast loading with smooth animations", "Clean, custom code"],
  },
  {
    id: "ecommerce", icon: "Store", name: "Full Stack E-commerce Website (Deployed)", short: "E-commerce Website",
    tag: "A complete online store, built on the MERN stack and launched live, ready to take orders.",
    price: 14999, advance: 3000, from: false, note: "Including all costs.",
    img: "/img/ecommerce.jpg", fb: art(), badge: "Most popular",
    idealFor: ["Shops moving online", "D2C and home brands", "Anyone who wants to own their store"],
    includes: ["Full stack MERN store: MongoDB, Express, React, Node", "Product catalog with search and categories", "Cart and checkout", "Admin panel to add products and manage orders", "Secure customer login", "Payment gateway integration (Razorpay or Stripe)", "SEO-ready product pages", "Deployed live, all costs included"],
  },
  {
    id: "ecommerce-app", icon: "StoreApp", name: "Full Stack E-commerce Website + App", short: "E-commerce + App",
    tag: "Your online store plus a mobile app, so customers can shop from your website or from their phone.",
    price: 19000, advance: 6000, from: false, note: "Including all costs.",
    img: "/img/ecommerce-app.jpg", fb: art(), badge: "Complete package",
    idealFor: ["Brands with repeat customers", "Businesses that want an app icon on the phone", "Growing stores ready to scale"],
    includes: ["Everything in the E-commerce Website plan", "Mobile app connected to the same store", "One admin panel for website and app", "Order status updates for customers", "Payment gateway integration (Razorpay or Stripe)", "Deployed live, all costs included"],
  },
  {
    id: "ai-agents", icon: "Brain", name: "AI Agents and Automation", short: "AI Agents",
    tag: "AI agents that answer customers, take bookings and automate repeat work, day and night.",
    price: 11999, advance: 2000, from: true, note: "Final price depends on tasks, tools and channels.",
    img: "/img/ai-agents.jpg", fb: art(), badge: "Future ready",
    idealFor: ["Restaurants and cafes", "Real estate and travel", "Customer support teams"],
    includes: ["Trained on your business data", "Works on your website and WhatsApp", "Hands the chat to you when needed", "Dashboard to review every conversation", "Automates bookings, replies and follow-ups"],
  },
  {
    id: "other-websites", icon: "Layers", name: "Other Websites (News, Blog, Cafe and more)", short: "Other Websites",
    tag: "News, blog, cafe, education, business or job portal websites, built to your idea.",
    price: 6999, advance: 1500, from: true, note: "Final price depends on pages and features.",
    img: art(), fb: art(), badge: "Custom",
    idealFor: ["News and blog publishers", "Cafes and restaurants", "Education and job portals"],
    includes: ["Responsive on every screen", "SEO-ready and fast", "Admin panel to edit content", "Payment integration if you need it", "Built to your idea and brand"],
  },
];
export const byId = (id) => PRODUCTS.find(p => p.id === id);

// ---------- Home: ticker, steps, FAQ, stats ----------
export const TICKER = [
  "Portfolio websites from Rs. 4,999, advance Rs. 1,000",
  "Full stack e-commerce live from Rs. 14,999, all costs included",
  "AI agents and automation from Rs. 11,999",
  "Founded by Aasheesh Daniel, Post Graduate from VIT Chennai",
  "Call or WhatsApp " + PHONE_SHOW,
];

export const STEPS = [
  ["Pick your plan", "Choose a website, store, app or AI agent plan on the services page."],
  ["Add it to your cart", "Add one or more plans. The cart shows your total and your advance."],
  ["Connect with us", "Call or WhatsApp us to confirm the details of your project."],
  ["We build and launch", "Built in-house on the MERN stack, then launched online."],
];

export const STATS = [
  { value: 4999, prefix: "Rs. ", label: "Portfolio sites from" },
  { value: 1000, prefix: "Rs. ", label: "Lowest advance to start" },
  { value: 5, label: "Ready-made plans" },
  { value: 3, suffix: "+", label: "Years of partner experience" },
];

export const FAQ = [
  ["How much does a website or AI agent cost?", "Portfolio websites start at Rs. 4,999. Full stack e-commerce is Rs. 14,999 and e-commerce with an app is Rs. 19,000, both including all costs. AI agents start from Rs. 11,999 and other websites from Rs. 6,999."],
  ["How much advance do I pay?", "Rs. 1,000 for a portfolio, Rs. 3,000 for e-commerce, Rs. 6,000 for e-commerce with an app, Rs. 2,000 for AI agents and Rs. 1,500 for other websites."],
  ["What are the websites built with?", "Everything is built in-house on the MERN stack: MongoDB, Express, React and Node."],
  ["Can I take payments on my website?", "Yes. We connect Razorpay or Stripe so the money lands in your account."],
  ["What happens when the AI agent cannot answer?", "It hands the conversation to you or your staff. You can review every chat in the dashboard."],
  ["Where are you based?", "We are in Jaipur, Rajasthan, and work with businesses across India."],
];

// ---------- Journey (the animated line page) ----------
export const JOURNEY = [
  { icon: "Globe", label: "Chapter 01", title: "The first website", text: "Every story starts with one page. Our first website taught us what a real business needs: a clear message, fast loading and an easy way for customers to reach you." },
  { icon: "Target", label: "Chapter 02", title: "Systems that sell", text: "A site that only looks good does not pay the bills. We moved from pages to systems: clear plans, product catalogs, enquiry forms and WhatsApp buttons that turn visitors into customers." },
  { icon: "Funnel", label: "Chapter 03", title: "Leads", text: "Every visitor is a possible customer. We built forms and WhatsApp flows that save each lead and send it straight to the founder, so no enquiry is lost." },
  { icon: "Store", label: "Chapter 04", title: "The full stack stores", text: "Complete online stores on the MERN stack: catalog, cart, payments, admin panel and live deployment. Real client work, like Trade With King, proved the process." },
  { icon: "Brain", label: "Chapter 05", title: "The AI leap", text: "AI agents changed what a small business can do. Projects like the RAG Hallucination Detector sharpened our engineering, and now agents answer customers, take bookings and automate repeat work." },
  { icon: "Flag", label: "Today", title: "websiteshopping.in", text: "Everything comes together on one platform: clear prices, small advances, websites, stores, apps and AI agents, built by a founder-led team and delivered across India." },
];

// ---------- Projects ----------
export const PROJECTS = [
  {
    id: "tradewithking", kind: "Live website", name: "Trade With King", url: "https://tradewithking.in",
    summary: "Forex trading mentorship platform",
    description: "A premium website for a forex trading mentorship brand. It offers structured trading education, mentorship, live market sessions and a trading community. We designed the full experience: an animated home page, session pages, plan and pricing sections, community and FAQ areas, contact options and formal policy pages.",
    points: [["Designed to convert", "A bold, dark, premium look with clear plans and one-tap contact options."], ["Built for trust", "Formal policy pages, a clear structure and a professional feel from the first screen."], ["Client approved", "The client wrote that the website is truly worth every penny. See it on the reviews page."]],
    tags: ["React", "Vite", "Custom CSS", "Animations", "SEO"],
  },
  {
    id: "payzap", kind: "Engineering project", name: "PayZap", url: null,
    summary: "Digital wallet and payment platform",
    description: "A production-style wallet platform with 20+ REST APIs covering authentication, wallet management, peer-to-peer transfers and payment processing.",
    points: [["Correct by design", "Processed and stress-tested 10,000+ transactions with atomic database operations, a double-entry ledger and idempotency safeguards that prevent duplicate payments and balance inconsistencies."], ["Fast under load", "Redis caching, asynchronous job processing and database optimization brought average API response time under 200 ms in load testing."], ["Secure and tested", "JWT authentication, role-based authorization, rate limiting and Docker-based deployment, backed by 90%+ automated test coverage."]],
    tags: ["Node.js", "Express.js", "React", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "rag", kind: "AI project", name: "RAG Hallucination Detector", url: null,
    summary: "Answers questions from documents, then checks them",
    description: "An end-to-end retrieval-augmented generation pipeline that answers questions from documents, then judges whether each answer is backed by the evidence.",
    points: [["At scale", "Processed 10K+ document chunks using Transformer embeddings."], ["Accurate", "Reached 90%+ detection accuracy, with evidence-backed results."]],
    tags: ["Python", "Transformers", "RAG", "Embeddings", "FLAN-T5", "XGBoost"],
  },
];

// ---------- Team ----------
export const FOUNDER = { name: "Aasheesh Daniel", role: "Founder", line: "Post Graduate from VIT Chennai", photo: "/img/founder.jpg" };
export const PARTNERS = [
  { name: "Anubhav Verma", role: "Partner", line: "Data Science postgraduate from VIT Chennai with years of experience in development" },
  { name: "Raghav", role: "Partner", line: "Data Science postgraduate from VIT Chennai with years of experience in development" },
  { name: "Dev Sharma", role: "Partner", line: "Works at Ad2Ship, with 3+ years of experience" },
];

// ---------- Reviews ----------
// Voice notes. Files are in client/public/audio/. Change the name and role to the real client details.
export const VOICE = [
  { id: "v1", who: "Client voice note", role: "Website client", src: "/audio/note1", seconds: 36 },
  { id: "v2", who: "Client voice note", role: "Website client", src: "/audio/note2", seconds: 38 },
  { id: "v3", who: "Client voice note", role: "Website client", src: "/audio/note3", seconds: 18 },
];
export const CHAT_REVIEW = { img: "/img/review-chat.jpg", who: "Trade With King", role: "Client message on WhatsApp", alt: "WhatsApp message from the Trade With King client saying the website is worth every penny and that they are genuinely impressed with the final result" };

export const TECH = ["React", "Node.js", "Express", "MongoDB", "Vite", "PostgreSQL", "Redis", "Docker", "Razorpay", "Stripe", "WhatsApp", "REST APIs", "SEO", "AI Agents", "RAG"];

// pops up the dialer / WhatsApp from any "Talk to us" button
export const IDEA_SENT = (name, idea) => `Hii, my name is ${name || "a visitor"} and i want ${idea}`;
