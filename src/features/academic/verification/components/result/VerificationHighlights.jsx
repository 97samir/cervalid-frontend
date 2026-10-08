import { formatVerificationDateOnly } from "../../utils/verificationUtils";

function HighlightItem({ icon, label, value }) {
    const displayValue =
        value === null || value === undefined || value === "" ? "-" : value;

    return (
        <div className="verification-highlight">
        <div className="verification-highlight-icon">
            <i className={`bi ${icon}`} aria-hidden="true" />
        </div>

        <div className="verification-highlight-content">
            <span>{label}</span>

            <strong>{displayValue}</strong>
        </div>
        </div>
    );
}

export default function VerificationHighlights({ 
    result 
}) {

    const {
        studentName,
        institutionName,
        resourceNumber,
        awardedAt,
        resourceNumberLabel,
    } = result;

    return (
        <div className="verification-highlight-grid mt-4">
        <HighlightItem
            icon="bi-person-vcard"
            label="Estudiante"
            value={studentName}
        />

        <HighlightItem
            icon="bi-building"
            label="Institución"
            value={institutionName}
        />

        <HighlightItem
            icon="bi-file-earmark-check"
            label={resourceNumberLabel ?? "Número de documento"}
            value={resourceNumber}
        />

        <HighlightItem
            icon="bi-calendar-check"
            label="Fecha de otorgamiento"
            value={formatVerificationDateOnly(awardedAt)}
        />
        </div>
    );
}
