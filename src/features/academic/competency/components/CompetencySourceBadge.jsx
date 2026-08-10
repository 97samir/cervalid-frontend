import { competencySourceLabels } from "@/shared/utils/enumUtils";

export default function CompetencySourceBadge({ source }) {

    const variants = {
        MANUAL: "bg-primary-subtle text-primary-emphasis",
        TRANSCRIPT: "bg-info-subtle text-info-emphasis",
        ACHIEVEMENT: "bg-warning-subtle text-warning-emphasis",
        CERTIFICATE: "bg-success-subtle text-success-emphasis",
    };

    const icons = {
        MANUAL: "bi-pencil-square",
        TRANSCRIPT: "bi-journal-bookmark",
        ACHIEVEMENT: "bi-trophy",
        CERTIFICATE: "bi-patch-check",
    };

    return (
        <span className={`badge rounded-pill ${variants[source]}`}>
            <i className={`bi ${icons[source]} me-1`} />
            {competencySourceLabels[source]}
        </span>
    );
}