import { achievementTypeLabels } from "@/shared/utils/enumUtils";

const badgeClasses = {

    AWARD: "bg-warning-subtle text-warning",
    CERTIFICATION: "bg-primary-subtle text-primary",
    SCHOLARSHIP: "bg-success-subtle text-success",
    COMPETITION: "bg-danger-subtle text-danger",
    RESEARCH: "bg-info-subtle text-info",
    VOLUNTEERING: "bg-secondary-subtle text-secondary",
    OTHER: "bg-light text-dark",
};

const icons = {

    AWARD: "bi-trophy",
    CERTIFICATION: "bi-patch-check",
    SCHOLARSHIP: "bi-mortarboard",
    COMPETITION: "bi-award",
    RESEARCH: "bi-search",
    VOLUNTEERING: "bi-people",
    OTHER: "bi-bookmark-star",
};

export default function AchievementTypeBadge({ type }) {

    return (
        <span className={`badge ${badgeClasses[type] || 
            "bg-light text-dark"}`}>

            <i className={`bi ${icons[type]} me-1`}></i>
            {achievementTypeLabels[type] ?? type}
            
        </span>
    );
}
