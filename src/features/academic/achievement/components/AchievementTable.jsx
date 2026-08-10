import { Link } from "react-router-dom";

import AchievementStatusBadge from "./AchievementStatusBadge";
import AchievementTypeBadge from "./AchievementTypeBadge";

import { formatAchievementDate } from "../utils/achievementDateUtils";

export default function AchievementTable({ achievements }) {

    if (achievements.length === 0) {
        return (
        <div className="alert alert-info mb-0">
            No existen logros registrados.
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm">
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
                <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Emisor</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th width="120"></th>
                </tr>
            </thead>

            <tbody>
                {achievements.map((achievement) => (
                <tr key={achievement.publicId}>
                    <td className="fw-semibold">{achievement.title}</td>

                    <td>
                    <AchievementTypeBadge type={achievement.type} />
                    </td>

                    <td>{achievement.issuer || "-"}</td>

                    <td>{formatAchievementDate(achievement.achievedDate)}</td>

                    <td>
                    <AchievementStatusBadge status={achievement.status} />
                    </td>

                    <td className="text-end">
                    <Link
                        to={`/institution/achievements/${achievement.publicId}`}
                        className="btn btn-outline-primary btn-sm"
                    >
                        <i className="bi bi-eye me-1"></i>
                        Ver
                    </Link>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}
