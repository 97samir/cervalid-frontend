import { achievementStatusLabels } from "@/shared/utils/enumUtils";

const badgeClasses = {

    ACTIVE: "bg-success-subtle text-success",
    INACTIVE: "bg-secondary-subtle text-secondary",
    ARCHIVED: "bg-dark-subtle text-dark",
};

export default function AchievementStatusBadge({ status }) {

    return (

        <span className={`badge 
                            ${badgeClasses[status] || 
                            "bg-light text-dark"}`
                        }
        >
            {achievementStatusLabels[status] ?? status}
        </span>
    );
}
