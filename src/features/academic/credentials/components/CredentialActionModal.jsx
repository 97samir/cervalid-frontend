import { useState } from "react";

export default function CredentialActionModal({
    action,
    credential,
    isProcessing = false,
    onConfirm,
    onCancel,
}) {
    const [reason, setReason] = useState("");

    if (!credential || !action) {
        return null;
    }

    const isRevoke = action === "revoke";
    const isIssue = action === "issue";

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isRevoke && !reason.trim()) {
        return;
        }

        if (isIssue) {
        await onConfirm();
        return;
        }

        await onConfirm({
        reason: reason.trim(),
        });
    };

    return (
        <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            {/* HEADER */}

            <div className="modal-header">
                <div>
                <h5 className="modal-title fw-bold">
                    {isRevoke ? "Revocar credencial" : "Emitir credencial"}
                </h5>

                <small className="text-muted">
                    {isRevoke
                    ? "Esta acción cambiará el estado de la credencial."
                    : "La credencial pasará a estado emitido."}
                </small>
                </div>

                <button
                type="button"
                className="btn-close"
                onClick={onCancel}
                disabled={isProcessing}
                aria-label="Cerrar"
                />
            </div>

            {/* BODY */}

            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                <p className="mb-3">
                    ¿Deseas <strong>{isRevoke ? "revocar" : "emitir"}</strong> esta
                    credencial académica?
                </p>

                <div className="border rounded-3 p-3 mb-3">
                    <div className="fw-semibold">{credential.title}</div>

                    <small className="text-muted">
                    {credential.credentialNumber}
                    </small>
                </div>

                {isRevoke && (
                    <div>
                    <label
                        htmlFor="revocationReason"
                        className="form-label fw-semibold"
                    >
                        Motivo de revocación
                    </label>

                    <textarea
                        id="revocationReason"
                        className="form-control"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        maxLength={1000}
                        rows={4}
                        required
                        disabled={isProcessing}
                        placeholder="Indica el motivo de la revocación..."
                    />
                    </div>
                )}
                </div>

                {/* FOOTER */}

                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onCancel}
                    disabled={isProcessing}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className={`btn ${isRevoke ? "btn-danger" : "btn-success"}`}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Procesando...
                    </>
                    ) : (
                    <>
                        <i
                        className={`bi ${
                            isRevoke ? "bi-x-circle" : "bi-check-circle"
                        } me-2`}
                        />

                        {isRevoke ? "Revocar credencial" : "Emitir credencial"}
                    </>
                    )}
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}
