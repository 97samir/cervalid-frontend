import { useState } from "react";

const INITIAL_FILTERS = {
    email: "",
    status: "",
};

const InvitationFilters = ({ onSearch, onClear }) => {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSearch?.(filters);
    };

    const handleClear = () => {
        setFilters(INITIAL_FILTERS);

        onClear?.(INITIAL_FILTERS);
    };

    return (
        <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
            <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                style={{
                width: "42px",
                height: "42px",
                }}
            >
                <i className="bi bi-funnel fs-5"></i>
            </div>

            <div>
                <h6 className="fw-bold mb-1">Filtros de búsqueda</h6>

                <small className="text-muted">
                Busca invitaciones por correo o estado.
                </small>
            </div>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
                {/* CORREO */}

                <div className="col-12 col-md-5">
                <label htmlFor="email" className="form-label">
                    Correo electrónico
                </label>

                <div className="input-group">
                    <span className="input-group-text bg-white">
                    <i className="bi bi-envelope text-muted"></i>
                    </span>

                    <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    value={filters.email}
                    onChange={handleChange}
                    />
                </div>
                </div>

                {/* ESTADO */}

                <div className="col-12 col-md-4">
                <label htmlFor="status" className="form-label">
                    Estado
                </label>

                <select
                    id="status"
                    name="status"
                    className="form-select"
                    value={filters.status}
                    onChange={handleChange}
                >
                    <option value="">Todos los estados</option>

                    <option value="PENDING">Pendiente</option>

                    <option value="ACCEPTED">Aceptada</option>

                    <option value="EXPIRED">Expirada</option>
                </select>
                </div>

                {/* BOTONES */}

                <div className="col-12 col-md-3">
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary flex-grow-1">
                    <i className="bi bi-search me-2"></i>
                    Buscar
                    </button>

                    <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleClear}
                    title="Limpiar filtros"
                    >
                    <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                </div>
            </div>
            </form>
        </div>
        </div>
    );
};

export default InvitationFilters;
