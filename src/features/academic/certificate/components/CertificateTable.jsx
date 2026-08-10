import { Link } from "react-router-dom";
import CertificateStatusBadge from "./CertificateStatusBadge";
import CertificateTypeBadge from "./CertificateTypeBadge";

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
                Los certificados aparecerán automáticamente cuando un transcript sea
                emitido.
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
                    <th>Estado</th>
                    <th>Fecha emisión</th>
                    <th style={{ width: 140 }}>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {certificates.map((certificate) => (
                <tr key={certificate.publicId}>
                    <td className="fw-semibold">{certificate.certificateNumber}</td>

                    <td>
                    <CertificateTypeBadge type={certificate.type} />
                    </td>

                    <td>
                    <CertificateStatusBadge status={certificate.status} />
                    </td>

                    <td>
                    {certificate.issuedAt
                        ? new Date(certificate.issuedAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
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
