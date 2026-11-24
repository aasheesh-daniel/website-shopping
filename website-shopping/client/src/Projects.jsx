import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "./data";
import { PageHeader, Heading, Badge } from "./Parts";
import { Reveal, useTilt } from "./fx";
import { useContact } from "./ContactWindow";
import { useSEO } from "./seo";
import { External, Arrow, PlayDot, Pause, Zap } from "./Icons";

const AETHERIA_CHAPTERS = [
  { time: 0, label: "00:00", title: "Hero & Colorways", desc: "Real-time finish switcher & persistent commerce dock" },
  { time: 4, label: "00:04", title: "Exploded Drivers", desc: "Scroll-locked 45mm Beryllium driver reveal" },
  { time: 10, label: "00:10", title: "60-Hr Battery HUD", desc: "Ergonomics cutaway & protection toggle" },
  { time: 18, label: "00:18", title: "Filterable Catalog", desc: "Category tabs & side-by-side comparison matrix" },
  { time: 26, label: "00:26", title: "Verified Reviews", desc: "4.98 rating strip & sticky Add to Bag bar" },
];

// Browser window showing the real Trade With King home page (live, scaled down).
export function TwkPreview() {
  const [shot, setShot] = useState(true), box = useRef(), [scale, setScale] = useState(0.5);
  useEffect(() => {
    if (!box.current) return;
    const fit = () => setScale(box.current.clientWidth / 1440);
    fit();
    const ro = new ResizeObserver(fit); ro.observe(box.current);
    return () => ro.disconnect();
  }, [shot]);
  return (
    <figure className="browser">
      <div className="chrome"><i /><i /><i /><span>tradewithking.in</span></div>
      {shot
        ? <img className="browser-shot" src="/img/tradewithking.jpg" alt="Trade With King home page" onError={() => setShot(false)} />
        : <div className="browser-live" ref={box}><iframe src="https://tradewithking.in" title="Trade With King home page" loading="lazy" tabIndex="-1" sandbox="allow-scripts allow-same-origin" style={{ transform: `scale(${scale})` }} /></div>}
      <figcaption>Home page of tradewithking.in</figcaption>
    </figure>
  );
}

