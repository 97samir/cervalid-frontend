const UsersPagination = ({ 
    page, 
    totalPages, 
    onPrevious, 
    onNext 
}) => {
    
    if (!totalPages || totalPages <= 1) {
        return null;
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
        <nav aria-label="Paginación de usuarios">
            <ul className="pagination mb-0">
            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button
                type="button"
                className="page-link"
                onClick={onPrevious}
                disabled={page === 0}
                >
                <i className="bi bi-chevron-left me-1"></i>
                Anterior
                </button>
            </li>

            <li className="page-item active">
                <span className="page-link">{page + 1}</span>
            </li>

            <li
                className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}
            >
                <button
                type="button"
                className="page-link"
                onClick={onNext}
                disabled={page + 1 >= totalPages}
                >
                Siguiente
                <i className="bi bi-chevron-right ms-1"></i>
                </button>
            </li>
            </ul>
        </nav>

        <span className="text-muted small ms-3">
            Página {page + 1} de {totalPages}
        </span>
        </div>
    );
};

export default UsersPagination;
