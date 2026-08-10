import { getVerificationLevelLabel } from "../utils/verificationUtils";

export default function VerificationLevelBadge({
    level,
}) {

    let icon = "bi-shield";

    switch (level) {

        case "BLOCKCHAIN_VALIDATED":
            icon = "bi-shield-check";
            break;

        case "HASH_VALIDATED":
            icon = "bi-patch-check";
            break;

        default:
            icon = "bi-shield";
    }

    return (
        <span className="badge text-bg-primary">
            <i className={`bi ${icon} me-1`} />
            {getVerificationLevelLabel(level)}
        </span>
    );
}