import { useEffect, useMemo, useRef, useState } from "react";
import { VOICE, CHAT_REVIEW } from "./data";
import { PageHeader, Heading, Stars, Badge } from "./Parts";
import { Reveal } from "./fx";
import { useSEO } from "./seo";
import { API } from "./api";
import { PlayDot, Pause, Mic, Quote, Send } from "./Icons";

let current = null; // only one voice note plays at a time

const fmt = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
// same wave shape every time for the same note
const makeBars = (seed, n = 46) => Array.from({ length: n }, (_, i) => 22 + Math.abs(Math.sin(i * 0.9 + seed.length * 1.7) * 38 + Math.sin(i * 0.37 + seed.charCodeAt(1)) * 28));

// Voice note player with a waveform you can click to jump around, and a speed button
export function VoicePlayer({ v }) {
  const a = useRef(), [on, setOn] = useState(false), [t, setT] = useState(0), [dur, setDur] = useState(v.seconds), [rate, setRate] = useState(1);
  const bars = useMemo(() => makeBars(v.id), [v.id]);
  const toggle = () => {
    const el = a.current;
    if (el.paused) { if (current && current !== el) current.pause(); current = el; el.play().catch(() => {}); } else el.pause();
  };
  const seek = (e) => { const r = e.currentTarget.getBoundingClientRect(); a.current.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * dur; };
  const speed = () => { const n = rate === 1 ? 1.5 : rate === 1.5 ? 2 : 1; setRate(n); a.current.playbackRate = n; };
  const prog = dur ? t / dur : 0;
  return (
    <div className={"voice" + (on ? " playing" : "")}>
      <div className="voice-head"><Badge name="Users" size="sm" /><div><b>{v.who}</b><span>{v.role}</span></div><Mic className="voice-mic" /></div>
      <div className="voice-body">
        <button className="play" onClick={toggle} aria-label={on ? "Pause voice note" : "Play voice note"}>{on ? <Pause /> : <PlayDot />}</button>
        <div className="wave" onClick={seek} role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax={Math.round(dur)} aria-valuenow={Math.round(t)} tabIndex="0"
          onKeyDown={(e) => { if (e.key === "ArrowRight") a.current.currentTime += 5; if (e.key === "ArrowLeft") a.current.currentTime -= 5; }}>
          {bars.map((h, i) => <i key={i} className={i / bars.length < prog ? "done" : ""} style={{ height: h + "%", "--i": i }} />)}
        </div>
        <button className="rate" onClick={speed} aria-label="Change speed">{rate}x</button>
      </div>
      <div className="voice-time"><span>{fmt(t)}</span><span>{fmt(dur)}</span></div>
      <audio ref={a} preload="metadata"
        onPlay={() => setOn(true)} onPause={() => setOn(false)} onEnded={() => { setOn(false); setT(0); }}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => isFinite(e.currentTarget.duration) && setDur(e.currentTarget.duration)}>
        <source src={v.src + ".mp3"} type="audio/mpeg" /><source src={v.src + ".ogg"} type="audio/ogg; codecs=opus" />
      </audio>
    </div>
  );
}

const when = (d) => { try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); } catch { return ""; } };

function ReviewCard({ r, i }) {
  return (
    <Reveal delay={Math.min(i, 4) * 70} className="rv-card">
      <Quote className="qmark" />
      <Stars value={r.rating} />
      <p>{r.text}</p>
      <div className="rv-who"><span className="avatar sm">{r.name.slice(0, 1).toUpperCase()}</span><div><b>{r.name}</b><span>{[r.role, when(r.createdAt)].filter(Boolean).join(" · ")}</span></div></div>
    </Reveal>
  );
}

