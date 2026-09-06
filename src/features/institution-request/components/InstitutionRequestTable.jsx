import { institutionRequestStatusLabels } from "@/shared/utils/enumUtils";

const InstitutionRequestTable = ({ 
    requests, 
    onApprove, 
    onReject 
}) => {
    const getBadgeClass = (status) => {
        switch (status) {
        case "PENDING":
            return "bg-warning-subtle text-warning-emphasis";

        case "APPROVED":
            return "bg-success-subtle text-success-emphasis";

        case "REJECTED":
            return "bg-danger-subtle text-danger-emphasis";

        default:
            return "bg-secondary-subtle text-secondary-emphasis";
        }
    };

    if (!requests || requests.length === 0) {
        return (
        <div className="text-center py-5">
            <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-light mx-auto mb-3"
            style={{
                width: "64px",
                height: "64px",
            }}
            >
            <i className="bi bi-inbox fs-3 text-muted"></i>
            </div>

            <h6 className="fw-semibold mb-1">No hay solicitudes</h6>

            <p className="text-muted small mb-0">
            No existen solicitudes que coincidan con el filtro seleccionado.
            </p>
        </div>
        );
    }

    return (
        <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
            <tr>
                <th className="px-3 py-3">Institución</th>

                <th className="px-3 py-3">RUC</th>

                <th className="px-3 py-3">Solicitante</th>

                <th className="px-3 py-3">Contacto</th>

                <th className="px-3 py-3">Documento</th>

                <th className="px-3 py-3 text-center">Estado</th>

                <th className="px-3 py-3 text-end">Acciones</th>
            </tr>
            </thead>

            <tbody>
            {requests.map((req) => (
                <tr key={req.id}>
                {/* INSTITUCIÓN */}

                <td className="px-3 py-3">
                    <div className="fw-semibold">{req.institutionName}</div>

                    <small className="text-muted">Solicitud #{req.id}</small>
                </td>

                {/* RUC */}

                <td className="px-3 py-3">
                    <span className="text-nowrap">{req.ruc || "-"}</span>
                </td>

                {/* SOLICITANTE */}

                <td className="px-3 py-3">
                    <div className="fw-semibold">
                    {req.name} {req.lastName}
                    </div>

                    <small className="text-muted">{req.document || "-"}</small>
                </td>

                {/* CONTACTO */}

                <td className="px-3 py-3">
                    <div className="text-break">{req.contactEmail}</div>

                    {req.phone && <small className="text-muted">{req.phone}</small>}
                </td>

                {/* DOCUMENTO */}

                <td className="px-3 py-3">
                    {req.documentAcreditationUrl ? (
                    <a
                        href={req.documentAcreditationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                    >
                        <i className="bi bi-file-earmark-text me-1"></i>
                        Ver documento
                    </a>
                    ) : (
                    <span className="text-muted small">No disponible</span>
                    )}
                </td>

                {/* ESTADO */}

                <td className="px-3 py-3 text-center">
                    <span
                    className={`badge rounded-pill px-3 py-2 ${getBadgeClass(
                        req.status,
                    )}`}
                    >
                    {institutionRequestStatusLabels?.[req.status] || req.status}
                    </span>
                </td>

                {/* ACCIONES */}

                <td className="px-3 py-3 text-end">
                    {req.status === "PENDING" ? (
                    <div className="d-flex justify-content-end gap-2">
                        <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={() => onApprove(req.id)}
                        >
                        <i className="bi bi-check-lg me-1"></i>
                        Aprobar
                        </button>

                        <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onReject(req.id)}
                        >
                        <i className="bi bi-x-lg me-1"></i>
                        Rechazar
                        </button>
                    </div>
                    ) : (
                    <span className="text-muted small">Sin acciones</span>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default InstitutionRequestTable;
