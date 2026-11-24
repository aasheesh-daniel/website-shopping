import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PRODUCTS, byId, rs, STEPS, PHONE_SHOW, TEL } from "./data";
import { useCart } from "./cartStore";
import { PageHeader, AddBtn, ServiceCard, Heading, Badge, imgOf } from "./Parts";
import { Reveal, gsap } from "./fx";
import { useContact } from "./ContactWindow";
import { useSEO } from "./seo";
import { Arrow, Check, Cart, Devices, Sliders, Code, Card, Zap } from "./Icons";
import NicheGallery from "./NicheGallery";
import { detailImgOf } from "./PortalTransition";

const DETAIL_META = {
  portfolio: {
    timeline: "3 – 5 Days Delivery",
    stack: "React 18 · Vite · Custom CSS · Semantic SEO",
    hosting: "Cloudflare / Vercel Global Edge CDN",
    eng: [
      ["Frontend & SEO", "React 18 + Vite static edge build with dynamic meta tags, Open Graph cards & XML sitemap.", "98+ Lighthouse"],
      ["Enquiry Engine", "Validated contact form with honeypot spam guard + one-tap WhatsApp lead prefill.", "< 120ms Load"],
      ["CI/CD & Handover", "GitHub Actions automated build checks, SSL HTTPS & 100% clean source ownership.", "100% Owned"],
    ],
  },
  ecommerce: {
    timeline: "12 – 14 Days Delivery",
    stack: "MongoDB · Express · React · Node.js (MERN)",
    hosting: "Full Live Deployment + Razorpay/Stripe Included",
    eng: [
      ["MERN Storefront", "React catalog with instant category filtering, SEO product URLs & persistent cart.", "98+ Web Vitals"],
      ["Backend & Database", "Node.js + Express REST APIs backed by MongoDB Atlas with schema validation & admin CMS.", "< 180ms API"],
      ["Checkout & CI/CD", "Razorpay / Stripe UPI & card settlement to your bank + automated GitHub CI/CD pipeline.", "Zero-Downtime"],
    ],
  },
  "ecommerce-app": {
    timeline: "18 – 21 Days Delivery",
    stack: "MERN Core + Android & iOS Mobile App",
    hosting: "Unified Store + Mobile App Deployment Included",
    eng: [
      ["Unified Web + App", "Single React + Mobile codebase connected to one real-time inventory & order backend.", "1 Admin Panel"],
      ["Realtime Orders", "Customer accounts, live order status tracking & instant push/WhatsApp alerts.", "< 200ms Sync"],
      ["Payments & Cloud", "Razorpay / Stripe gateway + cloud API hosting + GitHub Actions CI/CD release pipeline.", "99.9% Uptime"],
    ],
  },
  "ai-agents": {
    timeline: "7 – 10 Days Delivery",
    stack: "Node.js · Python RAG · LLM Tools · WhatsApp API",
    hosting: "Cloud Agent Runtime + Conversation Dashboard",
    eng: [
      ["RAG Knowledge Base", "Vector embeddings grounded strictly in your verified menus, prices, policies & FAQs.", "90%+ Grounded"],
      ["Tool Calling & Actions", "Books slots, captures leads in MongoDB, checks order status & hands off to humans cleanly.", "24/7 Active"],
      ["WhatsApp & Monitoring", "Live website + WhatsApp Business integration with full audit dashboard & CI/CD updates.", "Human Handover"],
    ],
  },
  "other-websites": {
    timeline: "7 – 12 Days Delivery",
    stack: "MERN Stack · Custom Admin CMS · REST APIs",
    hosting: "Fast Edge Hosting + Custom Domain Ready",
    eng: [
      ["Custom Architecture", "Tailored frontend for news portals, cafes, blogs, education or job boards with fast SEO.", "SEO-First"],
      ["Admin CMS & Roles", "Self-editable dashboard for articles, listings, menus or bookings backed by MongoDB.", "Full Control"],
      ["Payments & CI/CD", "Optional Razorpay/Stripe checkout + automated GitHub Actions build checks & cloud deploy.", "100% Owned"],
    ],
  },
};

