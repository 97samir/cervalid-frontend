import { timelineReferenceLabels } from "../utils/timelineEventUtils";

export default function TimelineSummary({
    data,
    events = [],
    hasFilters = false,
}) {
    const totalEvents = data?.totalElements ?? 0;

    const categoryCounts = events.reduce((acc, event) => {
        const category = event.referenceType;

        if (!category) {
        return acc;
        }

        acc[category] = (acc[category] ?? 0) + 1;

        return acc;
    }, {});

    const categories = Object.entries(categoryCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5);

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
            <span>Resumen</span>

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
                <i className="bi bi-file-earmark-text"></i>
                </div>

                <div>
                <small>Eventos mostrados</small>
                <strong>{events.length}</strong>
                </div>
            </div>

            <div className="timeline-stat-item">
                <div className="timeline-stat-icon bg-secondary-subtle text-secondary">
                <i className="bi bi-funnel"></i>
                </div>

                <div>
                <small>Filtros</small>
                <strong>{hasFilters ? "Aplicados" : "Ninguno"}</strong>
                </div>
            </div>
            </div>
        </div>

        {/* =====================================================
                    CATEGORÍAS
                ===================================================== */}

        <div className="timeline-summary-card">
            <div className="timeline-summary-card-header">
            <span>Actividad por categoría</span>

            <i className="bi bi-diagram-3 text-primary"></i>
            </div>

            {categories.length === 0 ? (
            <div className="timeline-summary-empty">
                No hay categorías disponibles.
            </div>
            ) : (
            <div className="timeline-category-list">
                {categories.map(([type, count]) => (
                <div key={type} className="timeline-category-item">
                    <span>{timelineReferenceLabels[type] ?? type}</span>

                    <span className="timeline-category-count">{count}</span>
                </div>
                ))}
            </div>
            )}

            {events.length > 0 && totalEvents > events.length && (
            <small className="text-muted d-block mt-3">
                Las categorías corresponden a los eventos de la página actual.
            </small>
            )}
        </div>

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
