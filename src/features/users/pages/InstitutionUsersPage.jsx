import { useEffect, useState, useCallback } from "react";
import UsersTable from "../components/UsersTable";
import { getInstitutionUsers, getAllUsers } from "../api/userApi";
import useAuthStore from "../../../app/store/auth/useAuthStore";
import { getAllInstitutions } from "../../superadmin/api/superAdminApi";

const InstitutionUsersPage = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [activeFilter, setActiveFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [loading, setLoading] = useState(false);
    // para filtrar por institucion - superadmin
    const [institutionFilter, setInstitutionFilter] = useState("");
    const [institutions, setInstitutions] = useState([]);
    // convertir a modo dinámico
    const { user } = useAuthStore();

    const isSuperAdminGlobal =
        user?.role === "SUPER_ADMIN" && !user?.institutionId;
    

    const fetchUsers = useCallback (async () => {
        try {
            setLoading(true);

            const params = {
                page,
                size: 10,
                role: roleFilter || undefined,
                active: activeFilter === "" ? undefined : activeFilter,
                institutionId: institutionFilter || undefined
            };

            console.log("institutionFilter:", institutionFilter);

            let data;

            if (isSuperAdminGlobal) {
                data = await getAllUsers(params); // GLOBAL
            } else {
                data = await getInstitutionUsers(params); // institución
            }

            // soporta Spring Page || (o) array simple
            setUsers(data.content || data);
            setTotalPages(data.totalPages || 1);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    },[page, roleFilter, activeFilter, institutionFilter, isSuperAdminGlobal]);

    // para filtrar por instituciones
    useEffect(() => {
            fetchUsers();
        }, [fetchUsers]);

        useEffect(() => {
        if (!isSuperAdminGlobal) return;

        const loadInstitutions = async () => {
            try {
                const data = await getAllInstitutions();
                setInstitutions(data);
            } catch (err) {
                console.error("Error loading institutions", err);
            }
        };

        loadInstitutions();
    }, [isSuperAdminGlobal]);

    return (
        <div className="container mt-4">

            {/* cambio dinamico segun rol */}
            <h3>
                {isSuperAdminGlobal
                    ? "Usuarios del Sistema"
                    : "Usuarios de la Institución"}
            </h3>

            {/* Filtro */}
            <div className="mb-3 d-flex gap-2">

                <button
                    className={`btn ${activeFilter === "" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveFilter("")}
                >
                    Todos
                </button>

                <button
                    className={`btn ${activeFilter === true ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setActiveFilter(true)}
                >
                    Activos
                </button>

                <button
                    className={`btn ${activeFilter === false ? "btn-secondary" : "btn-outline-secondary"}`}
                    onClick={() => setActiveFilter(false)}
                >
                    Inactivos
                </button>

            </div>


            {/* FILTRO POR ROL */}
            <div className="mb-3 d-flex gap-2">

                <button
                    className={`btn ${roleFilter === "" ? "btn-dark" : "btn-outline-dark"}`}
                    onClick={() => setRoleFilter("")}
                >
                    Todos los roles
                </button>

                <button
                    className={`btn ${roleFilter === "STUDENT" ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={() => setRoleFilter("STUDENT")}
                >
                    Estudiantes
                </button>

                <button
                    className={`btn ${roleFilter === "INSTITUTION_ADMIN" ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setRoleFilter("INSTITUTION_ADMIN")}
                >
                    Admins
                </button>

                <button
                    className={`btn ${roleFilter === "INSTITUTION_SUBADMIN" ? "btn-secondary" : "btn-outline-secondary"}`}
                    onClick={() => setRoleFilter("INSTITUTION_SUBADMIN")}
                >
                    SubAdmins
                </button>

            </div>

            {/* =========SOLO PARA SUPER_ADMIN========= */}
            {isSuperAdminGlobal && (
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={institutionFilter}
                        onChange={(e) => {
                            setInstitutionFilter(e.target.value);
                            setPage(0); // reset paginación
                        }}
                    >
                        <option value="">Todas las instituciones</option>

                        {institutions.map(inst => (
                            <option key={inst.id} value={inst.id}>
                                {inst.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {loading ? <p>Cargando...</p> : (
                <UsersTable users={users} refresh={fetchUsers} />
            )}

            {/* =========PAGINACIÓN========= */}

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

export default InstitutionUsersPage;