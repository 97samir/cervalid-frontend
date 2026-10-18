export default function CertificateDashboardPagination({
    page,
    totalPages,
    totalElements,
    size,
    onPageChange,
    onSizeChange,
}) {
    if (totalPages === 0) return null;

    const currentPage = page + 1;
    const start = totalElements === 0 ? 0 : page * size + 1;
    const end = Math.min((page + 1) * size, totalElements);

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-3">
        <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="text-muted small">
            Mostrando {start}–{end} de {totalElements}
            </span>

            <select
            className="form-select form-select-sm"
            style={{ width: "auto" }}
            value={size}
            aria-label="Cantidad de certificados por página"
            onChange={(event) => onSizeChange(Number(event.target.value))}
            >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
            </select>
        </div>

        <nav aria-label="Paginación de certificados">
            <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button
                type="button"
                className="page-link"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
                aria-label="Página anterior"
                >
                <i className="bi bi-chevron-left" />
                </button>
            </li>

            <li className="page-item active">
                <span className="page-link">
                {currentPage} de {totalPages}
                </span>
            </li>

            <li
                className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}
            >
                <button
                type="button"
                className="page-link"
                disabled={page >= totalPages - 1}
                onClick={() => onPageChange(page + 1)}
                aria-label="Página siguiente"
                >
                <i className="bi bi-chevron-right" />
                </button>
            </li>
            </ul>
        </nav>
        </div>
    );
}
