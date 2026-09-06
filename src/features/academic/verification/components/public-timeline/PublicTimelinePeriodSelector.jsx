import "../../styles/publicTimelinePeriodSelector.css";

export default function PublicTimelinePeriodSelector({
    periods,
    selectedPeriod,
    onSelect,
}) {
    if (!periods.length) {
        return null;
    }

    return (
        <div className="public-timeline-period-selector">
            <div className="public-timeline-period-track">
                {periods.map((period) => {
                const isActive = period.key === selectedPeriod;

                return (
                    <button
                        key={period.key}
                        type="button"
                        className={`public-timeline-period ${
                            isActive ? "is-active" : ""
                        }`}
                        onClick={() => onSelect(period.key)}
                        aria-pressed={isActive}
                    >
                        <span className="public-timeline-period-dot">
                            <span />
                        </span>

                        <span className="public-timeline-period-label">
                            {period.label}
                        </span>
                    </button>
                );
                })}
            </div>
        </div>
    );
}
