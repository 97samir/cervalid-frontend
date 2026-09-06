export default function TimelineEventPagination({
    data,
    isFetching,
    onPrevious,
    onNext,
}) {
    if (!data || data.totalPages <= 1) {
        return null;
    }

    const page = data.page ?? 0;
    const size = data.size ?? 10;
    const totalElements = data.totalElements ?? 0;

    const start = totalElements === 0
        ? 0
        : page * size + 1;

    const end = Math.min(
        (page + 1) * size,
        totalElements
    );

    return (
        <nav
            className="timeline-pagination"
            aria-label="Paginación de trazabilidad"
        >
            <div className="timeline-pagination-info">

                <span>
                    Mostrando{" "}
                    <strong>{start}–{end}</strong>{" "}
                    de{" "}
                    <strong>{totalElements}</strong> eventos
                </span>

                <span className="timeline-pagination-separator">
                    ·
                </span>

                <span>
                    Página{" "}
                    <strong>{page + 1}</strong>{" "}
                    de{" "}
                    <strong>{data.totalPages}</strong>
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