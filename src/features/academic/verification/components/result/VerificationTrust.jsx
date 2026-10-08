export default function VerificationTrust() {
    return (
        <div className="verification-trust mt-4">
        <div className="verification-trust-icon">
            <i className="bi bi-shield-check" aria-hidden="true" />
        </div>

        <div>
            <strong>Registro verificado en CERVALID</strong>

            <p className="mb-0 text-muted small">
            La información mostrada corresponde a los datos registrados por la
            institución y consultados mediante el sistema de verificación de
            CERVALID.
            </p>
        </div>
        </div>
    );
}
