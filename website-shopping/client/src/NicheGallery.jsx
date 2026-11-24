// Clean 5-Niche Architectural Scroll-Lock Gallery
// Scrolling navigates strictly across the 5 cards with live Left Spec HUD updates.
// Clicking any card launches a Shared-Element FLIP Zoom Transition into its dedicated page (/services/:id).
import { useEffect, useRef, useState } from "react";
import { PRODUCTS, FOUNDER, rs } from "./data";
import { Ticker, AddBtn, imgOf } from "./Parts";
import { gsap } from "./fx";
import { useContact } from "./ContactWindow";
import { usePortal } from "./PortalTransition";
import { Arrow, Check } from "./Icons";

const PLAN_SPECS = [
  {
    timeline: "3 – 5 Days Delivery",
    stack: "React 18, Vite, Custom CSS, SEO Schema",
    arch: "Static Edge CDN + Mobile-First Responsive",
  },
  {
    timeline: "12 – 14 Days Delivery",
    stack: "MERN Stack (MongoDB, Express, React, Node)",
    arch: "Admin CMS + Razorpay/Stripe + Cart & Orders",
  },
  {
    timeline: "18 – 21 Days Delivery",
    stack: "MERN Core + Android/iOS Mobile App",
    arch: "Unified Inventory API + Push Order Tracking",
  },
  {
    timeline: "7 – 10 Days Delivery",
    stack: "Node.js, Python RAG, LLM Function Tools",
    arch: "WhatsApp Cloud API + Vector Knowledge + Handover",
  },
  {
    timeline: "7 – 12 Days Delivery",
    stack: "MERN Stack, Custom CMS, REST APIs",
    arch: "Dynamic Publishing + Role Auth + Fast SEO",
  },
];

