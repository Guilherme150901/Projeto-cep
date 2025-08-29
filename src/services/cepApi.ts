import api from "./api";

export interface CepResponse {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  errors?: boolean;
}

export async function getCep(cep: string): Promise<CepResponse | null> {
  try {
    const cleanCep = cep.replace(/\D/g, ""); // remove máscara (traço, pontos etc.)
    const { data } = await api.get<CepResponse>(`/cep/v1/${cleanCep}`);
    return data;
  } catch{
    return null
  }
}
