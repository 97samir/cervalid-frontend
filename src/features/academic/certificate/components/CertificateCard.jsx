import { Link } from "react-router-dom";

import { useCertificates } from "../hooks/useCertificates";

import CertificateStatusBadge from "./CertificateStatusBadge";
import CertificateTypeBadge from "./CertificateTypeBadge";

import { formatDateTime } from "@/shared/utils/dateUtils";

export default function CertificateCard({ studentPublicId }) {
    
    const {
        data: certificates = [],
        isLoading,
        error,
    } = useCertificates(studentPublicId);

    if (isLoading) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" />
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger">
            No fue posible cargar los certificados.
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
            {/* =================================================
                        HEADER
                    ================================================== */}

            <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
                <h5 className="fw-bold mb-1">
                <i className="bi bi-patch-check-fill text-success me-2"></i>
                Certificados
                </h5>

                <p className="text-muted mb-0">
                {certificates.length > 0 ? (
                    <>
                    {certificates.length} certificado
                    {certificates.length !== 1 ? "s" : ""} disponible
                    {certificates.length !== 1 ? "s" : ""}.
                    </>
                ) : (
                    "Aún no existen certificados disponibles."
                )}
                </p>
            </div>

            {certificates.length > 0 && (
                <Link
                to={`/institution/students/${studentPublicId}/certificates`}
                className="btn btn-outline-primary btn-sm"
                >
                Ver todos
                </Link>
            )}
            </div>

            {/* =================================================
                        EMPTY
                    ================================================== */}

            {certificates.length === 0 && (
            <div className="text-center py-5">
                <i
                className="bi bi-patch-check"
                style={{
                    fontSize: "3rem",
                    color: "#c8c8c8",
                }}
                />

                <h6 className="mt-3">No existen certificados emitidos</h6>

                <p className="text-muted mb-0">
                Los certificados estarán disponibles cuando un historial académico
                finalizado sea emitido.
                </p>
            </div>
            )}

            {/* =================================================
                        TABLA
                    ================================================== */}

            {certificates.length > 0 && (
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                <thead className="table-light">
                    <tr>
                    <th>Número</th>

                    <th>Tipo</th>

                    <th>Credencial</th>

                    <th>Estado</th>

                    <th>Emitido</th>

                    <th
                        style={{
                        width: 120,
                        }}
                    ></th>
                    </tr>
                </thead>

                <tbody>
                    {certificates.slice(0, 3).map((certificate) => (
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
                        <span className="fw-semibold" title={certificate.title}>
                            {certificate.title}
                        </span>
                        </td>

                        {/* ESTADO */}

                        <td>
                        <CertificateStatusBadge status={certificate.status} />
                        </td>

                        {/* FECHA DE EMISIÓN */}

                        <td>
                        <span className="text-muted">
                            {formatDateTime(certificate.issuedAt)}
                        </span>
                        </td>

                        {/* ACCIÓN */}

                        <td className="text-end">
                        <Link
                            to={`/institution/certificates/${certificate.publicId}`}
                            className="btn btn-outline-secondary btn-sm"
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
            )}
        </div>
        </div>
    );
}
