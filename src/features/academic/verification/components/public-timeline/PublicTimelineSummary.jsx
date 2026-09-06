export default function PublicTimelineSummary({ 
    eventCount, 
    periodLabel 
}) {
    return (
        <div className="public-timeline-summary card border-0 shadow-sm mt-4">
        <div className="card-body">
            <div className="row g-4">
            <div className="col-12 col-md-4">
                <div className="public-timeline-stat">
                <span>Eventos registrados</span>

                <strong>{eventCount}</strong>
                </div>
            </div>

            <div className="col-12 col-md-4">
                <div className="public-timeline-stat">
                <span>Periodo académico</span>

                <strong>{periodLabel}</strong>
                </div>
            </div>

            <div className="col-12 col-md-4">
                <div className="public-timeline-stat">
                <span>Estado</span>

                <strong>
                    <i className="bi bi-shield-check me-2"></i>
                    Registro público
                </strong>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
