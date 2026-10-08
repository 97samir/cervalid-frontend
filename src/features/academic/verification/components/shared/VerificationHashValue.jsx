export default function VerificationHashValue({
    value,
}) {
    if (!value) {
        return (
            <span className="text-muted">
                No disponible
            </span>
        );
    }

    return (
        <code className="verification-hash-value">
            {value}
        </code>
    );
}