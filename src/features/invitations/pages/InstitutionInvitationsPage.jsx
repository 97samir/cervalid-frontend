import { useEffect, useState } from "react";
import { getInvitations } from "../api/invitationsApi";
import InvitationsTable from "../components/InvitationsTable";

const InstitutionInvitationsPage = () => {

    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(false);

    // paginación
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchInvitations = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                size: 10
            };

            const data = await getInvitations(params);

            // soporta page y array
            setInvitations(data.content || data);
            setTotalPages(data.totalPages || 1);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, [ page ]);

    return (
        <div className="container mt-4">
            <h3>Invitaciones enviadas</h3>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <InvitationsTable
                    invitations={invitations}
                    refresh={fetchInvitations}
                />
            )}
            
            {/* paginación */}
            <div className="d-flex justify-content-center mt-3 gap-2">

                <button
                    className="btn btn-outline-secondary"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>

                <span className="align-self-center">
                    Página {page + 1} de {totalPages}
                </span>

                <button
                    className="btn btn-outline-secondary"
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Siguiente
                </button>

            </div>

        </div>
    );
};

export default InstitutionInvitationsPage;