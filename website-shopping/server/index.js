// API for Website Shopping: saves quote requests (leads) and client reviews in MongoDB Atlas.
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || true }));
app.use(express.json({ limit: "20kb" }));

// ---------- Models ----------
const Idea = mongoose.model("Idea", new mongoose.Schema(
  { name: String, phone: String, budget: String, idea: { type: String, required: true }, plan: String },
  { timestamps: true }));
const Review = mongoose.model("Review", new mongoose.Schema(
  { name: { type: String, required: true }, role: String, rating: { type: Number, min: 1, max: 5, default: 5 }, text: { type: String, required: true } },
  { timestamps: true }));

// ---------- Small helpers ----------
const clean = (v, max) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max); // no tags, capped length
const hits = new Map(); // very simple rate limit: 8 posts per 10 minutes per IP
const limited = (req) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip, now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < 600000);
  list.push(now); hits.set(ip, list);
  return list.length > 8;
};

// ---------- Quote requests ----------
// The website sends the form here, saves it, then opens WhatsApp with the message filled in.
app.post("/api/ideas", async (req, res) => {
  try {
    if (limited(req)) return res.status(429).json({ error: "Too many requests. Please try again later." });
    const { name, phone, budget, idea, plan, website } = req.body;
    if (website) return res.status(201).json({ ok: true }); // hidden field: bots fill it, people do not
    if (!clean(idea, 2000) || !clean(phone, 20)) return res.status(400).json({ error: "Idea and phone are required" });
    const saved = await Idea.create({ name: clean(name, 80), phone: clean(phone, 20), budget: clean(budget, 40), idea: clean(idea, 2000), plan: clean(plan, 80) });
    res.status(201).json({ ok: true, id: saved._id });
  } catch (e) { res.status(500).json({ error: "Could not save" }); }
});
// Only you can read the leads: send header  x-admin-key: <ADMIN_KEY from .env>
app.get("/api/ideas", async (req, res) => {
  if (!process.env.ADMIN_KEY || req.headers["x-admin-key"] !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });
  res.json(await Idea.find().sort("-createdAt"));
});

// ---------- Reviews ----------
app.get("/api/reviews", async (_req, res) => {
  try { res.json(await Review.find().sort("-createdAt").limit(100).select("name role rating text createdAt")); }
  catch { res.status(500).json({ error: "Could not load reviews" }); }
});
app.post("/api/reviews", async (req, res) => {
  try {
    if (limited(req)) return res.status(429).json({ error: "Too many requests. Please try again later." });
    const { name, role, rating, text, website } = req.body;
    if (website) return res.status(201).json({ ok: true });
    const t = clean(text, 1200), n = clean(name, 60);
    if (t.length < 10 || !n) return res.status(400).json({ error: "Please add your name and a review of at least 10 characters." });
    const r = Math.min(5, Math.max(1, Number(rating) || 5));
    const saved = await Review.create({ name: n, role: clean(role, 80), rating: r, text: t });
    res.status(201).json({ name: saved.name, role: saved.role, rating: saved.rating, text: saved.text, createdAt: saved.createdAt });
  } catch { res.status(500).json({ error: "Could not save review" }); }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/website-shopping")
  .then(() => app.listen(process.env.PORT || 5000, () => console.log("API running on port " + (process.env.PORT || 5000))))
  .catch(e => { console.error("MongoDB connection failed:", e.message); process.exit(1); });
