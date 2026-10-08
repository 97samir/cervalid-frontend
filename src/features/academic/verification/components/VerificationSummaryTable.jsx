import { Link } from "react-router-dom";

import VerificationStatusBadge from "./VerificationStatusBadge";

import {
    formatVerificationDate,
    getResourceTypeLabel,
    getVerificationResourcePath,
    getVerificationHistoryPath,
    getVerificationTypeLabel,
} from "../utils/verificationUtils";

export default function VerificationSummaryTable({
    records = [],
    loading = false,
}) {
    if (loading) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" />
            </div>
        </div>
        );
    }

    if (!records.length) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <i className="bi bi-search text-muted" style={{ fontSize: "2rem" }} />

            <h5 className="mt-3">No existen recursos verificados</h5>

            <p className="text-muted mb-0">
                No se encontraron resultados para los filtros seleccionados.
            </p>
            </div>
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm rounded-4">
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
                <tr>
                <th style={{ width: "28%" }}>Recurso</th>

                <th>Propietario</th>

                <th className="text-center">Consultas</th>

                <th>Última consulta</th>

                <th>Resultado</th>

                <th className="text-end">Acciones</th>
                </tr>
            </thead>

            <tbody>
                {records.map((record) => (
                <tr key={record.resourcePublicId}>
                    <td>
                    <div className="fw-semibold">
                        {record.resourceNumber || "—"}
                    </div>

                    <div className="small text-muted">
                        {getVerificationTypeLabel(record.verificationType)}
                    </div>

                    <div className="small text-muted">
                        {getResourceTypeLabel(
                        record.verificationType,
                        record.resourceType,
                        )}
                    </div>
                    </td>

                    <td>
                    <div>{record.studentName || "—"}</div>

                    <div className="small text-muted">
                        {record.institutionName || "—"}
                    </div>
                    </td>

                    <td className="text-center">
                    <span className="badge rounded-pill text-bg-primary fs-6">
                        {record.verificationCount ?? 0}
                    </span>
                    </td>

                    <td>{formatVerificationDate(record.lastVerifiedAt)}</td>

                    <td>
                    {record.lastStatus ? (
                        <VerificationStatusBadge status={record.lastStatus} />
                    ) : (
                        <span className="badge text-bg-secondary">
                        Sin verificaciones
                        </span>
                    )}
                    </td>

                    <td className="text-end">
                    <div className="btn-group">
                        <Link
                        className="btn btn-sm btn-outline-primary"
                        to={getVerificationResourcePath(record)}
                        >
                        <i className="bi bi-eye me-1" />
                        Detalle
                        </Link>

                        <Link
                        className="btn btn-sm btn-outline-secondary"
                        to={getVerificationHistoryPath(record)}
                        >
                        <i className="bi bi-clock-history me-1" />
                        Historial
                        </Link>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}
