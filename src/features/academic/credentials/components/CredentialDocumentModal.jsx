import { useState } from "react";

export default function CredentialDocumentModal({
    show,
    onClose,
    onSubmit,
    submitting = false,
    credential,
}) {
    
    const document = credential?.document ?? {};

    const existingDocumentHash =
        credential?.documentHash ?? 
        document.documentHash ?? "";

    const existingDocumentUrl =
        credential?.documentUrl ?? 
        document.documentUrl ?? "";

    const hasExistingDocument =
        Boolean(existingDocumentHash) || 
        Boolean(existingDocumentUrl);


    const [mode, setMode] = 
        useState(existingDocumentHash ? "HASH" : "FILE");

    const [file, setFile] = 
        useState(null);

    const [documentHash, setDocumentHash] = 
        useState(existingDocumentHash);

    const [documentUrl, setDocumentUrl] = 
        useState(existingDocumentUrl);

    if (!show) {
        return null;
    }

    /*
    * =====================================================
    * SELECCIONAR ARCHIVO
    * =====================================================
    */

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

        // al seleccionar archivo nuevo se elimina el hash del input
        setMode("FILE");
        setDocumentHash("");
        setFile(selectedFile);
    };

    // seleccionar método

    const handleSelectFileMode = () => {
        setMode("FILE");
        setDocumentHash("");
    };

    const handleSelectHashMode = () => {
        setMode("HASH");
        setFile(null);

        /*
        * Si existe un hash anterior, lo mantenemos.
        * Esto permite actualizar una URL sin perder el hash.
        */
        setDocumentHash(existingDocumentHash);
    };

    // submit
    const SHA256_REGEX = /^(0x)?[a-fA-F0-9]{64}$/;

    const handleSubmit = (event) => {
        event.preventDefault();

        const normalizedHash = documentHash.trim();
        const normalizedUrl = documentUrl.trim();

        if (mode === "FILE" && !file) {
        alert("Seleccione un archivo PDF.");
        return;
        }

        if (mode === "HASH" && !normalizedHash) {
        alert("Ingrese el hash del documento.");
        return;
        }

        // validar
        if (mode === "HASH" && !SHA256_REGEX.test(normalizedHash)) {
        alert(
            "El hash debe ser un SHA-256 válido de 64 caracteres hexadecimales.",
        );

        return;
        }

        // enviar
        onSubmit({
        file: mode === "FILE" ? file : null,

        documentHash: mode === "HASH" ? normalizedHash : null,

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
                                    MÉTODO
                                ================================================== */}

                <div className="mb-4">
                    <label className="form-label fw-semibold">
                    Método de registro
                    </label>

                    <div className="row g-2">
                    {/* PDF */}

                    <div className="col-12 col-sm-6">
                        <button
                        type="button"
                        className={`btn w-100 ${
                            mode === "FILE" ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={handleSelectFileMode}
                        disabled={submitting}
                        >
                        <i className="bi bi-file-earmark-pdf me-2" />
                        Subir PDF
                        </button>
                    </div>

                    {/* HASH */}

                    <div className="col-12 col-sm-6">
                        <button
                        type="button"
                        className={`btn w-100 ${
                            mode === "HASH" ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={handleSelectHashMode}
                        disabled={submitting}
                        >
                        <i className="bi bi-fingerprint me-2" />
                        Usar hash
                        </button>
                    </div>
                    </div>

                    <div className="form-text">
                    Seleccione una de las dos opciones para registrar la huella
                    digital del documento.
                    </div>
                </div>

                {/* =================================================
                                    INFORMACIÓN
                                ================================================== */}

                <div className="alert alert-info small">
                    <i className="bi bi-info-circle me-2"></i>
                    CERVALID no almacena permanentemente el archivo original. Se
                    conserva su huella digital para comprobar posteriormente la
                    integridad del documento.
                </div>

                {/* =================================================
                                    PDF
                                ================================================== */}

                {mode === "FILE" && (
                    <div className="mb-4">
                    <label
                        htmlFor="credential-document-file"
                        className="form-label fw-semibold"
                    >
                        Archivo PDF
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
                        CERVALID calculará automáticamente el hash SHA-256 del
                        archivo seleccionado.
                    </div>

                    {file && (
                        <div className="mt-2 small text-muted">
                        <i className="bi bi-file-earmark-pdf me-1" />
                        {file.name}
                        </div>
                    )}
                    </div>
                )}

                {/* =================================================
                                    HASH
                                ================================================== */}

                {mode === "HASH" && (
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
                        placeholder="0x..."
                        value={documentHash}
                        onChange={(event) => setDocumentHash(event.target.value)}
                        disabled={submitting}
                    />

                    <div className="form-text">
                        Ingrese el hash SHA-256 proporcionado por la institución.
                    </div>
                    </div>
                )}

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
                        <i className="bi bi-check-lg me-2" />

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
