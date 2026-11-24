import { createContext, useContext } from "react";

// The cart is just a list of product ids. It is shared with every page through this context.
export const CartCtx = createContext();
export const useCart = () => useContext(CartCtx);

// add / delete one id / clear everything
export const reducer = (s, a) =>
  a.t === "add" ? (s.includes(a.id) ? s : [...s, a.id]) : a.t === "del" ? s.filter(x => x !== a.id) : [];
