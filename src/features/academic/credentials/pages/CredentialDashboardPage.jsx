import { useState } from "react";

import { useCredentialDashboardSummary } from "../hooks/useCredentialDashboardSummary";
import { useCredentialDashboardList } from "../hooks/useCredentialDashboardList";

import CredentialDashboardCards from "../components/dashboard/CredentialDashboardCards";
import CredentialDashboardFilters from "../components/dashboard/CredentialDashboardFilters";
import CredentialDashboardTable from "../components/dashboard/CredentialDashboardTable";
import CredentialDashboardPagination from "../components/dashboard/CredentialDashboardPagination";

import "../styles/credentialDashboardPage.css";

const initialFilters = {
    search: "",
    studentCode: "",
    program: "",
    type: "",
    status: "",
    fromDate: "",
    toDate: "",
};

function buildQueryParams(filters, page, size) {
    const params = {
        page,
        size,
        sort: "createdAt,desc",
    };

    Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;

        if (key === "fromDate") {
        params.fromDate = `${value}T00:00:00`;
        } else if (key === "toDate") {
        params.toDate = `${value}T23:59:59`;
        } else {
        params[key] = value.trim();
        }
    });

    return params;
}

export default function CredentialDashboardPage() {

    const [filters, setFilters] = useState(initialFilters);
    const [appliedFilters, setAppliedFilters] = useState(initialFilters);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const summaryQuery = useCredentialDashboardSummary();

    const params = buildQueryParams(appliedFilters, page, size);

    const credentialsQuery = useCredentialDashboardList(params);

    const summary = summaryQuery.data;
    const pageData = credentialsQuery.data;

    const credentials = pageData?.content ?? [];
    const totalPages = pageData?.totalPages ?? 0;
    const totalElements = pageData?.totalElements ?? 0;

    const handleFilterChange = (name, value) => {
        setFilters((current) => ({
        ...current,
        [name]: value,
        }));
    };

    const handleSearch = () => {
        setPage(0);
        setAppliedFilters({ ...filters });
    };

    const handleClearFilters = () => {
        setFilters({ ...initialFilters });
        setAppliedFilters({ ...initialFilters });
        setPage(0);
    };

    const handlePageChange = (nextPage) => {
        if (nextPage < 0 || nextPage >= totalPages) return;
        setPage(nextPage);
    };

    const handleSizeChange = (nextSize) => {
        setSize(nextSize);
        setPage(0);
    };

    return (
        <div className="container-fluid credential-dashboard-page">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
            <h1 className="h3 fw-semibold mb-1">Títulos o grados académicos</h1>
            <p className="text-secondary mb-0">
                Consulta, filtra y revisa las credenciales de tu institución.
            </p>
            </div>
        </div>

        {summaryQuery.isError && (
            <div className="alert alert-warning" role="alert">
            No se pudo cargar el resumen de credenciales.
            <button
                type="button"
                className="btn btn-sm btn-outline-dark ms-3"
                onClick={() => summaryQuery.refetch()}
            >
                Reintentar
            </button>
            </div>
        )}

        <CredentialDashboardCards
            summary={summary}
            loading={summaryQuery.isLoading}
        />

        <CredentialDashboardFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onClear={handleClearFilters}
        />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
            <h2 className="h5 mb-0">Listado de credenciales</h2>

            <span className="small text-secondary">
            {totalElements.toLocaleString("es-PE")} resultados
            </span>
        </div>

        <CredentialDashboardTable
            credentials={credentials}
            loading={credentialsQuery.isFetching}
            error={credentialsQuery.isError}
        />

        {credentialsQuery.isError && credentials.length > 0 && (
            <div className="alert alert-warning mt-3" role="alert">
            No se pudo actualizar la lista. Se conservan los resultados
            anteriores.
            <button
                type="button"
                className="btn btn-sm btn-outline-dark ms-3"
                onClick={() => credentialsQuery.refetch()}
            >
                Reintentar
            </button>
            </div>
        )}

        <CredentialDashboardPagination
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
            size={size}
            onPageChange={handlePageChange}
            onSizeChange={handleSizeChange}
            loading={credentialsQuery.isFetching}
        />
        </div>
    );
}
