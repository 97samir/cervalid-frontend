import { Link } from "react-router-dom";

import { useStudentCredentials } from "../hooks/useStudentCredentials";

import CredentialStatusBadge from "./CredentialStatusBadge";
import CredentialTypeBadge from "./CredentialTypeBadge";

import { formatCredentialDate } from "../utils/credentialUtils";

export default function CredentialCard({ 
    studentPublicId 
}) {
    const {
        data: credentials = [],
        isLoading,
        error,
    } = useStudentCredentials(studentPublicId);

    // ordenar tabla - mas recien primero
    const sortedCredentials = [...credentials].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

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
            No fue posible cargar los grados y títulos.
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
                <h5 className="fw-bold mb-1">
                <i className="bi bi-mortarboard-fill text-primary me-2"></i>
                Grados y títulos
                </h5>

                <p className="text-muted mb-0">
                {credentials.length > 0 ? (
                    <>
                    {credentials.length}{" "}
                    {credentials.length === 1
                        ? "credencial registrada"
                        : "credenciales registradas"}
                    .
                    </>
                ) : (
                    "Aún no existen grados o títulos registrados."
                )}
                </p>
            </div>

            {credentials.length > 0 && (
                <Link
                to={`/institution/students/${studentPublicId}/credentials`}
                className="btn btn-outline-primary btn-sm"
                >
                Ver todos
                </Link>
            )}
            </div>

            {/* EMPTY */}

            {credentials.length === 0 && (
            <div className="text-center py-2">
                <i className="bi bi-mortarboard"
                    style={{
                        fontSize: "3rem",
                        color: "#c8c8c8",
                    }}
                />

                <h6 className="mt-3">No existen grados o títulos registrados</h6>

                <p className="text-muted mb-0">
                Las credenciales académicas aparecerán aquí cuando sean
                registradas para el estudiante.
                </p>

                <Link
                    to={`/institution/students/${studentPublicId}/credentials/create`}
                    className="btn btn-primary mt-3"
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Nueva credencial
                </Link>
            </div>
            )}

            {/* TABLE */}

            {credentials.length > 0 && (
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                <thead className="table-light">
                    <tr>
                    <th>Número</th>

                    <th>Tipo</th>

                    <th>Grado o título</th>

                    <th>Estado</th>

                    <th>Otorgado</th>

                    <th className="text-end" style={{ width: 110 }}></th>
                    </tr>
                </thead>

                <tbody>
                    {sortedCredentials.slice(0, 3).map((credential) => (
                    <tr key={credential.publicId}>
                        <td>
                        <span className="fw-semibold">
                            {credential.credentialNumber}
                        </span>
                        </td>

                        <td>
                        <CredentialTypeBadge type={credential.type} />
                        </td>

                        <td>
                        <span className="fw-semibold" title={credential.title}>
                            {credential.title}
                        </span>
                        </td>

                        <td>
                        <CredentialStatusBadge status={credential.status} />
                        </td>

                        <td>
                        <span className="text-muted">
                            {formatCredentialDate(credential.awardedAt)}
                        </span>
                        </td>

                        <td className="text-end">
                        <Link
                            to={`/institution/credentials/${credential.publicId}`}
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
