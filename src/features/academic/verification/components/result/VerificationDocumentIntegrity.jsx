import VerificationHashValue from "../shared/VerificationHashValue";
import VerificationEmptyReference from "../shared/VerificationEmptyReference";

export default function VerificationDocumentIntegrity({ 
    result 
}) {
    const { document = {} } = result;

    const { documentHash, documentUrl } = document;

    const hasDocumentHash = Boolean(documentHash);
    const hasDocumentUrl = Boolean(documentUrl);

    return (
        <div className="verification-info-card h-100">
        <div className="card-header">
            <div className="verification-card-icon">
            <i className="bi bi-file-earmark-lock" aria-hidden="true" />
            </div>

            <div>
            <div className="verification-card-title">
                Integridad del documento
            </div>

            <div className="verification-card-subtitle">
                Referencias asociadas al documento oficial
            </div>
            </div>
        </div>

        <div className="card-body">
            {hasDocumentHash ? (
            <div className="verification-integrity-field">
                <span className="verification-integrity-label">
                Huella digital del documento
                </span>

                <VerificationHashValue value={documentHash} />
            </div>
            ) : (
            <VerificationEmptyReference
                title="Huella no disponible"
                description="No se registró una huella digital del documento para esta consulta."
            />
            )}

            {hasDocumentUrl && (
            <div className="verification-document-link">
                <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm"
                >
                <i className="bi bi-file-earmark-text me-2" aria-hidden="true" />
                Ver documento oficial
                </a>
            </div>
            )}
        </div>
        </div>
    );
}
