import { useEffect } from "react";
import i18n from "../i18n";

export function useHtmlLangSync() {
  useEffect(() => {
    const update = (lng: string) => {
      document.documentElement.setAttribute("lang", lng);
    };
    update(i18n.language);

    const handler = (lng: string) => update(lng);
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, []);
}
