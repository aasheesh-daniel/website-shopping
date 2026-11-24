import { Link, useParams } from "react-router-dom";
import { BLOGS, parse, slugify, faqOf } from "./blogs";
import { FOUNDER, SITE } from "./data";
import { PageHeader, Heading, Slab } from "./Parts";
import { Reveal, ReadBar } from "./fx";
import { useContact } from "./ContactWindow";
import { useSEO } from "./seo";
import { Arrow } from "./Icons";

// Turns **bold** and [text](/link) into React elements
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean).map((s, i) => {
    let m;
    if ((m = s.match(/^\*\*(.+)\*\*$/))) return <strong key={i}>{m[1]}</strong>;
    if ((m = s.match(/^\[(.+)\]\((.+)\)$/))) return m[2].startsWith("/") ? <Link key={i} to={m[2]}>{m[1]}</Link> : <a key={i} href={m[2]} target="_blank" rel="noreferrer">{m[1]}</a>;
    return s;
  });
}

export function BlogCard({ b, delay = 0 }) {
  return (
    <Reveal delay={delay} className="b-wrap">
      <Link to={"/blog/" + b.slug} className="b-card">
        <div className="b-img"><img src={b.cover} alt={b.title} loading="lazy" /><span className="chip">{b.category}</span></div>
        <div className="b-body">
          <small>{b.dateLabel} · {b.minutes} min read</small>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
          <span className="explore">Read the guide <Arrow /></span>
        </div>
      </Link>
    </Reveal>
  );
}

export function BlogList() {
  useSEO({ title: "Blog: E-commerce, Websites and AI Agents Guides for Indian Businesses", description: "Practical guides on e-commerce websites, SEO, AI agents and automation for small and medium businesses in India.", path: "/blog" });
  return (
    <>
      <PageHeader label="Blog" line1="Guides and" line2="insights" lead="Plain-language guides on e-commerce, websites and AI agents for businesses in India." />
      <section className="section alt"><div className="container"><div className="blog-grid">{BLOGS.map((b, i) => <BlogCard key={b.slug} b={b} delay={i * 100} />)}</div></div></section>
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams(), b = BLOGS.find(x => x.slug === slug), { open } = useContact();
  const blocks = b ? parse(b.body) : [], faq = b ? faqOf(blocks) : [];
  useSEO(b ? {
    title: b.title, description: b.description, path: "/blog/" + b.slug, image: b.cover,
    jsonLd: { "@context": "https://schema.org", "@graph": [
      { "@type": "BlogPosting", headline: b.title, description: b.description, image: SITE + b.cover, datePublished: b.date, dateModified: b.date, keywords: b.keywords.join(", "), wordCount: b.words,
        author: { "@type": "Person", name: "Aasheesh Daniel" }, publisher: { "@type": "Organization", name: "Website Shopping", logo: { "@type": "ImageObject", url: SITE + "/logo.png" } }, mainEntityOfPage: SITE + "/blog/" + b.slug },
      ...(faq.length ? [{ "@type": "FAQPage", mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
    ] },
  } : { title: "Post not found", description: "This post does not exist.", path: "/blog" });

  if (!b) return <PageHeader label="Error 404" line1="Post" line2="not found" lead="We could not find that post."><Link className="btn btn-teal" to="/blog">All posts</Link></PageHeader>;
  const toc = blocks.filter(x => x.t === "h2"), others = BLOGS.filter(x => x !== b);
  const cta = b.slug.includes("ai") ? ["/services/ai-agents", "See AI agent plans"] : ["/services/ecommerce", "See e-commerce plans"];
  return (
    <>
      <ReadBar />
      <header className="post-head">
        <Slab className="head-slab" />
        <div className="container narrow-wide">
          <p className="crumbs"><Link to="/blog">Blog</Link> / {b.category}</p>
          <h1 className="post-title">{b.title}</h1>
          <p className="post-meta"><img src={FOUNDER.photo} alt="" width="36" height="36" /> By <b>Aasheesh Daniel</b> · {b.dateLabel} · {b.minutes} min read · {b.words.toLocaleString("en-IN")} words</p>
        </div>
      </header>
      <section className="section post-section">
        <div className="container post-layout">
          <article className="article">
            <figure className="post-cover"><img src={b.cover} alt={b.title} /></figure>
            {blocks.map((x, i) =>
              x.t === "h2" ? <h2 id={slugify(x.text)} key={i}>{x.text}</h2> :
              x.t === "h3" ? <h3 key={i}>{x.text}</h3> :
              x.t === "ul" ? <ul key={i}>{x.items.map((li, k) => <li key={k}>{inline(li)}</li>)}</ul> :
              x.t === "ol" ? <ol key={i}>{x.items.map((li, k) => <li key={k}>{inline(li)}</li>)}</ol> :
              x.t === "img" ? <figure key={i} className="article-fig"><img src={x.src} alt={x.alt} loading="lazy" />{x.alt && <figcaption>{x.alt}</figcaption>}</figure> :
              x.t === "quote" ? <blockquote key={i}>{inline(x.text)}</blockquote> :
              <p key={i} className={i === 0 ? "dropcap" : ""}>{inline(x.text)}</p>)}
            <div className="author">
              <img src={FOUNDER.photo} alt="Aasheesh Daniel" width="72" height="72" />
              <div><b>Written by Aasheesh Daniel</b><span>Founder of Website Shopping · {FOUNDER.line}</span></div>
            </div>
            <div className="quote-banner post-cta">
              <h3>Ready to start?</h3>
              <div className="btn-row center-row">
                <Link className="btn btn-teal" to={cta[0]}>{cta[1]} <Arrow /></Link>
                <button className="btn btn-red" onClick={() => open("Hi, I read your blog and want to know more.")}>Talk to us</button>
              </div>
            </div>
          </article>
          <aside className="toc" aria-label="Table of contents">
            <p className="mini-label">In this guide</p>
            <ol>{toc.map(h => <li key={h.text}><a href={"#" + slugify(h.text)}>{h.text}</a></li>)}</ol>
          </aside>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <Heading label="Keep reading">More <span className="shiny">guides</span></Heading>
          <div className="blog-grid">{others.map(o => <BlogCard key={o.slug} b={o} />)}</div>
        </div>
      </section>
    </>
  );
}
