const InvitationsPagination = ({
    page,
    totalPages,
    onPrevious,
    onNext,
}) => {

    // No mostrar paginación si no hay más de una página
    if (!totalPages || totalPages <= 1) {
        return null;
    }

    return (

        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

            <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={page === 0}
                onClick={onPrevious}
            >
                <i className="bi bi-chevron-left me-1"></i>
                Anterior
            </button>

            <span className="text-muted small">

                Página{" "}
                <strong>
                    {page + 1}
                </strong>{" "}
                de{" "}
                <strong>
                    {totalPages}
                </strong>

            </span>

            <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={page + 1 >= totalPages}
                onClick={onNext}
            >
                Siguiente
                <i className="bi bi-chevron-right ms-1"></i>
            </button>

        </div>

    );
};

export default InvitationsPagination;