import { useEffect, useState } from "react";
import { getInstitutions } from "../api/institutionApi";
import InstitutionsTable from "../components/InstitutionsTable";

const InstitutionsPage = () => {

    const [institutions, setInstitutions] = useState([]);
    const [filter, setFilter] = useState(undefined);

    // para paginación
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                size: 10,
                active: filter
            };

            const data = await getInstitutions(params);
            
            // soporta Spring Page || (o) array simple
            setInstitutions(data.content || data);
            setTotalPages(data.totalPages || 1);
            console.log(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter, page]);

    return (
        <div className="container mt-4">

            <h3>Gestión de Instituciones</h3>

            <div className="mb-3 d-flex gap-2">

                <button
                    className={`btn ${filter === undefined ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => {
                        setFilter(undefined);
                        setPage(0);
                    }}
                >
                    Todas
                </button>

                <button
                    className={`btn ${filter === true ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => {
                        setFilter(true);
                        setPage(0);
                    }}
                >
                    Activas
                </button>

                <button
                    className={`btn ${filter === false ? "btn-secondary" : "btn-outline-secondary"}`}
                    onClick={() => {
                        setFilter(false);
                        setPage(0);
                    }}
                >
                    Inactivas
                </button>

            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <InstitutionsTable
                    institutions={institutions}
                    refresh={fetchData}
                />
            )}

            {/* paginación */}
            <div className="d-flex justify-content-center mt-3 gap-2">

                <button
                    className="btn btn-outline-secondary"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>

                <span className="align-self-center">
                    Página {page + 1} de {totalPages}
                </span>

                <button
                    className="btn btn-outline-secondary"
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Siguiente
                </button>

            </div>

        </div>
    );
};

export default InstitutionsPage;