import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, STEPS, FAQ, STATS, JOURNEY, PROJECTS, TECH, PHONE, PHONE_SHOW, SITE, TEL, wa } from "./data";
import { Slab, IdeaBox, ServiceCard, Heading, Badge } from "./Parts";
import { Reveal, Counter } from "./fx";
import { useContact } from "./ContactWindow";
import { useSEO } from "./seo";
import { BlogCard } from "./Blog";
import { TwkPreview, AetheriaVideoShowcase } from "./Projects";
import { VoicePlayer } from "./Reviews";
import { VOICE } from "./data";
import NicheGallery from "./NicheGallery";
import { Arrow, Devices, Search, Sliders, Card, Cursor, Cart, Phone, Rocket, Chat } from "./Icons";
import { BLOGS } from "./blogs";

const FEATURES = [
  [Devices, "Responsive on every screen", "Looks right on phone, tablet and desktop."],
  [Search, "SEO-ready and fast", "Quick pages that search engines can read."],
  [Sliders, "Admin panel to edit content", "Change your text and photos yourself."],
  [Card, "Payments if you need them", "Razorpay or Stripe, to your account."],
];

function Features() {
  return (
    <section className="features-sec">
      <div className="container features">
        {FEATURES.map(([Icon, t, d], i) => (
          <Reveal key={t} delay={i * 90} variant="up"><div className="glass feature"><Icon className="f-icon" /><div><h3>{t}</h3><p>{d}</p></div></div></Reveal>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} className="stat"><b className="shiny"><Counter {...s} /></b><span>{s.label}</span></Reveal>
        ))}
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section className="section alt" id="plans">
      <div className="container">
        <Heading label="Our services" lead="Clear prices. A small advance to start. Add what you like to your cart.">Choose your <span className="shiny">plan</span></Heading>
        <div className="grid five">{PRODUCTS.map((p, i) => <ServiceCard key={p.id} p={p} delay={i * 80} />)}</div>
        <div className="center"><Link className="btn btn-outline" to="/services">See every detail</Link></div>
      </div>
    </section>
  );
}

function Tech() {
  const row = TECH.map(t => <span key={t}>{t}<i /></span>);
  return (
    <div className="marquee" aria-label="Technologies we use">
      <div className="marquee-track"><div>{row}</div><div aria-hidden="true">{row}</div></div>
    </div>
  );
}

