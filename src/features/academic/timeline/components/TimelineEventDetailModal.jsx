import { useTimelineEvent } from "../hooks/useTimelineEvent";

import {
    timelineEventLabels,
    getTimelineReferenceLabel,
    getTimelineSourceLabel,
    getTimelineMetadataLabel,
    formatTimelineMetadata,
    getTimelineDescription,
} from "../utils/timelineEventUtils";

import { formatTimelineDate } from "../utils/timelineDateUtils";

import "../styles/timeline-modal.css";

export default function TimelineEventDetailModal({ publicId, onClose }) {
    const { data: event, isLoading, error } = useTimelineEvent(publicId);

    if (!publicId) {
        return null;
    }

    const eventInfo = timelineEventLabels[event?.type] ?? {
        label: "Evento académico",
        icon: "bi-clock-history",
    };

    return (
        <div
        className="timeline-modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="timeline-modal-title"
        onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
            onClose();
            }
        }}
        >
        <div className="timeline-modal-dialog">
            {/* HEADER */}

            <div className="timeline-modal-header">
            <div className="d-flex align-items-center gap-3">
                <div className="timeline-modal-icon">
                <i className={`bi ${eventInfo.icon}`}></i>
                </div>

                <div>
                <h5 id="timeline-modal-title" className="fw-bold mb-1">
                    {eventInfo.label}
                </h5>

                <div className="small text-muted">
                    Detalle de la actividad académica
                </div>
                </div>
            </div>

            <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onClose}
            />
            </div>

            {/* BODY */}

            <div className="timeline-modal-body">
            {/* LOADING */}

            {isLoading && (
                <div className="timeline-modal-state">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando información...</span>
                </div>

                <p className="text-muted mb-0 mt-3">
                    Cargando información del evento...
                </p>
                </div>
            )}

            {/* ERROR */}

            {error && (
                <div className="alert alert-danger mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                No se pudo cargar el detalle del evento.
                </div>
            )}

            {/* EVENT */}

            {event && !isLoading && !error && (
                <>
                {/*  DESCRIPTION */}

                <div className="timeline-detail-description">
                    <div className="timeline-detail-section-label">Descripción</div>

                    <div className="timeline-detail-description-text">
                    {getTimelineDescription(event)}
                    </div>
                </div>

                {/* GENERAL INFORMATION */}

                <div className="timeline-detail-section">
                    <div className="timeline-detail-section-title">
                    <i className="bi bi-info-circle me-2"></i>
                    Información del evento
                    </div>

                    <div className="row g-3">
                    {/* FECHA */}

                    <div className="col-12 col-md-6">

                        <div className="timeline-detail-field">

                            <div className="timeline-detail-field-icon">
                                <i className="bi bi-calendar3"></i>
                            </div>
                            <div className="timeline-detail-field-content">

                                <div className="timeline-detail-field-label">
                                    Fecha del evento
                                </div>

                                <div className="timeline-detail-field-value">
                                    {formatTimelineDate(event.eventDate)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ORIGEN */}

                    <div className="col-12 col-md-6">
                        <div className="timeline-detail-field">
                        <div className="timeline-detail-field-icon">
                            <i className="bi bi-diagram-3"></i>
                        </div>

                        <div className="timeline-detail-field-content">
                            <div className="timeline-detail-field-label">
                            Origen
                            </div>

                            <div className="timeline-detail-field-value">
                            {getTimelineSourceLabel(event.source)}
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* REFERENCIA */}

                    <div className="col-12 col-md-6">
                        <div className="timeline-detail-field">
                        <div className="timeline-detail-field-icon">
                            <i className="bi bi-link-45deg"></i>
                        </div>

                        <div className="timeline-detail-field-content">
                            <div className="timeline-detail-field-label">
                            Tipo de referencia
                            </div>

                            <div className="timeline-detail-field-value">
                            {getTimelineReferenceLabel(event.referenceType)}
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* IDENTIFICADOR */}

                    <div className="col-12 col-md-6">
                        <div className="timeline-detail-field">
                        <div className="timeline-detail-field-icon">
                            <i className="bi bi-fingerprint"></i>
                        </div>

                        <div className="timeline-detail-field-content min-w-0">
                            <div className="timeline-detail-field-label">
                            Identificador de referencia
                            </div>

                            <div className="timeline-detail-field-value font-monospace text-break">
                            {event.referenceId || "-"}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* METADATA */}

                {event.metadataJson &&
                    Object.keys(event.metadataJson).length > 0 && (
                    <div className="timeline-detail-section">
                        <div className="timeline-detail-section-title">
                            <i className="bi bi-list-check me-2"></i>
                            Información adicional
                        </div>

                        <div className="row g-3">
                        {Object.entries(event.metadataJson).map(
                            ([key, value]) => (
                            <div className="col-12 col-md-6" key={key}>
                                <div className="timeline-metadata-card">
                                    <div className="timeline-metadata-label">
                                        {getTimelineMetadataLabel(key)}
                                    </div>

                                    <div className="timeline-metadata-value text-break">
                                        {formatTimelineMetadata(key, value)}
                                    </div>

                                </div>
                            </div>
                            ),
                        )}
                        </div>
                    </div>
                    )}
                </>
            )}
            </div>

            {/*  FOOTER */}

            <div className="timeline-modal-footer">
            <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={onClose}
            >
                Cerrar
            </button>
            </div>
        </div>
        </div>
    );
}
