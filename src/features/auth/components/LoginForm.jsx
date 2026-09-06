import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../api/authApi";

import DemoAccounts from "./DemoAccounts";
import useAuthStore from "@/app/store/auth/useAuthStore";
import useRoleRedirect from "@/core/security/useRoleRedirect";

export default function LoginForm() {
    const navigate = useNavigate();
    const redirectByRole = useRoleRedirect();

    const { loadUser } = useAuthStore();

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

            // El usuario pertenece a varias instituciones.
            if (response.institutions?.length > 1) {
                navigate("/select-institution", {
                    state: {
                        institutions: response.institutions,
                    },
                });

                return;
            }

            // Una institución o SUPER_ADMIN.
            const currentUser = await loadUser();

            if (!currentUser?.role) {
                setError("No se pudo determinar el rol de tu cuenta.");
                return;
            }

            redirectByRole(currentUser.role);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "El correo o la contraseña son incorrectos.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDemoAccount = (account) => {
        setEmail(account.email);
        setPassword("demo123");
        setError("");
    };

    return (
        <div className="auth-card">
            <form onSubmit={handleSubmit}>
                {error && (
                    <div
                        className="alert alert-danger auth-alert"
                        role="alert"
                    >
                        <i
                            className="bi bi-exclamation-circle me-2"
                            aria-hidden="true"
                        ></i>

                        <span>{error}</span>
                    </div>
                )}

                {/* EMAIL */}
                <div className="auth-form-group">
                    <label htmlFor="email">
                        Correo electrónico
                    </label>

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
                        <label htmlFor="password">
                            Contraseña
                        </label>

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
                        <i
                            className="bi bi-lock auth-input-icon"
                            aria-hidden="true"
                        ></i>

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
                            onClick={() =>
                                setShowPassword((current) => !current)
                            }
                            aria-label={
                                showPassword
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }
                        >
                            <i
                                className={
                                    showPassword
                                        ? "bi bi-eye-slash"
                                        : "bi bi-eye"
                                }
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
                            onChange={(e) =>
                                setRememberMe(e.target.checked)
                            }
                        />

                        <label
                            htmlFor="rememberMe"
                            className="form-check-label"
                        >
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
                            <i
                                className="bi bi-arrow-right ms-2"
                                aria-hidden="true"
                            ></i>
                        </>
                    )}
                </button>
            </form>

            {/* INSTITUTION CTA */}
            <div className="auth-secondary-action">
                <span>
                    ¿Representas a una institución educativa?
                </span>

                <button
                    type="button"
                    className="auth-secondary-link"
                    onClick={() =>
                        navigate("/institution-requests")
                    }
                >
                    Solicitar incorporación
                    <i
                        className="bi bi-arrow-right ms-1"
                        aria-hidden="true"
                    ></i>
                </button>
            </div>

            {import.meta.env.DEV && (
                <DemoAccounts onSelect={handleDemoAccount} />
            )}
        </div>
    );
}