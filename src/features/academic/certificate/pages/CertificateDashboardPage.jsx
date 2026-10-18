import { useState } from "react";

import { useCertificateDashboardSummary } from "../hooks/useCertificateDashboardSummary";
import { useCertificateDashboardList } from "../hooks/useCertificateDashboardList";

import CertificateDashboardCards from "../components/dashboard/CertificateDashboardCards";
import CertificateDashboardFilters from "../components/dashboard/CertificateDashboardFilters";
import CertificateDashboardTable from "../components/dashboard/CertificateDashboardTable";
import CertificateDashboardPagination from "../components/dashboard/CertificateDashboardPagination";

import "../styles/certificateDashboardPage.css";

const initialFilters = {
    certificateNumber: "",
    studentCode: "",
    program: "",
    type: "",
    status: "",
    fromDate: "",
    toDate: "",
};

export default function CertificateDashboardPage() {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [draftFilters, setDraftFilters] = useState(initialFilters);
    const [filters, setFilters] = useState(initialFilters);

    const summaryQuery = useCertificateDashboardSummary();

    const listQuery = useCertificateDashboardList({
        page,
        size,
        filters,
    });

    const handleSearch = () => {
        setPage(0);
        setFilters({ ...draftFilters });
    };

    const handleClear = () => {
        setDraftFilters({ ...initialFilters });
        setFilters({ ...initialFilters });
        setPage(0);
    };

    const handlePageChange = (nextPage) => {
        setPage(nextPage);
    };

    const handleSizeChange = (nextSize) => {
        setSize(nextSize);
        setPage(0);
    };

    const certificates = listQuery.data?.content ?? [];
    const totalPages = listQuery.data?.totalPages ?? 0;
    const totalElements = listQuery.data?.totalElements ?? 0;

    return (
        <div className="certificate-dashboard-page container-fluid">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
            <h1 className="h3 fw-semibold mb-1">Certificados académicos</h1>
            <p className="text-muted mb-0">
                Consulta y supervisa los certificados de tu institución.
            </p>
            </div>
        </div>

        {summaryQuery.isError && (
            <div className="alert alert-warning" role="alert">
            No se pudo cargar el resumen de certificados.
            </div>
        )}

        <CertificateDashboardCards
            summary={summaryQuery.data}
            loading={summaryQuery.isLoading}
        />

        <CertificateDashboardFilters
            filters={draftFilters}
            onChange={setDraftFilters}
            onSubmit={handleSearch}
            onClear={handleClear}
        />

        <CertificateDashboardTable
            certificates={certificates}
            loading={listQuery.isFetching}
            error={listQuery.isError}
        />

        {listQuery.isError && certificates.length > 0 && (
            <div className="alert alert-warning mt-3" role="alert">
            No se pudieron actualizar los resultados. Se muestran los datos de la
            última consulta disponible.
            <button
                type="button"
                className="btn btn-sm btn-outline-secondary ms-3"
                onClick={() => listQuery.refetch()}
            >
                Reintentar
            </button>
            </div>
        )}

        <CertificateDashboardPagination
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
            size={size}
            onPageChange={handlePageChange}
            onSizeChange={handleSizeChange}
        />
        </div>
    );
}
