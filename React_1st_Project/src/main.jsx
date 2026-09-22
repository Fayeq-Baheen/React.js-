import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Info from "./info.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Info />
  </StrictMode>,
);
