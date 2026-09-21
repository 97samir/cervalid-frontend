import CredentialStatusBadge from "./CredentialStatusBadge";
import CredentialTypeBadge from "./CredentialTypeBadge";

import {
    formatCredentialDate,
    formatCredentialDateTime,
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

    const canManageDocument = isDraft || isIssued;

    const hasDocumentHash = Boolean(credential.documentHash);

    const hasDocumentUrl = Boolean(credential.documentUrl);

    const hasDocument = hasDocumentHash || hasDocumentUrl;

    return (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
        {/* =====================================================
                    HEADER
                ===================================================== */}
        <div className="card-header bg-white border-bottom p-4">
            <div className="d-flex flex-column flex-xl-row justify-content-between align-items-start gap-4">
            {/* INFORMACIÓN PRINCIPAL */}
            <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                <div className="text-primary fs-4">
                    <i className="bi bi-mortarboard-fill"></i>
                </div>

                <span className="text-muted small">Credencial académica</span>
                </div>

                <h4 className="fw-bold mb-2">{credential.title}</h4>

                <div className="d-flex flex-wrap gap-2">
                <CredentialTypeBadge type={credential.type} />

                <CredentialStatusBadge status={credential.status} />
                </div>
            </div>

            {/* ACCIONES */}
            <div className="d-flex flex-wrap gap-2">
                {/* DOCUMENTO */}
                {canManageDocument && onDocument && (
                <button
                    type="button"
                    className={`btn ${
                    hasDocument ? "btn-outline-primary" : "btn-primary"
                    }`}
                    onClick={onDocument}
                    disabled={processing}
                >
                    <i className="bi bi-file-earmark-text me-2"></i>

                    {hasDocument ? "Actualizar documento" : "Registrar documento"}
                </button>
                )}

                {/* EDITAR */}
                {isDraft && onEdit && (
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={onEdit}
                    disabled={processing}
                >
                    <i className="bi bi-pencil me-2"></i>
                    Editar
                </button>
                )}

                {/* EMITIR */}
                {isDraft && onIssue && (
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={onIssue}
                    disabled={processing}
                >
                    <i className="bi bi-check-circle me-2"></i>

                    {issuing ? "Emitiendo..." : "Emitir"}
                </button>
                )}

                {/* REVOCAR */}
                {isIssued && onRevoke && (
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={onRevoke}
                    disabled={processing}
                >
                    <i className="bi bi-x-circle me-2"></i>

                    {revoking ? "Revocando..." : "Revocar"}
                </button>
                )}
            </div>
            </div>
        </div>

        {/* =====================================================
                    BODY
                ===================================================== */}
        <div className="card-body p-4">
            {/* =================================================
                        INFORMACIÓN + RESUMEN
                    ================================================== */}
            <div className="row g-4">
            {/* INFORMACIÓN */}
            <div className="col-12 col-xl-8">
                <div className="h-100">
                <h6 className="fw-bold mb-4">Información de la credencial</h6>

                <div className="row g-4">
                    {/* NÚMERO */}
                    <div className="col-sm-6">
                    <small className="text-muted">Número</small>

                    <div className="fw-semibold mt-1">
                        {credential.credentialNumber || "-"}
                    </div>
                    </div>

                    {/* TIPO */}
                    <div className="col-sm-6">
                    <small className="text-muted">Tipo</small>

                    <div className="mt-1">
                        <CredentialTypeBadge type={credential.type} />
                    </div>
                    </div>

                    {/* FECHA OTORGAMIENTO */}
                    <div className="col-sm-6">
                    <small className="text-muted">Fecha de otorgamiento</small>

                    <div className="fw-semibold mt-1">
                        {formatCredentialDate(credential.awardedAt)}
                    </div>
                    </div>

                    {/* FECHA EMISIÓN */}
                    <div className="col-sm-6">
                    <small className="text-muted">Fecha de emisión</small>

                    <div className="fw-semibold mt-1">
                        {credential.issuedAt
                        ? formatCredentialDateTime(credential.issuedAt)
                        : "-"}
                    </div>
                    </div>
                </div>

                <hr className="my-4" />

                {/* DESCRIPCIÓN */}
                <div>
                    <small className="text-muted">Descripción</small>

                    <div className="mt-2">
                    {credential.description || (
                        <span className="text-muted">
                        Sin descripción registrada.
                        </span>
                    )}
                    </div>
                </div>
                </div>
            </div>

            {/* RESUMEN */}
            <div className="col-12 col-xl-4">
                <div className="card bg-light border-0 rounded-4 h-100">
                <div className="card-body p-4">
                    <h6 className="fw-bold mb-4">Resumen</h6>

                    {/* ESTADO */}
                    <div className="mb-4">
                    <small className="text-muted d-block mb-1">Estado</small>

                    <CredentialStatusBadge status={credential.status} />
                    </div>

                    {/* TIPO */}
                    <div className="mb-4">
                    <small className="text-muted d-block mb-1">Tipo</small>

                    <CredentialTypeBadge type={credential.type} />
                    </div>

                    {/* NÚMERO */}
                    <div className="mb-4">
                    <small className="text-muted d-block mb-1">Número</small>

                    <span className="fw-semibold">
                        {credential.credentialNumber || "-"}
                    </span>
                    </div>

                    {/* DOCUMENTO */}
                    <div>
                    <small className="text-muted d-block mb-1">
                        Documento oficial
                    </small>

                    {hasDocument ? (
                        <span className="text-success fw-semibold">
                        <i className="bi bi-check-circle me-1"></i>
                        Registrado
                        </span>
                    ) : (
                        <span className="text-muted">No registrado</span>
                    )}
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* =================================================
                        DOCUMENTO OFICIAL
                    ================================================== */}
            <hr className="my-4" />

            <div className="card border rounded-4">
            <div className="card-body p-4">
                <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-file-earmark-check text-primary fs-5"></i>

                    <h6 className="fw-bold mb-0">Documento oficial</h6>
                </div>

                <p className="text-muted small mb-0">
                    CERVALID no almacena el archivo original. Esta información
                    permite consultar o comprobar el documento conservado por la
                    institución.
                </p>
                </div>

                {!hasDocument && (
                <div className="text-center py-4">
                    <div className="text-muted mb-2">
                    <i className="bi bi-file-earmark-x fs-3"></i>
                    </div>

                    <p className="text-muted mb-0">
                    No se ha registrado información del documento oficial.
                    </p>
                </div>
                )}

                {hasDocument && (
                <div className="row g-4">
                    {/* DOCUMENTO EXTERNO */}
                    {hasDocumentUrl && (
                    <div className="col-12 col-lg-6">
                        <div className="h-100 p-3 bg-light rounded-3">
                        <div className="small text-muted mb-2">
                            Documento externo
                        </div>

                        <a
                            href={credential.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none fw-semibold"
                        >
                            <i className="bi bi-box-arrow-up-right me-2"></i>
                            Consultar documento
                        </a>

                        <div className="small text-muted text-break mt-2">
                            {credential.documentUrl}
                        </div>
                        </div>
                    </div>
                    )}

                    {/* HASH */}
                    {hasDocumentHash && (
                    <div className="col-12 col-lg-6">
                        <div className="h-100 p-3 bg-light rounded-3">
                        <div className="small text-muted mb-2">
                            Hash del documento
                        </div>

                        <div className="font-monospace small text-break">
                            {credential.documentHash}
                        </div>

                        <div className="form-text mt-2">
                            Huella digital registrada para comprobar la integridad
                            del documento.
                        </div>
                        </div>
                    </div>
                    )}
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
}