export default function NicheGallery({ compact = false }) {
  const root = useRef(null);
  const pin = useRef(null);
  const stRef = useRef(null);
  const archRefs = useRef([]);

  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  const { open } = useContact();
  const { openWithMorph } = usePortal();
  const n = PRODUCTS.length;
  const p = PRODUCTS[active] || PRODUCTS[0];
  const spec = PLAN_SPECS[active] || PLAN_SPECS[0];

  useEffect(() => {
    if (compact) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1025px) and (min-height: 660px) and (prefers-reduced-motion: no-preference)",
      () => {
        if (pin.current && pin.current.scrollHeight > window.innerHeight + 24) {
          setPinned(false);
          return () => {};
        }
        setPinned(true);
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + Math.round(window.innerHeight * 2.8),
            pin: pin.current,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(n - 1, Math.floor(self.progress * n));
              setActive(idx);
            },
          },
        }).scrollTrigger;
        stRef.current = st;
        return () => {
          stRef.current = null;
          setPinned(false);
        };
      }
    );
    return () => mm.revert();
  }, [compact, n]);

  const focusCard = (i) => {
    setActive(i);
    const st = stRef.current;
    if (st && !compact) {
      const targetProg = (i + 0.35) / n;
      window.scrollTo({ top: st.start + targetProg * (st.end - st.start), behavior: "smooth" });
    }
  };

  const openWebsitePage = (item, i) => {
    openWithMorph(item, archRefs.current[i]);
  };

  return (
    <section
      className={"ng-section" + (compact ? " ng-compact" : "") + (pinned ? " is-pinned" : "")}
      ref={root}
      aria-label="Interactive Flagship Storefront"
    >
      <div className="ng-pin" ref={pin}>
        {!compact && <Ticker />}

        <div className="container ng-header">
          <div className="ng-head-left">
            <p className="label"><i className="red-line" />Websites, e-commerce and AI agents</p>
            {compact ? (
              <h2 className="ng-h1">Explore the <em className="shiny">flagship</em> collection</h2>
            ) : (
              <h1 className="ng-h1">Buy your next <em className="shiny">website</em> here</h1>
            )}
          </div>

          <div className="ng-head-right">
            <span className="ng-hint-pill">Scroll to browse · Click any website to zoom in</span>
            {!compact && (
              <div className="ng-founder">
                <img src={FOUNDER.photo} alt="Aasheesh Daniel, founder of Website Shopping" width="34" height="34" />
                <div>
                  <b>Aasheesh Daniel</b>
                  <span>Founder · VIT Chennai PG</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ng-stage-wrap">
          <aside className="ng-hud" aria-live="polite">
            <div className="ng-hud-top">
              <span className="ng-hud-step">0{active + 1} / {p.short.toUpperCase()}</span>
              <span className="ng-hud-badge">{p.badge}</span>
            </div>
            <h2 className="ng-hud-title">{p.name}</h2>
            <p className="ng-hud-tag">{p.tag}</p>

            <div className="ng-hud-block">
              <h4>Deliverables</h4>
              <ul>
                {p.includes.slice(0, 4).map((item) => (
                  <li key={item}><Check /><span>{item}</span></li>
                ))}
              </ul>
            </div>

            <div className="ng-hud-block ng-telemetry">
              <h4>Telemetry Specs HUD</h4>
              <p><b>Timeline:</b> {spec.timeline}</p>
              <p><b>Architecture:</b> {spec.arch}</p>
              <p><b>Tech:</b> {spec.stack}</p>
            </div>

            <div className="ng-hud-booking">
              <span className="ng-book-pill">Advance: <b>{rs(p.advance)}</b></span>
              <span className="ng-book-pill">Total: <b>{p.from ? "From " : ""}{rs(p.price)}</b></span>
            </div>

            <div className="ng-hud-cta">
              <AddBtn id={p.id} small={false} />
              <div className="ng-hud-sublinks">
                <button type="button" className="ng-link" onClick={() => openWebsitePage(p, active)}>
                  Open Full Page <Arrow />
                </button>
                <button type="button" className="ng-link" onClick={() => open("Hi, I am interested in: " + p.name)}>
                  Talk to founder
                </button>
              </div>
            </div>
          </aside>

          <div className="ng-gallery">
            {PRODUCTS.map((item, i) => {
              const isSelected = i === active;
              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  aria-current={isSelected ? "true" : undefined}
                  aria-label={`Open ${item.name} interactive showcase, ${rs(item.price)}`}
                  className={"ng-niche" + (isSelected ? " active" : "")}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => openWebsitePage(item, i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openWebsitePage(item, i);
                    }
                  }}
                >
                  <div className="ng-arch" ref={(el) => (archRefs.current[i] = el)}>
                    <div className="ng-spotlight" aria-hidden="true" />
                    <span className="ng-click-chip">Click to zoom →</span>
                    <div className="ng-showcase-obj">
                      <div className="ng-device-main">
                        <div className="ng-device-bar">
                          <i /><i /><i />
                          <span>{item.short}</span>
                        </div>
                        <img
                          src={imgOf(item)}
                          alt={item.name + " preview"}
                          loading={i < 3 ? "eager" : "lazy"}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = item.fb;
                          }}
                        />
                      </div>
                      {(item.id === "ecommerce" || item.id === "ecommerce-app") && (
                        <div className="ng-device-phone" aria-hidden="true">
                          <i />
                          <img src={imgOf(item)} alt="" />
                        </div>
                      )}
                    </div>
                    <div className="ng-pedestal" aria-hidden="true" />
                  </div>

                  <div className="ng-niche-label">
                    <strong>{item.short}</strong>
                    <span>{item.from ? "From " : ""}{rs(item.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container ng-bottom">
          <div className="ng-quick-tabs" role="tablist" aria-label="Navigate plans">
            {PRODUCTS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={i === active ? "on" : ""}
                onClick={() => focusCard(i)}
              >
                <b>0{i + 1}</b>
                <span>{item.short}</span>
              </button>
            ))}
          </div>

          <div className="ng-progress-pill" aria-hidden="true">
            <span>0{active + 1} / 0{n} · Scroll to browse cards</span>
            <i><b style={{ transform: `scaleX(${(active + 1) / n})` }} /></i>
          </div>

          <div className="ng-bottom-actions">
            <button type="button" className="btn btn-red btn-sm" onClick={() => openWebsitePage(p, active)}>
              Inspect {p.short} <Arrow />
            </button>
            <button type="button" className="btn btn-teal btn-sm" onClick={() => open()}>Talk to us</button>
          </div>
        </div>
      </div>
    </section>
  );
}
