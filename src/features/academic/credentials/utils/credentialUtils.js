export const credentialTypeLabels = {
    BACHELOR_DEGREE: "Bachiller",
    PROFESSIONAL_TITLE: "Título profesional",
    MASTER_DEGREE: "Maestría",
    DOCTORATE: "Doctorado",
};

export const credentialStatusLabels = {
    DRAFT: "Borrador",
    ISSUED: "Emitido",
    REVOKED: "Revocado",
};

export const getCredentialTypeLabel = (type) => {
    return credentialTypeLabels[type] || type || "Desconocido";
};

export const getCredentialStatusLabel = (status) => {
    return credentialStatusLabels[status] || status || "Desconocido";
};

export const formatCredentialDate = (value) => {

    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "medium",
    }).format(date);
};

export const formatCredentialDateTime = (value) => {

    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};
