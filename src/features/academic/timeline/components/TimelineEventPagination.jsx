export default function TimelineEventPagination({
    data,
    isFetching,
    onPrevious,
    onNext,
}) {
    if (!data || data.totalPages <= 1) {
        return null;
    }

    return (
        <nav
        className="timeline-pagination"
        aria-label="Paginación de trazabilidad"
        >
        <div className="timeline-pagination-info">
            <span>
            Página <strong>{data.page + 1}</strong> de{" "}
            <strong>{data.totalPages}</strong>
            </span>

            <span className="timeline-pagination-separator">·</span>

            <span>
            <strong>{data.totalElements}</strong> eventos
            </span>
        </div>

        <div className="d-flex gap-2">
            <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            disabled={data.first || isFetching}
            onClick={onPrevious}
            >
            <i className="bi bi-chevron-left me-1"></i>
            Anterior
            </button>

            <button
            type="button"
            className="btn btn-sm btn-primary"
            disabled={data.last || isFetching}
            onClick={onNext}
            >
            Siguiente
            <i className="bi bi-chevron-right ms-1"></i>
            </button>
        </div>
        </nav>
    );
}
