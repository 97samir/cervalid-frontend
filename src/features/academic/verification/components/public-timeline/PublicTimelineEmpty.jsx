export default function PublicTimelineEmpty() {
    return (
        <div className="public-timeline-empty card border-0 shadow-sm mt-4">
            <div className="card-body text-center py-5">

                <i className="bi bi-clock-history fs-1 text-muted"></i>

                <h5 className="mt-3">
                    No hay eventos públicos disponibles
                </h5>

                <p className="text-muted mb-0">
                    Este certificado no tiene eventos de trayectoria
                    habilitados para consulta pública.
                </p>

            </div>
        </div>
    );
}