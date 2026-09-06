import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { activateAccount } from "../api/authApi";

export default function ActivateAccountForm() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        documentType: "",
        document: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
        ...previous,
        [name]: value,
        }));
    };

    const handleDocumentChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        setForm((previous) => ({
        ...previous,
        document: value,
        }));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        setForm((previous) => ({
        ...previous,
        phone: value,
        }));
    };

    const validate = () => {
        if (!token) {
        return "El enlace de activación no es válido o ha expirado.";
        }

        if (form.password.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres.";
        }

        if (form.password !== form.confirmPassword) {
        return "Las contraseñas no coinciden.";
        }

        if (form.documentType === "DNI" && form.document.length !== 8) {
        return "El DNI debe tener 8 dígitos.";
        }

        if (form.documentType === "CE" && form.document.length !== 9) {
        return "El documento debe tener 9 dígitos.";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        const validationError = validate();

        if (validationError) {
        setError(validationError);
        return;
        }

        try {
        setLoading(true);

        await activateAccount({
            token,
            name: form.name.trim(),
            lastName: form.lastName.trim(),
            password: form.password,
            documentType: form.documentType,
            document: form.document,
            phone: form.phone,
        });

        setMessage("Tu cuenta ha sido activada correctamente.");

        setTimeout(() => {
            navigate("/login");
        }, 1800);
        } catch (err) {
        setError(
            err.response?.data?.message ||
            "No fue posible activar la cuenta. Inténtalo nuevamente.",
        );
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-card">
        <form onSubmit={handleSubmit} noValidate>
            {error && (
            <div className="alert alert-danger auth-alert" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
            </div>
            )}

            {message && (
            <div className="alert alert-success auth-alert" role="status">
                <i className="bi bi-check-circle me-2"></i>
                {message}
            </div>
            )}

            {/* INFORMACIÓN PERSONAL */}
            <section className="auth-form-section">
            <div className="auth-section-heading">
                <i className="bi bi-person"></i>

                <div>
                <h2>Información personal</h2>
                <p>Ingresa tus datos personales.</p>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                    Nombre
                </label>

                <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control auth-input"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="given-name"
                    required
                />
                </div>

                <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                    Apellido
                </label>

                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    className="form-control auth-input"
                    value={form.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    required
                />
                </div>
            </div>
            </section>

            {/* SEGURIDAD */}
            <section className="auth-form-section">
            <div className="auth-section-heading">
                <i className="bi bi-shield-lock"></i>

                <div>
                <h2>Seguridad</h2>
                <p>Crea la contraseña de tu cuenta.</p>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                    Contraseña
                </label>

                <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control auth-input"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={6}
                    required
                />

                <div className="form-text">Mínimo 6 caracteres.</div>
                </div>

                <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                    Confirmar contraseña
                </label>

                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="form-control auth-input"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />
                </div>
            </div>
            </section>

            {/* DOCUMENTO */}
            <section className="auth-form-section">
            <div className="auth-section-heading">
                <i className="bi bi-card-text"></i>

                <div>
                <h2>Documento de identidad</h2>
                <p>Esta información identifica tu cuenta.</p>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-md-5">
                <label htmlFor="documentType" className="form-label">
                    Tipo de documento
                </label>

                <select
                    id="documentType"
                    name="documentType"
                    className="form-select auth-input"
                    value={form.documentType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>

                    <option value="DNI">DNI</option>

                    <option value="CE">Carné de extranjería</option>
                </select>
                </div>

                <div className="col-md-7">
                <label htmlFor="document" className="form-label">
                    Número de documento
                </label>

                <input
                    id="document"
                    type="text"
                    name="document"
                    className="form-control auth-input"
                    placeholder={
                    form.documentType === "DNI"
                        ? "8 dígitos"
                        : "9 dígitos"
                    }
                    maxLength={form.documentType === "DNI" ? 8 : 9}
                    value={form.document}
                    onChange={handleDocumentChange}
                    inputMode="numeric"
                    required
                />
                </div>
            </div>
            </section>

            {/* CONTACTO */}
            <section className="auth-form-section">
            <div className="auth-section-heading">
                <i className="bi bi-telephone"></i>

                <div>
                <h2>Información de contacto</h2>
                <p>Necesitamos un número para contactarte.</p>
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="form-label">
                Teléfono
                </label>

                <input
                id="phone"
                type="tel"
                name="phone"
                className="form-control auth-input"
                placeholder="999 999 999"
                value={form.phone}
                onChange={handlePhoneChange}
                autoComplete="tel"
                inputMode="tel"
                required
                />
            </div>
            </section>

            {/* ACTION */}
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
                Activando cuenta...
                </>
            ) : (
                <>
                Activar cuenta
                <i className="bi bi-arrow-right ms-2"></i>
                </>
            )}
            </button>
        </form>
        </div>
    );
}
