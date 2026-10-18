export default function CredentialDashboardPagination({
    page,
    totalPages,
    totalElements,
    size,
    onPageChange,
    onSizeChange,
    loading = false,
}) {
    
    if (totalElements === 0) {
        return null;
    }

    const currentPage = page + 1;
    const start = page * size + 1;
    const end = Math.min((page + 1) * size, totalElements);

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-3">
        <div className="small text-secondary">
            Mostrando {start}–{end} de {totalElements.toLocaleString("es-PE")}{" "}
            credenciales
        </div>

        <div className="d-flex flex-wrap align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
            <label htmlFor="credential-page-size" className="small">
                Filas
            </label>

            <select
                id="credential-page-size"
                className="form-select form-select-sm"
                value={size}
                disabled={loading}
                onChange={(event) => onSizeChange(Number(event.target.value))}
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            </div>

            <nav aria-label="Paginación de credenciales">
            <ul className="pagination pagination-sm mb-0">
                <li
                className={`page-item ${page <= 0 || loading ? "disabled" : ""}`}
                >
                <button
                    type="button"
                    className="page-link"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 0 || loading}
                    aria-label="Página anterior"
                >
                    Anterior
                </button>
                </li>

                <li className="page-item active" aria-current="page">
                <span className="page-link">
                    {currentPage} / {Math.max(totalPages, 1)}
                </span>
                </li>

                <li
                className={`page-item ${page + 1 >= totalPages || loading ? "disabled" : ""}`}
                >
                <button
                    type="button"
                    className="page-link"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page + 1 >= totalPages || loading}
                    aria-label="Página siguiente"
                >
                    Siguiente
                </button>
                </li>
            </ul>
            </nav>
        </div>
        </div>
    );
}
