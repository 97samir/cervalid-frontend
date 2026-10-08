import { Link } from "react-router-dom";

import VerificationStatusBadge from "./VerificationStatusBadge";

import {
    formatVerificationDate,
    //getVerificationHistoryPath,
    getVerificationResourcePath,
    getVerificationSourceLabel,
    getVerificationTypeLabel,
    getResourceTypeLabel,
} from "../utils/verificationUtils";

export default function VerificationHistoryTable({
    records = [],
    loading = false,
    }) {
    if (loading) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" role="status" />

            <p className="text-muted mt-3 mb-0">Cargando historial...</p>
            </div>
        </div>
        );
    }

    if (!records.length) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <i
                className="bi bi-search text-muted"
                style={{ fontSize: "2.5rem" }}
            />

            <h5 className="mt-3">No existen verificaciones</h5>

            <p className="text-muted mb-0">
                No se encontraron consultas para los filtros seleccionados.
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
                <th>Fecha</th>
                <th>Recurso</th>
                <th>Resultado</th>
                <th>Motivo</th>
                <th>Origen</th>
                <th>IP</th>
                <th className="text-end">Acción</th>
                </tr>
            </thead>

            <tbody>
                {records.map((record) => (
                    //o resourcePublicId
                <tr key={record.resourcePublicId}>
                    <td>
                    <span className="small">
                        {formatVerificationDate(record.verifiedAt)}
                    </span>
                    </td>

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
                    <VerificationStatusBadge status={record.status} />
                    </td>

                    <td>
                    <span className="small text-muted">
                        {record.verificationReason || "—"}
                    </span>
                    </td>

                    <td>
                    <span className="small">
                        {getVerificationSourceLabel(record.verificationSource)}
                    </span>
                    </td>

                    <td>
                    <span className="font-monospace small">
                        {record.ip || "—"}
                    </span>
                    </td>

                    <td className="text-end">
                    <div className="btn-group">
                        <Link
                        to={getVerificationResourcePath(record)}
                        className="btn btn-sm btn-outline-primary"
                        >
                        <i className="bi bi-eye me-1" />
                        Ver detalle
                        </Link>

                        {/* <Link
                            to={getVerificationHistoryPath(record)}
                            className="btn btn-sm btn-outline-secondary"
                            >
                            <i className="bi bi-clock-history me-1" />
                            Historial
                        </Link> */}
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
