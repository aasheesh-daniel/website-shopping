// Small line icons. They use "currentColor", so the colour comes from CSS.
const base = { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const I = (children) => (props) => <svg {...base} {...props}>{children}</svg>;

export const Phone = I(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />);
export const Chat = I(<><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 10h8M8 13h5" /></>);
export const Pin = I(<><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>);
export const Cart = I(<><path d="M3 4h2.5l2.2 10.5h10.6L20 7H6.2" /><circle cx="9.5" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></>);
export const Check = I(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const Arrow = I(<path d="M4 12h16m-6-6 6 6-6 6" />);
export const Close = I(<path d="M6 6l12 12M18 6 6 18" />);
export const Print = I(<><path d="M7 9V4h10v5" /><rect x="4" y="9" width="16" height="8" rx="1" /><path d="M7 14h10v6H7z" /></>);
export const Mail = I(<><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></>);
export const Devices = I(<><rect x="3" y="5" width="14" height="10" rx="1" /><path d="M1.5 18h17" /><rect x="15" y="9" width="6" height="10" rx="1" /></>);
export const Search = I(<><circle cx="11" cy="11" r="6" /><path d="m20 20-4.2-4.2" /></>);
export const Sliders = I(<><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>);
export const Card = I(<><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 10h18M7 15h4" /></>);
export const Cursor = I(<path d="m5 4 14 6-6 2-2 6L5 4Z" />);
export const Rocket = I(<><path d="M12 3c3.5 2 5 5.5 4.5 10l-2.5 2h-4l-2.5-2C7 8.5 8.5 5 12 3Z" /><circle cx="12" cy="9.5" r="1.6" /><path d="M9.5 15 8 19l3-1.5M14.5 15 16 19l-3-1.5" /></>);
export const Bag = I(<><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>);
export const Robot = I(<><rect x="5" y="8" width="14" height="10" rx="2" /><path d="M12 4v4M9 13h.01M15 13h.01M9 21h6" /></>);
export const Globe = I(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.5 5.6 3.5 9S14.5 18.4 12 21c-2.5-2.6-3.5-5.6-3.5-9S9.5 5.6 12 3Z" /></>);
export const Play = I(<><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m10 9 5 3-5 3V9Z" /></>);

// ---- more icons: one for every plan, chapter and section ----
export const Portfolio = I(<><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /><path d="M3 4h4M17 4h4" /></>);
export const Store = I(<><path d="M4 9 5.5 4h13L20 9" /><path d="M4 9v11h16V9" /><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" /><path d="M10 20v-5h4v5" /></>);
export const StoreApp = I(<><rect x="3" y="4" width="11" height="9" rx="1" /><path d="M3 7h11" /><rect x="14" y="9" width="7" height="12" rx="1.5" /><path d="M16.5 18.5h2" /><path d="M6 16h5v4H6z" /></>);
export const Brain = I(<><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /><path d="m9.5 15 2.5-6 2.5 6M10.4 13h3.2" /></>);
export const Layers = I(<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /><path d="m3 17.5 9 4.5 9-4.5" /></>);
export const Target = I(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.3" /></>);
export const Funnel = I(<><path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" /></>);
export const Flag = I(<><path d="M5 21V4" /><path d="M5 4h13l-2.5 4 2.5 4H5" /></>);
export const Star = (props) => <svg {...base} {...props} fill="currentColor" strokeWidth="1"><path d="m12 3 2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.2 6.4 20.3l1.2-6.3L3 9.6l6.3-.8L12 3Z" /></svg>;
export const Mic = I(<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>);
export const PlayDot = (props) => <svg {...base} {...props} fill="currentColor" stroke="none"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg>;
export const Pause = (props) => <svg {...base} {...props} fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>;
export const Quote = (props) => <svg {...base} {...props} fill="currentColor" stroke="none"><path d="M4 18v-5.5C4 8.5 6 6.3 9.5 6v2.4C7.8 8.7 7 9.8 7 11.5h3V18H4Zm10 0v-5.5c0-4 2-6.2 5.5-6.5v2.4c-1.7.3-2.5 1.4-2.5 3.1h3V18h-6Z" /></svg>;
export const Users = I(<><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.3A5 5 0 0 1 21 19" /></>);
export const Shield = I(<><path d="M12 3 4.5 6v6c0 4.3 3 7.4 7.5 9 4.5-1.6 7.5-4.7 7.5-9V6L12 3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>);
export const Zap = I(<path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />);
export const Code = I(<><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>);
export const Award = I(<><circle cx="12" cy="9" r="5.5" /><path d="m8.5 13.5-1.5 7.5 5-3 5 3-1.5-7.5" /></>);
export const External = I(<><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>);
export const Book = I(<><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M8 7h7M8 11h5" /></>);
export const Send = I(<><path d="m21 3-9.5 18-2.3-7.7L2 11 21 3Z" /><path d="m21 3-11.8 10.3" /></>);
export const Lock = I(<><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>);
export const ICONS = { Portfolio, Store, StoreApp, Brain, Layers, Target, Funnel, Flag, Globe, Cart, Rocket, Phone, Chat, Users, Shield, Zap, Code, Award, Search, Devices, Sliders, Card };
