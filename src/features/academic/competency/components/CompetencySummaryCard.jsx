import CompetencyStatusBadge from "./CompetencyStatusBadge";
import CompetencyLevelBadge from "./CompetencyLevelBadge";
import CompetencySourceBadge from "./CompetencySourceBadge";

import { formatCompetencyDate } from "../utils/competencyDateUtils";

export default function CompetencySummaryCard({
    competency,
    onEdit,
    onDeactivate,
    deactivating,
}) {
    if (!competency) return null;

    return (
        <div className="card shadow-sm border-0 mb-4">
        {/* HEADER*/}

        <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
            <div>
                <h5 className="fw-bold mb-1">
                <i className="bi bi-lightbulb me-2 text-primary"></i>
                Competencia
                </h5>

                <div className="text-muted small mb-2">{competency.name}</div>

                <CompetencyStatusBadge status={competency.status} />
            </div>

            <div className="d-flex gap-2">
                <button
                type="button"
                className="btn btn-outline-warning"
                onClick={onEdit}
                disabled={competency.status === "INACTIVE"}
                >
                <i className="bi bi-pencil me-2"></i>
                Editar
                </button>

                <button
                type="button"
                className="btn btn-outline-danger"
                onClick={onDeactivate}
                disabled={deactivating || competency.status === "INACTIVE"}
                >
                {deactivating ? (
                    <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Desactivando...
                    </>
                ) : (
                    <>
                    <i className="bi bi-trash me-2"></i>
                    Desactivar
                    </>
                )}
                </button>
            </div>
            </div>
        </div>

        {/* BODY */}

        <div className="card-body">
            <div className="row g-4">
            <div className="col-lg-8">
                <div className="mb-4">
                <h6 className="fw-bold mb-3">
                    <i className="bi bi-info-circle me-2 text-primary"></i>
                    Información
                </h6>

                <div className="row g-3">
                    <div className="col-md-6">
                    <small className="text-muted d-block mb-1">Nivel</small>

                    <CompetencyLevelBadge level={competency.level} />
                    </div>

                    <div className="col-md-6">
                    <small className="text-muted d-block mb-1">Origen</small>

                    <CompetencySourceBadge source={competency.source} />
                    </div>

                    <div className="col-md-6">
                    <small className="text-muted d-block mb-1">Emisor</small>

                    <span className="fw-semibold">
                        {competency.issuer || "-"}
                    </span>
                    </div>

                    <div className="col-md-6">
                        <small className="text-muted d-block mb-1">
                            Fecha de adquisición
                        </small>

                        <span className="fw-semibold">
                            {formatCompetencyDate(competency.acquiredDate)}
                        </span>
                    </div>

                    <div className="col-md-6">
                    <small className="text-muted d-block mb-1">
                        Periodo académico
                    </small>

                    <span className="fw-semibold">
                        {competency.academicPeriod ||
                        "General / Sin periodo específico"}
                    </span>
                    </div>
                </div>
                </div>

                <hr />

                <div>
                <h6 className="fw-bold mb-3">
                    <i className="bi bi-card-text me-2 text-primary"></i>
                    Descripción
                </h6>

                <p className="mb-0 text-muted">{competency.description || "-"}</p>
                </div>
            </div>

            {/* PANEL DERECHO  */}

            <div className="col-lg-4">
                <div className="card border-0 bg-light">
                <div className="card-body">
                    <h6 className="fw-bold mb-3">
                    <i className="bi bi-award me-2 text-primary"></i>
                    Resumen
                    </h6>

                    <div className="mb-3">
                    <small className="text-muted d-block">Estado</small>

                    <CompetencyStatusBadge status={competency.status} />
                    </div>

                    <div className="mb-3">
                    <small className="text-muted d-block">Nivel</small>

                    <CompetencyLevelBadge level={competency.level} />
                    </div>

                    <div className="mb-3">
                    <small className="text-muted d-block">Fuente</small>

                    <CompetencySourceBadge source={competency.source} />
                    </div>

                    <div>
                    <small className="text-muted d-block">Periodo</small>

                    <span className="fw-semibold">
                        {competency.academicPeriod || "General"}
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