const STEP_ICONS = [Cursor, Cart, Phone, Rocket];
function Why() {
  return (
    <section className="section teal">
      <div className="container why">
        <Reveal variant="left">
          <p className="label"><i className="red-line" />How it works</p>
          <h2>Four steps from idea to <span className="shiny">launch</span></h2>
          <p className="lead">Every project is built in-house on the MERN stack.</p>
        </Reveal>
        <div className="why-grid">
          {STEPS.map(([t, d], i) => {
            const Icon = STEP_ICONS[i];
            return <Reveal key={t} delay={i * 110} className="why-block"><span className="step-n">0{i + 1}</span><Icon className="w-icon" /><h3>{t}</h3><p>{d}</p></Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}

function JourneyTeaser() {
  return (
    <section className="section">
      <div className="container">
        <Heading label="Our journey" lead="From one simple website to full stack stores and AI agents.">How we <span className="shiny">got here</span></Heading>
        <Reveal className="jt">
          <div className="jt-line"><i /></div>
          {JOURNEY.map((j, i) => (
            <div className="jt-node" key={j.title} style={{ "--i": i }}><Badge name={j.icon} /><b>{j.title}</b></div>
          ))}
        </Reveal>
        <div className="center"><Link className="btn btn-teal" to="/journey">Follow the journey <Arrow /></Link></div>
      </div>
    </section>
  );
}

function ProjectTeaser() {
  const p = PROJECTS[0];
  const [projTab, setProjTab] = useState("aetheria");
  return (
    <section className="section alt">
      <div className="container">
        <div className="pt-switch-bar" role="tablist" aria-label="Featured projects">
          <button type="button" role="tab" aria-selected={projTab === "aetheria"} className={projTab === "aetheria" ? "on" : ""} onClick={() => setProjTab("aetheria")}>
            01 · Aetheria Audio (Video Demo)
          </button>
          <button type="button" role="tab" aria-selected={projTab === "twk"} className={projTab === "twk" ? "on" : ""} onClick={() => setProjTab("twk")}>
            02 · Trade With King (Live Site)
          </button>
        </div>

        {projTab === "aetheria" ? (
          <AetheriaVideoShowcase compact />
        ) : (
          <div className="proj-teaser">
            <Reveal variant="left"><TwkPreview /></Reveal>
            <Reveal variant="right">
              <p className="label"><i className="red-line" />Featured project</p>
              <h2>{p.name}</h2>
              <p className="lead">{p.summary}. {p.description.split(". ").slice(0, 1)[0]}.</p>
              <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              <div className="btn-row">
                <Link className="btn btn-teal" to="/projects">All projects <Arrow /></Link>
                <a className="btn btn-outline" href={p.url} target="_blank" rel="noreferrer">Visit live site</a>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewTeaser() {
  return (
    <section className="section">
      <div className="container">
        <Heading label="Client words" lead="Hear it from the people we built for.">Clients <span className="shiny">say it best</span></Heading>
        <div className="voice-row">{VOICE.map((v, i) => <Reveal key={v.id} delay={i * 100}><VoicePlayer v={v} /></Reveal>)}</div>
        <div className="center"><Link className="btn btn-outline" to="/reviews">Read and write reviews <Arrow /></Link></div>
      </div>
    </section>
  );
}

function BlogTeaser() {
  return (
    <section className="section alt">
      <div className="container">
        <Heading label="From the blog" lead="Guides written for business owners in India.">Learn before you <span className="shiny">build</span></Heading>
        <div className="blog-grid">{BLOGS.map((b, i) => <BlogCard key={b.slug} b={b} delay={i * 100} />)}</div>
      </div>
    </section>
  );
}

function IdeaSection() {
  return (
    <section className="section community">
      <Slab className="community-slab" />
      <div className="container community-grid">
        <Reveal variant="left">
          <p className="label"><i className="red-line" />Something else in mind?</p>
          <h2>Got a different <span className="shiny">idea?</span></h2>
          <p className="lead">Tell us about it. We save your details and open WhatsApp with your message ready, so you can chat with the founder directly.</p>
        </Reveal>
        <Reveal variant="right"><IdeaBox /></Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section teal">
      <div className="container faq-grid">
        <Reveal variant="left"><p className="label"><i className="red-line" />Questions</p><h2>Before you <span className="shiny">call</span></h2></Reveal>
        <Reveal variant="right" className="faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</Reveal>
      </div>
    </section>
  );
}

function Banner() {
  const { open } = useContact();
  return (
    <section className="section">
      <div className="container">
        <Reveal variant="zoom" className="quote-banner">
          <h2>Ready when <span className="shiny">you are</span></h2>
          <p className="lead">Call {PHONE_SHOW}. Jaipur, Rajasthan. Founded by Aasheesh Daniel.</p>
          <div className="btn-row center-row">
            <a className="btn btn-teal" href={TEL}><Phone /> Call now</a>
            <a className="btn btn-outline" href={wa()} target="_blank" rel="noreferrer"><Chat /> WhatsApp</a>
            <button className="btn btn-red" onClick={() => open()}>Talk to us</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: null,
    description: "Website Shopping builds portfolio websites from Rs. 4,999, full stack e-commerce stores from Rs. 14,999, mobile apps and AI agents from Rs. 11,999. Founded by Aasheesh Daniel, Jaipur, India.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org", "@type": "ProfessionalService", name: "Website Shopping", url: SITE, image: SITE + "/logo.png", logo: SITE + "/logo.png",
      telephone: "+91" + PHONE, founder: { "@type": "Person", name: "Aasheesh Daniel" },
      address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" }, areaServed: "IN",
      description: "Websites, full stack e-commerce stores, mobile apps and AI agents for businesses across India.",
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Services", itemListElement: PRODUCTS.map(p => ({ "@type": "Offer", priceCurrency: "INR", price: p.price, itemOffered: { "@type": "Service", name: p.name, description: p.tag } })) },
    },
  });
  return <><NicheGallery /><Features /><Stats /><Plans /><Tech /><Why /><JourneyTeaser /><ProjectTeaser /><ReviewTeaser /><BlogTeaser /><IdeaSection /><Faq /><Banner /></>;
}
