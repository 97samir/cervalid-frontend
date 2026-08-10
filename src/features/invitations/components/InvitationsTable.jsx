import { resendInvitation } from "../api/invitationsApi";
import { formatTranscriptDateTime } from "../../academic/transcript/utils/transcriptDateUtils";

export default function InvitationsTable({ invitations, refresh }) {


    const getStatus = (inv) => {

        if (inv.used) {
            return "Aceptada";
        }

        const now = new Date();
        const exp = new Date(inv.expiresAt);

        if (exp < now) {
            return "Expirada";
        }

        return "Pendiente";
    };


    const getBadge = (status) => {

        switch (status) {

            case "Aceptada":
                return "success";

            case "Expirada":
                return "danger";

            default:
                return "warning";
        }
    };


    const handleResend = async (email) => {

        try {

            await resendInvitation(email);

            alert("Invitación reenviada correctamente");

            refresh && refresh();

        } catch (error) {

            console.error(error);

            alert("Error al reenviar la invitación");
        }
    };


    return (

        <div className="card border-0 shadow-sm">

            <div className="card-body p-0">

                <div className="table-responsive p-3">

                    <table className="table table-hover align-middle mb-0">
                        


                        <thead className="table-light">

                            <tr>

                                <th className="text-nowrap py-3">
                                    Email
                                </th>

                                <th className="text-nowrap py-3">
                                    Rol
                                </th>

                                <th className="text-nowrap py-3">
                                    Estado
                                </th>

                                <th className="text-nowrap py-3">
                                    Expiración
                                </th>

                                <th
                                    className="text-nowrap py-3"
                                    style={{ minWidth: "180px" }}
                                >
                                    Acciones
                                </th>

                            </tr>

                        </thead>



                        <tbody>

                            {invitations?.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center text-muted py-5"
                                    >
                                        No existen invitaciones registradas.
                                    </td>

                                </tr>

                            )}



                            {invitations?.map((inv) => {

                                const status = getStatus(inv);


                                return (

                                    <tr key={inv.publicId ?? inv.email}>


                                        <td className="fw-semibold text-nowrap py-3">

                                            <i className="bi bi-envelope me-2 text-primary"></i>

                                            {inv.email}

                                        </td>



                                        <td className="text-nowrap py-3">

                                            <span className="badge bg-light text-dark border">

                                                {inv.role}

                                            </span>

                                        </td>



                                        <td className="text-nowrap py-3">

                                            <span
                                                className={`badge bg-${getBadge(status)}-subtle 
                                                text-${getBadge(status)} border`}
                                            >

                                                {status}

                                            </span>

                                        </td>



                                        <td className="text-nowrap py-3">

                                            <i className="bi bi-calendar-event me-2 text-muted"></i>

                                            {formatTranscriptDateTime(inv.expiresAt)}

                                        </td>



                                        <td className="py-3">

                                            <div className="d-flex flex-wrap gap-2">

                                                {status !== "Aceptada" && (

                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            handleResend(inv.email)
                                                        }
                                                    >

                                                        <i className="bi bi-arrow-repeat me-2"></i>

                                                        Reenviar

                                                    </button>

                                                )}

                                            </div>

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
}