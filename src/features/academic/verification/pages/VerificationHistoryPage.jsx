import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useVerificationHistory } from "../hooks/useVerificationHistory";

import VerificationHistoryFilters from "../components/VerificationHistoryFilters";
import VerificationHistoryTable from "../components/VerificationHistoryTable";
import VerificationHistoryPagination from "../components/VerificationHistoryPagination";

export default function VerificationHistoryPage() {

    const { verificationType, resourcePublicId } = useParams();
    const isCredential = verificationType === "credential";
    const resourceLabel = isCredential ? "credencial" : "certificado";
    const resourceLabelCapitalized = isCredential ? "Credencial" : "Certificado";
    const [page, setPage] = useState(0);
    const size = 10;

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        verificationType: verificationType?.toUpperCase() ?? "",
        resourcePublicId,
        fromDate: "",
        toDate: "",
    });

    const { data, isLoading, isFetching, error } = useVerificationHistory(
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
            No se pudo cargar el historial de la {resourceLabel}.
            </div>
        </div>
        );
    }

    const handleFilter = (nextFilters) => {
        setPage(0);

        setFilters({
        ...nextFilters,
        verificationType: verificationType?.toUpperCase() ?? "",
        resourcePublicId,
        });
    };

    const handlePrevious = () => {
        setPage((currentPage) => Math.max(0, currentPage - 1));
    };

    const handleNext = () => {
        if (!data?.last) {
        setPage((currentPage) => currentPage + 1);
        }
    };

    const backPath = isCredential
        ? `/institution/credentials/${resourcePublicId}`
        : `/institution/certificates/${resourcePublicId}`;

    return (
        <div className="container-fluid">
        {/* HEADER */}

        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
            <div>
            <h2 className="fw-bold mb-1">Historial de verificaciones</h2>

            <p className="text-muted mb-0">
                Registro completo de las verificaciones realizadas sobre esta{" "}
                {resourceLabel}.
            </p>
            </div>

            {/* <Link className="btn btn-outline-secondary" to={backPath}>
                <i className="bi bi-arrow-left me-2" />
                Volver a {resourceLabelCapitalized.toLowerCase()}
            </Link> */}

            <Link to={-1} className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
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
