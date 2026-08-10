import { Link } from "react-router-dom";

export default function TimelineEventHeaders({
    studentPublicId,
    totalElements = 0,
}) {
    return (
        <header className="timeline-page-header">
        <div className="timeline-page-header-main">
            <div className="timeline-page-title-icon">
            <i className="bi bi-clock-history"></i>
            </div>

            <div>
            <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                <h2 className="mb-0 fw-bold">Trazabilidad académica</h2>

                <span className="timeline-event-count">
                {totalElements} eventos
                </span>
            </div>

            <p className="text-muted mb-0">
                Historial cronológico de la actividad académica registrada del
                estudiante.
            </p>
            </div>
        </div>

        <Link
            to={`/institution/students/${studentPublicId}`}
            className="btn btn-outline-secondary"
        >
            <i className="bi bi-arrow-left me-2"></i>
            Volver al estudiante
        </Link>
        </header>
    );
}
