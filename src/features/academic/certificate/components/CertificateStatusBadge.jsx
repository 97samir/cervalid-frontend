export default function CertificateStatusBadge({ status }) {

    const map = {

        DRAFT: {text: "Borrador",className: "bg-secondary", },
        ISSUED: {text: "Emitido",className: "bg-success", },
        VERIFIED: {text: "Verificado",className: "bg-primary", },
        REVOKED: { text: "Revocado",className: "bg-danger", },
    };

    const badge = map[status] ?? {
        text: status,
        className: "bg-dark",
    };

    return (
        <span className={`badge ${badge.className}`}>
            {badge.text}
        </span>
    );
}