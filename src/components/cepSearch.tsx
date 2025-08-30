import { useState } from "react";
import { getCep, type CepResponse } from "../services/cepApi.ts";
import "../styles/style.css";
import { maskCep } from "../utils/mask.ts";
/*import LanguageSwitcher from "./languageSwitcher.tsx";*/
import { useI18n } from "../hook/useI18n.ts";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { icons } from "../assets/icons/icons.ts";

export default function CepSearch() {
  const [cep, setCep] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultCep, setResultCep] = useState<CepResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string>("");
  const { street, city, neighborhood, cep: cepResult, state } = resultCep ?? {};
  const { translate } = useI18n();

  const handleSearchCep = async () => {
    setResultCep(null);
    if (!cep) {
      setError("Por favor, digite um CEP!");
      return;
    }

    if (cep.length !== 9) {
      setError("CEP deve ter exatamente 8 números!");
      return;
    }

    setError(null);
    setLoading(true);
    const result = await getCep(cep);
    setLoading(false);

    if (result) {
      setResultCep(result);
      setCep("");
      return;
    }
    setError("CEP não encontrado! Verifique e tente novamente.");
    setResultCep(null);
  };

  const shareText = async (text: string | undefined) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setShareMessage(`✅ "${text}" copiado!`);
    } catch {
      setShareMessage("❌ Erro ao copiar");
    }
    setTimeout(() => setShareMessage(""), 3500);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(maskCep(e.target.value));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>
          <img
            src={icons.search}
            alt="Ícone de busca"
            className="icon-search"
          />
          {translate("cepSearch.informationSearch")}
        </h1>
      </div>

      <div className="content">
        <div className="section">
          <h2>
            <img
              src={icons.localization}
              alt="Ícone de localização"
              className="icon-localization"
            />
            {translate("cepSearch.searchAddressByCep")}
          </h2>

          <div className="input-group">
            <label htmlFor="cep">{translate("cepSearch.enterCep")}</label>
            <input
              type="text"
              id="cep"
              placeholder="00000-000"
              maxLength={9}
              value={cep}
              onChange={onChangeText}
              onKeyDown={(e) => e.key === "Enter" && handleSearchCep()}
            />
          </div>

          <button className="btn" onClick={handleSearchCep} disabled={loading}>
            {loading ? "Buscando..." : translate("cepSearch.searchAddress")}
          </button>

          {loading && (
            <div className="loading show">
              <div className="spinner"></div>
              {translate("cepSearch.SearchingForAddress")}
            </div>
          )}

          {error && (
            <div className="result erro">
              <img src={icons.alert} alt="icone de alerta" /> {error}
            </div>
          )}

          {resultCep && (
            <div className="result sucesso">
              <h3>
                <img
                  className="icon-checked"
                  src={icons.checked}
                  alt="Ícone de checado"
                />
                {translate("cepSearch.AddressFound")}
              </h3>

              {street && (
                <div className="field-row">
                  <div className="field-content">
                    <strong>
                      <img
                        className="icon-street"
                        src={icons.street}
                        alt="Ícone de logradouro"
                      />
                      {translate("cepSearch.streetName")}
                    </strong>{" "}
                    {street}
                  </div>
                  <button
                    className="copy-icon"
                    onClick={() => shareText(street)}
                  >
                    <img
                      src={icons.copy}
                      alt="Ícone de copiar"
                      className="icon-copy-img"
                    />
                  </button>
                </div>
              )}

              {neighborhood && (
                <div className="field-row">
                  <div className="field-content">
                    <strong>
                      <img
                        className="icon-neighborhood"
                        src={icons.neighborhood}
                        alt="Ícone de bairro"
                      />
                      {translate("cepSearch.neighborhoodName")}
                    </strong>{" "}
                    {neighborhood}
                  </div>
                  <button
                    className="copy-icon"
                    onClick={() => shareText(neighborhood)}
                  >
                    <img
                      className="icon-copy-img"
                      src={icons.copy}
                      alt="Ícone de copiar"
                    />
                  </button>
                </div>
              )}

              {city && (
                <div className="field-row">
                  <div className="field-content">
                    <strong>
                      <img
                        className="icon-city"
                        src={icons.city}
                        alt="Ícone de cidade"
                      />
                      {translate("cepSearch.cityName")}
                    </strong>{" "}
                    {city}
                  </div>
                  <button className="copy-icon" onClick={() => shareText(city)}>
                    <img
                      className="icon-copy-img"
                      src={icons.copy}
                      alt="Ícone de copiar"
                    />
                  </button>
                </div>
              )}

              {state && (
                <div className="field-row">
                  <div className="field-content">
                    <strong>
                      <img
                        className="icon-state"
                        src={icons.state}
                        alt="Ícone de estado"
                      />
                      {translate("cepSearch.stateName")}
                    </strong>{" "}
                    {state}
                  </div>
                  <button
                    className="copy-icon"
                    onClick={() => shareText(state)}
                  >
                    <img
                      className="icon-copy-img"
                      src={icons.copy}
                      alt="Ícone de copiar"
                    />
                  </button>
                </div>
              )}

              {cepResult && (
                <div className="field-row">
                  <div className="field-content">
                    <strong>
                      <img
                        className="icon-zip-code"
                        src={icons.zipCode}
                        alt="Ícone de CEP"
                      />
                      {translate("cepSearch.zipCodeName")}
                    </strong>{" "}
                    {cepResult}
                  </div>
                  <button
                    className="copy-icon"
                    onClick={() => shareText(cepResult)}
                  >
                    <img
                      className="icon-copy-img"
                      src={icons.copy}
                      alt="Ícone de copiar"
                    />
                  </button>
                </div>
              )}

              <button
                className="copy-btn"
                onClick={() =>
                  shareText(
                    `${street}, ${neighborhood}, ${city} - ${state}, CEP: ${cepResult}`
                  )
                }
              >
                <img
                  className="icon-copy-img"
                  src={icons.copy}
                  alt="Ícone de busca"
                />
                {translate("cepSearch.CopyFullAddress")}
              </button>

              {shareMessage && (
                <div className="copy-message show">{shareMessage}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
