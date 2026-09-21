import CredentialStatusBadge from "./CredentialStatusBadge";
import CredentialTypeBadge from "./CredentialTypeBadge";

import {
    formatCredentialDate,
    formatCredentialDateTime,
} from "../utils/credentialUtils";

export default function CredentialDetailCard({
    credential,
    onEdit,
    onIssue,
    onRevoke,
}) {
    if (!credential) {
        return null;
    }

    const isDraft = credential.status === "DRAFT";
    const isIssued = credential.status === "ISSUED";

    return (
        <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <div>
            <h5 className="mb-1">Información de la credencial</h5>

            <small className="text-muted">
                Detalle del grado o título académico
            </small>
            </div>

            <CredentialStatusBadge status={credential.status} />
        </div>

        <div className="card-body">
            <div className="row g-4">
            <div className="col-12 col-md-6">
                <label className="form-label text-muted">Tipo</label>

                <div>
                <CredentialTypeBadge type={credential.type} />
                </div>
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label text-muted">
                Número de credential
                </label>

                <p className="mb-0 fw-semibold">
                {credential.credentialNumber || "—"}
                </p>
            </div>

            <div className="col-12">
                <label className="form-label text-muted">Título académico</label>

                <p className="mb-0 fw-semibold">{credential.title || "—"}</p>
            </div>

            <div className="col-12">
                <label className="form-label text-muted">Descripción</label>

                <p className="mb-0">
                {credential.description || "Sin descripción"}
                </p>
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label text-muted">
                Fecha de otorgamiento
                </label>

                <p className="mb-0">{formatCredentialDate(credential.awardedAt)}</p>
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label text-muted">Fecha de emisión</label>

                <p className="mb-0">
                {formatCredentialDateTime(credential.issuedAt)}
                </p>
            </div>

            {credential.revokedAt && (
                <div className="col-12 col-md-6">
                <label className="form-label text-muted">
                    Fecha de revocación
                </label>

                <p className="mb-0 text-danger">
                    {formatCredentialDateTime(credential.revokedAt)}
                </p>
                </div>
            )}

            {credential.revocationReason && (
                <div className="col-12">
                <label className="form-label text-muted">
                    Motivo de revocación
                </label>

                <div className="alert alert-danger mb-0">
                    {credential.revocationReason}
                </div>
                </div>
            )}
            </div>
        </div>

        <div className="card-footer bg-white d-flex flex-wrap justify-content-end gap-2">
            {isDraft && onEdit && (
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onEdit(credential)}
            >
                <i className="bi bi-pencil me-2"></i>
                Editar
            </button>
            )}

            {isDraft && onIssue && (
            <button
                type="button"
                className="btn btn-success"
                onClick={() => onIssue(credential)}
            >
                <i className="bi bi-check-circle me-2"></i>
                Emitir
            </button>
            )}

            {isIssued && onRevoke && (
            <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onRevoke(credential)}
            >
                <i className="bi bi-x-circle me-2"></i>
                Revocar
            </button>
            )}
        </div>
        </div>
    );
}
