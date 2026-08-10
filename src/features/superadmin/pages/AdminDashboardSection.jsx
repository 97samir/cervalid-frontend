import { useEffect, useState } from "react";
import AdminDashboardStats from "../components/AdminDashboardStats";
import { getAdminDashboardStats } from "../api/superAdminApi";

const AdminDashboardSection = () => {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadStats = async () => {
            try {
                const data = await getAdminDashboardStats();

                if (isMounted) {
                    setStats(data);
                }

            } catch (error) {
                console.error("Error loading admin stats", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadStats();

        return () => {
            isMounted = false;
        };

    }, []);

    if (loading) {
        return <p>Cargando estadísticas...</p>;
    }

    return stats && <AdminDashboardStats stats={stats} />;
};

export default AdminDashboardSection;