export default function VerificationPublicLink({ 
    result 
}) {
    const { verificationUrl } = result;

    if (!verificationUrl) {
        return null;
    }

    return (
        <div className="verification-public-link">
        <div>
            <span className="verification-public-link-label">
            Enlace público de verificación
            </span>

            <p>
            Puedes compartir este enlace para consultar nuevamente la información
            pública del documento.
            </p>
        </div>

        <a
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-secondary btn-sm"
        >
            <i className="bi bi-box-arrow-up-right me-2" aria-hidden="true" />
            Abrir enlace
        </a>
        </div>
    );
}
