import { useEffect, useState } from "react";
import { getInstitutions } from "../api/institutionApi";
import InstitutionsTable from "../components/InstitutionsTable";

const InstitutionsPage = () => {
    
    const [institutions, setInstitutions] = useState([]);
    const [filter, setFilter] = useState(undefined);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
        setLoading(true);

        const params = {
            page,
            size: 10,
            active: filter,
        };

        const data = await getInstitutions(params);

        setInstitutions(data.content || data);
        setTotalPages(data.totalPages || 1);
        } catch (error) {
        console.error("Error loading institutions", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter, page]);

    return (
        <div className="container-fluid px-3 px-md-4 py-0">
        {/* HEADER 
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Gestión de instituciones
                        </h2>

                        <p className="text-muted mb-0">
                            Administra las instituciones registradas en Cervalid.
                        </p>

                    </div>

                </div>
                */}

        {/* FILTROS */}
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                <div className="d-flex align-items-center">
                <i className="bi bi-funnel me-2 text-primary"></i>

                <span className="fw-semibold">Estado</span>
                </div>

                <div
                className="btn-group"
                role="group"
                aria-label="Filtrar instituciones"
                >
                <button
                    type="button"
                    className={`btn ${
                    filter === undefined ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => {
                    setFilter(undefined);
                    setPage(0);
                    }}
                >
                    Todas
                </button>

                <button
                    type="button"
                    className={`btn ${
                    filter === true ? "btn-success" : "btn-outline-success"
                    }`}
                    onClick={() => {
                    setFilter(true);
                    setPage(0);
                    }}
                >
                    Activas
                </button>

                <button
                    type="button"
                    className={`btn ${
                    filter === false ? "btn-secondary" : "btn-outline-secondary"
                    }`}
                    onClick={() => {
                    setFilter(false);
                    setPage(0);
                    }}
                >
                    Inactivas
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* TABLA */}
        {loading ? (
            <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Cargando...</span>
                </div>

                <p className="text-muted mb-0">Cargando instituciones...</p>
            </div>
            </div>
        ) : (
            <InstitutionsTable institutions={institutions} refresh={fetchData} />
        )}

        {/* PAGINACIÓN */}
        {!loading && totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-4">
            <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
            >
                <i className="bi bi-chevron-left me-1"></i>
                Anterior
            </button>

            <span className="text-muted small">
                Página <strong className="text-dark">{page + 1}</strong> de{" "}
                <strong className="text-dark">{totalPages}</strong>
            </span>

            <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
            >
                Siguiente
                <i className="bi bi-chevron-right ms-1"></i>
            </button>
            </div>
        )}
        </div>
    );
};

export default InstitutionsPage;
