import { competencyLevelLabels } from "@/shared/utils/enumUtils";

export default function CompetencyLevelBadge({ level }) {

    const variants = {
        BASIC: "bg-secondary-subtle text-secondary",
        INTERMEDIATE: "bg-primary-subtle text-primary-emphasis",
        ADVANCED: "bg-warning-subtle text-warning-emphasis",
        EXPERT: "bg-success-subtle text-success-emphasis",
    };

    const icons = {
        BASIC: "bi-1-circle",
        INTERMEDIATE: "bi-2-circle",
        ADVANCED: "bi-3-circle",
        EXPERT: "bi-stars",
    };

    return (
        <span className={`badge rounded-pill ${variants[level]}`}>
            <i className={`bi ${icons[level]} me-1`} />
            {competencyLevelLabels[level]}
        </span>
    );
}