import { FOUNDER, PARTNERS, STATS, TECH } from "./data";
import { PageHeader, Heading, Badge } from "./Parts";
import { Reveal, Counter } from "./fx";
import { useContact } from "./ContactWindow";
import { useSEO } from "./seo";
import { Quote } from "./Icons";

// Why a business should choose us. icon names come from Icons.jsx
const WHY = [
  ["Users", "Founder-led", "You deal with the founder, Aasheesh Daniel, not a call centre. Calls and WhatsApp go straight to the people who build your project."],
  ["Code", "Full stack engineering", "Every site and store is custom coded on the MERN stack by an in-house team. No copy-paste templates."],
  ["Card", "Clear prices, small advance", "Every plan shows its full price and its advance. Start from Rs. 1,000, with no hidden costs."],
  ["Search", "Built to rank", "SEO is built in from day one: clean structure, fast loading, titles, descriptions and a sitemap."],
  ["Brain", "AI ready", "We build AI agents and automation, so your business can reply faster and work around the clock."],
  ["Shield", "Real, live work", "From the live Trade With King website to payment and AI engineering projects, our work is public. See it on the projects page."],
];

function Avatar({ name }) {
  return <span className="avatar" aria-hidden="true">{name.split(" ").map(w => w[0]).join("").slice(0, 2)}</span>;
}

export default function About() {
  const { open } = useContact();
  useSEO({
    title: "About Us: Founded by Aasheesh Daniel, Website and AI Agency in India",
    description: "Website Shopping is a founder-led team from Jaipur. Founded by Aasheesh Daniel (Post Graduate, VIT Chennai) with partners Anubhav Verma, Raghav and Dev Sharma.",
    path: "/about",
    jsonLd: { "@context": "https://schema.org", "@type": "Person", name: "Aasheesh Daniel", jobTitle: "Founder", image: "https://websiteshopping.in" + FOUNDER.photo, alumniOf: "VIT Chennai", worksFor: { "@type": "Organization", name: "Website Shopping", url: "https://websiteshopping.in" } },
  });
  return (
    <>
      <PageHeader label="Who we are" line1="About" line2="us" lead="Our goal is simple: to be the most trusted website and AI partner for businesses in India. Here is who we are and how we earn that trust." />

      {/* Founder */}
      <section className="section">
        <div className="container about-grid">
          <Reveal variant="left" className="portrait-wrap">
            <figure className="portrait">
              <img src={FOUNDER.photo} alt="Aasheesh Daniel, founder of Website Shopping" width="1075" height="1280" decoding="async" />
              <figcaption><b>Aasheesh Daniel</b><span>Founder · {FOUNDER.line}</span></figcaption>
            </figure>
          </Reveal>
          <Reveal variant="right">
            <p className="label"><i className="red-line" />Founder</p>
            <h2>Aasheesh <span className="shiny">Daniel</span></h2>
            <p className="mission">Aasheesh founded Website Shopping to give businesses in India a professional website, store or AI agent at a clear price, built by people who answer the phone.</p>
            <p>A postgraduate from VIT Chennai, he leads the engineering and every client project, from full stack stores to AI agents. When you call or message us on WhatsApp, you reach the person who builds your project.</p>
            <div className="quote-banner left"><Quote className="qmark" /><p className="quote">Our team brings together a VIT Chennai postgraduate founder, data science postgraduates and working developers, all focused on one thing: making your business look and work its best online.</p></div>
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <section className="section alt">
        <div className="container">
          <Heading label="Partners" lead="The people who build alongside the founder.">Our <span className="shiny">partners</span></Heading>
          <div className="partners">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 120} className="partner">
                <Avatar name={p.name} /><h3>{p.name}</h3><span className="chip">{p.role}</span><p>{p.line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container">
          <Heading label="Why Website Shopping" lead="Six reasons clients trust us with their website, their store and their AI.">Built to be the <span className="shiny">best choice</span></Heading>
          <div className="why-cards">
            {WHY.map(([icon, t, d], i) => <Reveal key={t} delay={(i % 3) * 100} className="why-card"><Badge name={icon} /><h3>{t}</h3><p>{d}</p></Reveal>)}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="stats">
        <div className="container stats-grid">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 100} className="stat"><b className="shiny"><Counter {...s} /></b><span>{s.label}</span></Reveal>)}
        </div>
      </section>

      <div className="marquee"><div className="marquee-track"><div>{TECH.map(t => <span key={t}>{t}<i /></span>)}</div><div aria-hidden="true">{TECH.map(t => <span key={t}>{t}<i /></span>)}</div></div></div>

      <section className="section alt">
        <div className="container">
          <Reveal variant="zoom" className="quote-banner">
            <h2>Let us build <span className="shiny">your next chapter</span></h2>
            <p className="lead">Call, message or send us your idea. Founder-led, full stack and ready.</p>
            <div className="btn-row center-row"><button className="btn btn-red" onClick={() => open()}>Talk to us</button></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
