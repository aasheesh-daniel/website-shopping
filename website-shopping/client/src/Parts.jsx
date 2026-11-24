import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TICKER, PHONE_SHOW, rs, wa, IDEA_SENT } from "./data";
import { useCart } from "./cartStore";
import { ICONS, Arrow, Check, Close, Star, Send } from "./Icons";
import { Reveal, useTilt } from "./fx";
import { API } from "./api";

// Gold parallelogram artwork. "both" fades top and bottom.
export const Slab = ({ className = "", both = false }) => (
  <div className={"slab-wrap " + className} aria-hidden="true"><i className="slab-glow" /><i className={"slab" + (both ? " both" : "")} /></div>
);

// Round logo-style badge that holds an icon
export function Badge({ name, size = "md" }) {
  const Icon = ICONS[name];
  return <span className={"badge badge-" + size} aria-hidden="true">{Icon && <Icon />}</span>;
}

// Gold LIVE ticker. The message is repeated 3 times, the group twice, so the loop has no gap.
export function Ticker() {
  const group = (hidden) => (
    <div className="ticker-group" aria-hidden={hidden || undefined}>
      {[0, 1, 2].map(n => TICKER.map((t, i) => <span key={n + "-" + i}>{t}<b className="dia" /></span>))}
    </div>
  );
  return (
    <div className="ticker" role="region" aria-label="Latest offers">
      <div className="ticker-badge"><i />LIVE</div>
      <div className="ticker-mask"><div className="ticker-track">{group(false)}{group(true)}</div></div>
    </div>
  );
}

// Page title block used on every inner page. Second line is shiny.
export function PageHeader({ label, line1, line2, lead, children }) {
  return (
    <header className="page-head">
      <Slab className="head-slab" />
      <div className="container">
        {label && <p className="label"><i className="red-line" />{label}</p>}
        <h1 className="split"><span>{line1}</span><br /><span className="shiny">{line2}</span></h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

// Section heading with label
export const Heading = ({ label, children, lead }) => (
  <Reveal className="sec-head">
    {label && <p className="label"><i className="red-line" />{label}</p>}
    <h2>{children}</h2>
    {lead && <p className="lead">{lead}</p>}
  </Reveal>
);

// Star rating. Give onChange to make it clickable.
export function Stars({ value = 5, onChange, size = "" }) {
  return (
    <span className={"stars " + size} role={onChange ? "radiogroup" : "img"} aria-label={value + " out of 5 stars"}>
      {[1, 2, 3, 4, 5].map(n => onChange
        ? <button type="button" key={n} className={n <= value ? "on" : ""} aria-label={n + " star"} onClick={() => onChange(n)}><Star /></button>
        : <i key={n} className={n <= value ? "on" : ""}><Star /></i>)}
    </span>
  );
}

// Plans without a photo use a drawn preview that matches the site colours
export const imgOf = (p) => (p.img.startsWith("data:") ? "/img/" + p.id + ".svg" : p.img);

// "Add to cart" button
export function AddBtn({ id, small = true }) {
  const { cart, dispatch } = useCart(), on = cart.includes(id);
  return (
    <button className={"btn " + (on ? "btn-outline btn-in" : "btn-red") + (small ? " btn-sm" : "")} onClick={() => dispatch({ t: "add", id })}>
      {on ? <>In cart <Check /></> : "+ Add to cart"}
    </button>
  );
}

// Price block used on cards and pages
export function Price({ p, big = false }) {
  return (
    <div className={"pricebox" + (big ? " big" : "")}>
      {p.from && <small>Starting from</small>}
      <b className="shiny">{rs(p.price)}</b>
      <span>Advance <strong>{rs(p.advance)}</strong></span>
    </div>
  );
}

// Service card (services page and home page)
export function ServiceCard({ p, delay = 0 }) {
  const tilt = useTilt(5);
  return (
    <Reveal delay={delay} className="s-wrap">
      <article className="s-card" {...tilt}>
        <Link to={"/services/" + p.id} className="shot" aria-label={"View " + p.name}>
          <img src={imgOf(p)} alt={p.name + " preview"} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.fb; }} />
          <span className="shot-tag">{p.badge}</span>
        </Link>
        <div className="s-body">
          <Badge name={p.icon} />
          <h3>{p.name}</h3>
          <p>{p.tag}</p>
          <Price p={p} />
          <div className="s-actions">
            <Link className="btn btn-outline btn-sm" to={"/services/" + p.id}>View details</Link>
            <AddBtn id={p.id} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// Pop-up box. Closes with the X, the Esc key or a click on the dark background.
export function Modal({ open, onClose, title, children }) {
  const closeRef = useRef();
  useEffect(() => {
    if (!open) return;
    const key = e => e.key === "Escape" && onClose();
    addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <button ref={closeRef} className="modal-x" aria-label="Close" onClick={onClose}><Close /></button>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

// Idea form. It (1) saves your details in MongoDB through /api/ideas and
// (2) opens WhatsApp with the first message already typed:  "Hii, my name is NAME and i want IDEA"
export function IdeaBox() {
  const empty = { name: "", phone: "", budget: "", idea: "", website: "" };
  const [f, setF] = useState(empty), [st, setSt] = useState("");
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const send = async e => {
    e.preventDefault(); setSt("sending");
    let saved = true;
    try {
      const r = await fetch(API + "/api/ideas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      if (!r.ok) throw 0;
    } catch { saved = false; }
    setSt(saved ? "done" : "fail");
    const link = wa(IDEA_SENT(f.name.trim(), f.idea.trim()));
    setF(empty);
    setTimeout(() => { window.location.href = link; }, saved ? 900 : 1600); // opens the WhatsApp app / WhatsApp Web
  };
  return (
    <div className="idea">
      <form onSubmit={send}>
        <label>Your name<input required value={f.name} onChange={set("name")} autoComplete="name" /></label>
        <label>Phone number<input required value={f.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" /></label>
        <label>Budget (optional)<input value={f.budget} onChange={set("budget")} /></label>
        <label>Describe your website or AI agent idea<textarea required rows="4" value={f.idea} onChange={set("idea")} /></label>
        <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={f.website} onChange={set("website")} />
        <button className="btn btn-teal" disabled={st === "sending" || st === "done"}>{st === "sending" ? "Saving..." : <>Send and open WhatsApp <Send /></>}</button>
      </form>
      <div aria-live="polite">
        {st === "done" && <p className="msg ok">Saved. Opening WhatsApp with your message...</p>}
        {st === "fail" && <p className="msg bad">We could not save it right now, but we are opening WhatsApp so you can still reach us ({PHONE_SHOW}).</p>}
      </div>
    </div>
  );
}
