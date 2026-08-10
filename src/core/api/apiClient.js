// Centraliza todas las llamadas HTTP al backend

import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// interceptor de respuestas para manejar 401 y refresh
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    
    if (error.response?.status === 401){

      // si es /auth/me ignorar
      if (error.config.url.includes("/auth/me")) {
        console.log("No autenticado (flujo normal)");
      } else {
        console.warn("401 real:", error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
