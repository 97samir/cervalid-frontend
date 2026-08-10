export default function TranscriptStatusBadge({ status }) {

    const variants = {
        DRAFT: "bg-secondary-subtle text-secondary",
        FINALIZED: "bg-warning-subtle text-warning-emphasis",
        ISSUED: "bg-success-subtle text-success-emphasis",
    };

    const labels = {
        DRAFT: "Borrador",
        FINALIZED: "Finalizado",
        ISSUED: "Emitido",
    };

    const icons = {
        DRAFT: "bi-pencil-square",
        FINALIZED: "bi-check-circle",
        ISSUED: "bi-patch-check",
    };

    return (

        <span className={`badge rounded-pill ${variants[status]}`}>

            <i className={`bi ${icons[status]} me-1`} />
            {labels[status]}

        </span>
            );
}
