import { Link } from "react-router-dom";

import CertificateStatusBadge from "./CertificateStatusBadge";
import CertificateTypeBadge from "./CertificateTypeBadge";

//import { certificateTypeLabels } from "@/shared/utils/enumUtils";

import { formatLocalDate, formatDateTime } from "@/shared/utils/dateUtils";

export default function CertificateTable({ certificates = [] }) {
    if (certificates.length === 0) {
        return (
        <div className="card shadow-sm border-0">
            <div className="card-body text-center py-5">
            <i
                className="bi bi-patch-check"
                style={{
                fontSize: "3.5rem",
                color: "#ced4da",
                }}
            />

            <h5 className="mt-3">No existen certificados emitidos</h5>

            <p className="text-muted mb-0">
                Los certificados aparecerán automáticamente cuando un historial
                académico sea emitido.
            </p>
            </div>
        </div>
        );
    }

    return (
        <div className="card shadow-sm border-0">
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
                <tr>
                <th>Número</th>

                <th>Tipo</th>

                <th>Credencial</th>

                <th>Otorgado</th>

                <th>Emitido</th>

                <th>Estado</th>

                <th
                    className="text-end"
                    style={{
                    width: 120,
                    }}
                >
                    Acciones
                </th>
                </tr>
            </thead>

            <tbody>
                {certificates.map((certificate) => (
                <tr key={certificate.publicId}>
                    {/* NÚMERO */}

                    <td>
                    <span className="fw-semibold">
                        {certificate.certificateNumber}
                    </span>
                    </td>

                    {/* TIPO */}

                    <td>
                    <CertificateTypeBadge type={certificate.type} />
                    </td>

                    {/* TÍTULO */}

                    <td>
                    <div className="fw-semibold" title={certificate.title}>
                        {certificate.title}
                    </div>
                    </td>

                    {/* FECHA DE OTORGAMIENTO */}

                    <td>
                    <span className="text-muted">
                        {formatLocalDate(certificate.awardedAt)}
                    </span>
                    </td>

                    {/* FECHA DE EMISIÓN */}

                    <td>
                    <span className="text-muted">
                        {formatDateTime(certificate.issuedAt)}
                    </span>
                    </td>

                    {/* ESTADO */}

                    <td>
                    <CertificateStatusBadge status={certificate.status} />
                    </td>

                    {/* ACCIONES */}

                    <td className="text-end">
                    <Link
                        to={`/institution/certificates/${certificate.publicId}`}
                        className="btn btn-outline-primary btn-sm"
                    >
                        <i className="bi bi-eye me-1"></i>
                        Detalle
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