// Embedded interactive video showcase for Aetheria Audio Flagship Scroll-Lock Storefront
export function AetheriaVideoShowcase({ compact = false }) {
  const vidRef = useRef(null);
  const tilt = useTilt(2.5);
  const { open } = useContact();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activeCh, setActiveCh] = useState(0);

  const togglePlay = () => {
    const v = vidRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const jumpChapter = (idx, time) => {
    const v = vidRef.current;
    setActiveCh(idx);
    if (!v) return;
    v.currentTime = time;
    v.play().catch(() => {});
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = vidRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const goFullscreen = (e) => {
    e.stopPropagation();
    const v = vidRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  const onTimeUpdate = () => {
    const v = vidRef.current;
    if (!v) return;
    const t = v.currentTime;
    let found = 0;
    for (let i = AETHERIA_CHAPTERS.length - 1; i >= 0; i--) {
      if (t >= AETHERIA_CHAPTERS[i].time) {
        found = i;
        break;
      }
    }
    setActiveCh(found);
  };

  return (
    <div className={"vid-project" + (compact ? " is-compact" : "")}>
      <Reveal variant="left" className="vid-stage-col">
        <div className="vid-alcove" {...tilt}>
          <div className="vid-bezel">
            <div className="chrome">
              <i /><i /><i />
              <span>aetheria-audio · flagship scroll-lock demo</span>
            </div>
            <div className="vid-frame" onClick={togglePlay}>
              <video
                ref={vidRef}
                src="/videos/aetheria-demo.mp4"
                playsInline
                muted={muted}
                loop
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={onTimeUpdate}
              />
              {!playing && (
                <button type="button" className="vid-play-overlay" aria-label="Play Aetheria Audio demo video">
                  <span className="vid-play-circle"><PlayDot /></span>
                  <span>Watch Interactive Storefront Demo (0:34)</span>
                </button>
              )}
              <div className="vid-controls" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>
                  {playing ? <Pause /> : <PlayDot />} {playing ? "Pause" : "Play"}
                </button>
                <button type="button" onClick={toggleMute}>
                  {muted ? "Unmute" : "Mute"}
                </button>
                <button type="button" onClick={goFullscreen}>
                  Fullscreen
                </button>
              </div>
            </div>
          </div>

          <div className="vid-chapters" role="tablist" aria-label="Jump to video demo chapter">
            {AETHERIA_CHAPTERS.map((ch, idx) => (
              <button
                key={ch.label}
                type="button"
                role="tab"
                aria-selected={activeCh === idx}
                className={activeCh === idx ? "on" : ""}
                onClick={() => jumpChapter(idx, ch.time)}
              >
                <b>{ch.label}</b>
                <span>{ch.title}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal variant="right" className="vid-info-col">
        <p className="label"><i className="red-line" />Interactive Video Demo</p>
        <h2>Aetheria Audio <span className="shiny">Flagship Store</span></h2>
        <p className="lead">
          A luxury D2C flagship e-commerce build showcasing scroll-locked exploded product kinematics, live colorway switching, and zero-dead-scroll shopping controls.
        </p>
        <div className="pj-points flat">
          <div>
            <b>Scroll-Lock Exploded Engineering</b>
            <span>Smoothly separates 45mm Beryllium acoustic drivers, cushions, and battery telemetry as you scroll without blocking buttons.</span>
          </div>
          <div>
            <b>Always-Visible Commerce HUD</b>
            <span>Real-time finish switcher, dynamic $449 bundle pricing, comparison matrix, and persistent Add-to-Bag bar stay clickable on every frame.</span>
          </div>
          <div>
            <b>Want this exact animation for your brand?</b>
            <span>We custom-build scroll-locked flagship stores tailored to your products, INR/Razorpay checkout, and SEO architecture.</span>
          </div>
        </div>
        <div className="tags">
          {["React 18", "Vite", "GSAP ScrollTrigger", "HTML5 Canvas", "Interactive Cart", "Zero Dead Scroll"].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="btn-row">
          <button type="button" className="btn btn-red" onClick={togglePlay}>
            {playing ? <Pause /> : <PlayDot />} {playing ? "Pause Demo" : "Play Full Demo"}
          </button>
          <button type="button" className="btn btn-teal" onClick={() => open("Hi, I watched the Aetheria Audio demo and want a scroll-lock e-commerce website like that.")}>
            <Zap /> Build One For My Brand
          </button>
        </div>
      </Reveal>
    </div>
  );
}

function ProjectCard({ p, i }) {
  const tilt = useTilt(3);
  const [tab, setTab] = useState("all");
  const visiblePoints = tab === "all" ? p.points : [p.points[Number(tab)] || p.points[0]];
  return (
    <Reveal delay={i * 120} className="pj-wrap">
      <article className="pj" {...tilt}>
        <div className="pj-top">
          <Badge name="Code" />
          <span className="chip">{p.kind}</span>
          <div className="pj-tabs" role="tablist" aria-label={p.name + " specs"}>
            <button type="button" className={tab === "all" ? "on" : ""} onClick={() => setTab("all")}>All Specs</button>
            {p.points.map(([t], idx) => (
              <button key={t} type="button" className={tab === String(idx) ? "on" : ""} onClick={() => setTab(String(idx))}>0{idx + 1}</button>
            ))}
          </div>
        </div>
        <h3>{p.name}</h3>
        <p className="pj-sum">{p.summary}</p>
        <p>{p.description}</p>
        <div className="pj-points">{visiblePoints.map(([t, d]) => <div key={t}><b>{t}</b><span>{d}</span></div>)}</div>
        <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const { open } = useContact(), t = PROJECTS[0];
  useSEO({ title: "Projects: Trade With King, Aetheria Audio, PayZap and RAG Hallucination Detector", description: "Our work: Trade With King live website, Aetheria Audio scroll-lock e-commerce flagship demo, PayZap digital wallet platform and RAG Hallucination Detector.", path: "/projects" });
  return (
    <>
      <PageHeader label="Our work" line1="Projects we" line2="have built" lead="Live client websites, an interactive scroll-lock e-commerce video demo, and production engineering builds." />

      {/* 1. Live Client Website: Trade With King */}
      <section className="section alt">
        <div className="container twk-feature">
          <Reveal variant="left"><TwkPreview /></Reveal>
          <Reveal variant="right">
            <p className="label"><i className="red-line" />{t.kind}</p>
            <h2>{t.name}</h2>
            <p className="lead">{t.summary}</p>
            <p>{t.description}</p>
            <div className="pj-points flat">{t.points.map(([a, b]) => <div key={a}><b>{a}</b><span>{b}</span></div>)}</div>
            <div className="tags">{t.tags.map(x => <span key={x}>{x}</span>)}</div>
            <div className="btn-row"><a className="btn btn-teal" href={t.url} target="_blank" rel="noreferrer">Visit tradewithking.in <External /></a></div>
          </Reveal>
        </div>
      </section>

      {/* 2. Embedded Interactive Video Project: Aetheria Audio Scroll-Lock Flagship */}
      <section className="section vid-showcase-sec">
        <div className="container">
          <AetheriaVideoShowcase />
        </div>
      </section>

      {/* 3. Engineering Systems */}
      <section className="section alt">
        <div className="container">
          <Heading label="Engineering projects" lead="Production-style systems that show the depth behind every website we deliver.">Built to <span className="shiny">last</span></Heading>
          <div className="pj-grid">{PROJECTS.slice(1).map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}</div>
          <Reveal variant="zoom" className="quote-banner left helpbar">
            <div><h3>Have a project in mind?</h3><p>Tell us your idea and we will plan it with you.</p></div>
            <button className="btn btn-red" onClick={() => open("Hi, I have a project in mind.")}>Talk to us <Arrow /></button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
