const DEMO_CERTIFICATE = {
    type: "CERTIFICATE",
    resourceNumber: "CERT-2026-6FBCEDE8",
    verificationHash:
    "0x4ed8a9de4c3a9ec8220475135c6a941020e1714af8296c96eab96dc8a27c3152",
};

export default function VerificationDemo({ 
    onTryDemo 
}) {

    const hash = DEMO_CERTIFICATE.verificationHash;

    const shortHash = `${hash.slice(0, 10)}…${hash.slice(-6)}`;

    return (
        <section
        className="verification-demo-section"
        aria-labelledby="verification-demo-title"
        >
        <div className="verification-demo-card">
            <div className="verification-demo-icon">
            <i className="bi bi-stars" aria-hidden="true" />
            </div>

            <div className="verification-demo-content">
            <span className="verification-demo-label">
                Prueba la verificación
            </span>

            <h2 id="verification-demo-title">Documento de demostración</h2>

            <p>
                Explora cómo comprobar un documento académico utilizando nuestros
                datos de ejemplo.
            </p>

            <div className="verification-demo-details">
                <div>
                <span className="verification-demo-field-label">
                    Número de certificado
                </span>

                <strong>{DEMO_CERTIFICATE.resourceNumber}</strong>
                </div>

                <div>
                <span className="verification-demo-field-label">
                    Código de verificación
                </span>

                <code title="Código abreviado por legibilidad">{shortHash}</code>
                </div>
            </div>

            <button
                type="button"
                className="btn verification-demo-btn"
                onClick={() => onTryDemo(DEMO_CERTIFICATE)}
            >
                <i className="bi bi-shield-check me-2" aria-hidden="true" />
                Probar este documento
                <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
            </button>
            </div>
        </div>
        </section>
    );
}
