// Floating quick-shop bar: responsive across phones, tablets & laptops, auto-hides on hero when cart is empty.
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PRODUCTS, byId, rs } from "./data";
import { useCart } from "./cartStore";
import { useContact } from "./ContactWindow";
import { Cart, Arrow } from "./Icons";

export default function Dock() {
  const { cart } = useCart();
  const { open } = useContact();
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/cart") return null;

  const isPinnedPage = pathname === "/" || pathname === "/services" || pathname.startsWith("/services/");
  const items = cart.map(byId).filter(Boolean);

  if (isPinnedPage && !items.length && !pastHero) return null;

  const total = items.reduce((s, p) => s + p.price, 0);
  const advance = items.reduce((s, p) => s + p.advance, 0);
  const minPrice = Math.min(...PRODUCTS.map((p) => p.price));
  const minAdvance = Math.min(...PRODUCTS.map((p) => p.advance));

  return (
    <div className="dock" role="region" aria-label="Quick shop">
      {items.length ? (
        <>
          <Link to="/cart" className="dock-info" aria-label="Open your cart">
            <span className="dock-icon"><Cart /><b>{items.length}</b></span>
            <span className="dock-text">
              <strong>{items.length} in Cart · {rs(total)}</strong>
              <small>Advance {rs(advance)}</small>
            </span>
          </Link>
          <Link to="/cart" className="btn btn-red btn-sm">Cart <Arrow /></Link>
        </>
      ) : (
        <>
          <Link to="/services" className="dock-info" aria-label="See all services">
            <span className="dock-icon"><Cart /></span>
            <span className="dock-text">
              <strong>From {rs(minPrice)}</strong>
              <small>Advance from {rs(minAdvance)}</small>
            </span>
          </Link>
          <Link to="/services" className="btn btn-red btn-sm">Plans <Arrow /></Link>
        </>
      )}
      <button className="btn btn-teal btn-sm" onClick={() => open()}>Talk</button>
    </div>
  );
}
