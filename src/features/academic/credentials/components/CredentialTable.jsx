import { Link } from "react-router-dom";

import CredentialStatusBadge from "./CredentialStatusBadge";
import CredentialTypeBadge from "./CredentialTypeBadge";

import { formatCredentialDate, formatCredentialDateTime } from "../utils/credentialUtils";

export default function CredentialTable({ 
    credentials = [] 
}) {

    if (credentials.length === 0) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <i
                className="bi bi-mortarboard"
                style={{
                fontSize: "3.5rem",
                color: "#ced4da",
                }}
            />

            <h5 className="mt-3">No existen grados o títulos registrados</h5>

            <p className="text-muted mb-0">
                Las credenciales académicas aparecerán aquí cuando sean registradas.
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
                <th>Número</th>
                <th>Tipo</th>
                <th>Grado o título</th>
                <th>Otorgado</th>
                <th>Emitido</th>
                <th>Estado</th>
                <th className="text-end" style={{ width: 120 }}>
                    Acción
                </th>
                </tr>
            </thead>

            <tbody>
                {credentials.map((credential) => {

                    console.log("CREDENTIAL:", credential);
                    console.log("ISSUED AT:", credential.issuedAt);

                    return (
                        <tr key={credential.publicId}>
                            <td>
                                <span className="fw-semibold">
                                    {credential.credentialNumber || "-"}
                                </span>
                            </td>

                            <td>
                                <CredentialTypeBadge type={credential.type} />
                            </td>

                            <td>
                                <div
                                    className="fw-semibold"
                                    title={credential.title}
                                >
                                    {credential.title}
                                </div>

                                {credential.description && (
                                    <small className="text-muted">
                                        {credential.description}
                                    </small>
                                )}
                            </td>

                            <td>
                                <span className="text-muted">
                                    {formatCredentialDate(credential.awardedAt)}
                                </span>
                            </td>

                            <td>
                                <span className="text-muted">
                                    {credential.issuedAt
                                        ? formatCredentialDateTime(credential.issuedAt)
                                        : "-"}
                                </span>
                            </td>

                            <td>
                                <CredentialStatusBadge
                                    status={credential.status}
                                />
                            </td>

                            <td className="text-end">
                                <Link
                                    to={`/institution/credentials/${credential.publicId}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    <i className="bi bi-eye me-1"></i>
                                    Detalle
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
        </div>
    );
}
