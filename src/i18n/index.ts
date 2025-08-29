// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ptBR from "./locales/pt-BR/common.json";
import enUS from "./locales/en-US/common.json";

export type SupportedLang = "pt-BR" | "en-US";

export const normalizeToSupported = (lng?: string): SupportedLang => {
  if (!lng) return "pt-BR";
  return lng.startsWith("en") ? "en-US" : "pt-BR";
};

const resources = {
  "pt-BR": { common: ptBR },
  "en-US": { common: enUS },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ["pt-BR", "en-US"],
    fallbackLng: "pt-BR",
    ns: ["common"],
    defaultNS: "common",
    detection: {
      order: ["querystring", "navigator", "htmlTag"],
      lookupQuerystring: "lng",
      htmlTag: document.documentElement,
      caches: [], // 🔑 NADA de localStorage/cookie aqui
    },
    interpolation: { escapeValue: false },
    returnNull: false,
  });

export default i18n;
