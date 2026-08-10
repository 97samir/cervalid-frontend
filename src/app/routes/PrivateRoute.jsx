// protege rutas que requieren autenticación.
// Si está logueado, permite entrar, de lo contrario, bloquea

import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth/useAuthStore";

export default function PrivateRoute({ children }) {

  const { user, loading } = useAuthStore();

  console.log("PrivateRoute user:", user);
  console.log("PrivateRoute loading:", loading);

  if (loading) {
    return <div className="text-center mt-5">Validando sesión...</div>;
  }
  // Si no hay usuario logueado -> redirige a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}