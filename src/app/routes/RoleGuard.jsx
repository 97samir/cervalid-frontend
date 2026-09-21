// controla el acceso a rutas dependiendo del rol
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/app/store/auth/useAuthStore";

export default function RoleGuard({ allowedRoles }) {
  const { user, loading } = useAuthStore();

  // cargando usuario
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        Cargando...
      </div>
    );
  }

  // usuario no autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log("=== ROLE GUARD ===");
  console.log("User:", user);
  console.log("User role:", user.role);
  console.log("Institution ID:", user.institutionId);
  console.log("Allowed roles:", allowedRoles);

  // acceso directo por rol
  if (allowedRoles.includes(user.role)) { 
    return <Outlet />; 
  }

  const isSuperAdminInInstitution =
    user.role === "SUPER_ADMIN" && 
    user.institutionId != null;

  if (isSuperAdminInInstitution && 
    allowedRoles.includes("INSTITUTION_ADMIN")) {
    return <Outlet />;
  }

  console.warn("RoleGuard: acceso no autorizado", {
    role: user.role,
    institutionId: user.institutionId,
    allowedRoles,
  });

  return <Navigate to="/unauthorized" replace />;
}
