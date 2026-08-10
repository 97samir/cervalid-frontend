export const verificationModalityLabels = {

    PRESENTIAL: "Presencial",
    VIRTUAL: "Virtual",
    SEMIPRESENCIAL: "Semipresencial",
};

export const verificationStatusLabels = {

    VALID: "Válido",
    INVALID: "Inválido",
    REVOKED: "Revocado",
    NOT_FOUND: "No encontrado",
};

export const verificationStatusColors = {

    VALID: "success",
    INVALID: "danger",
    REVOKED: "warning",
    NOT_FOUND: "secondary",
};

// Nivel de verificación
export const verificationLevelLabels = {

    LOCAL: "Verificación local",
    HASH_VALIDATED: "Hash validado",
    BLOCKCHAIN_VALIDATED: "Blockchain validado",
};


export const verificationSourceLabels = {

    PUBLIC_API: "Portal público",
    ADMIN_PANEL: "Panel administrativo",
    INSTITUTION_PORTAL: "Portal institucional",
    BULK_PROCESS: "Proceso masivo",
    BLOCKCHAIN_VALIDATOR: "Blockchain",
    INTERNAL_SYSTEM: "Sistema interno",
};

export const certificateTypeLabels = {

    DEGREE: "Título académico",
    CERTIFICATION: "Certificación",
};

export const getVerificationStatusLabel = (status) =>
    verificationStatusLabels[status] ?? status;

export const getVerificationStatusColor = (status) =>
    verificationStatusColors[status] ?? "secondary";

export const getVerificationLevelLabel = (level) =>
    verificationLevelLabels[level] ?? level;

export const getVerificationSourceLabel = (source) =>
    verificationSourceLabels[source] ?? source;

export const getCertificateTypeLabel = (type) =>
    certificateTypeLabels[type] ?? type;

export const getVerificationModalityLabel = (modality) =>
    verificationModalityLabels[modality] ?? modality;
/*
|--------------------------------------------------------------------------
| Formateadores
*/

export const formatVerificationDate = (value) => {

    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};


export const formatVerificationDateOnly = (value) => {

    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "long",
    }).format(date);
};