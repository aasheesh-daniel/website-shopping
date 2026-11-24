# Website Shopping (MERN)

## Run it (2 commands, from this folder)
1. `npm install`      (installs the root, client and server automatically)
2. `npm run dev`      -> website on http://localhost:5173, API on :5000

Only the website (no server): `npm run dev:client`
Check a production build: `npm run build`

The API needs MongoDB. Copy `server/.env.example` to `server/.env` and fill in MONGO_URI and ADMIN_KEY.
Without it the website still runs; the quote form still opens WhatsApp, but saving and reviews need the server.

## Put it live (one time)
- **GitHub:** upload this whole folder. The `.gitignore` files already keep node_modules, dist and .env out.
  After that, to update: `.\push.ps1 "message"` (PowerShell)
- **Vercel (website):** Root Directory = `website-shopping/client` (or `client` if you upload the contents of this folder as the repo root). Framework: Vite, Build Command `npm run build`, Output `dist`.
  Environment Variables: `VITE_API_URL` = your Render address.
- **Render (server):** Root Directory = `website-shopping/server`, Build `npm install`, Start `npm start`.
  Environment: `MONGO_URI`, `ADMIN_KEY` (leave CLIENT_ORIGIN empty).

## Where things are (client/src)
- `data.js` plans, prices, advances, journey, projects, team, FAQ, ticker. `blogs/` the SEO articles.
- `index.css` all styling. Colours are variables at the top (:root).
- `Home.jsx` pinned showcase + home sections, `Services.jsx Cart.jsx Journey.jsx Projects.jsx About.jsx Reviews.jsx Blog.jsx Contact.jsx Policy.jsx`.
- `Parts.jsx` shared pieces, `Dock.jsx` floating quick-shop bar, `ContactWindow.jsx` the call/WhatsApp window, `fx.jsx` GSAP animations, `seo.js` SEO tags, `api.js` backend address.
