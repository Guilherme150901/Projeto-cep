// src/hooks/useI18n.ts
import { useTranslation } from "react-i18next";
import type { TOptions } from "i18next";
import { type DotNestedKeys } from "../i18n/types";

// importe seu JSON (pt-BR ou qualquer 1 arquivo como “fonte de verdade”)
import common from "../i18n/locales/pt-BR/common.json";

// todas as chaves "a.b.c" geradas automaticamente
export type CommonKeys = DotNestedKeys<typeof common>;

export function useI18n() {
  const { t } = useTranslation("common");
  function translate<K extends CommonKeys>(key: K, options?: TOptions): string {
    return t(key, options);
  }
  return { translate };
}
