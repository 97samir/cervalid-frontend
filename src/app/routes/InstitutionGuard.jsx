import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/app/store/auth/useAuthStore";

export default function InstitutionGuard() {

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

    // SOLO CONTEXTO
    if (!user.institutionId) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
