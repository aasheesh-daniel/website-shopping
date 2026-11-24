import { Link, useLocation } from "react-router-dom";
import { PHONE, PHONE_SHOW } from "./data";
import { PageHeader } from "./Parts";
import { useSEO } from "./seo";
import { Print } from "./Icons";

// The text of the two policies. Each section: [heading, paragraphs..., optional {list} or {note}]
const DOCS = {
  "/privacy": {
    title: "Privacy Policy", short: "Privacy",
    brief: "We only keep what you send us through the idea form and the review form. We use it to reply to you and to show your review. We do not sell it.",
    sections: [
      ["What we collect", "When you use the idea form we receive your name, phone number, budget (if you add it) and the idea you describe. When you write a review we receive your name, role (optional), rating and review.", { list: ["Details you type into the idea form", "Reviews you submit, which are shown publicly on the reviews page", "The plans in your cart, which are saved only in your own browser"] }],
      ["How we use it", "We use your details to call or message you, confirm what you need and agree your plan. After you send the idea form, your browser opens WhatsApp with your message ready. We do not use your details for anything else."],
      ["Where it is stored", "Idea form entries and reviews are saved in our database (MongoDB Atlas). Your cart never leaves your device unless you send it to us on WhatsApp."],
      ["Sharing", "We do not sell your details. We share them only with people who work on your project, or if the law requires it."],
      ["Your choices", "You can ask us to delete your details at any time.", { note: "Call or message us on " + PHONE_SHOW + " and we will remove what you sent us." }],
      ["Contact", "Questions about this policy can go to the number below."],
    ],
  },
  "/terms": {
    title: "Terms of Service", short: "Terms",
    brief: "Prices are custom quotes. Nothing is bought until we confirm the details with you by phone.",
    sections: [
      ["About these terms", "These terms cover the use of this website and the way we take orders for websites and AI agents."],
      ["Quotes and orders", "Each plan shows its price and the advance needed to start. Plans marked as starting from can cost more depending on what you need. Adding something to the cart does not place an order.", { list: ["We confirm what you need by phone or WhatsApp", "We agree the final scope and price", "Work starts once the advance is paid"] }],
      ["What we build", "The features of each website or AI agent are described on its page. Anything extra is agreed with you before work starts."],
      ["Third-party services", "Some projects connect to services such as Razorpay, Stripe or WhatsApp. Those services have their own terms."],
      ["Your content", "You are responsible for the text, photos and data you give us to use in your project."],
      ["Changes", "We may update these terms. The date at the top shows when they last changed."],
    ],
  },
};

export default function Policy() {
  const { pathname } = useLocation(), doc = DOCS[pathname] || DOCS["/privacy"];
  useSEO({ title: doc.title, description: doc.brief, path: pathname });
  return (
    <>
      <PageHeader label="Legal" line1={doc.short} line2="policy" />
      <section className="section alt doc-section">
        <div className="container doc-layout">
          <aside className="doc-side">
            <p className="mini-label">Contents</p>
            <ol>{doc.sections.map(([h], i) => <li key={h}><a href={"#s" + (i + 1)}>{h}</a></li>)}</ol>
            <p className="mini-label">Other policies</p>
            <ul>{Object.entries(DOCS).filter(([k]) => k !== pathname).map(([k, d]) => <li key={k}><Link to={k}>{d.title}</Link></li>)}</ul>
            <button className="btn btn-outline btn-sm" onClick={() => print()}><Print /> Print / Save as PDF</button>
          </aside>

          <article className="paper">
            <p className="brand-line">Website Shopping</p>
            <h2 className="doc-title">{doc.title}</h2>
            <dl className="meta">
              <div><dt>Document</dt><dd>{doc.title}</dd></div>
              <div><dt>Effective date</dt><dd>20 November 2026</dd></div>
              <div><dt>Operated by</dt><dd>Website Shopping, Jaipur</dd></div>
              <div><dt>Contact</dt><dd>{PHONE_SHOW}</dd></div>
            </dl>
            <div className="brief"><b>In brief</b><p>{doc.brief}</p></div>
            {doc.sections.map(([h, ...parts], i) => (
              <section className="doc-sec" id={"s" + (i + 1)} key={h}>
                <span className="num">{i + 1}</span>
                <div>
                  <h3>{h}</h3>
                  {parts.map((p, j) => typeof p === "string" ? <p key={j}>{p}</p>
                    : p.list ? <ul key={j}>{p.list.map(x => <li key={x}>{x}</li>)}</ul>
                    : <p className="note" key={j}>{p.note}</p>)}
                </div>
              </section>
            ))}
            <p className="doc-end">Questions? Call <a href={"tel:+91" + PHONE}>{PHONE_SHOW}</a>.</p>
          </article>
        </div>
      </section>
    </>
  );
}
