import { Link } from "react-router-dom";

import { formatDateTime } from "@/shared/utils/dateUtils";

const statusLabels = {
    DRAFT: "Borrador",
    ISSUED: "Emitido",
    VERIFIED: "Verificado",
    REVOKED: "Revocado",
};

const statusClasses = {
    DRAFT: "text-bg-warning",
    ISSUED: "text-bg-success",
    VERIFIED: "text-bg-primary",
    REVOKED: "text-bg-danger",
};

export default function CertificateDashboardTable({
    certificates,
    loading,
    error,
}) {
    if (loading && certificates.length === 0) {
        return (
        <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Cargando</span>
            </div>
            <p className="text-muted mb-0">Cargando certificados...</p>
            </div>
        </div>
        );
    }

    if (error && certificates.length === 0) {
        return (
        <div className="alert alert-danger" role="alert">
            No se pudo cargar el listado de certificados. Verifica tu conexión e
            inténtalo nuevamente.
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom py-3">
            <h5 className="mb-0">Certificados</h5>
        </div>

        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
                <tr>
                <th scope="col">Certificado</th>
                <th scope="col">Estudiante</th>
                <th scope="col">Programa académico</th>
                <th scope="col">Tipo</th>
                <th scope="col">Fecha de emisión</th>
                <th scope="col">Estado</th>
                <th scope="col" className="text-end">Acción</th>
                </tr>
            </thead>

            <tbody>
                {certificates.length === 0 ? (
                <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                    <i className="bi bi-award fs-3 d-block mb-2" />
                    No se encontraron certificados.
                    </td>
                </tr>
                ) : (
                certificates.map((certificate) => (
                    <tr key={certificate.publicId}>
                    <td>
                        <div className="fw-semibold">
                        {certificate.title || "Sin título"}
                        </div>
                        <small className="text-muted">
                        {certificate.certificateNumber || "Sin número"}
                        </small>
                    </td>

                    <td>
                        <div>{certificate.studentName || "—"}</div>
                        <small className="text-muted">
                        {certificate.studentCode || "Sin código"}
                        </small>
                    </td>

                    <td>{certificate.program || "—"}</td>

                    <td>{certificate.type || "—"}</td>

                    <td>{formatDateTime(certificate.issuedAt)}</td>

                    <td>
                        <span
                        className={`badge ${
                            statusClasses[certificate.status] || "text-bg-secondary"
                        }`}
                        >
                        {statusLabels[certificate.status] ||
                            certificate.status ||
                            "Sin estado"}
                        </span>
                    </td>

                    <td className="text-end">
                        <Link
                            to={`/institution/certificates/${certificate.publicId}`}
                            className="btn btn-sm btn-outline-primary"
                            aria-label={`Ver certificado ${certificate.certificateNumber || ""}`}
                        >
                            <i className="bi bi-eye me-sm-1" aria-hidden="true" />
                            <span className="d-none d-sm-inline">Ver detalle</span>
                        </Link>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>

        {loading && certificates.length > 0 && (
            <div className="px-3 py-2 border-top small text-muted">
            Actualizando resultados...
            </div>
        )}
        </div>
    );
}
