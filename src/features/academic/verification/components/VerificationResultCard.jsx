import VerificationStatusBadge from "./VerificationStatusBadge";
import VerificationLevelBadge from "./VerificationLevelBadge";
import "../styles/verification.css";


import {
    getCertificateTypeLabel,
    formatVerificationDate,
    getVerificationModalityLabel
} from "../utils/verificationUtils";

export default function VerificationResultCard({ 
    result 
}) {
    if (!result) {
        return null;
    }

    const valid = result.valid;

    return (
        <div className="card verification-result">
        {/* Banner */}

        <div
            className={`verification-banner ${
            valid
                ? "verification-banner-success"
                : result.verificationStatus === "REVOKED"
                ? "verification-banner-warning"
                : "verification-banner-danger"
            }`}
        >
            <i
            className={`bi ${
                valid
                ? "bi-patch-check-fill"
                : result.verificationStatus === "REVOKED"
                    ? "bi-exclamation-triangle-fill"
                    : "bi-x-circle-fill"
            }`}
            />

            <div>
            <h4 className="fw-bold mb-1">
                {valid
                ? "Certificado válido"
                : result.verificationStatus === "REVOKED"
                    ? "Certificado revocado"
                    : "Certificado inválido"}
            </h4>

            <p className="mb-0">{result.verificationMessage}</p>
            </div>
        </div>

        <div className="card-body">
            {/* Información académica */}

            <div className="row g-4">
            <div className="col-lg-6">
                <div className="verification-info-card card">
                <div className="card-header">Información académica</div>

                <div className="card-body">

                    <Summary label="Estudiante" value={result.studentName} />
                    <Summary label="Institución" value={result.institutionName} />
                    <Summary label="Programa" value={result.program} />
                    <Summary label="Facultad" value={result.faculty} />
                    <Summary label="Modalidad" value={getVerificationModalityLabel(
                        result.modality)}
                    />
                    <Summary label="Ciclo" value={result.currentCycle} />
                </div>
                </div>
            </div>

            {/* Certificado */}

            <div className="col-lg-6">
                <div className="verification-info-card card">
                <div className="card-header">Información del certificado</div>

                <div className="card-body">
                    <Summary label="Número" value={
                        result.certificateNumber} />

                    <Summary label="Tipo" value={getCertificateTypeLabel(
                        result.certificateType)} />

                    <Summary label="Emitido" value={formatVerificationDate(
                        result.issuedAt)} />

                    <Summary
                    label="Validación"
                    value={
                        <VerificationLevelBadge level={result.verificationLevel} />
                    }
                    />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

function Summary({ label, value }) {
    return (
        <div className="verification-summary-item">
        <span className="verification-summary-label">{label}</span>

        <span className="verification-summary-value">{value || "-"}</span>
        </div>
    );
}
