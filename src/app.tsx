import CepSearch from "./components/cepSearch.tsx";
import { useHtmlLangSync } from "./hook/useHtmlLangSync.ts";

export default function App() {
  useHtmlLangSync();
  return <CepSearch />;
}
