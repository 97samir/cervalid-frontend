const InstitutionListCard = ({ 
    institutions, 
    onEnter 
}) => {

    if (!institutions || institutions.length === 0) {
        return (
        <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
            <i className="bi bi-building fs-2 text-muted d-block mb-2"></i>

            <p className="text-muted mb-0">No hay instituciones disponibles.</p>
            </div>
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom py-3">
            <h5 className="mb-0 fw-bold">
            <i className="bi bi-buildings me-2 text-primary"></i>
            Instituciones
            </h5>

            <small className="text-muted">
            Selecciona una institución para continuar
            </small>
        </div>

        <div className="card-body p-0">
            <div className="list-group list-group-flush">
            {institutions.map((inst) => (
                <div key={inst.id} className="list-group-item px-4 py-3">
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex align-items-center">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                        style={{
                        width: "42px",
                        height: "42px",
                        }}
                    >
                        <i className="bi bi-building fs-5"></i>
                    </div>

                    <div>
                        <div className="fw-semibold">{inst.name}</div>

                        {inst.ruc && (
                        <small className="text-muted">RUC: {inst.ruc}</small>
                        )}
                    </div>
                    </div>

                    <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEnter(inst)}
                    >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Entrar
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default InstitutionListCard;
