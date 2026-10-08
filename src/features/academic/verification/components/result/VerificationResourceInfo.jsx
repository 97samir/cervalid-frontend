import VerificationSummaryItem from "../shared/VerificationSummaryItem";
import VerificationStatusValue from "../shared/VerificationStatusValue";

import {
    getCertificateTypeLabel,
    getCredentialTypeLabel,
    formatVerificationDate,
    formatVerificationDateOnly,
} from "../../utils/verificationUtils";

export default function VerificationResourceInfo({ 
    result 
}) {
    const {
        verificationType,
        resourceType,
        resourceNumber,
        resourceNumberLabel,
        title,
        awardedAt,
        issuedAt,
        status,
    } = result;

    const typeLabel =
        verificationType === "CREDENTIAL"
        ? getCredentialTypeLabel(resourceType)
        : getCertificateTypeLabel(resourceType);

    const statusLabel =
        status === "VALID"
        ? "Válido"
        : status === "REVOKED"
            ? "Revocado"
            : status === "NOT_FOUND"
            ? "No encontrado"
            : "No válido";

    return (
        <div className="verification-info-card h-100">
        <div className="card-header">
            <div className="verification-card-icon">
            <i
                className={
                verificationType === "CREDENTIAL"
                    ? "bi bi-award"
                    : "bi bi-patch-check"
                }
                aria-hidden="true"
            />
            </div>

            <div>
            <div className="verification-card-title">
                Información del documento
            </div>

            <div className="verification-card-subtitle">
                Identificación y emisión
            </div>
            </div>
        </div>

        <div className="card-body">
            <VerificationSummaryItem label="Tipo" value={typeLabel} />

            <VerificationSummaryItem
            label={resourceNumberLabel}
            value={resourceNumber}
            />

            <VerificationSummaryItem 
            label="Título" 
            value={title} 
            />

            <VerificationSummaryItem
            label="Otorgado"
            value={formatVerificationDateOnly(awardedAt)}
            />

            <VerificationSummaryItem
            label="Emitido"
            value={formatVerificationDate(issuedAt)}
            />

            <div className="verification-summary-item">
            <span className="verification-summary-label">Estado</span>

            <span className="verification-summary-value">
                <VerificationStatusValue status={status} label={statusLabel} />
            </span>
            </div>
        </div>
        </div>
    );
}
