import React from "react";
import i18n from "../i18n"; // seu setup i18n

type SupportedLang = "pt-BR" | "en-US";

const LanguageSwitcher: React.FC = () => {
  const currentLang = i18n.language as SupportedLang;

  const changeLanguage = (lng: SupportedLang) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <button
        onClick={() => changeLanguage("pt-BR")}
        style={{
          fontSize: "2rem",
          border: currentLang === "pt-BR" ? "2px solid #000" : "1px solid #ccc",
          borderRadius: "8px",
          padding: "4px",
          cursor: "pointer",
          background: "white",
        }}
      >
        🇧🇷
      </button>

      <button
        onClick={() => changeLanguage("en-US")}
        style={{
          fontSize: "2rem",
          border: currentLang === "en-US" ? "2px solid #000" : "1px solid #ccc",
          borderRadius: "8px",
          padding: "4px",
          cursor: "pointer",
          background: "white",
        }}
      >
        🇺🇸
      </button>
    </div>
  );
};

export default LanguageSwitcher;
