import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuthStore from "../../../app/store/auth/useAuthStore";

import {
    getInstitutionDashboardStats,
    getMyInstitution,
} from "../api/institutionApi";

import DashboardStats from "../components/DashboardStats";
import UserInfoCard from "../components/UserInfoCard";

export default function InstitutionDashboardPage() {

    const { user } = useAuthStore();

    const [stats, setStats] = useState(null);
    const [institution, setInstitution] = useState(null);
    const [loading, setLoading] = useState(true);


    // Estadísticas del dashboard
    useEffect(() => {

        const loadStats = async () => {

            try {

                const data =
                    await getInstitutionDashboardStats();

                setStats(data);

            } catch (err) {

                console.error(
                    "Error loading dashboard stats",
                    err
                );

            } finally {

                setLoading(false);

            }
        };

        loadStats();

    }, []);


    // Información de la institución
    useEffect(() => {

        const loadInstitution = async () => {

            try {

                const data =
                    await getMyInstitution();

                setInstitution(data);

            } catch (err) {

                console.error(
                    "Error loading institution",
                    err
                );

            }
        };

        loadInstitution();

    }, []);


    // Loading
    if (loading) {

        return (
            <div className="d-flex justify-content-center py-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Cargando...
                    </span>
                </div>

            </div>
        );
    }


    return (

        <div>

            {/* =====================================================
                BIENVENIDA
            ===================================================== */}

            <div className="mb-4">

                <h4 className="fw-bold mb-1">
                    Bienvenido, {user?.name}
                </h4>

                <p className="text-muted mb-0">
                    Consulta y gestiona la actividad académica
                    de tu institución.
                </p>

            </div>


            {/* =====================================================
                ESTADÍSTICAS
            ===================================================== */}

            {stats && (
                <DashboardStats
                    stats={stats}
                />
            )}


            {/* =====================================================
                ACCIONES RÁPIDAS
            ===================================================== */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body p-4">

                    <div className="mb-3">

                        <h5 className="fw-bold mb-1">
                            <i className="bi bi-lightning-charge me-2 text-primary"></i>
                            Acciones rápidas
                        </h5>

                        <p className="text-muted small mb-0">
                            Accede rápidamente a las operaciones
                            principales de tu institución.
                        </p>

                    </div>


                    <div className="d-flex flex-wrap gap-2">

                        {/* Estudiantes */}

                        <Link
                            to="/institution/students"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-people me-2"></i>
                            Gestionar estudiantes
                        </Link>


                        {/* Invitar usuario */}

                        <Link
                            to="/institution/invite-user"
                            className="btn btn-outline-primary"
                        >
                            <i className="bi bi-person-plus me-2"></i>
                            Invitar usuario
                        </Link>


                        {/* Certificados */}

                        <Link
                            to="/institution/certificates"
                            className="btn btn-outline-secondary"
                        >
                            <i className="bi bi-award me-2"></i>
                            Certificados
                        </Link>


                        {/* Verificaciones */}

                        <Link
                            to="/institution/verification/history"
                            className="btn btn-outline-secondary"
                        >
                            <i className="bi bi-patch-check me-2"></i>
                            Verificaciones
                        </Link>

                    </div>

                </div>

            </div>


            {/* =====================================================
                MI CUENTA
            ===================================================== */}

            <UserInfoCard
                user={user}
                institution={institution}
            />

        </div>
    );
}