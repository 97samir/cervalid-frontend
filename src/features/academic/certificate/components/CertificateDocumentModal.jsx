import { useState } from "react";

export default function CertificateDocumentModal({
    show,
    onClose,
    onSubmit,
    submitting = false,
    certificate,
}) {
    const [mode, setMode] = useState(certificate?.documentHash ? "HASH" : "FILE");

    const [file, setFile] = useState(null);

    const [documentHash, setDocumentHash] = useState(
        certificate?.documentHash ?? "",
    );

    const [documentUrl, setDocumentUrl] = useState(
        certificate?.documentUrl ?? "",
    );

    if (!show) {
        return null;
    }

    const hasExistingDocument =
        Boolean(certificate?.documentHash) || Boolean(certificate?.documentUrl);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (mode === "FILE" && !file) {
        alert("Seleccione un archivo PDF.");
        return;
        }

        if (mode === "HASH" && !documentHash.trim()) {
        alert("Ingrese el hash del documento.");
        return;
        }

        onSubmit({
        file: mode === "FILE" ? file : null,
        documentHash: mode === "HASH" ? documentHash.trim() : null,
        documentUrl: documentUrl.trim() || null,
        });
    };

    return (
        <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{
            backgroundColor: "rgba(0,0,0,.5)",
        }}
        >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            {/* HEADER */}

            <div className="modal-header">
                <div>
                <h5 className="modal-title fw-bold">
                    {hasExistingDocument
                    ? "Actualizar documento"
                    : "Registrar documento"}
                </h5>

                <small className="text-muted">
                    Documento oficial del certificado
                </small>
                </div>

                <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={submitting}
                />
            </div>

            <form onSubmit={handleSubmit}>
                {/* BODY */}

                <div className="modal-body">
                {/* MÉTODO */}

                <div className="mb-4">
                    <label className="form-label fw-semibold">
                    Método de registro
                    </label>

                    <div className="row g-2">
                    <div className="col-6">
                        <button
                        type="button"
                        className={`btn w-100 ${
                            mode === "FILE" ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={() => setMode("FILE")}
                        disabled={submitting}
                        >
                        <i className="bi bi-file-earmark-pdf me-2"></i>
                        Subir PDF
                        </button>
                    </div>

                    <div className="col-6">
                        <button
                        type="button"
                        className={`btn w-100 ${
                            mode === "HASH" ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={() => setMode("HASH")}
                        disabled={submitting}
                        >
                        <i className="bi bi-fingerprint me-2"></i>
                        Usar hash
                        </button>
                    </div>
                    </div>
                </div>

                {/* PDF */}

                {mode === "FILE" && (
                    <div className="mb-4">
                    <label className="form-label fw-semibold">Archivo PDF</label>

                    <input
                        type="file"
                        className="form-control"
                        accept="application/pdf,.pdf"
                        onChange={(event) =>
                        setFile(event.target.files?.[0] ?? null)
                        }
                        disabled={submitting}
                    />

                    <div className="form-text">
                        CERVALID calculará automáticamente el hash SHA-256 del
                        archivo.
                    </div>
                    </div>
                )}

                {/* HASH */}

                {mode === "HASH" && (
                    <div className="mb-4">
                    <label className="form-label fw-semibold">
                        Hash del documento
                    </label>

                    <input
                        type="text"
                        className="form-control font-monospace"
                        placeholder="0x..."
                        value={documentHash}
                        onChange={(event) => setDocumentHash(event.target.value)}
                        disabled={submitting}
                    />

                    <div className="form-text">
                        Ingrese el hash proporcionado por la institución.
                    </div>
                    </div>
                )}

                {/* URL */}

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                    URL del documento
                    <span className="text-muted fw-normal"> opcional</span>
                    </label>

                    <input
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={documentUrl}
                    onChange={(event) => setDocumentUrl(event.target.value)}
                    disabled={submitting}
                    />

                    <div className="form-text">
                    Enlace al documento almacenado por la institución.
                    </div>
                </div>

                {/* INFO */}

                <div className="alert alert-info small mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    CERVALID no necesita almacenar el PDF permanentemente. El hash
                    permite comprobar posteriormente la integridad del documento.
                </div>
                </div>

                {/* FOOTER */}

                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onClose}
                    disabled={submitting}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                >
                    {submitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Guardando...
                    </>
                    ) : (
                    <>
                        <i className="bi bi-check-lg me-2"></i>
                        Guardar documento
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
