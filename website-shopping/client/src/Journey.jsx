import { useEffect, useRef, useState } from "react";
import { JOURNEY } from "./data";
import { PageHeader, Badge } from "./Parts";
import { Reveal } from "./fx";
import { useContact } from "./ContactWindow";
import { useSEO } from "./seo";

// 3D Spiral Staircase Journey: scrolling rotates and elevates each architectural stair tread around the central helix column.
export default function Journey() {
  useSEO({
    title: "Our Journey: From One Website to Full Stack Stores and AI Agents",
    description: "The Website Shopping story: from the first website to systems that sell, lead capture, full stack stores, AI agents and websiteshopping.in.",
    path: "/journey",
  });

  const box = useRef(null);
  const stepRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hud, setHud] = useState(false);
  const { open } = useContact();

  useEffect(() => {
    let raf;
    const update = () => {
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.52;
      const p = Math.min(1, Math.max(0, (triggerY - r.top) / Math.max(1, r.height)));
      setProgress(p);
      el.style.setProperty("--p", p.toFixed(4));

      // Continuous spiral index (0 to JOURNEY.length - 1)
      const continuous = p * (JOURNEY.length - 1);
      let closest = 0;
      let minDist = Infinity;

      stepRefs.current.forEach((node, i) => {
        if (!node) return;
        const b = node.getBoundingClientRect();
        const center = b.top + b.height * 0.5;
        const dist = Math.abs(center - triggerY);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
        // Signed offset relative to current scroll focus (-1 = above, 0 = active front step, +1 = below)
        const delta = Math.max(-2.4, Math.min(2.4, (center - triggerY) / (window.innerHeight * 0.34)));
        const angle = delta * 34; // helical rotation in degrees
        const shiftX = Math.sin((delta * Math.PI) / 3) * 58; // spiral horizontal arc
        const shiftZ = -Math.abs(delta) * 72 + 36; // front step comes forward in 3D space
        const scale = Math.max(0.84, 1.05 - Math.abs(delta) * 0.085);
        const op = Math.max(0.45, 1 - Math.abs(delta) * 0.24);

        node.style.setProperty("--ry", `${angle.toFixed(2)}deg`);
        node.style.setProperty("--tx", `${shiftX.toFixed(1)}px`);
        node.style.setProperty("--tz", `${shiftZ.toFixed(1)}px`);
        node.style.setProperty("--sc", scale.toFixed(3));
        node.style.setProperty("--op", op.toFixed(3));
        node.style.setProperty("--rot", `${(continuous * 60).toFixed(1)}deg`);
      });

      setActiveIdx(closest);
      setHud(r.top < window.innerHeight * 0.65 && r.bottom > window.innerHeight * 0.35);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const jumpToStep = (i) => {
    const node = stepRefs.current[i];
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.34;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <PageHeader
        label="Our journey"
        line1="How we"
        line2="got here"
        lead="Ascend the spiral staircase from our very first website to full stack stores and AI agents."
      />

      <section className="section alt journey sp-section">
        <div className="container">
          <div className="sp-stage" ref={box} style={{ "--p": 0 }}>
            {/* Central 3D Architectural Helix Axis */}
            <div className="sp-axis" aria-hidden="true">
              <div className="sp-pillar">
                <i className="sp-pillar-fill" />
              </div>
              <div
                className="sp-helix-ring"
                style={{ transform: `translate(-50%, -50%) rotate(${(progress * 540).toFixed(1)}deg)` }}
              />
            </div>

            {/* 6 Cantilevered 3D Spiral Stair Steps */}
            <div className="sp-steps">
              {JOURNEY.map((j, i) => {
                const isReached = i <= activeIdx;
                const isActive = i === activeIdx;
                const side = i % 2 === 0 ? "left" : "right";
                return (
                  <div
                    key={j.title}
                    ref={(el) => (stepRefs.current[i] = el)}
                    className={
                      `sp-step sp-${side}` +
                      (isReached ? " reached" : "") +
                      (isActive ? " is-active" : "")
                    }
                    onClick={() => jumpToStep(i)}
                  >
                    {/* Cantilevered stair riser connecting central column to stair tread */}
                    <div className="sp-riser" aria-hidden="true">
                      <span className="sp-tread-num">0{i + 1}</span>
                    </div>

                    <div className="sp-hub">
                      <Badge name={j.icon} size="lg" />
                    </div>

                    <article className="sp-card">
                      <div className="sp-card-top">
                        <span className="j-label">{j.label}</span>
                        <span className="sp-step-pill">Step 0{i + 1} / 0{JOURNEY.length}</span>
                      </div>
                      <h3>{j.title}</h3>
                      <p>{j.text}</p>
                      <div className="sp-tread-lip" aria-hidden="true" />
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          <Reveal variant="zoom" className="quote-banner j-end">
            <h2>Your chapter <span className="shiny">is next</span></h2>
            <p className="lead">Tell us what you want to build. We will take it from idea to launch.</p>
            <div className="btn-row center-row">
              <button className="btn btn-red" onClick={() => open()}>Talk to us</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive Floating Spiral Staircase Navigator */}
      <div className={"j-hud sp-hud" + (hud ? " show" : "")} role="navigation" aria-label="Spiral staircase steps">
        <div className="sp-hud-row">
          <span>Spiral Step {activeIdx + 1} of {JOURNEY.length}</span>
          <div className="sp-hud-dots">
            {JOURNEY.map((j, i) => (
              <button
                key={j.title}
                type="button"
                className={i === activeIdx ? "on" : ""}
                onClick={() => jumpToStep(i)}
                aria-label={`Jump to ${j.title}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
        <i><b style={{ transform: `scaleX(${(activeIdx + 1) / JOURNEY.length})` }} /></i>
      </div>
    </>
  );
}
