import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useVerificationHistory } from "../hooks/useVerificationHistory";

import VerificationHistoryFilters from "../components/VerificationHistoryFilters";
import VerificationHistoryTable from "../components/VerificationHistoryTable";
import VerificationHistoryPagination from "../components/VerificationHistoryPagination";

export default function CertificateVerificationHistoryPage() {

    const { certificatePublicId } = useParams();
    const [page, setPage] = useState(0);
    const size = 10;

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        type: "",
        fromDate: "",
        toDate: "",
    });

    const { data, isLoading, isFetching, error } = useVerificationHistory(
        certificatePublicId,
        page,
        size,
        filters,
    );

    if (isLoading) {
        return (
        <div className="container-fluid">
            <div className="text-center py-5">
            <div className="spinner-border" />
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="container-fluid">
            <div className="alert alert-danger">
            No se pudo cargar el historial del certificado.
            </div>
        </div>
        );
    }

    const handleFilter = (nextFilters) => {
        setPage(0);
        setFilters(nextFilters);
    };

    const handlePrevious = () => {
        setPage((currentPage) => Math.max(0, currentPage - 1));
    };

    const handleNext = () => {
        if (!data?.last) {
        setPage((currentPage) => currentPage + 1);
        }
    };

    return (
        <div className="container-fluid">
        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
            <h2 className="fw-bold mb-1">Historial del certificado</h2>

            <p className="text-muted mb-0">
                Registro completo de todas las verificaciones realizadas sobre este
                certificado.
            </p>
            </div>

            <Link
            className="btn btn-outline-secondary"
            to="/institution/verification"
            >
            <i className="bi bi-arrow-left me-2" />
            Volver
            </Link>
        </div>

        {/* FILTROS */}

        <VerificationHistoryFilters filters={filters} onFilter={handleFilter} />

        {/* TABLA */}

        <VerificationHistoryTable
            records={data?.content ?? []}
            loading={isFetching}
        />

        {/* PAGINACIÓN */}

        <VerificationHistoryPagination
            data={data}
            isFetching={isFetching}
            onPrevious={handlePrevious}
            onNext={handleNext}
        />
        </div>
    );
}
