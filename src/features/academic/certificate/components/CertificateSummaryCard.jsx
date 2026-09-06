import CertificateStatusBadge from "./CertificateStatusBadge";
import CertificateTypeBadge from "./CertificateTypeBadge";
import { Link } from "react-router-dom";

import {
    academicProgramLabels,
    academicFacultyLabels,
    modalityLabels,
} from "@/shared/utils/enumUtils";

import { 
    formatLocalDate, 
    formatDateTime 
} from "@/shared/utils/dateUtils";

export default function CertificateSummaryCard({
    certificate,
    onRevoke,
    revoking = false,
    onDocumentAction,
}) {
    if (!certificate) return null;

    const info = certificate?.certificate ?? {};

    const snapshot = info.snapshotJson ?? {};

    console.log("CERTIFICATE:", certificate);
    console.log("INFO:", info);
    console.log("SNAPSHOT:", snapshot);
    console.log("ACADEMIC:", snapshot.academic);
    console.log("CURRENT CYCLE:", snapshot.academic?.currentCycle);

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
    const hasBlockchain = Boolean(info.blockchainTxHash);

    const hasDocumentHash = Boolean(info.documentHash);
    const hasDocumentUrl = Boolean(info.documentUrl);
    const hasDocumentReference = hasDocumentHash || hasDocumentUrl;

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
                                            isRevoked
                                                ? "bi-patch-exclamation"
                                                : "bi-patch-check-fill"
                                        } fs-4`}
                                    ></i>
                                </div>

                                <div>
                                    <h4 className="fw-bold mb-1">
                                        Certificado académico
                                    </h4>

                                    <p className="text-muted mb-0">
                                        Información, verificación y trazabilidad
                                        del certificado.
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
                                <i className="bi bi-x-circle me-2"></i>

                                {revoking
                                    ? "Revocando..."
                                    : "Revocar certificado"}
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
                    <i className="bi bi-check-circle-fill fs-4 me-3"></i>

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
                    <i className="bi bi-x-circle-fill fs-4 me-3"></i>

                    <div>
                        <strong>Certificado revocado</strong>

                        <div className="small mt-1">
                            Este certificado ya no se considera válido para
                            verificación.
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
                <i className="bi bi-file-earmark-text text-primary me-2"></i>
                Información del certificado
            </h6>
        </div>

        <div className="card-body p-4">

            <div className="row g-4">

                <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Número de certificado
                    </small>

                    <span className="fw-semibold">
                        {info.certificateNumber ?? "-"}
                    </span>
                </div>

                <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Fecha de otorgamiento
                    </small>

                    <div className="fw-semibold">
                        {formatLocalDate(info.awardedAt)}
                    </div>
                </div>

                <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Tipo
                    </small>

                    <CertificateTypeBadge
                        type={info.type}
                    />
                </div>

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

                                <i className="bi bi-calendar-x text-danger me-2"></i>

                                <span className="fw-semibold text-danger">
                                    Revocado el{" "}
                                    {info.revokedAt
                                        ? formatDateTime(info.revokedAt)
                                        : "fecha no disponible"}
                                </span>

                            </div>
                        ) : (
                            <div className="d-flex align-items-center">

                                <i className="bi bi-shield-check text-success me-2"></i>

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

                        <small className="text-muted d-block mb-1">
                            Estado
                        </small>

                        <CertificateStatusBadge
                            status={info.status}
                        />

                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
                {/* =================================================
                                VERIFICACIÓN
                ================================================== */}

                <div className="col-12 col-xl-6">
                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-header bg-white border-bottom py-3">
                            <h6 className="fw-bold mb-0">
                                <i className="bi bi-shield-check text-primary me-2"></i>
                                Verificación pública
                            </h6>
                        </div>

                        <div className="card-body p-4">

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
                                    <i className="bi bi-box-arrow-up-right me-2"></i>
                                    Verificar certificado
                                </Link>

                            </div>

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
                                <i className="bi bi-file-earmark-check text-primary me-2"></i>
                                Documento oficial
                            </h6>

                        </div>

                        <div className="card-body p-4">

                            {!hasDocumentReference ? (

                                /* SIN DOCUMENTO */
                                <div className="d-flex flex-column flex-sm-row align-items-start gap-3">

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-secondary bg-opacity-10 text-secondary"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            minWidth: "44px",
                                        }}
                                    >
                                        <i className="bi bi-file-earmark-x"></i>
                                    </div>

                                    <div className="flex-grow-1">

                                        <h6 className="fw-semibold mb-1">
                                            Sin referencia documental
                                        </h6>

                                        <p className="text-muted small mb-3">
                                            No se registró un hash ni un enlace
                                            externo para este certificado.
                                        </p>

                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={onDocumentAction}
                                        >
                                            <i className="bi bi-file-earmark-plus me-2"></i>
                                            Registrar documento
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                /* CON DOCUMENTO */
                                <>
                                    <div className="mb-4">

                                        <p className="text-muted small mb-0">
                                            CERVALID no almacena el archivo
                                            original. Esta información permite
                                            consultar o comprobar el documento
                                            conservado por la institución.
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
                                                <i className="bi bi-box-arrow-up-right me-2"></i>
                                                Consultar documento
                                            </a>

                                        </div>
                                    )}

                                    {/* HASH */}

                                    {hasDocumentHash && (
                                        <div className={hasDocumentUrl ? "" : "mb-0"}>

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
                                                Huella digital registrada para
                                                comprobar la integridad del
                                                documento.
                                            </div>

                                        </div>
                                    )}

                                    {/* ACCIÓN DE ACTUALIZACIÓN */}

                                    <div className="border-top mt-4 pt-3">

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={onDocumentAction}
                                        >
                                            <i className="bi bi-pencil-square me-2"></i>
                                            Actualizar documento
                                        </button>

                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                {/* =================================================
                                BLOCKCHAIN
                ================================================== */}

                <div className="col-12 col-xl-6">
                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-header bg-white border-bottom py-3">
                            <h6 className="fw-bold mb-0">
                                <i className="bi bi-link-45deg text-primary me-2"></i>
                                Registro blockchain
                            </h6>
                        </div>

                        <div className="card-body p-4">

                            {!hasBlockchain ? (

                                <div className="d-flex align-items-start">

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 text-warning me-3"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            minWidth: "44px",
                                        }}
                                    >
                                        <i className="bi bi-hourglass-split"></i>
                                    </div>

                                    <div>
                                        <h6 className="fw-semibold mb-1">
                                            Registro pendiente
                                        </h6>

                                        <p className="text-muted small mb-0">
                                            El certificado todavía no ha sido
                                            registrado en blockchain.
                                        </p>
                                    </div>

                                </div>

                            ) : (

                                <>
                                    <div className="row g-4 mb-4">

                                        <div className="col-sm-6">
                                            <small className="text-muted d-block mb-1">
                                                Red
                                            </small>

                                            <span className="fw-semibold">
                                                {certificate.network ?? "-"}
                                            </span>
                                        </div>

                                        <div className="col-sm-6">
                                            <small className="text-muted d-block mb-1">
                                                Bloque
                                            </small>

                                            <span className="fw-semibold">
                                                {certificate.blockNumber ?? "-"}
                                            </span>
                                        </div>

                                        <div className="col-12">
                                            <small className="text-muted d-block mb-1">
                                                Fecha de anclaje
                                            </small>

                                            <span className="fw-semibold">
                                                {certificate.anchoredAt
                                                    ? new Date(
                                                        certificate.anchoredAt
                                                    ).toLocaleString()
                                                    : "-"}
                                            </span>
                                        </div>

                                    </div>

                                    <div>

                                        <small className="text-muted d-block mb-2">
                                            Transaction Hash
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
                                <i className="bi bi-mortarboard text-primary me-2"></i>
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
                                        {snapshot.student?.studentCode ?? "-"}
                                    </span>
                                </div>

                                <div className="col-sm-6">
                                    <small className="text-muted d-block mb-1">
                                        Nombre completo
                                    </small>

                                    <span className="fw-semibold">
                                        {snapshot.student?.name ?? "-"}
                                    </span>
                                </div>

                                <div className="col-12">
                                    <small className="text-muted d-block mb-1">
                                        Institución
                                    </small>

                                    <span className="fw-semibold">
                                        {snapshot.institution?.name ?? "-"}
                                    </span>
                                </div>

                                <div className="col-6">
                                    <small className="text-muted d-block mb-1">
                                        Programa académico
                                    </small>

                                    <span className="fw-semibold">
                                        {program}
                                    </span>
                                </div>

                                <div className="col-sm-6">
                                    <small className="text-muted d-block mb-1">
                                        Ciclo Académico
                                    </small>

                                    <span className="fw-semibold">
                                        {currentCycle}
                                    </span>
                                </div>

                                <div className="col-sm-6">
                                    <small className="text-muted d-block mb-1">
                                        Facultad
                                    </small>

                                    <span className="fw-semibold">
                                        {faculty}
                                    </span>
                                </div>

                                <div className="col-sm-6">
                                    <small className="text-muted d-block mb-1">
                                        Modalidad
                                    </small>

                                    <span className="fw-semibold">
                                        {modality}
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