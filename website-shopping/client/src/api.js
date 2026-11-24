// Address of the backend. Leave VITE_API_URL empty while developing (Vite forwards /api to localhost:5000).
// On Vercel, set VITE_API_URL to your Render address, e.g. https://your-app.onrender.com
export const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
