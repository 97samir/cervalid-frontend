import { useCallback, useEffect, useState } from "react";

import UsersTable from "../components/UsersTable";
import UsersFilters from "../components/UsersFilters";
import UsersPagination from "../components/UsersPagination";
import { getInstitutionUsers, getAllUsers } from "../api/userApi";
import useAuthStore from "@/app/store/auth/useAuthStore";
import { getAllInstitutions } from "../../superadmin/api/superAdminApi";

const InstitutionUsersPage = () => {
    const { user } = useAuthStore();

    const [users, setUsers] = useState([]);
    const [institutions, setInstitutions] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [activeFilter, setActiveFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [institutionFilter, setInstitutionFilter] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isSuperAdminGlobal =
        user?.role === "SUPER_ADMIN" && !user?.institutionId;

    /*
    * CARGAR USUARIOS
    */

    const fetchUsers = useCallback(async () => {
        try {
        setLoading(true);
        setError(null);

        const params = {
            page,
            size: 10,
            role: roleFilter || undefined,

            active: activeFilter === "" ? undefined : activeFilter,

            institutionId: institutionFilter || undefined,
        };

        let data;

        if (isSuperAdminGlobal) {
            data = await getAllUsers(params);
        } else {
            data = await getInstitutionUsers(params);
        }

        setUsers(data.content || data);

        setTotalPages(data.totalPages || 1);
        } catch (error) {
        console.error("Error loading users:", error);

        setError("No se pudieron cargar los usuarios.");

        setUsers([]);
        } finally {
        setLoading(false);
        }
    }, [page, roleFilter, activeFilter, institutionFilter, isSuperAdminGlobal]);

    /* OBTENER USUARIOS*/

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // CARGAR INSTITUCIONES
    // Solo Super Admin global.


    useEffect(() => {
        if (!isSuperAdminGlobal) {
        return;
        }

        const loadInstitutions = async () => {
        try {
            const data = await getAllInstitutions();

            setInstitutions(data);
        } catch (error) {
            console.error("Error loading institutions:", error);
        }
        };

        loadInstitutions();
    }, [isSuperAdminGlobal]);

    /*CAMBIO DE FILTROS cada vez que cambia un filtro, 
    regresamos a la primera página.
    */

    const handleActiveChange = (value) => {
        setActiveFilter(value);
        setPage(0);
    };

    const handleRoleChange = (value) => {
        setRoleFilter(value);
        setPage(0);
    };

    const handleInstitutionChange = (value) => {
        setInstitutionFilter(value);
        setPage(0);
    };

    /*
    * PAGINACIÓN
    */

    const handlePrevious = () => {
        if (page > 0) {
        setPage((current) => current - 1);
        }
    };

    const handleNext = () => {
        if (page + 1 < totalPages) {
        setPage((current) => current + 1);
        }
    };

    return (
        <div className="container-fluid px-4 py-0">

        {/* HEADER 
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <div>
            <h2 className="fw-bold mb-1">
                {isSuperAdminGlobal
                ? "Usuarios del sistema"
                : "Usuarios de la institución"}
            </h2>

            <p className="text-muted mb-0">
                {isSuperAdminGlobal
                ? "Consulta y administra los usuarios de todas las instituciones."
                : "Consulta y administra los usuarios pertenecientes a tu institución."}
            </p>
            </div>
        </div>
        */}

        {/* FILTROS */}

        <UsersFilters
            activeFilter={activeFilter}
            roleFilter={roleFilter}
            institutionFilter={institutionFilter}
            institutions={institutions}
            isSuperAdminGlobal={isSuperAdminGlobal}
            onActiveChange={handleActiveChange}
            onRoleChange={handleRoleChange}
            onInstitutionChange={handleInstitutionChange}
        />

        {/* CONTENIDO */}

        {loading ? (
            <div className="card border-0 shadow-sm">
            <div className="card-body py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
                </div>

                <p className="text-muted mt-3 mb-0">Cargando usuarios...</p>
            </div>
            </div>
        ) : error ? (
            <div className="alert alert-danger d-flex align-items-center">
            <i className="bi bi-exclamation-circle me-2"></i>

            {error}
            </div>
        ) : (
            <>
            {/* TABLA */}

            <UsersTable users={users} refresh={fetchUsers} />

            {/* PAGINACIÓN */}

            <UsersPagination
                page={page}
                totalPages={totalPages}
                onPrevious={handlePrevious}
                onNext={handleNext}
            />
            </>
        )}
        </div>
    );
};

export default InstitutionUsersPage;
