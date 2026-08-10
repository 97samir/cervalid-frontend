export default function VerificationHistoryPagination({
    
    data,
    isFetching,
    onPrevious,
    onNext,
}) {

    if (!data || data.totalPages <= 1) {
        return null;
    }

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-4">
        <div className="small text-muted">
            Página <strong>{data.number + 1}</strong> de{" "}
            <strong>{data.totalPages}</strong>
            <span className="mx-2">•</span>
            {data.totalElements} verificaciones
        </div>

        <div className="d-flex gap-2">
            <button
            className="btn btn-outline-secondary btn-sm"
            disabled={data.first || isFetching}
            onClick={onPrevious}
            >
            <i className="bi bi-chevron-left me-1" />
            Anterior
            </button>

            <button
            className="btn btn-outline-secondary btn-sm"
            disabled={data.last || isFetching}
            onClick={onNext}
            >
            Siguiente
            <i className="bi bi-chevron-right ms-1" />
            </button>
        </div>
        </div>
    );
}
