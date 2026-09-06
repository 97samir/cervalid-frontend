import PublicTimelineItem from "./PublicTimelineItem";
import { getTimelinePeriodCount } from "../../utils/publicTimelineUtils";

export default function PublicTimelinePeriod({
    period,
    events,
}) {
    const isGeneral = period.key === "GENERAL";

    return (
        <section className="public-timeline-period-content">

            <div className="public-timeline-period-header">

                <div>
                    <span className="public-timeline-category">
                        {isGeneral
                            ? "TRAYECTORIA GENERAL"
                            : "PERÍODO ACADÉMICO"}
                    </span>

                    <h3 className="public-timeline-period-title">
                        {period.label}
                    </h3>

                    <p className="public-timeline-period-description">
                        {period.year && `${period.year} · `}
                        {getTimelinePeriodCount(events)}
                    </p>
                </div>

                <div className="public-timeline-period-icon">
                    <i
                        className="bi bi-calendar3"
                        aria-hidden="true"
                    />
                </div>

            </div>

            <div className="public-timeline-container">

                {events.map((event) => (
                    <PublicTimelineItem
                        key={event.publicId}
                        event={event}
                    />
                ))}

            </div>

        </section>
    );
}