import { useEffect, useState } from "react";
import { getInvitations } from "../api/invitationsApi";
import InvitationsTable from "../components/InvitationsTable";
import InvitationsFilters from "../components/InvitationFilters";
import InvitationsPagination from "../components/InvitationsPagination";

const InstitutionInvitationsPage = () => {

    const [invitations, setInvitations] = useState([]);

    const [loading, setLoading] = useState(false);

    // filtros
    const [statusFilter, setStatusFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");

    // paginación
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const fetchInvitations = async () => {
        try {
        setLoading(true);

        const params = {
            page,
            size: 10,
            email: emailFilter || undefined,
            status: statusFilter || undefined,
        };

        const data = await getInvitations(params);

        console.log(">>> INVITATIONS RESPONSE:", data);

        setInvitations(data.content || data);

        setTotalPages(data.totalPages ?? 1);

        setTotalElements(
            data.totalElements ?? (data.content || data)?.length ?? 0,
        );
        } catch (error) {
        console.error("Error cargando invitaciones:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, [page, statusFilter, emailFilter]);

    const handleStatusChange = (status) => {
        setStatusFilter(status);
        setPage(0);
    };

    const handleEmailChange = (email) => {
        setEmailFilter(email);
        setPage(0);
    };

    const handleClearFilters = () => {
        setStatusFilter("");
        setEmailFilter("");
        setPage(0);
    };

    return (
        <div className="container-fluid px-4 py-0">
        
        {/* FILTROS */}

        <InvitationsFilters
            status={statusFilter}
            email={emailFilter}
            onStatusChange={handleStatusChange}
            onEmailChange={handleEmailChange}
            onClear={handleClearFilters}
        />

        {/* TABLA */}

        {loading ? (
            <div className="card border-0 shadow-sm">
            <div className="card-body py-5 text-center">
                <div className="spinner-border text-primary mb-3" role="status" />

                <p className="text-muted mb-0">Cargando invitaciones...</p>
            </div>
            </div>
        ) : (
            <InvitationsTable
            invitations={invitations}
            refresh={fetchInvitations}
            />
        )}

        {/* PAGINACIÓN */}

        <InvitationsPagination
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
        />
        </div>
    );
};

export default InstitutionInvitationsPage;
