// "Talk to us" window. Any button can call  useContact().open()  to show it.
// Call opens the phone dialer with the number filled in; WhatsApp opens the WhatsApp app (or WhatsApp Web).
import { createContext, useContext, useState } from "react";
import { Modal } from "./Parts";
import { Phone, Chat } from "./Icons";
import { PHONE_SHOW, TEL, wa } from "./data";

const Ctx = createContext({ open: () => {} });
export const useContact = () => useContext(Ctx);

export function ContactProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const open = (text) => setMsg(typeof text === "string" ? text : "");
  const close = () => setMsg(null);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <Modal open={msg !== null} onClose={close} title="Talk to us">
        <p className="modal-lead">Choose how you would like to reach us. We reply fast.</p>
        <p className="chip-line"><span className="round"><Phone /></span>{PHONE_SHOW}</p>
        <a className="btn btn-teal btn-block" href={TEL} onClick={close}><Phone /> Call {PHONE_SHOW}</a>
        <a className="btn btn-red btn-block" href={msg ? wa(msg) : wa()} target="_blank" rel="noreferrer" onClick={close}><Chat /> Message on WhatsApp</a>
      </Modal>
    </Ctx.Provider>
  );
}
