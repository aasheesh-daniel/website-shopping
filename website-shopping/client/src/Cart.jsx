import { useState } from "react";
import { Link } from "react-router-dom";
import { byId, rs, PHONE_SHOW } from "./data";
import { useCart } from "./cartStore";
import { PageHeader, Modal, Badge, imgOf } from "./Parts";
import { useContact } from "./ContactWindow";
import { useSEO } from "./seo";
import { Arrow, Cart, Lock, Check } from "./Icons";

export default function CartPage() {
  useSEO({ title: "Your cart", description: "Review the plans in your cart, then pay the advance or connect with us on call or WhatsApp.", path: "/cart" });
  const { cart, dispatch } = useCart(), { open } = useContact(), [pay, setPay] = useState(false);
  const items = cart.map(byId).filter(Boolean);
  const total = items.reduce((s, p) => s + p.price, 0), advance = items.reduce((s, p) => s + p.advance, 0);
  const anyFrom = items.some(p => p.from);
  // the message that WhatsApp opens with
  const msg = items.length ? "Hi, I want to proceed with: " + items.map(i => i.name).join(", ") : "Hi, I have a question about your services";
  return (
    <>
      <PageHeader label="Your selection" line1="Your" line2="cart" />
      <section className="section alt">
        <div className="container">
          {!items.length ? (
            <div className="empty">
              <Cart className="empty-icon" />
              <p>Your cart is empty.</p>
              <Link className="btn btn-teal" to="/services">See our services <Arrow /></Link>
            </div>
          ) : (
            <div className="cart-wrap">
              <div className="cart-list">
                {items.map(p => (
                  <div className="line" key={p.id}>
                    <Link to={"/services/" + p.id}><img src={imgOf(p)} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.fb; }} /></Link>
                    <div>
                      <Badge name={p.icon} size="sm" />
                      <h3>{p.name}</h3>
                      <p>{p.from ? "Starting from " : ""}<b>{rs(p.price)}</b> · Advance <b>{rs(p.advance)}</b></p>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={() => dispatch({ t: "del", id: p.id })}>Remove</button>
                  </div>
                ))}
              </div>
              <aside className="summary">
                <h3>Order summary</h3>
                <div className="srow"><span>Plans</span><b>{items.length}</b></div>
                <div className="srow"><span>{anyFrom ? "Total (starting from)" : "Total"}</span><b>{rs(total)}</b></div>
                <div className="srow due"><span>Advance to start</span><b className="shiny">{rs(advance)}</b></div>
                <button className="btn btn-teal btn-block" onClick={() => setPay(true)}><Lock /> Proceed to pay</button>
                <button className="btn btn-red btn-block" onClick={() => open(msg)}>Connect with us</button>
                <button className="btn btn-outline btn-block btn-sm" onClick={() => dispatch({ t: "clear" })}>Clear cart</button>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* Payment window: the payment gateway will be connected here later */}
      <Modal open={pay} onClose={() => setPay(false)} title="Pay your advance">
        <p className="chip-line"><span className="round"><Check /></span>Advance to pay: {rs(advance)}</p>
        <p className="modal-lead">Online payment is being set up and will be live soon. To start your project today, connect with us and we will confirm your advance.</p>
        <button className="btn btn-red btn-block" onClick={() => { setPay(false); open(msg); }}>Connect with us</button>
        <button className="btn btn-outline btn-block" onClick={() => setPay(false)}>Back to cart</button>
      </Modal>
    </>
  );
}
