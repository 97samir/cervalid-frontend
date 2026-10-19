
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth/useAuthStore";

export default function PrivateRoute({ children }) {
    const { user, loading, authError, loadUser } = useAuthStore();

    if (loading) {
        return (
            <div className="text-center mt-5">
                Validando sesión...
            </div>
        );
    }

    if (authError && !user) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    <h5>No pudimos validar tu sesión</h5>
                    <p>
                        Comprueba tu conexión e inténtalo nuevamente.
                    </p>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => loadUser().catch(() => {})}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    // si no hay usuario - redirigi a :
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
