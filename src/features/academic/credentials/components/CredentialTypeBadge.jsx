import React from "react";

const TYPE_CONFIG = {
    BACHELOR_DEGREE: {
        label: "Bachiller",
        className: "bg-primary",
    },
    PROFESSIONAL_TITLE: {
        label: "Título profesional",
        className: "bg-info text-dark",
    },
    MASTER_DEGREE: {
        label: "Maestría",
        className: "bg-warning text-dark",
    },
    DOCTORATE: {
        label: "Doctorado",
        className: "bg-dark",
    },
};

export default function CredentialTypeBadge({ type }) {
    const config = TYPE_CONFIG[type] || {
        label: type || "Tipo desconocido",
        className: "bg-secondary",
    };

    return (
        <span className={`badge ${config.className}`}>
            {config.label}
        </span>);
}
