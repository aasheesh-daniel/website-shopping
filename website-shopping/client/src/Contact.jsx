import { PHONE_SHOW, TEL, wa } from "./data";
import { PageHeader, IdeaBox, Heading } from "./Parts";
import { Reveal } from "./fx";
import { useSEO } from "./seo";
import { Phone, Chat, Pin, Arrow } from "./Icons";

export default function Contact() {
  useSEO({ title: "Contact: Call, WhatsApp or Send Your Idea", description: "Call or WhatsApp Website Shopping on +91 80790 09647, or send your website or AI agent idea. Jaipur, Rajasthan, India.", path: "/contact" });
  const cards = [
    [Phone, "Call", PHONE_SHOW, TEL],
    [Chat, "WhatsApp", "Message " + PHONE_SHOW, wa()],
    [Pin, "Based in", "Jaipur, Rajasthan", null],
  ];
  return (
    <>
      <PageHeader label="Contact" line1="Talk" line2="to us" lead={<>Call <a href={TEL}>{PHONE_SHOW}</a> or message us on WhatsApp. Jaipur, Rajasthan.</>} />
      <section className="section alt">
        <div className="container">
          <div className="contact-cards">
            {cards.map(([Icon, label, value, href], i) => {
              const inner = <><span className="round"><Icon /></span><div><span className="mini-label">{label}</span><b>{value}</b></div>{href && <Arrow className="c-arrow" />}</>;
              return <Reveal key={label} delay={i * 100}>{href
                ? <a className="contact-card" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>
                : <div className="contact-card static">{inner}</div>}</Reveal>;
            })}
          </div>
          <div className="contact-form">
            <Heading label="Your idea">Got a different <span className="shiny">idea?</span></Heading>
            <p className="lead">Fill the form. We save your details and open WhatsApp with your message ready.</p>
            <IdeaBox />
          </div>
        </div>
      </section>
    </>
  );
}
