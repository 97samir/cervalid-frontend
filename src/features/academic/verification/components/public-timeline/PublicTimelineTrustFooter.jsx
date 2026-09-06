export default function PublicTimelineTrustFooter() {
    return (
        <div className="verification-trust mt-5">

            <div className="verification-trust-icon">
                <i className="bi bi-shield-check"></i>
            </div>

            <div className="flex-grow-1">

                <strong>
                    Trazabilidad pública de CERVALID
                </strong>

                <p className="mb-0 text-muted small mt-1">
                    Esta información corresponde únicamente a eventos
                    académicos autorizados para consulta pública.
                </p>

            </div>

            <i className="bi bi-check-circle-fill text-success fs-5"></i>

        </div>
    );
}