import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth/useAuthStore";

export default function InstitutionGuard({ children }) {
    const { user, loading } = useAuthStore();

    if (loading) {
        return <div>Cargando contexto...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // SOLO CONTEXTO
    if (!user.institutionId) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
