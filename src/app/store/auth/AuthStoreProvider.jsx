// motor del sistema de autenticación del frontend
// Aquí se guarda el usuario autenticado

import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { getCurrentUser } from "@/features/auth/api/authApi";
import tokenManager from "@/core/security/tokenManager";
import apiClient from "@/core/api/apiClient";
import { exitInstitution } from "@/features/auth/api/authApi";

export default function AuthStoreProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CARGA PRINCIPAL DEL USUARIO
  const loadUser = async () => {

    setLoading(true);
    
    try {

      console.log("Intentando cargar usuario...");

      const data = await getCurrentUser(); // GET /auth/me
      console.log("Usuario cargado /auth/me:", data);

      if (data && data.userId) {
        setUser(data);
        tokenManager.setSession(); // solo si hay usuario real
      } else {
        console.warn("Respuesta inválida de /auth/me");
        setUser(null);
        tokenManager.clearSession();
        tokenManager.clearInstitutionContext();
      }

      console.log("Sesión activa:", tokenManager.hasSession());
      
      return data;

    } catch (err) {

      if (err.response?.status === 401) {
        console.warn("Usuario no autenticado (esperado)");

        setUser(null);
        tokenManager.clearSession();
        tokenManager.clearInstitutionContext();

        return null;

      } else {
        console.error("Error inesperado:", err);
      }
    } finally {
      setLoading(false);
      console.log("Finalizó carga de usuario");

      if (!tokenManager.hasSession()) {
        tokenManager.clearSession();
      }
      console.log("Finalizó carga de usuario");
    }
  };

  // INICIALIZACIÓN CONTROLADA (SIN LOOPS)
  useEffect(() => {
    const publicRoutes = ["/login", "/activate"];

    const isPublic = publicRoutes.includes(window.location.pathname); 
    
    if (isPublic) {
      console.log("Ruta pública: no se valida sesión");
      setLoading(false);
      return;
    }

    loadUser();
  }, []);

  // LOGOUT
  const logoutUser = async(callBackend = true) => {
    console.warn("Cerrando sesión...");

    try {
      if (callBackend) {
        await apiClient.post("/auth/logout"); // llamar solo si viene de logout()
      }
    } catch (err) {
      console.warn("Error logout backend:", err);
    }

    tokenManager.clearSession();
    tokenManager.clearInstitutionContext();
    
    setUser(null);

    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  };

  
  // logout bajo contexto (caso superadmin)
  const exitInstitutionContext = async () => {

    try {

      await exitInstitution();
      const updateUser = await loadUser();
      setUser(updateUser);
      window.location.href = "/superadmin";
      return updateUser;

    } catch (error) {
      console.error("Error saliendo de institución", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logoutUser,
        loadUser,
        exitInstitutionContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
