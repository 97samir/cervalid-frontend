import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/app/store/auth/useAuthStore";

export default function GlobalSuperAdminGuard() {
    const { user, loading } = useAuthStore();

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            Cargando...
        </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const isGlobalSuperAdmin =
        user.role === "SUPER_ADMIN" && user.institutionId == null;

    if (!isGlobalSuperAdmin) {

        // SUPER_ADMIN bajo contexto institucional
        // no puede entrar a rutas globales.
        if (user.role === "SUPER_ADMIN" && 
            user.institutionId != null) {

            return <Navigate to="/institution" replace />;
        }

        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
