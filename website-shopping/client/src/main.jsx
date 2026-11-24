import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/bodoni-moda/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/mrs-saint-delafield/400.css";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);
