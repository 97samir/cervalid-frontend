import { useEffect, useState } from "react";
import { getInstitutionRequests, approveRequest, rejectRequest } from "../api/institutionRequestApi";
import { confirmAction, successAlert } from "@/core/utils/alerts";
import InstitutionRequestTable from "../components/InstitutionRequestTable";
import ApproveInstitutionModal from "../components/ApproveInstitutionModal";
import RejectInstitutionModal from "../components/RejectInstitutionModal";

const InstitutionRequestAdminPage = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(null);
    // paginación
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    //modal aprobación
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [approveLoading, setApproveLoading] = useState(false);

    // modal rechazo
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const fetchRequests = async () => { 
        try {
            setLoading(true);

            const params = {
                page,
                size: 10,
                status: filter || undefined
            };

            const data = await getInstitutionRequests(params);

            // Soporta Page o array
            setRequests(data.content || data);
            setTotalPages(data.totalPages || 1);

        } catch (err) {
            console.error("Error cargando solicitudes", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [filter, page]);

    // aprobación
    const handleApprove = async (id) => {

        setSelectedRequestId(id);
        setShowApproveModal(true);
    };
    const confirmApprove = async (walletAddress) => {

        try {

            setApproveLoading(true);

            await approveRequest(selectedRequestId, walletAddress);

            successAlert("Solicitud aprobada");
            setShowApproveModal(false);
            fetchRequests();

        } catch (err) {
            console.error(err);
            alert("Error al aprobar");

        } finally {
            setApproveLoading(false);
        }
    };

    // abrir modal rechazo
    const handleReject = (id) => {

        setSelectedRequestId(id);
        setShowRejectModal(true);
    };
    // confirmar rechazo
    const confirmReject = async (
        reason
    ) => {

        const confirmed =
            await confirmAction(
                "¿Desea rechazar la solicitud?"
            );

        if (!confirmed) return;

        try {

            setRejectLoading(true);

            await rejectRequest(selectedRequestId, reason);

            successAlert("Solicitud rechazada");
            setShowRejectModal(false);
            fetchRequests();

        } catch (err) {
            console.error(err);
            alert("Error al rechazar");

        } finally {
            setRejectLoading(false);
        }
    };

    return (

        <div className="container mt-4">

            <h3 className="mb-4">Solicitudes de instituciones</h3>

            <div className="mb-3 d-flex gap-2">

                <button
                    className={`btn ${filter === null ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => {
                        setFilter(null);
                        setPage(0);
                    }}
                >
                    Todos
                </button>

                <button
                    className={`btn ${filter === "PENDING" ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={() => {
                        setFilter("PENDING");
                        setPage(0);
                    }}
                >
                    Pendientes
                </button>

                <button
                    className={`btn ${filter === "APPROVED" ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => {
                        setFilter("APPROVED");
                        setPage(0);
                    }}
                >
                    Aprobados
                </button>

                <button
                    className={`btn ${filter === "REJECTED" ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={() => {
                        setFilter("REJECTED");
                        setPage(0);
                    }}
                >
                    Rechazados
                </button>

            </div>
            
            {/* TABLA */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <InstitutionRequestTable
                    requests={requests}
                    onApprove={handleApprove}
                    onReject={handleReject}
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

            {/* modal aprobación */}
            <ApproveInstitutionModal
                show={showApproveModal}
                onClose={() =>
                    setShowApproveModal(false)
                }
                onConfirm={confirmApprove}
                loading={approveLoading}
            />

            {/* modal rechazo */}
            <RejectInstitutionModal
                show={showRejectModal}
                onClose={() =>
                    setShowRejectModal(false)
                }
                onConfirm={confirmReject}
                loading={rejectLoading}
            />

        </div>  
    );
};

export default InstitutionRequestAdminPage;