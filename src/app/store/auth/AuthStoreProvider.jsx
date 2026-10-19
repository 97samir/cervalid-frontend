import { useCallback, useEffect, useRef, useState } from "react";

import AuthContext from "./AuthContext";
import tokenManager from "@/core/security/tokenManager";
import apiClient from "@/core/api/apiClient";

import { getCurrentUser, exitInstitution } from "@/features/auth/api/authApi";

const AUTH_CHANNEL_NAME = "cervalid-auth";

export default function AuthStoreProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(false);

    const authChannelRef = useRef(null);

    const loadUser = useCallback(async () => {
        setLoading(true);
        setAuthError(false);

        try {
        const data = await getCurrentUser();

        if (!data?.userId || !data?.role) {
            setUser(null);
            tokenManager.clearSession();
            tokenManager.clearInstitutionContext();

            return null;
        }

        setUser(data);
        tokenManager.setSession();

        return data;
        } catch (error) {
        const status = error.response?.status;

        if (status === 401) {
            setUser(null);
            tokenManager.clearSession();
            tokenManager.clearInstitutionContext();

            return null;
        }

        setAuthError(true);
        throw error;
        } finally {
        setLoading(false);
        }
    }, []);

    // Crear el canal de comunicación entre pestañas.
    useEffect(() => {
        if (typeof BroadcastChannel === "undefined") {
        return;
        }

        const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);

        authChannelRef.current = channel;

        channel.onmessage = (event) => {
        const messageType = event.data?.type;

        if (messageType === "LOGIN") {
            // La otra pestaña inició sesión.
            // Validamos al usuario mediante la cookie HttpOnly.
            loadUser().catch((error) => {
            console.error("No se pudo sincronizar el inicio de sesión:", error);
            });

            return;
        }

        if (messageType === "LOGOUT") {
            // La otra pestaña cerró sesión.
            tokenManager.clearSession();
            tokenManager.clearInstitutionContext();
            tokenManager.clearPendingInstitutions();

            setUser(null);
            setAuthError(false);
            setLoading(false);

            // Si la pestaña estaba en una ruta privada,
            // volver al login sin necesidad de recargarla.
            if (window.location.pathname !== "/login") {
            window.location.href = "/login";
            }
        }
        };

        return () => {
        channel.close();
        authChannelRef.current = null;
        };
    }, [loadUser]);

    // Validar la sesión al iniciar la aplicación.
    useEffect(() => {
        loadUser().catch((error) => {
        console.error("No se pudo validar la sesión:", error);
        });
    }, [loadUser]);

    // Notificar a las demás pestañas después de un login correcto.
    const notifyLogin = useCallback(() => {
        authChannelRef.current?.postMessage({
        type: "LOGIN",
        });
    }, []);

    const logoutUser = async (callBackend = true) => {
        try {
        if (callBackend) {
            await apiClient.post("/auth/logout");
        }
        } catch (error) {
        console.warn("No se pudo completar el logout en el backend:", error);
        } finally {
        tokenManager.clearSession();
        tokenManager.clearInstitutionContext();
        tokenManager.clearPendingInstitutions();

        setUser(null);
        setAuthError(false);
        setLoading(false);

        authChannelRef.current?.postMessage({
            type: "LOGOUT",
        });

        if (window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
        }
    };

    const exitInstitutionContext = async () => {
        try {
        await exitInstitution();

        tokenManager.clearInstitutionContext();

        const updatedUser = await loadUser();

        return updatedUser;
        } catch (error) {
        console.error("Error saliendo del contexto institucional:", error);

        throw error;
        }
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            loading,
            authError,
            setUser,
            loadUser,
            notifyLogin,
            logoutUser,
            exitInstitutionContext,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}
