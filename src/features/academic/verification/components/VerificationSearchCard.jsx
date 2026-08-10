import { useState } from "react";
//import { useParams } from "react-router-dom";
import "../styles/verification.css";

export default function VerificationSearchCard({ 
    loading = false, 
    onVerify,
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

        setForm({
            certificateNumber: "",
            hash: "",
        });
    };

    return (
        <div className="card verification-search-card">
        <div className="card-body">
            <div className="mb-4">
            <h3 className="fw-bold mb-2">Verificación de certificados</h3>

            <p className="text-muted mb-0">
                Comprueba la autenticidad de un certificado académico emitido por
                una institución registrada en Cervalid.
            </p>
            </div>

            <form onSubmit={handleSubmit}>
            {/* Número */}

            <div className="mb-4">
                <label className="form-label fw-semibold">
                Número de certificado
                </label>

                <input
                type="text"
                className="form-control"
                name="certificateNumber"
                placeholder="Ej. CERT-2026-9D324517"
                value={form.certificateNumber}
                onChange={handleChange}
                required
                />

                <div className="form-text">
                Identificador único del certificado.
                </div>
            </div>

            {/* Hash */}

            <div className="mb-4">
                <label className="form-label fw-semibold">
                Código de verificación (Hash)
                </label>

                <textarea
                rows="4"
                className="form-control"
                name="hash"
                value={form.hash}
                onChange={handleChange}
                placeholder="Ingrese el código de verificación incluido en el certificado."
                required
                />

                <div className="form-text">
                Este hash garantiza la integridad del documento.
                </div>
            </div>

            <div className="d-grid">
                <button className="btn btn-primary btn-lg" 
                disabled={loading}>
                {loading ? (
                    <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Verificando...
                    </>
                ) : (
                    <>
                    <i className="bi bi-shield-check me-2" />
                    Verificar certificado
                    </>
                )}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}
