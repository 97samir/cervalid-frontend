import TimelineEventCard from "./TimelineEventCard";

export default function TimelineItem({ event, onViewDetail }) {
    return (
        <div className="timeline-item">
            <div className="timeline-marker">
                {/* <i className="bi bi-circle-fill"></i> */}
                <span></span>
            </div>

            <TimelineEventCard 
                event={event} 
                onViewDetail={onViewDetail} 
            />
        </div>
    );
}
