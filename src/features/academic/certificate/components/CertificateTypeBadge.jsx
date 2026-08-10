export default function CertificateTypeBadge({ type }) {

    const map = {

        DEGREE: {
            text: "Grado",
            className: "bg-primary",
        },

        DIPLOMA: {
            text: "Diploma",
            className: "bg-success",
        },

        TRANSCRIPT: {
            text: "Historial",
            className: "bg-info",
        },

        COURSE_COMPLETION: {
            text: "Curso",
            className: "bg-warning text-dark",
        },

        CERTIFICATION: {
            text: "Certificación",
            className: "bg-secondary",
        },

        CUSTOM: {
            text: "Personalizado",
            className: "bg-dark",
        },

        ACADEMIC: {
            text: "Académico",
            className: "bg-primary",
        },
    };

    const badge = map[type] ?? {
        text: type,
        className: "bg-light text-dark border",
    };

    return (
        <span className={`badge ${badge.className}`}>
            {badge.text}
        </span>
    );
}