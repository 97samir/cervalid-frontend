export default function PublicTimelineHeader() {
    return (
        <div className="public-timeline-header">
        <div className="public-timeline-header-icon">
            <i className="bi bi-clock-history" aria-hidden="true"></i>
        </div>

        <div>
            <span className="verification-eyebrow">CERVALID</span>

            <h2 className="public-timeline-title">Trayectoria académica</h2>

            <p className="public-timeline-description">
            Consulta los principales eventos académicos registrados y habilitados
            para consulta pública.
            </p>
        </div>
        </div>
    );
}
