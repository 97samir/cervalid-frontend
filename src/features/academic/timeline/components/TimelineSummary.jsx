export default function TimelineSummary({ 
    summary, 
    hasFilters = false 
}) {
    const totalEvents = summary?.totalEvents ?? 0;

    return (
        <div className="timeline-summary">
        {/* =====================================================
                            ESTADO
                        ===================================================== */}

        <div className="timeline-summary-card">
            <div className="timeline-summary-card-header">
            <span>Estado de trazabilidad</span>

            <i className="bi bi-shield-check text-success"></i>
            </div>

            <div className="timeline-status">
            <span className="timeline-status-dot"></span>

            <div>
                <strong>Activa</strong>

                <small>Historial académico disponible</small>
            </div>
            </div>
        </div>

        {/* =====================================================
                            ESTADÍSTICAS
                        ===================================================== */}

        <div className="timeline-summary-card">
            <div className="timeline-summary-card-header">
            <span>Resumen del estudiante</span>

            <i className="bi bi-bar-chart-line text-primary"></i>
            </div>

            <div className="timeline-stat-list">
            <div className="timeline-stat-item">
                <div className="timeline-stat-icon bg-primary-subtle text-primary">
                <i className="bi bi-clock-history"></i>
                </div>

                <div>
                <small>Eventos registrados</small>
                <strong>{totalEvents}</strong>
                </div>
            </div>

            <div className="timeline-stat-item">
                <div className="timeline-stat-icon bg-info-subtle text-info">
                <i className="bi bi-person-plus"></i>
                </div>

                <div>
                <small>Registro del estudiante</small>
                <strong>{summary?.studentCreated ?? 0}</strong>
                </div>
            </div>

            <div className="timeline-stat-item">
                <div className="timeline-stat-icon bg-secondary-subtle text-secondary">
                <i className="bi bi-person-vcard"></i>
                </div>

                <div>
                <small>Perfil académico</small>
                <strong>{summary?.profileCreated ?? 0}</strong>
                </div>
            </div>

            <div className="timeline-stat-item">
                <div className="timeline-stat-icon bg-warning-subtle text-warning">
                <i className="bi bi-journal-text"></i>
                </div>

                <div>
                <small>Historiales académicos</small>
                <strong>{summary?.transcriptCreated ?? 0}</strong>
                </div>
            </div>

            <div className="timeline-stat-item">
                <div className="timeline-stat-icon bg-success-subtle text-success">
                <i className="bi bi-patch-check"></i>
                </div>

                <div>
                <small>Certificados emitidos</small>
                <strong>{summary?.certificateIssued ?? 0}</strong>
                </div>
            </div>

            <div className="timeline-stat-item">
                <div className="timeline-stat-icon bg-dark-subtle text-dark">
                <i className="bi bi-pencil-square"></i>
                </div>

                <div>
                <small>Eventos manuales</small>
                <strong>{summary?.manualEvents ?? 0}</strong>
                </div>
            </div>
            </div>
        </div>

        {/* =====================================================
                            FILTROS
                        ===================================================== */}

        {hasFilters && (
            <div className="timeline-summary-card">
            <div className="timeline-summary-card-header">
                <span>Vista filtrada</span>

                <i className="bi bi-funnel text-primary"></i>
            </div>

            <div className="timeline-summary-empty">
                Los filtros están aplicados al historial mostrado. El resumen
                corresponde al estudiante completo.
            </div>
            </div>
        )}

        {/* =====================================================
                            INTEGRIDAD
                        ===================================================== */}

        <div className="timeline-summary-card timeline-integrity-card">
            <div className="timeline-summary-card-header">
            <span>Integridad del historial</span>

            <i className="bi bi-shield-check text-success"></i>
            </div>

            <div className="timeline-integrity-list">
            <div>
                <i className="bi bi-check-circle-fill"></i>

                <span>Eventos registrados institucionalmente</span>
            </div>

            <div>
                <i className="bi bi-check-circle-fill"></i>

                <span>Historial cronológico disponible</span>
            </div>

            <div>
                <i className="bi bi-check-circle-fill"></i>

                <span>Eventos consultables individualmente</span>
            </div>
            </div>
        </div>
        </div>
    );
}
