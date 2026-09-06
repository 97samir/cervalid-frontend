import { useState } from "react";

import "../styles/certificateVerification.css";

export default function VerificationSearchCard({ 
    loading = false, 
    onVerify 
}) {
    const [form, setForm] = useState({
        certificateNumber: "",
        hash: "",
    });

    const handleChange = ({ target }) => {
        setForm((prev) => ({
        ...prev,
        [target.name]: target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onVerify(form);
    };

    return (
        <div className="verification-search-card">
        {/* HEADER */}

        <div className="verification-search-header">
            <div className="verification-search-icon">
            <i className="bi bi-search" aria-hidden="true"></i>
            </div>

            <div>
            <h2 id="verification-form-title">Verificar por código</h2>

            <p>
                Ingresa los datos que aparecen en el certificado para comprobar su
                autenticidad.
            </p>
            </div>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="verification-search-form">
            {/* CERTIFICATE NUMBER */}

            <div className="verification-field">
            <label htmlFor="certificateNumber" className="verification-label">
                Número de certificado
            </label>

            <div className="verification-input-wrapper">
                <i
                className="bi bi-file-earmark-text verification-input-icon"
                aria-hidden="true"
                ></i>

                <input
                id="certificateNumber"
                type="text"
                className="form-control verification-input"
                name="certificateNumber"
                placeholder="Ej. CERT-2026-9D324517"
                value={form.certificateNumber}
                onChange={handleChange}
                autoComplete="off"
                required
                />
            </div>

            <div className="verification-field-help">
                <i className="bi bi-info-circle" aria-hidden="true"></i>

                <span>Identificador único que aparece en el certificado.</span>
            </div>
            </div>

            {/* HASH */}

            <div className="verification-field">
            <label htmlFor="hash" className="verification-label">
                Código de verificación
            </label>

            <div className="verification-input-wrapper">
                <i
                className="bi bi-fingerprint verification-input-icon verification-textarea-icon"
                aria-hidden="true"
                ></i>

                <textarea
                id="hash"
                rows="1"
                className="form-control verification-input verification-textarea"
                name="hash"
                placeholder="Ingresa el código de verificación incluido en el certificado."
                value={form.hash}
                onChange={handleChange}
                required
                />
            </div>

            <div className="verification-field-help">
                <i className="bi bi-shield-check" aria-hidden="true"></i>

                <span>Se utiliza para comprobar la integridad del documento.</span>
            </div>
            </div>

            {/* SUBMIT */}

            <button
            type="submit"
            className="btn verification-submit-btn"
            disabled={loading}
            >
            {loading ? (
                <>
                <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                ></span>
                Verificando certificado...
                </>
            ) : (
                <>
                <i className="bi bi-shield-check me-2" aria-hidden="true"></i>
                Verificar certificado
                </>
            )}
            </button>
        </form>

        {/* SECURITY NOTE */}

        <div className="verification-security-note">
            <i className="bi bi-lock-fill" aria-hidden="true"></i>

            <span>La consulta es pública y no requiere iniciar sesión.</span>
        </div>
        </div>
    );
}
