// Centraliza todas las llamadas HTTP al backend

import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Interceptor de respuestas para manejar errores HTTP
apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const status = error.response?.status;
        const url = error.config?.url ?? "";
        const pathname = url.split("?")[0].replace(/\/+$/, "");

        // 401 en /auth/me: sesión inexistente o no válida.
        // Es un comportamiento esperado al acceder sin iniciar sesión.
        if (status === 401 && pathname.endsWith("/auth/me")) {
            return Promise.reject(error);
        }

        // Errores reales de autenticación
        if (status === 401) {
            console.warn("Autenticación requerida:", url);
        }

        // Problemas de permisos
        if (status === 403) {
            console.error("Acceso denegado:", error);
        }

        // Errores del servidor
        if (status >= 500) {
            console.error("Error del servidor:", error);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
