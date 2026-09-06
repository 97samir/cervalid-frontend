import { Link } from "react-router-dom";

import VerificationLevelBadge from "./VerificationLevelBadge";
import "../styles/verification.css";

import {
    academicProgramLabels,
    academicFacultyLabels,
    modalityLabels,
} from "@/shared/utils/enumUtils";

import {
    getCertificateTypeLabel,
    formatVerificationDate,
    formatVerificationDateOnly,
} from "../utils/verificationUtils";

export default function VerificationResultCard({ 
    result 
}) {
    
    if (!result) {
        return null;
    }

    const valid = result.valid;
    const revoked = result.verificationStatus === "REVOKED";

    const program =
        academicProgramLabels[result.program] ?? result.program ?? "-";

    const faculty =
        academicFacultyLabels[result.faculty] ?? result.faculty ?? "-";

    const modality = modalityLabels[result.modality] ?? result.modality ?? "-";

    // ESTADO DE VERIFICACIÓN
    const statusClass = valid
        ? "verification-banner-success"
        : revoked
        ? "verification-banner-warning"
        : "verification-banner-danger";

    const statusIcon = valid
        ? "bi-patch-check-fill"
        : revoked
        ? "bi-exclamation-triangle-fill"
        : "bi-x-circle-fill";

    const statusTitle = valid
        ? "Certificado válido"
        : revoked
        ? "Certificado revocado"
        : "Certificado inválido";

    // DOCUMENTO
    const hasDocumentHash = Boolean(result.documentHash);
    const hasDocumentUrl = Boolean(result.documentUrl);
    const hasDocumentReference = hasDocumentHash || hasDocumentUrl;

    // TRAZABILIDAD
    const certificatePublicId = result.certificatePublicId;
    const canViewTimeline = Boolean(certificatePublicId);

    return (
        <div className="verification-result-wrapper">
        <div className="card verification-result border-0 shadow-sm">
            {/*  ESTADO*/}

            <div className={`verification-banner ${statusClass}`}>
            <div className="verification-status-icon">
                <i className={`bi ${statusIcon}`}></i>
            </div>

            <div className="flex-grow-1">
                <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                <h4 className="verification-result-title mb-0">{statusTitle}</h4>

                {result.verificationLevel && (
                    <VerificationLevelBadge level={result.verificationLevel} />
                )}
                </div>

                <p className="mb-0">{result.verificationMessage}</p>
            </div>
            </div>

            {/*  CONTENIDO */}

            <div className="card-body p-4 p-lg-5">
            {/* CABECERA */}

            <div className="verification-summary-header">
                <div>
                <span className="verification-eyebrow">Verificación pública</span>

                <h3 className="verification-main-title">Certificado académico</h3>

                <p className="text-muted mb-0">
                    Información registrada por la institución y verificada mediante el
                    registro de CERVALID.
                </p>
                </div>
            </div>

            {/*  IDENTIFICACIÓN PRINCIPAL */}

            <div className="verification-highlight-grid mt-4">
                <HighlightItem
                icon="bi-person-vcard"
                label="Estudiante"
                value={result.studentName}
                />

                <HighlightItem
                icon="bi-building"
                label="Institución"
                value={result.institutionName}
                />

                <HighlightItem
                icon="bi-file-earmark-check"
                label="Número de certificado"
                value={result.certificateNumber}
                />

                {/* <HighlightItem
                icon="bi-calendar-check"
                label="Fecha de emisión"
                value={formatVerificationDate(result.issuedAt)}
                /> */}
                <HighlightItem
                icon="bi-calendar-check"
                label="Fecha de Otorgamiento"
                value={formatVerificationDateOnly(result.awardedAt)}
                />
            </div>

            {/* INFORMACIÓN ACADÉMICA */}

            <div className="row g-4 mt-2">
                <div className="col-12 col-lg-7">
                <div className="verification-info-card card h-100">
                    <div className="card-header">
                    <div className="verification-card-icon">
                        <i className="bi bi-mortarboard"></i>
                    </div>

                    <div>
                        <div className="verification-card-title">
                        Información académica
                        </div>

                        <div className="verification-card-subtitle">
                        Datos académicos asociados al certificado
                        </div>
                    </div>
                    </div>

                    <div className="card-body">
                    <Summary label="Programa académico" value={program} />

                    <Summary label="Facultad" value={faculty} />

                    <Summary label="Modalidad" value={modality} />

                    <Summary
                        label="Ciclo académico"
                        value={result.currentCycle}
                    />
                    </div>
                </div>
                </div>

                {/*  INFORMACIÓN DEL CERTIFICADO */}

                <div className="col-12 col-lg-5">
                <div className="verification-info-card card h-100">
                    <div className="card-header">
                    <div className="verification-card-icon">
                        <i className="bi bi-patch-check"></i>
                    </div>

                    <div>
                        <div className="verification-card-title">Certificado</div>

                        <div className="verification-card-subtitle">
                        Información de la credencial
                        </div>
                    </div>
                    </div>

                    <div className="card-body">
                    <Summary
                        label="Tipo"
                        value={getCertificateTypeLabel(result.certificateType)}
                    />

                    <Summary
                        label="Estado"
                        value={
                        <span
                            className={`verification-status-badge ${
                            valid
                                ? "verification-status-valid"
                                : revoked
                                ? "verification-status-revoked"
                                : "verification-status-invalid"
                            }`}
                        >
                            <i
                            className={`bi ${
                                valid
                                ? "bi-check-circle-fill"
                                : revoked
                                    ? "bi-exclamation-triangle-fill"
                                    : "bi-x-circle-fill"
                            }`}
                            ></i>

                            {statusTitle}
                        </span>
                        }
                    />

                    <Summary
                        label="Otorgado"
                        value={formatVerificationDateOnly(result.awardedAt)}
                    />

                    <Summary
                        label="Emitido"
                        value={formatVerificationDate(result.issuedAt)}
                    />

                    {/* REVOCACIÓN */}

                    {revoked && (
                        <div className="verification-status-message verification-status-message-warning">
                        <i className="bi bi-info-circle-fill"></i>

                        <div>
                            <strong>Este certificado fue revocado.</strong>

                            <div>
                            La institución invalidó su vigencia y actualmente no
                            debe considerarse válido.
                            </div>
                        </div>
                        </div>
                    )}

                    {/* INVÁLIDO */}

                    {!valid && !revoked && (
                        <div className="verification-status-message verification-status-message-danger">
                        <i className="bi bi-exclamation-circle-fill"></i>

                        <div>
                            <strong>No se pudo validar el certificado.</strong>

                            <div>
                            Los datos proporcionados no coinciden con un
                            certificado válido registrado.
                            </div>
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </div>

            {/* EVIDENCIA Y TRAZABILIDAD*/}

            <div className="row g-4 mt-2">
                {/* INTEGRIDAD DOCUMENTAL */}

                <div className="col-12 col-lg-7">
                <div className="verification-info-card card h-100">
                    <div className="card-header">
                    <div className="verification-card-icon">
                        <i className="bi bi-file-earmark-check"></i>
                    </div>

                    <div>
                        <div className="verification-card-title">
                        Integridad del documento
                        </div>

                        <div className="verification-card-subtitle">
                        Evidencia digital asociada al certificado
                        </div>
                    </div>
                    </div>

                    <div className="card-body">
                    {!hasDocumentReference ? (
                        <div className="d-flex align-items-start">
                        <div
                            className="d-flex align-items-center justify-content-center rounded-3 bg-secondary bg-opacity-10 text-secondary me-3"
                            style={{
                            width: "44px",
                            height: "44px",
                            minWidth: "44px",
                            }}
                        >
                            <i className="bi bi-file-earmark-x"></i>
                        </div>

                        <div>
                            <h6 className="fw-semibold mb-1">
                            Sin referencia documental pública
                            </h6>

                            <p className="text-muted small mb-0">
                            La institución no registró una huella digital ni un
                            enlace público para el documento.
                            </p>
                        </div>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-4">
                        {/* HASH */}

                        {hasDocumentHash && (
                            <div>
                            <small className="verification-summary-label d-block mb-2">
                                Hash del documento
                            </small>

                            <div
                                className="bg-light rounded-3 p-3 small font-monospace"
                                style={{
                                wordBreak: "break-all",
                                }}
                            >
                                {result.documentHash}
                            </div>

                            <div className="form-text mt-2">
                                Huella digital SHA-256 asociada al documento
                                oficial.
                            </div>
                            </div>
                        )}

                        {/* URL */}

                        {hasDocumentUrl && (
                            <div>
                            <small className="verification-summary-label d-block mb-2">
                                Documento oficial
                            </small>

                            <a
                                href={result.documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary"
                            >
                                <i className="bi bi-box-arrow-up-right me-2"></i>
                                Consultar documento
                            </a>
                            </div>
                        )}
                        </div>
                    )}
                    </div>
                </div>
                </div>

                {/* TRAZABILIDAD ACADÉMICA*/}
                <div className="col-12 col-lg-5">
                    <div className="verification-info-card card h-100">

                        <div className="card-header">
                            <div className="verification-card-icon">
                                <i className="bi bi-clock-history"></i>
                            </div>

                            <div>
                                <div className="verification-card-title">
                                    Trazabilidad académica
                                </div>

                                <div className="verification-card-subtitle">
                                    Trayectoria registrada en CERVALID
                                </div>
                            </div>
                        </div>

                        <div className="card-body d-flex flex-column">

                            <p className="text-muted small mb-4">
                                Consulta los eventos académicos públicos asociados
                                a este certificado.
                            </p>

                            {canViewTimeline ? (
                                <>
                                    <div className="verification-timeline-summary mb-4">
                                        <div className="verification-timeline-summary-icon">
                                            <i className="bi bi-diagram-3"></i>
                                        </div>

                                        <div>
                                            <strong>
                                                Registro académico trazable
                                            </strong>

                                            <p className="text-muted small mb-0 mt-1">
                                                Accede a la línea de tiempo pública
                                                del certificado.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <Link
                                            to={`/verify/${certificatePublicId}/timeline`}
                                            className="btn btn-primary w-100"
                                        >
                                            <i className="bi bi-clock-history me-2"></i>
                                            Ver trazabilidad
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className="d-flex align-items-start">
                                    <div className="verification-timeline-summary-icon">
                                        <i className="bi bi-info-circle"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            Trazabilidad no disponible
                                        </strong>

                                        <p className="text-muted small mb-0 mt-1">
                                            Este certificado no cuenta actualmente con
                                            una referencia pública de trazabilidad.
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* =================================================
                                                CONFIANZA
                            ================================================== */}

            <div className="verification-trust mt-4">
                <div className="verification-trust-icon">
                <i className="bi bi-shield-check"></i>
                </div>

                <div className="flex-grow-1">
                <strong>Verificación realizada por CERVALID</strong>

                <p className="mb-0 text-muted small mt-1">
                    La información mostrada corresponde al registro de la
                    institución y a las evidencias digitales asociadas al
                    certificado.
                </p>
                </div>

                <i className="bi bi-check-circle-fill text-success fs-5"></i>
            </div>
            </div>
        </div>
        </div>
    );
}

/* =========================================================
                    COMPONENTES AUXILIARES
========================================================= */

function HighlightItem({ icon, label, value }) {
    return (
        <div className="verification-highlight">
        <div className="verification-highlight-icon">
            <i className={`bi ${icon}`}></i>
        </div>

        <div className="verification-highlight-content">
            <span>{label}</span>

            <strong>{value || "-"}</strong>
        </div>
        </div>
    );
}

function Summary({ label, value, valueClass = "" }) {
    return (
        <div className="verification-summary-item">
        <span className="verification-summary-label">{label}</span>

        <span className={`verification-summary-value ${valueClass}`}>
            {value || "-"}
        </span>
        </div>
    );
}
