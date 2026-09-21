import React from "react";

const STATUS_CONFIG = {
    DRAFT: {
        label: "Borrador",
        className: "bg-secondary",
    },
    ISSUED: {
        label: "Emitido",
        className: "bg-success",
    },
    REVOKED: {
        label: "Revocado",
        className: "bg-danger",
    },
};

export default function CredentialStatusBadge({ status }) {

    const config = STATUS_CONFIG[status] || {
        label: status || "Desconocido",
        className: "bg-dark",
    };

    return (
        <span className={`badge ${config.className}`}>
            {config.label}
        </span>);
}
