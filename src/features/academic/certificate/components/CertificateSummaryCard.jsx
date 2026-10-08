import { Link } from "react-router-dom";

import CertificateStatusBadge from "./CertificateStatusBadge";
import CertificateTypeBadge from "./CertificateTypeBadge";

import {
    academicProgramLabels,
    academicFacultyLabels,
    modalityLabels,
} from "@/shared/utils/enumUtils";

import { formatLocalDate, formatDateTime } from "@/shared/utils/dateUtils";

export default function CertificateSummaryCard({
    certificate,
    onRevoke,
    revoking = false,
    onDocumentAction,
}) {
    if (!certificate) {
        return null;
    }

    const info = certificate?.certificate ?? {};
    const snapshot = info.snapshotJson ?? {};

    const program =
        academicProgramLabels[snapshot.academic?.program] ??
        snapshot.academic?.program ??
        "-";

    const faculty =
        academicFacultyLabels[snapshot.academic?.faculty] ??
        snapshot.academic?.faculty ??
        "-";

    const modality =
        modalityLabels[snapshot.academic?.modality] ??
        snapshot.academic?.modality ??
        "-";

    const currentCycle = snapshot.academic?.currentCycle ?? "-";

    const isRevoked = info.status === "REVOKED";
    const isIssued = info.status === "ISSUED";

    // const hasBlockchain = Boolean(info.blockchainTxHash);

    const hasDocumentHash = Boolean(info.documentHash);

    const hasDocumentUrl = Boolean(info.documentUrl);

    const hasDocumentReference = hasDocumentHash || hasDocumentUrl;

    const hasIntegrity =
        Boolean(info.certificateHash) ||
        Boolean(info.verificationHash) ||
        Boolean(info.blockchainTxHash);

    return (
        <>
        {/* =====================================================
                                    HEADER
                ====================================================== */}

        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                <div>
                <div className="d-flex align-items-center mb-2">
                    <div
                    className={`d-flex align-items-center justify-content-center rounded-3 me-3 ${
                        isRevoked
                        ? "bg-danger bg-opacity-10 text-danger"
                        : "bg-success bg-opacity-10 text-success"
                    }`}
                    style={{
                        width: "48px",
                        height: "48px",
                    }}
                    >
                    <i
                        className={`bi ${
                        isRevoked ? "bi-patch-exclamation" : "bi-patch-check-fill"
                        } fs-4`}
                    />
                    </div>

                    <div>
                    <h4 className="fw-bold mb-1">Certificado académico</h4>

                    <p className="text-muted mb-0">
                        Información, verificación y trazabilidad del certificado.
                    </p>
                    </div>
                </div>
                </div>

                {/* ACCIÓN */}

                {!isRevoked && (
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={revoking}
                    onClick={onRevoke}
                >
                    <i className="bi bi-x-circle me-2" />

                    {revoking ? "Revocando..." : "Revocar certificado"}
                </button>
                )}
            </div>
            </div>
        </div>

        {/* =====================================================
                                    ESTADO
                ====================================================== */}

        {isIssued && (
            <div className="alert alert-success border-0 shadow-sm d-flex align-items-start mb-4">
            <i className="bi bi-check-circle-fill fs-4 me-3" />

            <div>
                <strong>Certificado válido</strong>

                <div className="small mt-1">
                Este certificado puede ser verificado públicamente.
                </div>
            </div>
            </div>
        )}

        {isRevoked && (
            <div className="alert alert-danger border-0 shadow-sm d-flex align-items-start mb-4">
            <i className="bi bi-x-circle-fill fs-4 me-3" />

            <div>
                <strong>Certificado revocado</strong>

                <div className="small mt-1">
                Este certificado ya no se considera válido para verificación.
                </div>
            </div>
            </div>
        )}

        {/* =====================================================
                                GRID PRINCIPAL
                ====================================================== */}

        <div className="row g-4">
            {/* =================================================
                            INFORMACIÓN DEL CERTIFICADO
                    ================================================== */}

            <div className="col-12 col-xl-6">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0">
                    <i className="bi bi-award text-primary me-2" />
                    Información del certificado
                </h6>
                </div>

                <div className="card-body p-4">
                <div className="row g-4">
                    {/* NÚMERO */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Número de certificado
                    </small>

                    <span className="fw-semibold">
                        {info.certificateNumber ?? "-"}
                    </span>
                    </div>

                    {/* TIPO */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">Tipo</small>

                    <CertificateTypeBadge type={info.type} />
                    </div>

                    {/* GRADO O TÍTULO */}

                    <div className="col-12">
                    <small className="text-muted d-block mb-1">
                        Grado o título
                    </small>

                    <div className="fw-semibold">
                        {info.title ?? snapshot.certificate?.title ?? "-"}
                    </div>
                    </div>

                    {/* DESCRIPCIÓN */}

                    <div className="col-12">
                    <small className="text-muted d-block mb-1">Descripción</small>

                    <div>
                        {info.description ? (
                        info.description
                        ) : (
                        <span className="text-muted">
                            Sin descripción registrada.
                        </span>
                        )}
                    </div>
                    </div>

                    {/* FECHA OTORGAMIENTO */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Fecha de otorgamiento
                    </small>

                    <div className="fw-semibold">
                        {formatLocalDate(info.awardedAt)}
                    </div>
                    </div>

                    {/* FECHA EMISIÓN */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Fecha de emisión
                    </small>

                    <div className="fw-semibold">
                        {formatDateTime(info.issuedAt)}
                    </div>
                    </div>

                    {/* ESTADO DE REVOCACIÓN */}

                    <div className="col-sm-6">
                    <div className="border-top pt-3">
                        <small className="text-muted d-block mb-1">
                        Estado de revocación
                        </small>

                        {isRevoked ? (
                        <div className="d-flex align-items-center">
                            <i className="bi bi-calendar-x text-danger me-2" />

                            <span className="fw-semibold text-danger">
                            Revocado el{" "}
                            {info.revokedAt
                                ? formatDateTime(info.revokedAt)
                                : "fecha no disponible"}
                            </span>
                        </div>
                        ) : (
                        <div className="d-flex align-items-center">
                            <i className="bi bi-shield-check text-success me-2" />

                            <span className="fw-semibold text-success">
                            No revocado
                            </span>
                        </div>
                        )}
                    </div>
                    </div>

                    {/* ESTADO */}

                    <div className="col-sm-6">
                    <div className="border-top pt-3">
                        <small className="text-muted d-block mb-1">Estado</small>

                        <CertificateStatusBadge status={info.status} />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* =================================================
                                VERIFICACIÓN PÚBLICA
                    ================================================== */}

            <div className="col-12 col-xl-6">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0">
                    <i className="bi bi-shield-check text-primary me-2" />
                    Verificación pública
                </h6>
                </div>

                <div className="card-body p-4">
                {!isIssued ? (
                    <div className="d-flex align-items-start">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-secondary bg-opacity-10 text-secondary me-3"
                        style={{
                        width: "44px",
                        height: "44px",
                        minWidth: "44px",
                        }}
                    >
                        <i className="bi bi-shield-lock" />
                    </div>

                    <div>
                        <h6 className="fw-semibold mb-1">
                        Verificación no disponible
                        </h6>

                        <p className="text-muted small mb-0">
                        El certificado debe estar emitido para poder ser
                        consultado públicamente.
                        </p>
                    </div>
                    </div>
                ) : (
                    <>
                    <div className="mb-4">
                        <small className="text-muted d-block mb-2">
                        Código de verificación
                        </small>

                        <div
                        className="bg-light rounded-3 p-3 small font-monospace"
                        style={{
                            wordBreak: "break-all",
                        }}
                        >
                        {info.verificationHash ?? "-"}
                        </div>
                    </div>

                    <div>
                        <small className="text-muted d-block mb-2">
                        Verificación pública
                        </small>

                        <Link
                        to={`/verify/${info.publicId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success"
                        >
                        <i className="bi bi-box-arrow-up-right me-2" />
                        Verificar certificado
                        </Link>
                    </div>
                    </>
                )}
                </div>
            </div>
            </div>

            {/* =================================================
                                DOCUMENTO OFICIAL
                    ================================================== */}

            <div className="col-12 col-xl-6">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0">
                    <i className="bi bi-file-earmark-check text-primary me-2" />
                    Documento oficial
                </h6>
                </div>

                <div className="card-body p-4">
                {!hasDocumentReference ? (
                    <div className="d-flex flex-column flex-sm-row align-items-start gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-secondary bg-opacity-10 text-secondary"
                        style={{
                        width: "44px",
                        height: "44px",
                        minWidth: "44px",
                        }}
                    >
                        <i className="bi bi-file-earmark-x" />
                    </div>

                    <div className="flex-grow-1">
                        <h6 className="fw-semibold mb-1">
                        Sin referencia documental
                        </h6>

                        <p className="text-muted small mb-3">
                        No se registró un hash ni un enlace externo para este
                        certificado.
                        </p>

                        <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={onDocumentAction}
                        >
                        <i className="bi bi-file-earmark-plus me-2" />
                        Registrar documento
                        </button>
                    </div>
                    </div>
                ) : (
                    <>
                    <div className="mb-4">
                        <p className="text-muted small mb-0">
                        CERVALID no almacena permanentemente el archivo original.
                        Se conserva su referencia y su huella digital para
                        comprobar su integridad.
                        </p>
                    </div>

                    {/* URL */}

                    {hasDocumentUrl && (
                        <div className="mb-4">
                        <small className="text-muted d-block mb-2">
                            Documento externo
                        </small>

                        <a
                            href={info.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary"
                        >
                            <i className="bi bi-box-arrow-up-right me-2" />
                            Consultar documento
                        </a>
                        </div>
                    )}

                    {/* HASH */}

                    {hasDocumentHash && (
                        <div>
                        <small className="text-muted d-block mb-2">
                            Hash del documento
                        </small>

                        <div
                            className="bg-light rounded-3 p-3 small font-monospace"
                            style={{
                            wordBreak: "break-all",
                            }}
                        >
                            {info.documentHash}
                        </div>

                        <div className="form-text mt-2">
                            Huella digital registrada para comprobar la integridad
                            del documento.
                        </div>
                        </div>
                    )}

                    {/* ACTUALIZAR */}

                    <div className="border-top mt-4 pt-3">
                        <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={onDocumentAction}
                        >
                        <i className="bi bi-pencil-square me-2" />
                        Actualizar documento
                        </button>
                    </div>
                    </>
                )}
                </div>
            </div>
            </div>

            {/* =================================================
                            INTEGRIDAD Y TRAZABILIDAD
                    ================================================== */}

            <div className="col-12 col-xl-6">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0">
                    <i className="bi bi-fingerprint text-primary me-2" />
                    Integridad y trazabilidad
                </h6>
                </div>

                <div className="card-body p-4">
                {!hasIntegrity ? (
                    <div className="d-flex align-items-start">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 text-warning me-3"
                        style={{
                        width: "44px",
                        height: "44px",
                        minWidth: "44px",
                        }}
                    >
                        <i className="bi bi-hourglass-split" />
                    </div>

                    <div>
                        <h6 className="fw-semibold mb-1">Información pendiente</h6>

                        <p className="text-muted small mb-0">
                        Todavía no existen registros de integridad o trazabilidad
                        para este certificado.
                        </p>
                    </div>
                    </div>
                ) : (
                    <>
                    {/* HASH CERTIFICADO */}

                    {info.certificateHash && (
                        <div className="mb-4">
                        <small className="text-muted d-block mb-2">
                            Huella del certificado
                        </small>

                        <div
                            className="bg-light rounded-3 p-3 small font-monospace"
                            style={{
                            wordBreak: "break-all",
                            }}
                        >
                            {info.certificateHash}
                        </div>
                        </div>
                    )}

                    {/* HASH VERIFICACIÓN */}

                    {info.verificationHash && (
                        <div className="mb-4">
                        <small className="text-muted d-block mb-2">
                            Huella de verificación
                        </small>

                        <div
                            className="bg-light rounded-3 p-3 small font-monospace"
                            style={{
                            wordBreak: "break-all",
                            }}
                        >
                            {info.verificationHash}
                        </div>
                        </div>
                    )}

                    {/* RED / BLOQUE */}

                    {(certificate.network || certificate.blockNumber) && (
                        <div className="row g-4">
                        {certificate.network && (
                            <div className="col-sm-6">
                            <small className="text-muted d-block mb-1">
                                Red de registro
                            </small>

                            <span className="fw-semibold">
                                {certificate.network}
                            </span>
                            </div>
                        )}

                        {certificate.blockNumber && (
                            <div className="col-sm-6">
                            <small className="text-muted d-block mb-1">
                                Bloque
                            </small>

                            <span className="fw-semibold">
                                {certificate.blockNumber}
                            </span>
                            </div>
                        )}
                        </div>
                    )}

                    {/* IDENTIFICADOR */}

                    {info.blockchainTxHash && (
                        <div className="mt-4">
                        <small className="text-muted d-block mb-2">
                            Identificador del registro
                        </small>

                        <div
                            className="bg-light rounded-3 p-3 small font-monospace"
                            style={{
                            wordBreak: "break-all",
                            }}
                        >
                            {info.blockchainTxHash}
                        </div>
                        </div>
                    )}

                    {/* FECHA DE REGISTRO */}

                    {certificate.anchoredAt && (
                        <div className="mt-4">
                        <small className="text-muted d-block mb-1">
                            Fecha de registro
                        </small>

                        <span className="fw-semibold">
                            {formatDateTime(certificate.anchoredAt)}
                        </span>
                        </div>
                    )}
                    </>
                )}
                </div>
            </div>
            </div>

            {/* =================================================
                                INFORMACIÓN ACADÉMICA
                    ================================================== */}

            <div className="col-12 col-xl-6">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0">
                    <i className="bi bi-mortarboard text-primary me-2" />
                    Información académica
                </h6>
                </div>

                <div className="card-body p-4">
                <div className="row g-4">
                    {/* CÓDIGO */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Código de estudiante
                    </small>

                    <span className="fw-semibold">
                        {snapshot.student?.studentCode ?? "-"}
                    </span>
                    </div>

                    {/* NOMBRE */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Nombre completo
                    </small>

                    <span className="fw-semibold">
                        {snapshot.student?.name ?? "-"}
                    </span>
                    </div>

                    {/* INSTITUCIÓN */}

                    <div className="col-12">
                    <small className="text-muted d-block mb-1">Institución</small>

                    <span className="fw-semibold">
                        {snapshot.institution?.name ?? "-"}
                    </span>
                    </div>

                    {/* PROGRAMA */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Programa académico
                    </small>

                    <span className="fw-semibold">{program}</span>
                    </div>

                    {/* FACULTAD */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">Facultad</small>

                    <span className="fw-semibold">{faculty}</span>
                    </div>

                    {/* MODALIDAD */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">Modalidad</small>

                    <span className="fw-semibold">{modality}</span>
                    </div>

                    {/* CICLO */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Ciclo académico
                    </small>

                    <span className="fw-semibold">{currentCycle}</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
