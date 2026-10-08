const STATUS_CONFIG = {
    VALID: {
        className: "verification-status-valid",
        icon: "bi-check-circle-fill",
    },

    REVOKED: {
        className: "verification-status-revoked",
        icon: "bi-exclamation-triangle-fill",
    },

    INVALID: {
        className: "verification-status-invalid",
        icon: "bi-x-circle-fill",
    },

    NOT_FOUND: {
        className: "verification-status-invalid",
        icon: "bi-x-circle-fill",
    },
};

export default function VerificationStatusValue({
    status,
    label,
}) {
    const config =
        STATUS_CONFIG[status] ??
        STATUS_CONFIG.INVALID;

    return (
        <span
            className={`verification-status-badge ${config.className}`}
        >
            <i
                className={`bi ${config.icon}`}
                aria-hidden="true"
            />

            {label}
        </span>
    );
}