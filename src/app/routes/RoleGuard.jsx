// controla el acceso a rutas dependiendo del rol
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/app/store/auth/useAuthStore";

export default function RoleGuard({ allowedRoles }) {
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

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

/*
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth/useAuthStore";

export default function RoleGuard({ allowedRoles, children }) {

  const { user, loading } = useAuthStore();

  console.log("RoleGuard user:", user?.role);
  console.log("RoleGuard loading:", loading);
  console.log("RoleGuard allowedRoles:", allowedRoles);
  
  // espera aque termine la carga
  if (loading) {
    return <div>Cargando permisos...</div>;
  }

  // Si no hay usuario logueado -> redirige a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAllowed =
  allowedRoles.includes(user.role) || (
    user.role === "SUPER_ADMIN" && 
    user.institutionId !== null &&
    allowedRoles.includes("INSTITUTION_ADMIN")
  );

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
*/
