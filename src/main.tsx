import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./styles/style.css";
import i18n, { normalizeToSupported, type SupportedLang } from "./i18n";

const OVERRIDE_KEY = "appLngOverride";

// Se o usuário já escolheu manualmente antes, honre a escolha
const override = localStorage.getItem(OVERRIDE_KEY) as SupportedLang | null;
if (override) {
  i18n.changeLanguage(override);
} else {
  // opcional: sincronizar com navigator já normalizado
  const nav = normalizeToSupported(navigator.language);
  if (i18n.language !== nav) i18n.changeLanguage(nav);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
