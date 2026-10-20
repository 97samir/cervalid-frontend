import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../api/authApi";

import tokenManager from "@/core/security/tokenManager";
import DemoAccounts from "./DemoAccounts";
import useAuthStore from "@/app/store/auth/useAuthStore";
import useRoleRedirect from "@/core/security/useRoleRedirect";

export default function LoginForm() {

    const navigate = useNavigate();
    const redirectByRole = useRoleRedirect();

    const { loadUser, notifyLogin } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password) {
        setError("Ingresa tu correo electrónico y contraseña.");
        return;
        }

        try {
        setLoading(true);

        const response = await loginRequest({
            email: email.trim(),
            password,
        });

        // Varias instituciones: todavía no se debe consultar /auth/me.
        if (response.institutions?.length > 1) {
            tokenManager.clearSession();
            tokenManager.clearInstitutionContext();
            tokenManager.setPendingInstitutions(response.institutions);

            navigate("/select-institution", {
            state: {
                institutions: response.institutions,
            },
            replace: true,
            });

            return;
        }

        // Login con una institución o superadministrador.
        tokenManager.clearPendingInstitutions();

        const currentUser = await loadUser();

        if (!currentUser?.role) {
            setError("No se pudo cargar tu sesión. Inténtalo nuevamente.");
            return;
        }

        notifyLogin();
        redirectByRole(currentUser);

        } catch (err) {
            
            const status = err.response?.status;

            if (status === 401) {
                setError("El correo o la contraseña son incorrectos.");
            } else if (err.response) {
                setError(
                    err.response.data?.message ||
                    "No fue posible iniciar sesión. Inténtalo nuevamente.",
                );
            } else {
                setError(
                    "No se pudo conectar con el servidor. Comprueba tu conexión.",
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDemoAccount = (account) => {
        setEmail(account.email);
        setPassword("123456");
        setError("");
    };

    return (
        <div className="auth-card">
        <form onSubmit={handleSubmit}>
            {error && (
            <div className="alert alert-danger auth-alert" role="alert">
                <i className="bi bi-exclamation-circle me-2" aria-hidden="true"></i>

                <span>{error}</span>
            </div>
            )}

            {/* EMAIL */}
            <div className="auth-form-group">
            <label htmlFor="email">Correo electrónico</label>

            <div className="auth-input-wrapper">
                <i
                className="bi bi-envelope auth-input-icon"
                aria-hidden="true"
                ></i>

                <input
                id="email"
                type="email"
                className="form-control auth-input"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                />
            </div>
            </div>

            {/* PASSWORD */}
            <div className="auth-form-group">
            <div className="auth-label-row">
                <label htmlFor="password">Contraseña</label>

                <button
                type="button"
                className="auth-forgot-link"
                onClick={() => {
                    // Implementaremos recuperación posteriormente
                }}
                >
                ¿Olvidaste tu contraseña?
                </button>
            </div>

            <div className="auth-input-wrapper">
                <i className="bi bi-lock auth-input-icon" aria-hidden="true"></i>

                <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control auth-input auth-password-input"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                />

                <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                >
                <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    aria-hidden="true"
                ></i>
                </button>
            </div>
            </div>

            {/* REMEMBER */}
            <div className="auth-options">
            <div className="form-check">
                <input
                id="rememberMe"
                type="checkbox"
                className="form-check-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                />

                <label htmlFor="rememberMe" className="form-check-label">
                Recordarme
                </label>
            </div>
            </div>

            {/* SUBMIT */}
            <button
            type="submit"
            className="btn auth-submit-btn w-100"
            disabled={loading}
            >
            {loading ? (
                <>
                <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                ></span>
                Iniciando sesión...
                </>
            ) : (
                <>
                Iniciar sesión
                <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
                </>
            )}
            </button>
        </form>

        {/* INSTITUTION CTA */}
        <div className="auth-secondary-action">
            <span>¿Representas a una institución educativa?</span>

            <button
            type="button"
            className="auth-secondary-link"
            onClick={() => navigate("/institution-requests")}
            >
            Solicitar incorporación
            <i className="bi bi-arrow-right ms-1" aria-hidden="true"></i>
            </button>
        </div>

            <DemoAccounts onSelect={handleDemoAccount} />
        </div>
    );
}
