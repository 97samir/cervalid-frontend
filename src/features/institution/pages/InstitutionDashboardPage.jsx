// información básica del usuario autenticado

import { useEffect, useState } from "react";
import useAuthStore from "../../../app/store/auth/useAuthStore";
import { getInstitutionDashboardStats, getMyInstitution } from "../api/institutionApi";
import DashboardStats from "../components/DashboardStats";
import { Link } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard";

export default function InstitutionDashboardPage() {

  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getInstitutionDashboardStats();
        setStats(data);

      } catch (err) {
        console.error("Error loading dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

    // para traer datos de la institucion de un usuario
  useEffect(() => {
  const loadInstitution = async () => {
    try {
      const data = await getMyInstitution();
      setInstitution(data);
    } catch (err) {
      console.error("Error loading institution", err);
    }
  };

  loadInstitution();
}, []);

  if (loading) {
    return <div className="text-center mt-5">Loading dashboard...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Panel de Institución</h2>

      <Link to="/institution/invite-user" className="btn btn-primary">
        Invitar usuario
      </Link>

      <hr />

      {/* Información del usuario autenticado */}
      <UserInfoCard user={user} institution={institution}/>

      {/* Estadísticas del dashboard */}
      {stats && <DashboardStats stats={stats} />}
    </div>
  );
}
