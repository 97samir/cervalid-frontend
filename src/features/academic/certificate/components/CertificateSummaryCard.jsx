import CertificateStatusBadge from "./CertificateStatusBadge";
import CertificateTypeBadge from "./CertificateTypeBadge";
import { Link } from "react-router-dom";

export default function CertificateSummaryCard({

    certificate,
    onRevoke,
    revoking = false,
}) {

    if (!certificate) return null;

    const info = certificate?.certificate ?? {};
    const snapshot = info.snapshotJson ?? {};

    return (
        <>
        {/* HEADER */}
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h3 className="fw-bold mb-1">
                <i className="bi bi-patch-check-fill text-success me-2"></i>
                Certificado Académico
                </h3>

                <p className="text-muted mb-0">
                Información, verificación y trazabilidad blockchain.
                </p>
            </div>

            {info.status !== "REVOKED" && (
                <button
                className="btn btn-outline-danger"
                disabled={revoking}
                onClick={onRevoke}
                >
                <i className="bi bi-x-circle me-2"></i>
                Revocar certificado
                </button>
            )}
            </div>
        </div>

        {/* MOSTRAR ESTADO DEL CERTIFICADO */}
        {info.status === "ISSUED" && (
            <div className="alert alert-success d-flex align-items-center mb-4">

                <i className="bi bi-check-circle-fill fs-4 me-3"></i>

                <div>
                    <strong>Certificado válido</strong>
                    <br/>
                    <small>
                        Este certificado puede ser verificado públicamente.
                    </small>
                </div>

            </div>
        )}

        {/* GRID */}
        <div className="row g-4">

            {/* INFORMACIÓN */}
            <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white fw-bold">
                <i className="bi bi-file-earmark-text me-2"></i>
                Información del certificado
                </div>

                <div className="card-body">
                <div className="row mb-3">
                    <div className="col-5 text-muted">Número</div>

                    <div className="col-7 fw-semibold">
                    {info.certificateNumber}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-5 text-muted">Estado</div>

                    <div className="col-7">
                    <CertificateStatusBadge status={info.status} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-5 text-muted">Tipo</div>

                    <div className="col-7">
                    <CertificateTypeBadge type={info.type} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-5 text-muted">Emitido</div>

                    <div className="col-7">
                    {info.issuedAt
                        ? new Date(info.issuedAt).toLocaleString()
                        : "-"}
                    </div>
                </div>

                <div className="row">
                    <div className="col-5 text-muted">Revocado</div>

                    <div className="col-7">
                    {info.revokedAt
                        ? new Date(info.revokedAt).toLocaleString()
                        : "-"}
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* VERIFICACIÓN */}
            <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white fw-bold">
                <i className="bi bi-shield-check me-2"></i>
                Verificación pública
                </div>

                <div className="card-body">
                <div className="mb-4">
                    <label className="form-label text-muted">
                    Código de Verification
                    </label>

                    <div
                    className="bg-light rounded p-2 small font-monospace"
                    style={{ wordBreak: "break-all" }}
                    >
                    {info.verificationHash}
                    </div>
                </div>

                <div>
                    <label className="form-label text-muted">
                    URL de verificación
                    </label>

                    <div>
                        <Link
                            to={`/verify/${info.publicId}`}
                            target="_blank"
                            className="btn btn-success"
                        >
                            <i className="bi bi-box-arrow-up-right me-2"></i>
                            Verificar públicamente
                        </Link>
                    </div>

                </div>
                </div>
            </div>
            </div>

            {/* BLOCKCHAIN */}
            <div className="col-lg-6">
                <div className="card shadow-sm border-0 h-100">

                    <div className="card-header bg-white fw-bold">
                        <i className="bi bi-link-45deg me-2"></i>
                        Blockchain
                    </div>

                    <div className="card-body">
                        {!info.blockchainTxHash ? (
                            <div className="alert alert-secondary mb-0">
                                <i className="bi bi-hourglass-split me-2"></i>
                                <strong>Registro blockchain pendiente</strong>
                                <div className="small mt-1">
                                    El certificado aún no ha sido registrado en blockchain.
                                </div>

                            </div>
                        ) : (
                            <>
                                <div className="row mb-3">
                                    <div className="col-5 text-muted">
                                        Red
                                    </div>

                                    <div className="col-7">
                                        {certificate.network ?? "-"}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-5 text-muted">
                                        Bloque
                                    </div>
                                    <div className="col-7">
                                        {certificate.blockNumber ?? "-"}
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-5 text-muted">
                                        Anclado
                                    </div>

                                    <div className="col-7">
                                        {certificate.anchoredAt
                                            ? new Date(
                                                certificate.anchoredAt
                                            ).toLocaleString()
                                            : "-"
                                        }
                                    </div>
                                </div>


                                <label className="form-label text-muted">
                                    Transaction Hash
                                </label>

                                <div
                                    className="bg-light rounded p-2 small font-monospace"
                                    style={{
                                        wordBreak: "break-all"
                                    }}
                                >
                                    {info.blockchainTxHash}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* SNAPSHOT */}
            <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white fw-bold">
                <i className="bi bi-mortarboard me-2"></i>
                Información académica
                </div>

                <div className="card-body">
                <div className="row mb-3">
                    <div className="col-5 text-muted">Código</div>

                    <div className="col-7">
                        {snapshot.student?.studentCode ?? "-"}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-5 text-muted">Nombre Completo</div>

                    <div className="col-7">
                        {snapshot.student?.name ?? "-"}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-5 text-muted">Institución</div>

                    <div className="col-7">
                        {snapshot.institution?.name ?? "-"}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-5 text-muted">Programa</div>

                    <div className="col-7">
                        {snapshot.academic?.program ?? "-"}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-5 text-muted">Facultad</div>

                    <div className="col-7">
                        {snapshot.academic?.faculty ?? "-"}
                    </div>
                </div>

                <div className="row">
                    <div className="col-5 text-muted">Modalidad</div>

                    <div className="col-7">
                        {snapshot.academic?.modality ?? "-"}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
