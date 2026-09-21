import "./Sidebar.css";

import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/app/store/auth/useAuthStore";

export default function Sidebar({ 
  role 
}) {

  const navigate = useNavigate();
  const { user, exitInstitutionContext, logoutUser } = useAuthStore();

  // CONTEXTO INSTITUCIONAL
  const isInInstitutionContext =
    user?.role === "SUPER_ADMIN" && 
    user?.institutionId != null;

  // SALIR DEL CONTEXTO
  const handleExitInstitution = async () => {
    const updatedUser = await exitInstitutionContext();

    if (!updatedUser) {
      return;
    }

    navigate("/superadmin", { replace: true });
  };

  console.log("USER:", user);

  return (
    <aside className="sidebar">
      {/* HEADER */}

      <div className="sidebar-header">
        <div className="sidebar-logo">Cervalid</div>
      </div>

      {/* BODY */}

      <div className="sidebar-body">
        {/* CONTEXTO INSTITUCIONAL */}

        {isInInstitutionContext && (
          <div className="sidebar-context">
            <div className="sidebar-context-label">
              <i className="bi bi-building"></i>
              <span>Contexto actual</span>
            </div>

            <div className="sidebar-context-institution">
              <div className="sidebar-context-icon">
                <i className="bi bi-bank"></i>
              </div>

              <div className="sidebar-context-info">
                <strong>{user?.institutionName || "Cargando..."}</strong>

                <span>Administrando institución</span>
              </div>
            </div>

            <button
              type="button"
              className="sidebar-context-exit"
              onClick={handleExitInstitution}
            >
              <i className="bi bi-box-arrow-left"></i>
              <span>Salir del contexto</span>
            </button>
          </div>
        )}

        {/* NAVEGACIÓN */}

        <nav className="sidebar-nav">
          {/* SUPER ADMIN */}

          {role === "SUPER_ADMIN" && !isInInstitutionContext && (
            <>
              <NavLink
                end
                to="/superadmin"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <i className="bi bi-grid"></i>
                <span>Dashboard Global</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/superadmin/institutions">
                <i className="bi bi-building"></i>
                <span>Instituciones</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/superadmin/users">
                <i className="bi bi-people"></i>
                <span>Usuarios</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/#">
                <i className="bi bi-shield-check"></i>
                <span>Auditoría Global</span>
              </NavLink>

              <NavLink
                to="/superadmin/institution-requests"
                className="sidebar-link"
              >
                <i className="bi bi-file-earmark-text"></i>
                <span>Solicitudes institucionales</span>
              </NavLink>
            </>
          )}

          {/* CONTEXTO INSTITUCIÓN */}

          {(role === "INSTITUTION_ADMIN" ||
            role === "INSTITUTION_SUBADMIN" ||
            isInInstitutionContext) && (
            <>
              <NavLink
                end
                to="/institution"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <i className="bi bi-grid"></i>
                <span>Dashboard Institución</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/institution/students">
                <i className="bi bi-mortarboard"></i>
                <span>Estudiantes</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/institution/users">
                <i className="bi bi-people"></i>
                <span>Usuarios</span>
              </NavLink>

              <NavLink to="/institution/profile" className="sidebar-link">
                <i className="bi bi-building"></i>
                <span>Perfil de institución</span>
              </NavLink>

              <NavLink to="/institution/verification" className="sidebar-link">
                <i className="bi bi-patch-check"></i>
                <span>Verificaciones</span>
              </NavLink>

              <NavLink to="/institution/invitations" className="sidebar-link">
                <i className="bi bi-envelope"></i>
                <span>Invitaciones</span>
              </NavLink>
            </>
          )}

          {/* STUDENT */}

          {role === "STUDENT" && (
            <>
              <NavLink
                end
                to="/student"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/student/certificates">
                <i className="bi bi-award"></i>
                <span>Mis Certificados</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/student/verify">
                <i className="bi bi-patch-check"></i>
                <span>Verificar Certificado</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/student/history">
                <i className="bi bi-clock-history"></i>
                <span>Historial</span>
              </NavLink>

              <NavLink className="sidebar-link" to="/student/profile">
                <i className="bi bi-person"></i>
                <span>Mi Perfil</span>
              </NavLink>
            </>
          )}

          {/* RECRUITER */}

          {role === "RECRUITER" && (
            <NavLink className="sidebar-link" to="/recruiter">
              <i className="bi bi-patch-check"></i>
              <span>Verificar Certificado</span>
            </NavLink>
          )}
        </nav>
      </div>

      {/* FOOTER */}

      <div className="sidebar-footer">
        <Link
          to="/institution-requests"
          className="sidebar-footer-action sidebar-register"
        >
          <i className="bi bi-plus-circle"></i>
          <span>Registrar institución</span>
        </Link>

        <button
          type="button"
          className="sidebar-footer-action sidebar-logout"
          onClick={logoutUser}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
