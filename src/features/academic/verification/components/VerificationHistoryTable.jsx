import { Link } from "react-router-dom";
import VerificationStatusBadge from "./VerificationStatusBadge";

import {
    formatVerificationDate,
    getVerificationSourceLabel,
} from "../utils/verificationUtils";

export default function VerificationHistoryTable({
    records = [],

    loading = false,
    }) {
    if (loading) {
        return (
        <div className="card shadow-sm border-0">
            <div className="card-body text-center py-5">
            <div className="spinner-border" />
            </div>
        </div>
        );
    }

    if (records.length === 0) {
        return (
        <div className="card shadow-sm border-0">
            <div className="card-body text-center py-5">
            <i className="bi bi-clock-history" style={{ fontSize: "2rem" }} />

            <h5 className="mt-3">No existen verificaciones</h5>

            <p className="text-muted mb-0">
                Este certificado todavía no ha sido consultado.
            </p>
            </div>
        </div>
        );
    }

    return (
        <div className="card shadow-sm border-0">
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
            <thead>
                <tr>
                    <th style={{ width: "180px" }}>Fecha</th>
                    <th style={{ width: "130px" }}>Resultado</th>
                    <th>Motivo</th>
                    <th style={{ width: "170px" }}>Origen</th>
                    <th style={{ width: "170px" }}>IP</th>
                    <th className="text-end">Acción</th>
                </tr>
            </thead>

            <tbody>
                {records.map((record) => (
                    console.log("HISTORY RECORD:", record),
                <tr key={record.publicId}>
                    <td>{formatVerificationDate(record.verifiedAt)}</td>

                    <td>
                    <VerificationStatusBadge status={record.status} />
                    </td>

                    <td>
                    <div className="text-muted small">
                        {record.verificationReason}
                    </div>
                    </td>

                    <td>{getVerificationSourceLabel(record.verificationSource)}</td>

                    <td>
                    <code>{record.ip}</code>
                    </td>

                    <td className="text-end">
                    <Link
                        className="btn btn-sm btn-outline-primary"
                        to={`/institution/certificates/${record.certificatePublicId}`}
                    >
                        <i className="bi bi-file-earmark-text me-1" />
                        Certificado
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
