import { useEffect, useState } from "react";
import useAuthStore from "../../../app/store/auth/useAuthStore";
import { getAllInstitutions, switchInstitution } from "../api/superAdminApi";
import { useNavigate, Link } from "react-router-dom";
import AdminDashboardSection from "./AdminDashboardSection";
import AdminUserInfoCard from "../components/AdminUserInfoCard";
import InstitutionListCard from "../components/InstitutionListCard";

export default function SuperAdminDashboardPage() {

  const { user, loadUser } = useAuthStore();
  const [institutions, setInstitutions] = useState([]);
  const navigate = useNavigate();

  // luego usarla
  useEffect(() => {
    let isMounted = true; // para evitar problemas
    // declarar función ANTES
    const fetchInstitutions = async () => {
      try {
        const data = await getAllInstitutions();
        if (isMounted) {
          setInstitutions(data);
        }
        
      } catch (err) {
        console.error("Error loading institutions", err);
      }
    };

    fetchInstitutions();

    return () => {
      isMounted = false;
    };

  }, []);


  const handleEnter = async (inst) => {
    await switchInstitution(inst.id);
    await loadUser();
    navigate("/institution");
  };

  return (
    <div>
      <h1>Panel Super Admin</h1>

      {/* información de usuario*/}
      <AdminUserInfoCard user={user} />

      {/* tabla / lista de instituciones */}
      <InstitutionListCard 
        institutions={institutions}
        onEnter={handleEnter}
      />

      <div className="mb-4 d-flex gap-2 mt-3">
        <Link to="/superadmin/institutions" className="btn btn-primary">
          Gestionar instituciones
        </Link>

        <Link to="/superadmin/institution-requests" className="btn btn-warning">
          Ver solicitudes
        </Link>
      </div>

      {/* resumen de datos globales - cards */}
      <AdminDashboardSection />

    </div>
  );
}