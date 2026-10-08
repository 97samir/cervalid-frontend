import CredentialStatusBadge from "./CredentialStatusBadge";
import CredentialTypeBadge from "./CredentialTypeBadge";

import {
    formatCredentialDate,
    formatCredentialDateTime,
    getCredentialModalityLabel,
    getCredentialProgramLabel,
    getCredentialFacultyLabel,
} from "../utils/credentialUtils";

export default function CredentialSummaryCard({
    credential,
    onEdit,
    onDocument,
    onIssue,
    onRevoke,
    processing = false,
    issuing = false,
    revoking = false,
}) {
    if (!credential) {
        return null;
    }

    const isDraft = credential.status === "DRAFT";
    const isIssued = credential.status === "ISSUED";
    const isRevoked = credential.status === "REVOKED";

    const canManageDocument = isDraft || isIssued;

    const document = credential.document ?? {};
    const integrity = credential.integrity ?? {};
    const recipient = credential.recipient ?? {};
    const issuer = credential.issuer ?? {};
    const academic = credential.academic ?? {};
    const revocation = credential.revocation ?? {};

    const documentHash = document.documentHash ?? credential.documentHash ?? null;

    const documentUrl = document.documentUrl ?? credential.documentUrl ?? null;

    const hasDocumentHash = Boolean(documentHash);
    const hasDocumentUrl = Boolean(documentUrl);
    const hasDocument = hasDocumentHash || hasDocumentUrl;

    const verificationUrl =
        credential.verificationUrl ||
        (credential.publicId ? `/verify/credential/${credential.publicId}` : null);

    const hasIntegrity =
        Boolean(integrity.credentialHash) ||
        Boolean(integrity.verificationHash) ||
        Boolean(integrity.blockchainTxHash);

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
                    <h4 className="fw-bold mb-1">Credencial académica</h4>

                    <p className="text-muted mb-0">
                        Información, verificación y trazabilidad de la credencial.
                    </p>
                    </div>
                </div>
                </div>

                {/* ACCIONES */}

                <div className="d-flex flex-wrap gap-2">
                {canManageDocument && onDocument && (
                    <button
                    type="button"
                    className={`btn ${
                        hasDocument ? "btn-outline-primary" : "btn-primary"
                    }`}
                    onClick={onDocument}
                    disabled={processing}
                    >
                    <i className="bi bi-file-earmark-text me-2" />

                    {hasDocument ? "Actualizar documento" : "Registrar documento"}
                    </button>
                )}

                {isDraft && onEdit && (
                    <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={onEdit}
                    disabled={processing}
                    >
                    <i className="bi bi-pencil me-2" />
                    Editar
                    </button>
                )}

                {isDraft && onIssue && (
                    <button
                    type="button"
                    className="btn btn-success"
                    onClick={onIssue}
                    disabled={processing}
                    >
                    <i className="bi bi-check-circle me-2" />

                    {issuing ? "Emitiendo..." : "Emitir"}
                    </button>
                )}

                {isIssued && onRevoke && (
                    <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={onRevoke}
                    disabled={processing}
                    >
                    <i className="bi bi-x-circle me-2" />

                    {revoking ? "Revocando..." : "Revocar"}
                    </button>
                )}
                </div>
            </div>
            </div>
        </div>

        {/* =====================================================
                                    ESTADO
                ====================================================== */}

        {isDraft && (
            <div className="alert alert-secondary border-0 shadow-sm d-flex align-items-start mb-4">
            <i className="bi bi-pencil-square fs-4 me-3" />

            <div>
                <strong>Credencial en borrador</strong>

                <div className="small mt-1">
                La información todavía puede modificarse antes de su emisión.
                </div>
            </div>
            </div>
        )}

        {isIssued && (
            <div className="alert alert-success border-0 shadow-sm d-flex align-items-start mb-4">
            <i className="bi bi-check-circle-fill fs-4 me-3" />

            <div>
                <strong>Credencial emitida</strong>

                <div className="small mt-1">
                Esta credencial forma parte del historial académico oficial del
                estudiante.
                </div>
            </div>
            </div>
        )}

        {isRevoked && (
            <div className="alert alert-danger border-0 shadow-sm d-flex align-items-start mb-4">
            <i className="bi bi-x-circle-fill fs-4 me-3" />

            <div>
                <strong>Credencial revocada</strong>

                <div className="small mt-1">
                Esta credencial ya no se considera válida para verificación.
                </div>
            </div>
            </div>
        )}

        {/* =====================================================
                                GRID PRINCIPAL
                ====================================================== */}

        <div className="row g-4">
            {/* =================================================
                            INFORMACIÓN DE LA CREDENCIAL
                    ================================================== */}

            <div className="col-12 col-xl-6">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0">
                    <i className="bi bi-award text-primary me-2" />
                    Información de la credencial
                </h6>
                </div>

                <div className="card-body p-4">
                <div className="row g-4">
                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Número de credencial
                    </small>

                    <span className="fw-semibold">
                        {credential.credentialNumber ?? "-"}
                    </span>
                    </div>

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">Tipo</small>

                    <CredentialTypeBadge type={credential.type} />
                    </div>

                    {/* NUEVO: GRADO O TÍTULO */}

                    <div className="col-12">
                    <small className="text-muted d-block mb-1">
                        Grado o título
                    </small>

                    <div className="fw-semibold">{credential.title ?? "-"}</div>
                    </div>

                    {/* NUEVO: DESCRIPCIÓN */}

                    <div className="col-12">
                    <small className="text-muted d-block mb-1">Descripción</small>

                    <div>
                        {credential.description ? (
                        credential.description
                        ) : (
                        <span className="text-muted">
                            Sin descripción registrada.
                        </span>
                        )}
                    </div>
                    </div>

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Fecha de otorgamiento
                    </small>

                    <div className="fw-semibold">
                        {formatCredentialDate(credential.awardedAt)}
                    </div>
                    </div>

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Fecha de emisión
                    </small>

                    <div className="fw-semibold">
                        {credential.issuedAt
                        ? formatCredentialDateTime(credential.issuedAt)
                        : "-"}
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
                            {formatCredentialDateTime(
                                credential.revokedAt ?? revocation.revokedAt,
                            )}
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

                        <CredentialStatusBadge status={credential.status} />
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
                        La credencial debe estar emitida para poder ser consultada
                        públicamente.
                        </p>
                    </div>
                    </div>
                ) : (
                    <>
                    {integrity.verificationHash && (
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
                            {integrity.verificationHash}
                        </div>
                        </div>
                    )}

                    {verificationUrl && (
                        <div>
                        <small className="text-muted d-block mb-2">
                            Verificación pública
                        </small>

                        <a
                            href={verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success"
                        >
                            <i className="bi bi-box-arrow-up-right me-2" />
                            Verificar credencial
                        </a>
                        </div>
                    )}
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
                {!hasDocument ? (
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
                        No se ha registrado un hash ni un enlace externo para esta
                        credencial.
                        </p>

                        {canManageDocument && onDocument && (
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={onDocument}
                            disabled={processing}
                        >
                            <i className="bi bi-file-earmark-plus me-2" />
                            Registrar documento
                        </button>
                        )}
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

                    {hasDocumentUrl && (
                        <div className="mb-4">
                        <small className="text-muted d-block mb-2">
                            Documento externo
                        </small>

                        <a
                            href={documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary"
                        >
                            <i className="bi bi-box-arrow-up-right me-2" />
                            Consultar documento
                        </a>
                        </div>
                    )}

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
                            {documentHash}
                        </div>

                        <div className="form-text mt-2">
                            Huella digital registrada para comprobar la integridad
                            del documento.
                        </div>
                        </div>
                    )}

                    {canManageDocument && onDocument && (
                        <div className="border-top mt-4 pt-3">
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={onDocument}
                            disabled={processing}
                        >
                            <i className="bi bi-pencil-square me-2" />
                            Actualizar documento
                        </button>
                        </div>
                    )}
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
                        para esta credencial.
                        </p>
                    </div>
                    </div>
                ) : (
                    <>
                    {integrity.credentialHash && (
                        <div className="mb-4">
                        <small className="text-muted d-block mb-2">
                            Huella de la credencial
                        </small>

                        <div
                            className="bg-light rounded-3 p-3 small font-monospace"
                            style={{
                            wordBreak: "break-all",
                            }}
                        >
                            {integrity.credentialHash}
                        </div>
                        </div>
                    )}

                    {integrity.verificationHash && (
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
                            {integrity.verificationHash}
                        </div>
                        </div>
                    )}

                    {(integrity.blockchainNetwork || integrity.blockNumber) && (
                        <div className="row g-4">
                        {integrity.blockchainNetwork && (
                            <div className="col-sm-6">
                            <small className="text-muted d-block mb-1">
                                Red de registro
                            </small>

                            <span className="fw-semibold">
                                {integrity.blockchainNetwork}
                            </span>
                            </div>
                        )}

                        {integrity.blockNumber && (
                            <div className="col-sm-6">
                            <small className="text-muted d-block mb-1">
                                Bloque
                            </small>

                            <span className="fw-semibold">
                                {integrity.blockNumber}
                            </span>
                            </div>
                        )}
                        </div>
                    )}

                    {integrity.blockchainTxHash && (
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
                            {integrity.blockchainTxHash}
                        </div>
                        </div>
                    )}

                    {integrity.anchoredAt && (
                        <div className="mt-4">
                        <small className="text-muted d-block mb-1">
                            Fecha de registro
                        </small>

                        <span className="fw-semibold">
                            {formatCredentialDateTime(integrity.anchoredAt)}
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
                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Código de estudiante
                    </small>

                    <span className="fw-semibold">
                        {recipient.studentCode ?? "-"}
                    </span>
                    </div>

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Nombre completo
                    </small>

                    <span className="fw-semibold">
                        {recipient.fullName ||
                        [recipient.name, recipient.lastName]
                            .filter(Boolean)
                            .join(" ") ||
                        "-"}
                    </span>
                    </div>

                    <div className="col-12">
                    <small className="text-muted d-block mb-1">Institución</small>

                    <span className="fw-semibold">
                        {issuer.institutionName ?? "-"}
                    </span>
                    </div>

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Programa académico
                    </small>

                    <span className="fw-semibold">
                        {getCredentialProgramLabel(academic.program || "-")}
                    </span>
                    </div>

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">Facultad</small>

                    <span className="fw-semibold">
                        {getCredentialFacultyLabel(academic.faculty || "-")}
                    </span>
                    </div>

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">Modalidad</small>

                    <span className="fw-semibold">
                        {getCredentialModalityLabel(academic.modality || "-")}
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
