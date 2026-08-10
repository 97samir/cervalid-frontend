import { useState } from "react";

import { useVerificationDashboard } from "../hooks/useVerificationDashboard";
import { useVerificationSummary } from "../hooks/useVerificationSummary";

import VerificationDashboardCards from "../components/VerificationDashboardCards";
import VerificationSummaryFilters from "../components/VerificationSummaryFilters";
import VerificationSummaryTable from "../components/VerificationSummaryTable";
import VerificationHistoryPagination from "../components/VerificationHistoryPagination";

export default function VerificationDashboardPage() {
  const [page, setPage] = useState(0);

  const size = 10;

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    fromDate: "",
    toDate: "",
  });

  const {
    data: dashboard,
    isLoading: dashboardLoading,
    isFetching: dashboardFetching,
  } = useVerificationDashboard();

  const {
    data,
    isLoading: summaryLoading,
    isFetching: summaryFetching,
    error: summaryError,
  } = useVerificationSummary(page, size, filters);

  const loading = dashboardLoading || summaryLoading;

  if (loading) {
    return (
      <div className="container-fluid py-5 text-center">
        <div className="spinner-border" />
      </div>
    );
  }

  if (summaryError) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger">
          No se pudo cargar el resumen de verificaciones.
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

      <div className="mb-4">
        <h2 className="fw-bold">Centro de verificaciones</h2>

        <p className="text-muted mb-0">
          Monitorea la actividad de verificación de los certificados emitidos
          por tu institución.
        </p>
      </div>

      {/* DASHBOARD */}

      <VerificationDashboardCards dashboard={dashboard} />

      {/* FILTROS */}

      <VerificationSummaryFilters filters={filters} onFilter={handleFilter} />

      {/* TABLA */}

      <VerificationSummaryTable
        records={data?.content ?? []}
        loading={summaryFetching}
      />

      {/* PAGINACIÓN */}

      <VerificationHistoryPagination
        data={data}
        isFetching={summaryFetching || dashboardFetching}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
