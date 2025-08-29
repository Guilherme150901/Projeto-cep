import axios from "axios";

const api = axios.create({
  baseURL: "https://brasilapi.com.br/api",
});

// Exemplo de interceptor para logar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
