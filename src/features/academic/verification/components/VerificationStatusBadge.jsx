import {
    getVerificationStatusColor,
    getVerificationStatusLabel,
} from "../utils/verificationUtils";

export default function VerificationStatusBadge({
    status,
}) {

    const color = getVerificationStatusColor(status);

    return (
        <span className={`badge text-bg-${color}`}>
            {getVerificationStatusLabel(status)}
        </span>
    );
}