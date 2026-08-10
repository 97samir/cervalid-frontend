import AchievementStatusBadge from "./AchievementStatusBadge";
import AchievementTypeBadge from "./AchievementTypeBadge";
import { formatAchievementDate } from "../utils/achievementDateUtils";

export default function AchievementSummaryCard({
    
    achievement,
    onEdit,
    onDeactivate,
    deactivating = false,

}) {

    if (!achievement) return null;

    return (
        <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
            <div>
                <h5 className="fw-bold mb-1">
                <i className="bi bi-trophy me-2 text-warning"></i>
                Logro
                </h5>

                <div className="text-muted small">{achievement.title}</div>

                <AchievementStatusBadge status={achievement.status} />
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-outline-warning" onClick={onEdit}>
                <i className="bi bi-pencil me-2"></i>
                Editar
                </button>

                <button
                className="btn btn-outline-danger"
                onClick={onDeactivate}
                disabled={deactivating}
                >
                {deactivating ? "Desactivando..." : "Desactivar"}
                </button>
            </div>
            </div>
        </div>

        <div className="card-body">
            <div className="row g-4">
            <div className="col-lg-8">
                <div className="mb-4">
                <h6 className="fw-bold">Información</h6>

                <div className="row g-3 mt-2">
                    <div className="col-md-6">
                    <small className="text-muted">Tipo</small>

                    <br />

                    <AchievementTypeBadge type={achievement.type} />
                    </div>

                    <div className="col-md-6">
                    <small className="text-muted">Estado</small>

                    <br />

                    <AchievementStatusBadge status={achievement.status} />
                    </div>

                    <div className="col-md-6">
                    <small className="text-muted">Emisor</small>

                    <div className="fw-semibold">{achievement.issuer || "-"}</div>
                    </div>

                    <div className="col-md-6">
                    <small className="text-muted">Fecha</small>

                    <div className="fw-semibold">
                        {formatAchievementDate(achievement.achievedDate)}
                    </div>
                    </div>
                </div>
                </div>

                <hr />

                <h6 className="fw-bold">Descripción</h6>

                <p className="text-muted mb-0">{achievement.description || "-"}</p>
            </div>

            <div className="col-lg-4">
                <div className="card bg-light border-0">
                <div className="card-body">
                    <h6 className="fw-bold">Resumen</h6>

                    <p className="mb-2">Tipo</p>

                    <AchievementTypeBadge type={achievement.type} />

                    <hr />

                    <p className="mb-2">Estado</p>

                    <AchievementStatusBadge status={achievement.status} />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
