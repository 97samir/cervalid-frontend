export default function VerificationSummaryItem({
    label,
    value,
    valueClass = "",
}) {
    const displayValue =
        value === null ||
        value === undefined ||
        value === ""
            ? "-"
            : value;

    return (
        <div className="verification-summary-item">
            <span className="verification-summary-label">
                {label}
            </span>

            <span
                className={`verification-summary-value ${valueClass}`}
            >
                {displayValue}
            </span>
        </div>
    );
}