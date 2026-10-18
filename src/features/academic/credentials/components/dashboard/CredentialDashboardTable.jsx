import { Link } from "react-router-dom";

import { formatDateTime } from "@/shared/utils/dateUtils";

const typeLabels = {
    BACHELOR_DEGREE: "Grado de bachiller",
    PROFESSIONAL_TITLE: "Título profesional",
    MASTER_DEGREE: "Maestría",
    DOCTORATE: "Doctorado",
};

const statusLabels = {
    DRAFT: "Borrador",
    ISSUED: "Emitida",
    REVOKED: "Revocada",
};

const statusClasses = {
    DRAFT: "text-bg-warning",
    ISSUED: "text-bg-success",
    REVOKED: "text-bg-danger",
};

export default function CredentialDashboardTable({
    credentials = [],
    loading = false,
    error = false,
}) {
    if (loading && credentials.length === 0) {
        return (
        <div className="card">
            <div className="card-body py-5 text-center">
            <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-secondary mb-0">Cargando credenciales...</p>
            </div>
        </div>
        );
    }

    if (error && credentials.length === 0) {
        return (
        <div className="alert alert-danger mb-0" role="alert">
            No se pudieron cargar las credenciales. Intenta nuevamente.
        </div>
        );
    }

    if (credentials.length === 0) {
        return (
        <div className="card">
            <div className="card-body py-5 text-center">
            <i className="bi bi-inbox fs-1 text-secondary" aria-hidden="true" />
            <h3 className="h6 mt-3">No hay credenciales para mostrar</h3>
            <p className="text-secondary mb-0">
                Prueba cambiando los filtros de búsqueda.
            </p>
            </div>
        </div>
        );
    }

    return (
        <div className="card credential-dashboard-table-card">
        {loading && (
            <div className="progress credential-dashboard-progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated w-100" />
            </div>
        )}

        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
                <tr>
                <th scope="col">Credencial</th>
                <th scope="col">Estudiante</th>
                <th scope="col">Programa</th>
                <th scope="col">Título</th>
                <th scope="col">Fecha de emisión</th>
                <th scope="col">Estado</th>
                <th scope="col" className="text-end">
                    Acción
                </th>
                </tr>
            </thead>

            <tbody>
                {credentials.map((credential) => (
                <tr key={credential.publicId}>
                    <td>
                    <div className="fw-semibold">
                        {credential.credentialNumber || "—"}
                    </div>
                    <div className="small text-secondary">
                        {typeLabels[credential.type] || credential.type || "—"}
                    </div>
                    </td>

                    <td>
                    <div className="fw-medium">
                        {credential.studentName || "—"}
                    </div>
                    <div className="small text-secondary">
                        {credential.studentCode || "Sin código"}
                    </div>
                    </td>

                    <td>
                    <div>{credential.program || "—"}</div>
                    {credential.faculty && (
                        <div className="small text-secondary">
                        {credential.faculty}
                        </div>
                    )}
                    </td>

                    <td>{credential.title || "—"}</td>

                    <td>{formatDateTime(credential.issuedAt || "—")}</td>

                    <td>
                    <span
                        className={`badge ${statusClasses[credential.status] || "text-bg-secondary"}`}
                    >
                        {statusLabels[credential.status] ||
                        credential.status ||
                        "Desconocido"}
                    </span>
                    </td>

                    <td className="text-end">
                    <Link
                        to={`/institution/credentials/${credential.publicId}`}
                        className="btn btn-sm btn-outline-primary"
                        aria-label={`Ver credencial ${credential.credentialNumber || ""}`}
                    >
                        <i className="bi bi-eye me-sm-1" aria-hidden="true" />
                        <span className="d-none d-sm-inline">Ver detalle</span>
                    </Link>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}