/* ---------- Services list ---------- */
export function Services() {
  const { open } = useContact();
  useSEO({
    title: "Services and Pricing: Websites, E-commerce, Apps and AI Agents",
    description: "Portfolio website Rs. 4,999, full stack e-commerce Rs. 14,999, e-commerce with app Rs. 19,000, AI agents from Rs. 11,999 and other websites from Rs. 6,999. Small advance to start.",
    path: "/services",
    jsonLd: { "@context": "https://schema.org", "@type": "ItemList", itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: "https://websiteshopping.in/services/" + p.id, name: p.name })) },
  });
  return (
    <>
      <PageHeader label="Services and pricing" line1="Our" line2="services" lead="Five clear plans with the price and the advance on every one. Click any website card to launch its dedicated interactive showcase." />
      <NicheGallery compact />
      <section className="section alt">
        <div className="container">
          <div className="grid five">{PRODUCTS.map((p, i) => <ServiceCard key={p.id} p={p} delay={i * 70} />)}</div>
          <Reveal variant="zoom" className="quote-banner left helpbar">
            <div><h3>Not sure which plan fits?</h3><p>Tell us what you sell and we will point you to the right one.</p></div>
            <button className="btn btn-red" onClick={() => open("Hi, I need help choosing a plan.")}>Talk to us</button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- WHOLE NEW PAGE: Perfume-Style Spatial Zoom + Scroll-Lock Interactive Showcase ---------- */
export function ServiceDetail() {
  const { id } = useParams();
  const location = useLocation();
  const fromMorph = Boolean(location.state?.fromMorph);
  const navigate = useNavigate();
  const p = byId(id);
  const { cart } = useCart();
  const { open } = useContact();

  const stageRoot = useRef(null);
  const stagePin = useRef(null);
  const stRef = useRef(null);

  const [chapter, setChapter] = useState(0); // 0: Spotlight, 1: What You Get, 2: Backend & CI/CD, 3: Launch Plan
  const [hudTab, setHudTab] = useState("overview");
  const [deviceView, setDeviceView] = useState("storefront");
  const [pinned, setPinned] = useState(false);

  useSEO(
    p
      ? {
          title: p.name + " | " + (p.from ? "from " : "") + rs(p.price),
          description: p.tag + " " + (p.from ? "Starting from " : "") + rs(p.price) + ", advance " + rs(p.advance) + ". Built on the MERN stack in India.",
          path: "/services/" + p.id,
          image: p.img.startsWith("/") ? p.img : "/img/" + p.id + ".svg",
          jsonLd: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: p.name,
            description: p.tag,
            provider: { "@type": "Organization", name: "Website Shopping" },
            areaServed: "IN",
            offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, url: "https://websiteshopping.in/services/" + p.id },
          },
        }
      : { title: "Plan not found", description: "This plan does not exist.", path: "/services" }
  );

  useEffect(() => {
    setChapter(0);
    setHudTab("overview");
    setDeviceView("storefront");
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!p || !stageRoot.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px) and (min-height: 660px) and (prefers-reduced-motion: no-preference)", () => {
      if (stagePin.current && stagePin.current.scrollHeight > window.innerHeight + 24) {
        setPinned(false);
        return () => {};
      }
      setPinned(true);
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: stageRoot.current,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 3.0),
          pin: stagePin.current,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const c = Math.min(3, Math.floor(self.progress * 4));
            setChapter(c);
          },
        },
      }).scrollTrigger;
      stRef.current = st;
      return () => {
        stRef.current = null;
        setPinned(false);
      };
    });
    return () => mm.revert();
  }, [p]);

  if (!p) {
    return (
      <PageHeader label="Error 404" line1="Plan" line2="not found" lead="We could not find that plan.">
        <Link className="btn btn-teal" to="/services">Back to services</Link>
      </PageHeader>
    );
  }

  const meta = DETAIL_META[p.id] || DETAIL_META.ecommerce;
  const idx = PRODUCTS.indexOf(p);
  const more = [1, 2, 3].map((n) => PRODUCTS[(idx + n) % PRODUCTS.length]);
  const inCart = cart.includes(p.id);

  const jumpChapter = (c) => {
    setChapter(c);
    const st = stRef.current;
    if (st) {
      const target = st.start + ((c + 0.35) / 4) * (st.end - st.start);
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  const CHAPTERS = [
    ["01", "Spotlight"],
    ["02", "What You Get"],
    ["03", "Backend & CI/CD"],
    ["04", "Launch Plan"],
  ];

  return (
    <>
      {/* FULL-SCREEN PERFUME-STYLE SPATIAL ZOOM + SCROLL-LOCK EXPERIENCE */}
      <section className={"sd-spatial" + (pinned ? " is-pinned" : "") + (fromMorph ? " sd-morphed" : "")} ref={stageRoot} key={p.id}>
        <div className="sd-pin" ref={stagePin}>
          {/* Top Navigation Bar inside the Spatial Stage */}
          <div className="container sd-top-bar">
            <Link to="/" className="sd-back">← Back to All 5 Websites</Link>

            <div className="sd-chapter-pills" role="tablist" aria-label="Scroll-lock inspection stages">
              {CHAPTERS.map(([num, label], cIdx) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={chapter === cIdx}
                  className={chapter === cIdx ? "on" : ""}
                  onClick={() => jumpChapter(cIdx)}
                >
                  <b>{num}</b> {label}
                </button>
              ))}
            </div>

            <div className="sd-device-pills" role="group" aria-label="Interactive screen preview">
              <button type="button" className={deviceView === "storefront" ? "on" : ""} onClick={() => setDeviceView("storefront")}>
                <Devices /> Storefront
              </button>
              <button type="button" className={deviceView === "admin" ? "on" : ""} onClick={() => setDeviceView("admin")}>
                <Sliders /> Admin CMS
              </button>
              <button type="button" className={deviceView === "checkout" ? "on" : ""} onClick={() => setDeviceView("checkout")}>
                <Card /> Checkout
              </button>
            </div>
          </div>

          {/* 3-Column Balanced Museum Showcase: Left Spec HUD | Center Enlarged Backlit Niche | Right Animated Scroll-Locked Story */}
          <div className="sd-stage-grid">
            {/* LEFT: FROSTED GLASS SPECIFICATION HUD (Always Interactive) */}
            <aside className="sd-hud">
              <div className="sd-hud-head">
                <span className="ng-hud-badge">{p.badge}</span>
                <span className="sd-time">{meta.timeline}</span>
              </div>
              <h1 className="sd-title"><em>{p.name}</em></h1>
              <p className="sd-lead">{p.tag}</p>

              <div className="sd-hud-tabs" role="tablist">
                <button type="button" className={hudTab === "overview" ? "on" : ""} onClick={() => setHudTab("overview")}>
                  Overview
                </button>
                <button type="button" className={hudTab === "deliverables" ? "on" : ""} onClick={() => setHudTab("deliverables")}>
                  Included ({p.includes.length})
                </button>
                <button type="button" className={hudTab === "specs" ? "on" : ""} onClick={() => setHudTab("specs")}>
                  Tech Stack
                </button>
              </div>

              {hudTab === "overview" && (
                <div className="sd-hud-panel">
                  <p className="sd-note">{p.note} Built in-house on the MERN stack, tailored to your brand and ready to launch.</p>
                  <div className="sd-facts-mini">
                    <div><span>Stack</span><b>{meta.stack}</b></div>
                    <div><span>Hosting</span><b>{meta.hosting}</b></div>
                    <div><span>Direct Support</span><b><a href={TEL}>{PHONE_SHOW}</a></b></div>
                  </div>
                </div>
              )}

              {hudTab === "deliverables" && (
                <ul className="sd-hud-list">
                  {p.includes.map((f) => (
                    <li key={f}><Check /><span>{f}</span></li>
                  ))}
                </ul>
              )}

              {hudTab === "specs" && (
                <div className="sd-hud-panel">
                  <div className="sd-facts-mini">
                    <div><span>Delivery</span><b>{meta.timeline}</b></div>
                    <div><span>Ownership</span><b>100% Clean Source Code</b></div>
                    <div><span>SEO &amp; Speed</span><b>Meta, Sitemap &amp; JSON-LD</b></div>
                  </div>
                </div>
              )}

              <div className="sd-price-bar">
                <div className="sd-pill-opt">
                  <span>Advance Deposit</span>
                  <strong>{rs(p.advance)}</strong>
                </div>
                <div className="sd-pill-opt main">
                  <span>{p.from ? "Starting Total" : "Complete Price"}</span>
                  <strong className="shiny">{rs(p.price)}</strong>
                </div>
              </div>

              <div className="sd-actions">
                <AddBtn id={p.id} small={false} />
                {inCart ? (
                  <Link className="btn btn-teal" to="/cart"><Cart /> Go to cart</Link>
                ) : (
                  <button className="btn btn-teal" onClick={() => open("Hi, I am interested in: " + p.name)}>
                    Talk to us
                  </button>
                )}
              </div>
            </aside>

            {/* CENTER: ENLARGED BACKLIT ARCHITECTURAL ALCOVE (Perfume-Style Zoomed Object) */}
            <div className={"sd-alcove-wrap ch-" + chapter + " view-" + deviceView}>
              <div className="sd-alcove">
                <div className="sd-cone-light" aria-hidden="true" />
                <div className="sd-object">
                  <div className="sd-browser">
                    <div className="chrome">
                      <i /><i /><i />
                      <span>
                        {deviceView === "admin"
                          ? `admin.websiteshopping.in/${p.id}`
                          : deviceView === "checkout"
                          ? `checkout · razorpay & upi`
                          : `websiteshopping.in/${p.id}`}
                      </span>
                    </div>
                    <div className={"sd-screen-box" + (p.id === "portfolio" ? " is-tall-preview" : "")}>
                      <img
                        src={detailImgOf(p)}
                        alt={p.name + " design preview"}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = p.fb;
                        }}
                      />
                      {deviceView !== "storefront" && (
                        <div className="sd-screen-ov" key={deviceView}>
                          <span className="sd-ov-pill">
                            {deviceView === "admin" ? "Self-Managed Admin CMS" : "Direct UPI & Card Payouts"}
                          </span>
                          <strong>
                            {deviceView === "admin"
                              ? "Add products, edit photos & track orders anytime"
                              : "Razorpay / Stripe connected directly to your bank"}
                          </strong>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="sd-mobile-companion" aria-hidden="true">
                    <i />
                    <img src={detailImgOf(p)} alt="" />
                  </div>
                </div>
                <div className="sd-stone-plinth" aria-hidden="true" />
              </div>
              <div className="sd-alcove-caption">
                <span>Stage 0{chapter + 1} / 04 · {CHAPTERS[chapter][1]}</span>
              </div>
            </div>

            {/* RIGHT: SCROLL-LOCKED ANIMATED STORY PANEL ("What You Get", "Backend & CI/CD", "Launch Plan") */}
            <aside className="sd-story-panel" key={chapter} aria-live="polite">
              {chapter === 0 && (
                <div className="sd-story-card">
                  <span className="sd-st-kicker"><Zap /> 01 / Flagship Spotlight</span>
                  <h2>Built to Win Customers From Day One</h2>
                  <p>{p.tag}</p>
                  <div className="sd-st-highlights">
                    {p.includes.slice(0, 4).map((item, i) => (
                      <div key={item} className="sd-st-item" style={{ "--i": i }}>
                        <span className="sd-st-dot"><Check /></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => jumpChapter(1)}>
                    Scroll or click to see full deliverables →
                  </button>
                </div>
              )}

              {chapter === 1 && (
                <div className="sd-story-card">
                  <span className="sd-st-kicker"><Check /> 02 / What You Are Going To Get</span>
                  <h2>Every Deliverable Included</h2>
                  <div className="sd-deliv-stack">
                    {p.includes.map((item, i) => (
                      <div key={item} className="sd-deliv-row" style={{ "--i": i }}>
                        <b>0{i + 1}</b>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {chapter === 2 && (
                <div className="sd-story-card">
                  <span className="sd-st-kicker"><Code /> 03 / Backend, Security &amp; CI/CD</span>
                  <h2>Engineering Under The Hood</h2>
                  <div className="sd-eng-stack">
                    {meta.eng.map(([title, desc, badge], i) => (
                      <div key={title} className="sd-eng-row" style={{ "--i": i }}>
                        <div className="sd-eng-row-top">
                          <strong>{title}</strong>
                          <span>{badge}</span>
                        </div>
                        <p>{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {chapter === 3 && (
                <div className="sd-story-card">
                  <span className="sd-st-kicker"><Arrow /> 04 / Ideal For &amp; Launch Steps</span>
                  <h2>From Booking to Live Launch</h2>
                  <div className="sd-ideal-chips">
                    {p.idealFor.map((aud) => (
                      <span key={aud}><Check /> {aud}</span>
                    ))}
                  </div>
                  <div className="sd-steps-mini">
                    {STEPS.map(([t, d], i) => (
                      <div key={t} className="sd-step-mini" style={{ "--i": i }}>
                        <b>0{i + 1}</b>
                        <div>
                          <strong>{t}</strong>
                          <span>{d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Bottom Perfume-Style Collection Strip: Switch directly between all 5 websites */}
          <div className="container sd-bottom-bar">
            <div className="sd-collection-strip" role="navigation" aria-label="Switch website plan">
              {PRODUCTS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className={"sd-col-item" + (item.id === p.id ? " on" : "")}
                  onClick={() => navigate("/services/" + item.id)}
                >
                  <b>0{i + 1}</b>
                  <span>{item.short}</span>
                </button>
              ))}
            </div>
            <div className="ng-progress-pill" aria-hidden="true">
              <span>Scroll down to inspect all 4 stages</span>
              <i><b style={{ transform: `scaleX(${(chapter + 1) / 4})` }} /></i>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Specification Breakdown Below Unpin */}
      <section className="section alt">
        <div className="container">
          <Heading label="Included">What you <span className="shiny">get</span></Heading>
          <ul className="checks">
            {p.includes.map((f, i) => (
              <Reveal as="li" delay={i * 60} className="glass" key={f}>
                <span className="ring"><Check /></span>{f}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Heading label="The process">How we <span className="shiny">work</span></Heading>
          <div className="steps-row">
            {STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 90} className="step">
                <span>0{i + 1}</span><h3>{t}</h3><p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Heading label="Keep looking">Continue <span className="shiny">exploring</span></Heading>
          <div className="more">
            {more.map((m) => (
              <Link key={m.id} to={"/services/" + m.id} className="more-card">
                <Badge name={m.icon} />
                <div><h3>{m.short}</h3><small>{m.from ? "From " : ""}{rs(m.price)}</small></div>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
