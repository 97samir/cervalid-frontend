import "./Sidebar.css";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../app/store/auth/useAuthStore";

export default function Sidebar({ role }) {

  const { user, exitInstitutionContext, logoutUser } = useAuthStore();

  const isInInstitutionContext =
    user?.role === "SUPER_ADMIN" && user?.institutionId;

  const handleExitInstitution = async () => {
    const updatedUser = await exitInstitutionContext();

    if (!updatedUser) return;

  };
  console.log("USER:", user);

  return (
    
    <aside className="sidebar" >
      
      <div className="sidebar-header">
          <div className="sidebar-logo">
              Cervalid
          </div>
      </div>

      {/* ================= CONTEXTO ================= */}
      {isInInstitutionContext && (
        <div className="mb-3 border-bottom pb-2">
          <small>Modo institución:</small>
          <div className="fw-bold">
            {user?.institutionName || "Cargando..."}
          </div>

          <button
            className="btn btn-warning btn-sm mt-2 w-100"
            onClick={handleExitInstitution}
          >
            Salir
          </button>
        </div>
      )}

      <div className="sidebar-body">
        <nav className="sidebar-nav">

          {/* ================= SUPER ADMIN ================= */}

          {role === "SUPER_ADMIN" && !isInInstitutionContext && (
            <>
              <NavLink
                end
                to="/superadmin"
                className={({ isActive }) =>
                    isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                }
              >
                Dashboard Global
              </NavLink>

              <NavLink className="sidebar-link" to="/superadmin/institutions">
                Instituciones
              </NavLink>

              <NavLink className="sidebar-link" to="/superadmin/users">
                Usuarios
              </NavLink>

              <NavLink className="sidebar-link" to="/#">
                Auditoría Global
              </NavLink>

              <NavLink to="/superadmin/institution-requests" className="sidebar-link">
                Ver solicitudes institucionales
              </NavLink>
            </>
          )}

          {/* ================= CONTEXTO INSTITUCIÓN ================= */}

          {(role === "INSTITUTION_ADMIN" ||
            role === "INSTITUTION_SUBADMIN" ||
            isInInstitutionContext) && (
            <>
              <NavLink 
                end
                to="/institution"
                className= {({ isActive }) => 
                  isActive
                    ? "sidebar-link active" 
                    : "sidebar-link"} 
              >
                Dashboard Institución
              </NavLink>

              <NavLink className="sidebar-link" to="/institution/students">
                Estudiantes
              </NavLink>

              <NavLink className="sidebar-link" to="/institution/users">
                Usuarios
              </NavLink>

              <NavLink to="/institution/profile" className="sidebar-link">
                Perfil de institución
              </NavLink>

              <NavLink to="/institution/verification" className="sidebar-link">
                Verificaciones
              </NavLink>

              <NavLink to="/institution/invitations" className="sidebar-link">
                Invitaciones
              </NavLink>
              
            </>
          )}

          {/* ================= STUDENT ================= */}

          {role === "STUDENT" && (
            <>

              <NavLink
                end
                to="/student"
                className={({ isActive }) =>
                    isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                }
              >
                Dashboard
              </NavLink>

              <NavLink className="sidebar-link" to="/student/certificates">
                Mis Certificados
              </NavLink>

              <NavLink className="sidebar-link" to="/student/verify">
                Verificar Certificado
              </NavLink>

              <NavLink className="sidebar-link" to="/student/history">
                Historial
              </NavLink>

              <NavLink className="sidebar-link" to="/student/profile">
                Mi Perfil
              </NavLink>
              
            </>
          )}

          {/* ================= RECRUITER ================= */}

          {role === "RECRUITER" && (
            <NavLink className="sidebar-link" to="/recruiter">
              Verificar Certificado
            </NavLink>
          )}

        </nav>
      </div>
      

      <div className="sidebar-footer">
          <Link
              to="/institution-requests"
              className="btn btn-primary w-100 mb-3"
          >
              Registrar institución
          </Link>

          <button
              //className="btn btn-outline-light w-100"
              className="btn btn-danger w-100"
              onClick={logoutUser}
          >
              Cerrar sesión
          </button>

      </div>

    </aside>
  );
}