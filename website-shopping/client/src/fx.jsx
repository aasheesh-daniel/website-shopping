// Animation helpers built on GSAP + ScrollTrigger.
// Everything is switched off (content simply shows) when the visitor prefers reduced motion.
import { createElement, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const FROM = { up: { y: 36 }, left: { x: -48 }, right: { x: 48 }, zoom: { scale: 0.94 } };

// Fades an element in when it scrolls into view. variant: up | left | right | zoom
export function Reveal({ as = "div", variant = "up", delay = 0, className = "", children, ...rest }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) { gsap.set(el, { opacity: 1 }); el.classList.add("in"); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, ...FROM[variant] }, {
        opacity: 1, x: 0, y: 0, scale: 1, duration: 1, delay: delay / 1000, ease: "power3.out", clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 90%", once: true, onEnter: () => el.classList.add("in") },
      });
    }, ref);
    return () => ctx.revert();
  }, [variant, delay]);
  return createElement(as, { ref, className: `rv ${className}`.trim(), ...rest }, children);
}

// Counts a number up from 0 when it scrolls into view
export function Counter({ value, prefix = "", suffix = "", duration = 1.6 }) {
  const ref = useRef(), [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) { setN(value); return; }
    const o = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(o, { v: value, duration, ease: "power3.out", onUpdate: () => setN(Math.round(o.v)), scrollTrigger: { trigger: ref.current, start: "top 92%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, [value, duration]);
  return <span ref={ref}>{prefix}{n.toLocaleString("en-IN")}{suffix}</span>;
}

// 3D tilt on mouse move (only on devices with a mouse). Spread the result on an element: <div {...useTilt()}>
export function useTilt(max = 7) {
  const ok = typeof matchMedia !== "undefined" && matchMedia("(hover: hover)").matches && !reduced();
  if (!ok) return {};
  return {
    onPointerMove(e) {
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      e.currentTarget.style.setProperty("--rx", (-y * max).toFixed(2) + "deg");
      e.currentTarget.style.setProperty("--ry", (x * max).toFixed(2) + "deg");
      e.currentTarget.style.setProperty("--mx", (x + 0.5) * 100 + "%");
      e.currentTarget.style.setProperty("--my", (y + 0.5) * 100 + "%");
    },
    onPointerLeave(e) { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); },
  };
}

// Thin bar at the top that fills while you read a page
export function ReadBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const h = document.documentElement; setP(Math.min(1, scrollY / Math.max(1, h.scrollHeight - innerHeight))); };
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return <div className="readbar" aria-hidden="true"><i style={{ transform: `scaleX(${p})` }} /></div>;
}
