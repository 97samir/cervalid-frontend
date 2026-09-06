import { resendInvitation } from "../api/invitationsApi";
import { formatTranscriptDateTime } from "../../academic/transcript/utils/transcriptDateUtils";
import { getRoleLabel } from "@/shared/utils/roleUtils";

const InvitationsTable = ({
    invitations,
    refresh,
}) => {

    const getStatusInfo = (invitation) => {

        if (invitation.used) {
            return {
                label: "Aceptada",
                className: "bg-success-subtle text-success border border-success-subtle",
            };
        }

        const now = new Date();
        const expiration = new Date(invitation.expiresAt);

        if (expiration < now) {
            return {
                label: "Expirada",
                className: "bg-danger-subtle text-danger border border-danger-subtle",
            };
        }

        return {
            label: "Pendiente",
            className: "bg-warning-subtle text-warning-emphasis border border-warning-subtle",
        };
    };

    const handleResend = async (email) => {

        try {

            await resendInvitation(email);

            alert("Invitación reenviada correctamente");

            refresh?.();

        } catch (error) {

            console.error(error);

            alert("Error al reenviar la invitación");
        }
    };

    if (!invitations || invitations.length === 0) {

        return (
            <div className="card border-0 shadow-sm">

                <div className="card-body text-center py-5">

                    <div
                        className="d-flex align-items-center justify-content-center rounded-circle bg-light text-muted mx-auto mb-3"
                        style={{
                            width: "56px",
                            height: "56px",
                        }}
                    >
                        <i className="bi bi-envelope-open fs-4"></i>
                    </div>

                    <h6 className="fw-semibold mb-1">
                        No se encontraron invitaciones
                    </h6>

                    <p className="text-muted small mb-0">
                        No existen invitaciones que coincidan con los filtros.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm">

            <div className="card-body p-0">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">

                            <tr>

                                <th className="px-4 py-3">
                                    Correo
                                </th>

                                <th className="py-3">
                                    Rol
                                </th>

                                <th className="py-3">
                                    Estado
                                </th>

                                <th className="py-3">
                                    Expiración
                                </th>

                                <th
                                    className="py-3 text-end px-4"
                                    style={{
                                        minWidth: "150px",
                                    }}
                                >
                                    Acciones
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {invitations.map((invitation) => {

                                const status =
                                    getStatusInfo(invitation);

                                return (
                                    <tr
                                        key={
                                            invitation.publicId ??
                                            invitation.email
                                        }
                                    >

                                        {/* EMAIL */}

                                        <td className="px-4 py-3">

                                            <div className="d-flex align-items-center">

                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                                                    style={{
                                                        width: "38px",
                                                        height: "38px",
                                                    }}
                                                >
                                                    <i className="bi bi-envelope"></i>
                                                </div>

                                                <span className="fw-semibold text-break">
                                                    {invitation.email}
                                                </span>

                                            </div>

                                        </td>

                                        {/* ROL */}

                                        <td className="py-3">

                                            <span className="badge bg-light text-dark border">

                                                {getRoleLabel(
                                                    invitation.role
                                                )}

                                            </span>

                                        </td>

                                        {/* ESTADO */}

                                        <td className="py-3">

                                            <span
                                                className={`badge ${status.className}`}
                                            >
                                                {status.label}
                                            </span>

                                        </td>

                                        {/* EXPIRACIÓN */}

                                        <td className="py-3 text-nowrap">

                                            <i className="bi bi-calendar-event me-2 text-muted"></i>

                                            <span className="small">
                                                {formatTranscriptDateTime(
                                                    invitation.expiresAt
                                                )}
                                            </span>

                                        </td>

                                        {/* ACCIONES */}

                                        <td className="py-3 px-4 text-end">

                                            {status.label !== "Aceptada" && (

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() =>
                                                        handleResend(
                                                            invitation.email
                                                        )
                                                    }
                                                >

                                                    <i className="bi bi-arrow-repeat me-2"></i>

                                                    Reenviar

                                                </button>

                                            )}

                                            {status.label === "Aceptada" && (

                                                <span className="text-muted small">
                                                    Sin acciones
                                                </span>

                                            )}

                                        </td>

                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default InvitationsTable;