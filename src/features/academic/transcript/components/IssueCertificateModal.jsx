import { useState } from "react";

import {
    certificateTypeLabels,
} from "@/shared/utils/enumUtils";

const EMPTY_FORM = {
    type: "DEGREE",
    title: "",
    awardedAt: "",
    documentHash: "",
    documentUrl: "",
};

const DOCUMENT_MODES = {
    PDF: "PDF",
    HASH: "HASH",
    URL: "URL",
};

export default function IssueCertificateModal({
    show,
    onClose,
    onSubmit,
    loading = false,
}) {

    const [form, setForm] =
        useState(EMPTY_FORM);

    const [mode, setMode] =
        useState(DOCUMENT_MODES.PDF);

    const [showDocumentOptions, setShowDocumentOptions] =
        useState(false);

    if (!show) {
        return null;
    }

    /*
     * ============================================================
     * CAMBIAR CAMPOS
     * ============================================================
     */

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    /*
     * ============================================================
     * CAMBIAR MODO DOCUMENTAL
     * ============================================================
     */

    const handleDocumentModeChange = (newMode) => {

        setMode(newMode);

        /*
         * Evita enviar información documental
         * correspondiente a otro modo.
         */

        setForm((current) => ({
            ...current,

            documentHash:
                newMode === DOCUMENT_MODES.HASH
                    ? current.documentHash
                    : "",

            documentUrl:
                newMode === DOCUMENT_MODES.URL
                    ? current.documentUrl
                    : "",
        }));
    };

    /*
     * ============================================================
     * ARCHIVO PDF
     * ============================================================
     */

    const handleFileChange = async (event) => {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        if (
            file.type !== "application/pdf"
            && !file.name.toLowerCase().endsWith(".pdf")
        ) {

            alert(
                "Solo se permiten archivos PDF."
            );

            event.target.value = "";

            return;
        }

        try {

            const arrayBuffer =
                await file.arrayBuffer();

            const hashBuffer =
                await crypto.subtle.digest(
                    "SHA-256",
                    arrayBuffer
                );

            const hashArray =
                Array.from(
                    new Uint8Array(hashBuffer)
                );

            const hashHex =
                "0x" +
                hashArray
                    .map((byte) =>
                        byte
                            .toString(16)
                            .padStart(2, "0")
                    )
                    .join("");

            setForm((current) => ({
                ...current,
                documentHash: hashHex,
            }));

        } catch (error) {

            console.error(
                "Error al calcular el hash del documento:",
                error
            );

            alert(
                "No fue posible calcular el identificador de integridad del documento."
            );
        }
    };

    /*
     * ============================================================
     * SUBMIT
     * ============================================================
     */

    const handleSubmit = (event) => {

        event.preventDefault();

        const title =
            form.title.trim();

        const documentHash =
            form.documentHash.trim();

        const documentUrl =
            form.documentUrl.trim();

        /*
         * VALIDACIÓN PRINCIPAL
         */

        if (!form.type) {

            alert(
                "Selecciona el tipo de certificado."
            );

            return;
        }

        if (!title) {

            alert(
                "Ingresa el título de la credencial."
            );

            return;
        }

        if (!form.awardedAt) {

            alert(
                "Selecciona la fecha de otorgamiento."
            );

            return;
        }

        /*
         * VALIDACIÓN DOCUMENTAL
         *
         * La información documental es opcional.
         * Si no se abrió la sección, ambos valores
         * permanecerán en null.
         */

        onSubmit({

            type:
                form.type,

            title,

            awardedAt:
                form.awardedAt,

            documentHash:
                documentHash || null,

            documentUrl:
                documentUrl || null,
        });
    };

    /*
     * ============================================================
     * CERRAR
     * ============================================================
     */

    const handleClose = () => {

        if (loading) {
            return;
        }

        setForm(
            EMPTY_FORM
        );

        setMode(
            DOCUMENT_MODES.PDF
        );

        setShowDocumentOptions(
            false
        );

        onClose();
    };

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (
        <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)",
            }}
        >

            <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
            >

                <div className="modal-content">

                    {/* =================================================
                        HEADER
                    ================================================== */}

                    <div className="modal-header">

                        <div>

                            <h5 className="modal-title fw-bold mb-1">

                                <i className="bi bi-patch-check me-2 text-success"></i>

                                Emitir certificado

                            </h5>

                            <div className="small text-muted">

                                Completa la información de la
                                credencial antes de emitirla.

                            </div>

                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                            disabled={loading}
                            aria-label="Cerrar"
                        />

                    </div>

                    {/* =================================================
                        FORM
                    ================================================== */}

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            {/* =================================================
                                BLOQUE 1
                            ================================================== */}

                            <div className="border rounded-3 p-3 mb-3">

                                <div className="d-flex align-items-start gap-3 mb-3">

                                    <div
                                        className="
                                            rounded-circle
                                            bg-success-subtle
                                            text-success
                                            d-flex
                                            align-items-center
                                            justify-content-center
                                            flex-shrink-0
                                        "
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                        }}
                                    >

                                        <i className="bi bi-award"></i>

                                    </div>

                                    <div>

                                        <div className="fw-semibold">

                                            Información de la credencial

                                        </div>

                                        <div className="small text-muted">

                                            Datos oficiales que formarán
                                            parte del certificado académico.

                                        </div>

                                    </div>

                                </div>

                                {/* =================================================
                                    TIPO + FECHA
                                ================================================== */}

                                <div className="row g-3">

                                    {/* TIPO */}

                                    <div className="col-12 col-md-6">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="certificate-type"
                                        >
                                            Tipo de certificado
                                        </label>

                                        <select
                                            id="certificate-type"
                                            name="type"
                                            className="form-select"
                                            value={form.type}
                                            onChange={handleChange}
                                            disabled={loading}
                                        >

                                            {Object.entries(
                                                certificateTypeLabels
                                            ).map(
                                                ([
                                                    value,
                                                    label,
                                                ]) => (

                                                    <option
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {label}
                                                    </option>

                                                )
                                            )}

                                        </select>

                                    </div>

                                    {/* FECHA */}

                                    <div className="col-12 col-md-6">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="certificate-awarded-at"
                                        >
                                            Fecha de otorgamiento
                                        </label>

                                        <input
                                            id="certificate-awarded-at"
                                            type="date"
                                            name="awardedAt"
                                            className="form-control"
                                            value={form.awardedAt}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />

                                    </div>

                                    {/* TÍTULO */}

                                    <div className="col-12">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="certificate-title"
                                        >
                                            Título
                                        </label>

                                        <input
                                            id="certificate-title"
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            value={form.title}
                                            onChange={handleChange}
                                            placeholder="Ej. Ingeniero de Sistemas"
                                            maxLength={255}
                                            disabled={loading}
                                        />

                                        <div className="form-text">

                                            Nombre oficial de la
                                            credencial académica.

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* =================================================
                                BLOQUE 2 — DOCUMENTACIÓN
                            ================================================== */}

                            <div className="border rounded-3 p-3">

                                <div className="d-flex justify-content-between align-items-start gap-3">

                                    <div>

                                        <div className="fw-semibold">

                                            Información documental

                                            <span className="badge text-bg-light ms-2">
                                                Opcional
                                            </span>

                                        </div>

                                        <div className="small text-muted mt-1">

                                            Puedes asociar el documento
                                            oficial ahora o posteriormente.

                                        </div>

                                    </div>

                                    <i
                                        className="
                                            bi
                                            bi-file-earmark-text
                                            text-muted
                                            fs-5
                                        "
                                    ></i>

                                </div>

                                {/* =================================================
                                    BOTÓN EXPANDIR
                                ================================================== */}

                                {!showDocumentOptions && (

                                    <button
                                        type="button"
                                        className="
                                            btn
                                            btn-outline-primary
                                            w-100
                                            mt-3
                                        "
                                        onClick={() =>
                                            setShowDocumentOptions(true)
                                        }
                                        disabled={loading}
                                    >

                                        <i className="bi bi-plus-circle me-2"></i>

                                        Agregar información documental

                                    </button>

                                )}

                                {/* =================================================
                                    OPCIONES
                                ================================================== */}

                                {showDocumentOptions && (

                                    <div className="mt-3">

                                        {/* SELECTOR */}

                                        <div
                                            className="
                                                btn-group
                                                w-100
                                                mb-3
                                            "
                                            role="group"
                                            aria-label="Tipo de información documental"
                                        >

                                            {/* PDF */}

                                            <button
                                                type="button"
                                                className={`btn ${
                                                    mode === DOCUMENT_MODES.PDF
                                                        ? "btn-primary"
                                                        : "btn-outline-primary"
                                                }`}
                                                onClick={() =>
                                                    handleDocumentModeChange(
                                                        DOCUMENT_MODES.PDF
                                                    )
                                                }
                                                disabled={loading}
                                            >

                                                <i className="bi bi-file-earmark-pdf me-2"></i>

                                                PDF

                                            </button>

                                            {/* INTEGRIDAD */}

                                            <button
                                                type="button"
                                                className={`btn ${
                                                    mode === DOCUMENT_MODES.HASH
                                                        ? "btn-primary"
                                                        : "btn-outline-primary"
                                                }`}
                                                onClick={() =>
                                                    handleDocumentModeChange(
                                                        DOCUMENT_MODES.HASH
                                                    )
                                                }
                                                disabled={loading}
                                            >

                                                <i className="bi bi-fingerprint me-2"></i>

                                                Integridad

                                            </button>

                                            {/* URL */}

                                            <button
                                                type="button"
                                                className={`btn ${
                                                    mode === DOCUMENT_MODES.URL
                                                        ? "btn-primary"
                                                        : "btn-outline-primary"
                                                }`}
                                                onClick={() =>
                                                    handleDocumentModeChange(
                                                        DOCUMENT_MODES.URL
                                                    )
                                                }
                                                disabled={loading}
                                            >

                                                <i className="bi bi-link-45deg me-2"></i>

                                                URL

                                            </button>

                                        </div>

                                        {/* =================================================
                                            PDF
                                        ================================================== */}

                                        {mode === DOCUMENT_MODES.PDF && (

                                            <div>

                                                <label
                                                    className="form-label fw-semibold"
                                                    htmlFor="certificate-document-file"
                                                >
                                                    Documento PDF
                                                </label>

                                                <input
                                                    id="certificate-document-file"
                                                    type="file"
                                                    accept="application/pdf,.pdf"
                                                    className="form-control"
                                                    onChange={handleFileChange}
                                                    disabled={loading}
                                                />

                                                <div className="form-text">

                                                    El archivo no se almacena.
                                                    Solo se utiliza para calcular
                                                    su identificador de integridad.

                                                </div>

                                                {form.documentHash && (

                                                    <div className="mt-3">

                                                        <small className="text-muted d-block mb-2">

                                                            Identificador de integridad

                                                        </small>

                                                        <div
                                                            className="
                                                                bg-light
                                                                rounded-3
                                                                p-3
                                                                small
                                                                font-monospace
                                                            "
                                                            style={{
                                                                wordBreak:
                                                                    "break-all",
                                                            }}
                                                        >
                                                            {form.documentHash}
                                                        </div>

                                                    </div>

                                                )}

                                            </div>

                                        )}

                                        {/* =================================================
                                            HASH
                                        ================================================== */}

                                        {mode === DOCUMENT_MODES.HASH && (

                                            <div>

                                                <label
                                                    className="form-label fw-semibold"
                                                    htmlFor="certificate-document-hash"
                                                >
                                                    Identificador de integridad del documento
                                                </label>

                                                <input
                                                    id="certificate-document-hash"
                                                    type="text"
                                                    name="documentHash"
                                                    className="
                                                        form-control
                                                        font-monospace
                                                    "
                                                    value={form.documentHash}
                                                    onChange={handleChange}
                                                    placeholder="0x..."
                                                    disabled={loading}
                                                />

                                                <div className="form-text">

                                                    SHA-256 proporcionado
                                                    por la institución.

                                                </div>

                                            </div>

                                        )}

                                        {/* =================================================
                                            URL
                                        ================================================== */}

                                        {mode === DOCUMENT_MODES.URL && (

                                            <div>

                                                <label
                                                    className="form-label fw-semibold"
                                                    htmlFor="certificate-document-url"
                                                >
                                                    URL del documento
                                                </label>

                                                <input
                                                    id="certificate-document-url"
                                                    type="url"
                                                    name="documentUrl"
                                                    className="form-control"
                                                    value={form.documentUrl}
                                                    onChange={handleChange}
                                                    placeholder="https://..."
                                                    disabled={loading}
                                                />

                                                <div className="form-text">

                                                    Enlace al documento oficial
                                                    almacenado por la institución.

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                )}

                            </div>

                            {/* =================================================
                                NOTA
                            ================================================== */}

                            <div className="d-flex align-items-start gap-2 mt-3">

                                <i
                                    className="
                                        bi
                                        bi-info-circle
                                        text-primary
                                        mt-1
                                    "
                                ></i>

                                <div className="small text-muted">

                                    La información documental es opcional.
                                    Si no la tienes ahora, podrás asociarla
                                    posteriormente desde el registro del certificado.

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
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="
                                                spinner-border
                                                spinner-border-sm
                                                me-2
                                            "
                                        />

                                        Emitiendo...
                                    </>

                                ) : (

                                    <>
                                        <i className="bi bi-patch-check me-2"></i>

                                        Emitir certificado
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