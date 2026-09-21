import { useState } from "react";

export default function CredentialDocumentModal({
    show,
    onClose,
    onSubmit,
    submitting = false,
    credential,
}) {
    const [file, setFile] = useState(null);

    const [documentHash, setDocumentHash] = useState(
        credential?.documentHash ?? "",
    );

    const [documentUrl, setDocumentUrl] = useState(credential?.documentUrl ?? "");

    if (!show) {
        return null;
    }

    const hasDocumentHash = Boolean(credential?.documentHash);

    const hasDocumentUrl = Boolean(credential?.documentUrl);

    const hasExistingDocument = hasDocumentHash || hasDocumentUrl;

    /* =====================================================
            SELECCIONAR ARCHIVO
        ===================================================== */

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0] ?? null;

        if (!selectedFile) {
        setFile(null);
        return;
        }

        const isPdf =
        selectedFile.type === "application/pdf" ||
        selectedFile.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {
        alert("Seleccione únicamente un archivo PDF.");

        event.target.value = "";
        setFile(null);

        return;
        }
        // eliminamos el hash anterior del formulario
        setDocumentHash("");
        setFile(selectedFile);
    };

    /* =====================================================
            SUBMIT
        ===================================================== */
    const SHA256_REGEX = /^[a-fA-F0-9]{64}$/;

    const handleSubmit = (event) => {
        event.preventDefault();

        const normalizedHash = documentHash.trim();
        const normalizedUrl = documentUrl.trim();

        // seleccion de nuevo archivo, nueva data de hash
        if (!file && normalizedHash) {
        if (!SHA256_REGEX.test(normalizedHash)) {
            alert(
            "El hash debe ser un SHA-256 válido de 64 caracteres hexadecimales.",
            );

            return;
        }
        }

        // no enviar formulario vacio
        if (!file && !normalizedHash && !normalizedUrl) {
        alert(
            "Ingrese el hash, seleccione un archivo PDF o proporcione una URL.",
        );

        return;
        }

        onSubmit({
        file: file || null,

        // sin selccion de archivo se conserva el hash anterior
        documentHash: normalizedHash || null,

        // url indenpendiente
        documentUrl: normalizedUrl || null,
        });
    };

    return (
        <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        >
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
            {/* =================================================
                            HEADER
                        ================================================== */}
            <div className="modal-header">
                <div>
                <h5 className="modal-title fw-bold">
                    {hasExistingDocument
                    ? "Actualizar documento"
                    : "Registrar documento"}
                </h5>

                <small className="text-muted">
                    Documento oficial del grado o título
                </small>
                </div>

                <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={submitting}
                aria-label="Cerrar"
                />
            </div>

            {/* =================================================
                            FORM
                        ================================================== */}
            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                {/* =================================================
                                    INFORMACIÓN
                                ================================================== */}
                <div className="alert alert-info small">
                    <i className="bi bi-info-circle me-2"></i>
                    Puedes registrar el hash y la URL de forma independiente. Si uno
                    ya está registrado, puedes completar posteriormente el otro.
                    CERVALID no almacena permanentemente el archivo original.
                </div>

                {/* =================================================
                                    HASH
                                ================================================== */}
                <div className="mb-4">
                    <label
                    htmlFor="credential-document-hash"
                    className="form-label fw-semibold"
                    >
                    Hash del documento
                    </label>

                    <input
                    id="credential-document-hash"
                    type="text"
                    className="form-control font-monospace"
                    placeholder="Hash SHA-256"
                    value={documentHash}
                    onChange={(event) => setDocumentHash(event.target.value)}
                    disabled={submitting}
                    />

                    <div className="form-text">
                    Huella digital del documento utilizada para comprobar su
                    integridad.
                    </div>
                </div>

                {/* =================================================
                                    ARCHIVO
                                ================================================== */}
                <div className="mb-4">
                    <label
                    htmlFor="credential-document-file"
                    className="form-label fw-semibold"
                    >
                    Generar hash desde un PDF
                    <span className="text-muted fw-normal ms-1">opcional</span>
                    </label>

                    <input
                    id="credential-document-file"
                    type="file"
                    className="form-control"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                    disabled={submitting}
                    />

                    <div className="form-text">
                        {file ? (
                            <>
                                <i className="bi bi-arrow-repeat me-1"></i>
                                Se generará automáticamente un nuevo hash
                                SHA-256 a partir del PDF seleccionado.
                            </>
                        ) : (
                            <>
                                Huella digital del documento utilizada para
                                comprobar su integridad.
                            </>
                        )}
                    </div>

                    {file && (
                    <div className="mt-2 small text-muted">
                        <i className="bi bi-file-earmark-pdf me-1"></i>
                        {file.name}
                    </div>
                    )}
                </div>

                {/* =================================================
                                    URL
                                ================================================== */}
                <div className="mb-3">
                    <label
                    htmlFor="credential-document-url"
                    className="form-label fw-semibold"
                    >
                    URL del documento
                    <span className="text-muted fw-normal ms-1">opcional</span>
                    </label>

                    <input
                    id="credential-document-url"
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={documentUrl}
                    onChange={(event) => setDocumentUrl(event.target.value)}
                    disabled={submitting}
                    />

                    <div className="form-text">
                    Enlace al documento conservado por la institución.
                    </div>
                </div>
                </div>

                {/* =================================================
                                FOOTER
                            ================================================== */}
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

                        {hasExistingDocument
                        ? "Actualizar documento"
                        : "Guardar documento"}
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
