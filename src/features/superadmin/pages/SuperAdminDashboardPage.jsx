import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../../app/store/auth/useAuthStore";
import { getAllInstitutions, switchInstitution } from "../api/superAdminApi";

import AdminDashboardSection from "./AdminDashboardSection";
import AdminUserInfoCard from "../components/AdminUserInfoCard";
import InstitutionListCard from "../components/InstitutionListCard";

export default function SuperAdminDashboardPage() {
  const { user, loadUser } = useAuthStore();

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchInstitutions = async () => {
      try {
        setLoading(true);

        const data = await getAllInstitutions();

        if (isMounted) {
          setInstitutions(data || []);
        }
      } catch (err) {
        console.error("Error loading institutions", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInstitutions();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEnter = async (institution) => {
    try {
      await switchInstitution(institution.id);

      await loadUser();

      navigate("/institution");
    } catch (error) {
      console.error("Error switching institution", error);
    }
  };

  return (
    <div className="container-fluid px-3 px-md-4 py-0">
      {/* HEADER*/}

      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Panel Super Admin</h2>

          <p className="text-muted mb-0">
            Bienvenido, {user?.name || "Administrador"}. Gestiona las
            instituciones y supervisa la plataforma desde este panel.
          </p>
        </div>

        {/* ACCIONES PRINCIPALES */}

        <div className="d-flex flex-wrap gap-2">
          <Link to="/superadmin/institutions" className="btn btn-primary">
            <i className="bi bi-buildings me-2"></i>
            Gestionar instituciones
          </Link>

          <Link
            to="/superadmin/institution-requests"
            className="btn btn-outline-warning"
          >
            <i className="bi bi-inbox me-2"></i>
            Solicitudes
          </Link>
        </div>
      </div>

      {/* INDICADORES GLOBALES */}

      <section className="mb-4">
        <div className="mb-3">
          <h5 className="fw-bold mb-1">Resumen general</h5>

          <p className="text-muted small mb-0">
            Estado general de la plataforma.
          </p>
        </div>

        <AdminDashboardSection />
      </section>

      {/* CONTENIDO PRINCIPAL */}

      <div className="row g-4">
        {/*  INSTITUCIONES */}

        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 p-4 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold mb-1">Mis instituciones</h5>

                  <p className="text-muted small mb-0">
                    Instituciones disponibles para administrar.
                  </p>
                </div>

                <span className="badge bg-primary-subtle text-primary px-3 py-2">
                  {institutions.length} instituciones
                </span>
              </div>
            </div>

            <div className="card-body p-4">
              {loading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  >
                    <span className="visually-hidden">Cargando...</span>
                  </div>

                  <p className="text-muted mb-0">Cargando instituciones...</p>
                </div>
              ) : institutions.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-buildings fs-1 text-muted"></i>

                  <p className="text-muted mt-3 mb-0">
                    No hay instituciones disponibles.
                  </p>
                </div>
              ) : (
                <>
                  <InstitutionListCard
                    institutions={institutions.slice(0, 5)}
                    onEnter={handleEnter}
                  />

                  {institutions.length > 5 && (
                    <div className="text-center mt-3">
                      <Link
                        to="/superadmin/institutions"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Ver todas las instituciones
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/*  ACCIONES RÁPIDAS*/}

        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-1">Acciones rápidas</h5>

              <p className="text-muted small mb-4">
                Accede rápidamente a las funciones principales de
                administración.
              </p>

              <div className="d-grid gap-3">
                <Link
                  to="/superadmin/institutions"
                  className="btn btn-light border text-start p-3"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <i className="bi bi-buildings"></i>
                    </div>

                    <div>
                      <div className="fw-semibold">Instituciones</div>

                      <small className="text-muted">
                        Administrar instituciones
                      </small>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/superadmin/institution-requests"
                  className="btn btn-light border text-start p-3"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 text-warning me-3"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <i className="bi bi-inbox"></i>
                    </div>

                    <div>
                      <div className="fw-semibold">Solicitudes</div>

                      <small className="text-muted">Revisar solicitudes</small>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMACIÓN DEL USUARIO */}

      <section className="mt-4">
        <div className="mb-3">
          <h5 className="fw-bold mb-1">Mi cuenta</h5>

          <p className="text-muted small mb-0">
            Información del usuario actualmente autenticado.
          </p>
        </div>

        <AdminUserInfoCard user={user} />
      </section>
    </div>
  );
}
