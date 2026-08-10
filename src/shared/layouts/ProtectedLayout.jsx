import "./ProtectedLayout.css";

import useAuthStore from "../../app/store/auth/useAuthStore";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedLayout() {

  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user) {
      if (location.pathname.startsWith("/institution") && !user.institutionId) {
        navigate("/superadmin", {
          replace: true,
        });
      }
    }
  }, [user, loading, location.pathname]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        Cargando sesión...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="layout">

      <div className="layout-sidebar">
        <Sidebar role={user.role} />
      </div>

      <div className="layout-main">
        
        <div className="layout-navbar">
          <Navbar />
        </div>

        <main className="layout-content">
          <div className="page-container">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
