import { useEffect, useState } from "react";

import {
    getInstitutionRequests,
    approveRequest,
    rejectRequest,
} from "../api/institutionRequestApi";

import { confirmAction, successAlert } from "@/core/utils/alerts";
import InstitutionRequestTable from "../components/InstitutionRequestTable";
import ApproveInstitutionModal from "../components/ApproveInstitutionModal";
import RejectInstitutionModal from "../components/RejectInstitutionModal";

const InstitutionRequestAdminPage = () => {
    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState(null);

    // PAGINACIÓN

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // APROBACIÓN

    const [showApproveModal, setShowApproveModal] = useState(false);

    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const [approveLoading, setApproveLoading] = useState(false);

    // RECHAZO

    const [showRejectModal, setShowRejectModal] = useState(false);

    const [rejectLoading, setRejectLoading] = useState(false);

    // =========================================================
    // OBTENER SOLICITUDES
    // =========================================================

    const fetchRequests = async () => {
        try {
        setLoading(true);

        const params = {
            page,
            size: 10,
            status: filter || undefined,
        };

        const data = await getInstitutionRequests(params);

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

    // =========================================================
    // APROBAR
    // =========================================================

    const handleApprove = (id) => {
        setSelectedRequestId(id);

        setShowApproveModal(true);
    };

    const confirmApprove = async (walletAddress) => {
        try {
        setApproveLoading(true);

        await approveRequest(selectedRequestId, walletAddress);

        successAlert("Solicitud aprobada correctamente");

        setShowApproveModal(false);

        fetchRequests();
        } catch (err) {
        console.error(err);

        alert("Error al aprobar la solicitud");
        } finally {
        setApproveLoading(false);
        }
    };

    // =========================================================
    // RECHAZAR
    // =========================================================

    const handleReject = (id) => {
        setSelectedRequestId(id);

        setShowRejectModal(true);
    };

    const confirmReject = async (reason) => {
        const confirmed = await confirmAction("¿Desea rechazar la solicitud?");

        if (!confirmed) return;

        try {
        setRejectLoading(true);

        await rejectRequest(selectedRequestId, reason);

        successAlert("Solicitud rechazada correctamente");

        setShowRejectModal(false);

        fetchRequests();
        } catch (err) {
        console.error(err);

        alert("Error al rechazar la solicitud");
        } finally {
        setRejectLoading(false);
        }
    };

    // RENDER
    return (
        <div className="container-fluid px-3 px-md-4 py-0">
        {/*  HEADER

                <div className="mb-4">

                    <h2 className="fw-bold mb-1">
                        Solicitudes de instituciones
                    </h2>

                    <p className="text-muted mb-0">
                        Revisa y gestiona las solicitudes de
                        registro de nuevas instituciones.
                    </p>

                </div>
                */}

        {/* =================================================
                    FILTROS
                ================================================== */}

        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                <div>
                <i className="bi bi-funnel me-2 text-primary"></i>
                <span className="fw-semibold">Filtrar por estado</span>
                </div>

                <div
                className="btn-group"
                role="group"
                aria-label="Filtrar solicitudes"
                >
                {/* TODAS */}

                <button
                    type="button"
                    className={`btn ${
                    filter === null ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => {
                    setFilter(null);
                    setPage(0);
                    }}
                >
                    Todas
                </button>

                {/* PENDIENTES */}

                <button
                    type="button"
                    className={`btn ${
                    filter === "PENDING" ? "btn-warning" : "btn-outline-warning"
                    }`}
                    onClick={() => {
                    setFilter("PENDING");
                    setPage(0);
                    }}
                >
                    Pendientes
                </button>

                {/* APROBADAS */}

                <button
                    type="button"
                    className={`btn ${
                    filter === "APPROVED" ? "btn-success" : "btn-outline-success"
                    }`}
                    onClick={() => {
                    setFilter("APPROVED");
                    setPage(0);
                    }}
                >
                    Aprobadas
                </button>

                {/* RECHAZADAS */}

                <button
                    type="button"
                    className={`btn ${
                    filter === "REJECTED" ? "btn-danger" : "btn-outline-danger"
                    }`}
                    onClick={() => {
                    setFilter("REJECTED");
                    setPage(0);
                    }}
                >
                    Rechazadas
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* =================================================
                    TABLA
                ================================================== */}

        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 p-4">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                <h5 className="fw-bold mb-1">Solicitudes</h5>

                <p className="text-muted small mb-0">
                    Solicitudes registradas en Cervalid.
                </p>
                </div>

                <span className="badge bg-primary-subtle text-primary px-3 py-2">
                {requests.length} en esta página
                </span>
            </div>
            </div>

            <div className="card-body p-0">
            {loading ? (
                <div className="text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>

                <p className="text-muted mb-0">Cargando solicitudes...</p>
                </div>
            ) : (
                <InstitutionRequestTable
                requests={requests}
                onApprove={handleApprove}
                onReject={handleReject}
                />
            )}
            </div>

            {/* PAGINACIÓN */}

            {!loading && totalPages > 1 && (
            <div className="card-footer bg-white border-0 p-4">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                <small className="text-muted">
                    Página {page + 1} de {totalPages}
                </small>

                <div className="d-flex gap-2">
                    <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                    >
                    <i className="bi bi-chevron-left me-1"></i>
                    Anterior
                    </button>

                    <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage(page + 1)}
                    >
                    Siguiente
                    <i className="bi bi-chevron-right ms-1"></i>
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>

        {/* MODAL APROBACIÓN */}

        <ApproveInstitutionModal
            show={showApproveModal}
            onClose={() => setShowApproveModal(false)}
            onConfirm={confirmApprove}
            loading={approveLoading}
        />

        {/*  MODAL RECHAZO */}

        <RejectInstitutionModal
            show={showRejectModal}
            onClose={() => setShowRejectModal(false)}
            onConfirm={confirmReject}
            loading={rejectLoading}
        />
        </div>
    );
};

export default InstitutionRequestAdminPage;
