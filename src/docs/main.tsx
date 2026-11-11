import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "../styles.css";
import "./docs.css";
import DocsApp from "./DocsApp";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Documentation root is missing");
}

createRoot(root).render(
  <StrictMode>
    <DocsApp />
  </StrictMode>
);
