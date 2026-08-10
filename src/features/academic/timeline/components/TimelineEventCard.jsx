import {
  timelineEventLabels,
  getTimelineDescription,
  getTimelineReferenceLabel,
  getTimelineSourceLabel,
} from "../utils/timelineEventUtils";

import { formatTimelineDate } from "../utils/timelineDateUtils";

export default function TimelineEventCard({ event, onViewDetail }) {
  const eventInfo = timelineEventLabels[event.type] ?? {
    label: "Evento académico",
    icon: "bi-clock-history",
  };

  const isSystem = event.source === "SYSTEM";

  return (
    <article className="timeline-event-card">
      {/* =====================================================
                HEADER
            ===================================================== */}

      <div className="timeline-event-card-header">
        <div className="d-flex align-items-start gap-3">
          <div className="timeline-card-icon">
            <i className={`bi ${eventInfo.icon}`} />
          </div>

          <div className="flex-grow-1 min-w-0">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <h6 className="fw-bold mb-0">{eventInfo.label}</h6>

              <span
                className={`timeline-source-badge ${
                  isSystem
                    ? "timeline-source-system"
                    : "timeline-source-institution"
                }`}
              >
                <i
                  className={`bi ${isSystem ? "bi-cpu" : "bi-building"} me-1`}
                />

                {getTimelineSourceLabel(event.source)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-link text-decoration-none timeline-detail-button"
          onClick={() => onViewDetail(event.publicId)}
        >
          Ver detalle
          <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>

      {/* =====================================================
                DESCRIPTION
            ===================================================== */}

      <div className="timeline-event-card-description">
        {getTimelineDescription(event)}
      </div>

      {/* =====================================================
                META
            ===================================================== */}

      <div className="timeline-event-card-meta">
        <span>
          <i className="bi bi-calendar3"></i>
          {formatTimelineDate(event.eventDate)}
        </span>

        {event.referenceType && (
          <span>
            <i className="bi bi-link-45deg"></i>
            {getTimelineReferenceLabel(event.referenceType)}
          </span>
        )}
      </div>
    </article>
  );
}
