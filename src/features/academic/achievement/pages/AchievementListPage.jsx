import { Link, useParams } from "react-router-dom";
import AchievementTable from "../components/AchievementTable";
import { useStudentAchievements } from "../hooks/useStudentAchievements";

export default function AchievementListPage() {
    
    const { studentPublicId } = useParams();

    const { data, isLoading, error } = useStudentAchievements(
        studentPublicId
    );

    const achievements = data ?? [];

    if (isLoading) {
        return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger">
            No fue posible cargar los logros.
        </div>
        );
    }

    return (
        <div className="container-fluid">
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h2 className="fw-bold mb-1">Logros</h2>

                <p className="text-muted mb-0">
                Reconocimientos y logros obtenidos por el estudiante.
                </p>
            </div>

            <Link
                to={`/institution/students/${studentPublicId}/achievements/create`}
                className="btn btn-primary"
            >
                <i className="bi bi-plus-lg me-2"></i>
                Nuevo logro
            </Link>
            </div>
        </div>

        <AchievementTable achievements={achievements} />
        </div>
    );
}
