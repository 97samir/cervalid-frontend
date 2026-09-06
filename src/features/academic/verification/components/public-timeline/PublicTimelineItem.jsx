import {
    getTimelineEventConfig,
    formatTimelineDate,
    getTimelineEventDetail,
} from "../../utils/publicTimelineUtils";

export default function PublicTimelineItem({ 
    event 
}) {

    const config = getTimelineEventConfig(event.type);
    const detail = getTimelineEventDetail(event);

    return (
        <article className="public-timeline-item">
        {/*  MARCADOR */}

        <div className="public-timeline-marker">
            <div className="public-timeline-icon">
            <i className={`bi ${config.icon}`} aria-hidden="true" />
            </div>
        </div>

        {/* CONTENIDO */}

        <div className="public-timeline-content">
            {/* FECHA */}

            <time className="public-timeline-date" dateTime={event.eventDate}>
            {formatTimelineDate(event.eventDate)}
            </time>

            {/* EVENTO */}

            <div className="public-timeline-event">
            <div className="public-timeline-event-main">
                {/* CATEGORÍA */}

                <span className="public-timeline-category">{config.category}</span>

                {/* TÍTULO */}

                <h5 className="public-timeline-event-title">{config.title}</h5>

                {/* INFORMACIÓN DEL EVENTO */}

                {detail && (
                <div className="public-timeline-description">
                    {detail.map((item, index) => (
                    <div
                        key={`${item.label}-${index}`}
                        className="public-timeline-detail"
                    >
                        {item.label && (
                        <span className="public-timeline-detail-label">
                            {item.label}:
                        </span>
                        )}

                        <span className="public-timeline-detail-value">
                        {item.value}
                        </span>
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* ESTADO */}

            <i
                className="bi bi-check-circle-fill public-timeline-check"
                aria-hidden="true"
            />
            </div>
        </div>
        </article>
    );
}
