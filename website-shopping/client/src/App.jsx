import { useEffect, useReducer, useState } from "react";
import { Routes, Route, Link, NavLink, Navigate, useLocation } from "react-router-dom";
import { CartCtx, reducer } from "./cartStore";
import { PHONE, PHONE_SHOW, TEL, wa } from "./data";
import { Cart, Lock, Code, Check, Shield, Users } from "./Icons";
import { ContactProvider, useContact } from "./ContactWindow";
import { PortalProvider } from "./PortalTransition";
import { PageHeader } from "./Parts";
import { useSEO } from "./seo";
import { ScrollTrigger } from "./fx";
import Dock from "./Dock";
import Home from "./Home";
import Policy from "./Policy";
import { Services, ServiceDetail } from "./Services";
import CartPage from "./Cart";
import Journey from "./Journey";
import Projects from "./Projects";
import About from "./About";
import Reviews from "./Reviews";
import { BlogList, BlogPost } from "./Blog";
import Contact from "./Contact";

const LINKS = [["/", "Home"], ["/services", "Services"], ["/projects", "Projects"], ["/journey", "Journey"], ["/about", "About"], ["/reviews", "Reviews"], ["/blog", "Blog"], ["/contact", "Contact"]];

const TRUST_TAGS = [
  [Lock, "SSL Secured & Safe Checkout", "256-Bit HTTPS · Razorpay & Stripe Ready"],
  [Code, "100% Custom Code Ownership", "Full Source Code & Repository Handover"],
  [Check, "Clear Pricing · No Hidden Fees", "Transparent Advance & Written Scope"],
  [Users, "Direct Founder-Led Support", "Jaipur, India · Call & WhatsApp Access"],
  [Shield, "Privacy & Data Protection", "DPDP-Aligned · Zero Data Resale"],
];

// On a new page: scroll to top. On a #link: smooth-scroll to it and give it a short "pop".
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 700);
    if (!hash) { scrollTo(0, 0); return () => clearTimeout(refresh); }
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("pop");
      setTimeout(() => el.classList.remove("pop"), 1300);
    }, 80);
    return () => { clearTimeout(t); clearTimeout(refresh); };
  }, [pathname, hash]);
  return null;
}

function Navbar({ count }) {
  const [scrolled, setScrolled] = useState(false), [menu, setMenu] = useState(false), { pathname } = useLocation(), { open } = useContact();
  useEffect(() => {
    const on = () => setScrolled(scrollY > 40);
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => setMenu(false), [pathname]);
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "") + (menu ? " menu-open" : "")}>
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Website Shopping, home">
          <img src="/logo.png" alt="" />
          <span>Website<br />Shopping</span>
        </Link>
        <nav className={"nav-links" + (menu ? " open" : "")} aria-label="Main">
          {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}
        </nav>
        <div className="nav-right">
          <NavLink to="/cart" className="cart-link" aria-label={"Cart, " + count + " items"}><Cart /><b key={count} className={count ? "bump" : ""}>{count}</b></NavLink>
          <button className="btn btn-teal btn-sm nav-cta" onClick={() => open()}>Talk to us</button>
          <button className="burger" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu(m => !m)}>{menu ? "✕" : "☰"}</button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Universal Storefront Trust Tags (Bottom of every page) */}
        <div className="trust-strip" role="region" aria-label="Storefront guarantees">
          {TRUST_TAGS.map(([Icon, title, sub]) => (
            <div key={title} className="trust-item">
              <span className="trust-ico" aria-hidden="true"><Icon /></span>
              <div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mega" aria-hidden="true"><span>Website <em className="shiny">Shopping</em></span></div>
        <div className="foot-grid">
          <div>
            <Link to="/" className="brand foot-brand"><img src="/logo.png" alt="" /><span>Website<br />Shopping</span></Link>
            <p>Websites, e-commerce stores, apps and AI agents for businesses across India. Founded by Aasheesh Daniel. Built in Jaipur on the MERN stack.</p>
          </div>
          <div><h4 className="mini-label">Explore</h4><ul>{LINKS.map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></div>
          <div><h4 className="mini-label">Plans</h4><ul>
            <li><Link to="/services/portfolio">Portfolio website</Link></li><li><Link to="/services/ecommerce">E-commerce website</Link></li><li><Link to="/services/ecommerce-app">E-commerce + app</Link></li>
            <li><Link to="/services/ai-agents">AI agents</Link></li><li><Link to="/services/other-websites">Other websites</Link></li></ul></div>
          <div><h4 className="mini-label">Contact</h4><ul>
            <li><a href={TEL}>{PHONE_SHOW}</a></li>
            <li><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a></li><li>Jaipur, Rajasthan</li></ul></div>
        </div>
        <div className="legal"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link></div>
        <p className="copy">© Website Shopping · Founded by Aasheesh Daniel · {PHONE_SHOW}</p>
      </div>
    </footer>
  );
}

function NotFound() {
  useSEO({ title: "Page not found", description: "That page does not exist.", path: "/404" });
  return <PageHeader label="Error 404" line1="Page" line2="not found" lead="That page does not exist."><Link className="btn btn-teal" to="/">Go home</Link></PageHeader>;
}

export default function App() {
  const [cart, dispatch] = useReducer(reducer, [], () => { try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; } });
  useEffect(() => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch {} }, [cart]);
  return (
    <CartCtx.Provider value={{ cart, dispatch }}>
      <ContactProvider>
        <PortalProvider>
        <ScrollManager />
        <Navbar count={cart.length} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Policy />} />
            <Route path="/terms" element={<Policy />} />
            <Route path="/websites" element={<Navigate to="/services" replace />} />
            <Route path="/site/:id" element={<Navigate to="/services" replace />} />
            <Route path="/workshop" element={<Navigate to="/journey" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Dock />
        </PortalProvider>
      </ContactProvider>
    </CartCtx.Provider>
  );
}
