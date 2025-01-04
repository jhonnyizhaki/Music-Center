import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router";
import { StrictMode } from "react";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
    <Toaster richColors={true} />
  </StrictMode>
);
