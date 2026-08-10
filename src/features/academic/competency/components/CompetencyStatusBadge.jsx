import { competencyStatusLabels } from "@/shared/utils/enumUtils";

export default function CompetencyStatusBadge({ status }) {

    const variants = {
        ACTIVE: "bg-success-subtle text-success-emphasis",
        INACTIVE: "bg-secondary-subtle text-secondary",
        REVOKED: "bg-danger-subtle text-danger-emphasis",
        EXPIRED: "bg-warning-subtle text-warning-emphasis",
    };

    const icons = {
        ACTIVE: "bi-check-circle",
        INACTIVE: "bi-pause-circle",
        REVOKED: "bi-x-circle",
        EXPIRED: "bi-clock-history",
    };

    return (
        <span className={`badge rounded-pill ${variants[status]}`}>
            <i className={`bi ${icons[status]} me-1`} />
            {competencyStatusLabels[status]}
        </span>
    );
}