// "Drop your review": saves to MongoDB and appears in the list straight away
function ReviewForm({ onAdded }) {
  const empty = { name: "", role: "", rating: 5, text: "", website: "" };
  const [f, setF] = useState(empty), [st, setSt] = useState(""), [err, setErr] = useState("");
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const send = async (e) => {
    e.preventDefault(); setSt("sending"); setErr("");
    try {
      const r = await fetch(API + "/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || "Could not send your review.");
      if (data.text) onAdded(data);
      setSt("done"); setF(empty);
    } catch (x) { setErr(x.message || "Could not send your review."); setSt("fail"); }
  };
  return (
    <form className="idea review-form" onSubmit={send}>
      <h3>Drop your review</h3>
      <label>Your name<input required value={f.name} onChange={set("name")} maxLength="60" autoComplete="name" /></label>
      <label>Your business or role (optional)<input value={f.role} onChange={set("role")} maxLength="80" /></label>
      <div className="rate-pick"><span>Your rating</span><Stars value={f.rating} onChange={(n) => setF({ ...f, rating: n })} size="lg" /></div>
      <label>Your review<textarea required minLength="10" rows="5" maxLength="1200" value={f.text} onChange={set("text")} /></label>
      <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={f.website} onChange={set("website")} />
      <button className="btn btn-teal" disabled={st === "sending"}>{st === "sending" ? "Sending..." : <>Submit review <Send /></>}</button>
      <div aria-live="polite">
        {st === "done" && <p className="msg ok">Thank you! Your review is now live on the page.</p>}
        {st === "fail" && <p className="msg bad">{err}</p>}
      </div>
    </form>
  );
}

export default function Reviews() {
  useSEO({ title: "Client Reviews and Testimonials", description: "Hear from Website Shopping clients: voice notes, WhatsApp messages and written reviews. Share your own review too.", path: "/reviews" });
  const [list, setList] = useState(null);
  useEffect(() => { fetch(API + "/api/reviews").then(r => r.ok ? r.json() : []).then(d => setList(Array.isArray(d) ? d : [])).catch(() => setList([])); }, []);
  const avg = list?.length ? (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1) : null;
  return (
    <>
      <PageHeader label="Reviews" line1="What clients" line2="say" lead="Real voice notes, real messages and written reviews from the people we have built for." />

      <section className="section alt">
        <div className="container">
          <Heading label="Voice notes" lead="Press play and hear it in their own voice.">Heard <span className="shiny">first hand</span></Heading>
          <div className="voice-row">{VOICE.map((v, i) => <Reveal key={v.id} delay={i * 110}><VoicePlayer v={v} /></Reveal>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container chat-grid">
          <Reveal variant="left" className="phone-frame">
            <div className="phone-notch" />
            <img src={CHAT_REVIEW.img} alt={CHAT_REVIEW.alt} loading="lazy" />
          </Reveal>
          <Reveal variant="right">
            <p className="label"><i className="red-line" />{CHAT_REVIEW.role}</p>
            <h2>“Worth every <span className="shiny">penny”</span></h2>
            <Stars value={5} size="lg" />
            <p className="lead">After the final payment, the {CHAT_REVIEW.who} client wrote that the website is truly worth every penny and that they are genuinely impressed with the final result.</p>
            <p>Seeing a client message like this is the best part of our work.</p>
          </Reveal>
        </div>
      </section>

      <section className="section alt" id="write">
        <div className="container review-grid">
          <div>
            <Heading label="Written reviews" lead={avg ? `${avg} out of 5 from ${list.length} review${list.length > 1 ? "s" : ""}.` : "Be the first to share your experience."}>Your <span className="shiny">words</span></Heading>
            <div className="rv-list">
              {list === null && <p className="muted">Loading reviews...</p>}
              {list && !list.length && <div className="empty small"><Quote className="empty-icon" /><p>No written reviews yet. Yours can be the first.</p></div>}
              {list && list.map((r, i) => <ReviewCard key={(r._id || r.createdAt) + i} r={r} i={i} />)}
            </div>
          </div>
          <Reveal variant="right"><ReviewForm onAdded={(r) => setList(l => [r, ...(l || [])])} /></Reveal>
        </div>
      </section>
    </>
  );
}
