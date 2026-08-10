import { Link } from "react-router-dom";
import { useStudentAchievements } from "../hooks/useStudentAchievements";
import AchievementStatusBadge from "./AchievementStatusBadge";
import AchievementTypeBadge from "./AchievementTypeBadge";

export default function AchievementCard({ studentPublicId }) {

    const {
        data: achievements = [],
        isLoading,
        error,
    } = useStudentAchievements(studentPublicId);

    if (isLoading) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" />
            </div>
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
        <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
            
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
                <h5 className="fw-bold mb-1">
                <i className="bi bi-trophy me-2 text-warning"></i>
                Logros
                </h5>

                <p className="text-muted mb-0">
                {achievements.length} logro
                {achievements.length !== 1 ? "s" : ""} registrado
                {achievements.length !== 1 ? "s" : ""}.
                </p>
            </div>

            {achievements.length > 0 && (
                <Link
                to={`/institution/students/${studentPublicId}/achievements`}
                className="btn btn-outline-primary btn-sm"
                >
                Ver todos
                </Link>
            )}
            </div>

            {/* EMPTY */}

            {achievements.length === 0 && (
            <div className="text-center py-5">
                <i
                className="bi bi-trophy text-secondary"
                style={{ fontSize: "3rem" }}
                />

                <h6 className="mt-3">Aún no existen logros registrados</h6>

                <p className="text-muted mb-4">
                Registre el primer logro del estudiante.
                </p>

                <Link
                to={`/institution/students/${studentPublicId}/achievements/create`}
                className="btn btn-primary"
                >
                <i className="bi bi-plus-lg me-2"></i>
                Crear logro
                </Link>
            </div>
            )}

            {/* TABLA */}

            {achievements.length > 0 && (
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th>Título</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th style={{ width: 120 }}></th>
                    </tr>
                </thead>

                <tbody>
                    {achievements.slice(0, 3).map((achievement) => (
                    <tr key={achievement.publicId}>
                        <td className="fw-semibold">{achievement.title}</td>

                        <td>
                        <AchievementTypeBadge type={achievement.type} />
                        </td>

                        <td>
                        <AchievementStatusBadge status={achievement.status} />
                        </td>

                        <td className="text-end">
                        <Link
                            to={`/institution/achievements/${achievement.publicId}`}
                            className="btn btn-outline-secondary btn-sm"
                        >
                            <i className="bi bi-eye me-1"></i>
                            Detalle
                        </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
}
