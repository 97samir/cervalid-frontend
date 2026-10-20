import { useState } from "react";

export default function VerificationSearchCard({
    loading = false,
    onVerify,
    verificationType = "CERTIFICATE",
    initialValues = {},
}) {
    const isCredential = verificationType === "CREDENTIAL";

    const [form, setForm] = useState({
        resourceNumber: initialValues.resourceNumber ?? "",
        verificationHash: initialValues.verificationHash ?? "",
    });

    const resourceLabel = isCredential
        ? "título o grado académico"
        : "certificado";

    const resourceLabelCapitalized = isCredential
        ? "título o grado"
        : "certificado";

    const numberLabel = isCredential
        ? "Número de título o grado"
        : "Número de certificado";

    const numberPlaceholder = isCredential
        ? "Ej. CRED-2026-9D324517"
        : "Ej. CERT-2026-9D324517";

    const handleChange = ({ target }) => {
        setForm((prev) => ({
        ...prev,
        [target.name]: target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
        [isCredential ? "credentialNumber" : "certificateNumber"]:
            form.resourceNumber.trim(),

        verificationHash: form.verificationHash.trim(),
        };

        onVerify(payload);
    };

    return (
        <div className="verification-search-card">
        {/* HEADER */}

        {/* <div className="verification-search-header">
            <div className="verification-search-icon">
            <i className="bi bi-search" aria-hidden="true" />
            </div>

            <div>
            <h2 id="verification-form-title">Verificar por código</h2>

            <p>
                Ingresa los datos que aparecen en el {resourceLabel} para comprobar
                su autenticidad.
            </p>
            </div>
        </div> */}

        {/* FORM */}

        <form onSubmit={handleSubmit} className="verification-search-form">
            {/* RESOURCE NUMBER */}

            <div className="verification-field">
            <label htmlFor="resourceNumber" className="verification-label">
                {numberLabel}
            </label>

            <div className="verification-input-wrapper">
                <i
                className="bi bi-file-earmark-text verification-input-icon"
                aria-hidden="true"
                />

                <input
                id="resourceNumber"
                type="text"
                className="form-control verification-input"
                name="resourceNumber"
                placeholder={numberPlaceholder}
                value={form.resourceNumber}
                onChange={handleChange}
                autoComplete="off"
                required
                />
            </div>

            <div className="verification-field-help">
                <i className="bi bi-info-circle" aria-hidden="true" />

                <span>Identificador único que aparece en el {resourceLabel}.</span>
            </div>
            </div>

            {/* VERIFICATION HASH */}

            <div className="verification-field">
            <label htmlFor="verificationHash" className="verification-label">
                Código de verificación
            </label>

            <div className="verification-input-wrapper">
                <i
                className="bi bi-fingerprint verification-input-icon verification-textarea-icon"
                aria-hidden="true"
                />

                <textarea
                id="verificationHash"
                rows="1"
                className="form-control verification-input verification-textarea"
                name="verificationHash"
                placeholder={`Ingresa el código de verificación incluido en el ${resourceLabel}.`}
                value={form.verificationHash}
                onChange={handleChange}
                autoComplete="off"
                required
                />
            </div>

            <div className="verification-field-help">
                <i className="bi bi-shield-check" aria-hidden="true" />

                <span>
                Se utiliza para comprobar la integridad del {resourceLabel}.
                </span>
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
                />
                Verificando {resourceLabel}...
                </>
            ) : (
                <>
                <i className="bi bi-shield-check me-2" aria-hidden="true" />
                Verificar {resourceLabelCapitalized}
                </>
            )}
            </button>
        </form>

        {/* SECURITY NOTE */}

        {/* <div className="verification-security-note">
            <i className="bi bi-lock-fill" aria-hidden="true" />

            <span>La consulta es pública y no requiere iniciar sesión.</span>
        </div> */}
        </div>
    );
}
