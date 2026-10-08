export const verificationModalityLabels = {

    PRESENCIAL: "Presencial",
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

export const verificationTypeLabels = {
    CERTIFICATE: "Certificado",
    CREDENTIAL: "Credencial",
};

export const certificateTypeLabels = {

    DEGREE: "Título académico",
    CERTIFICATION: "Certificación",
    ACADEMIC: "Grado académico",
    COURSE_COMPLETION: "Constancia de finalización",
    CUSTOM: "Otro",
    DIPLOMA: "Diploma",
    TRANSCRIPT: "Certificado de estudios"
};

export const credentialTypeLabels = {
    BACHELOR_DEGREE: "Bachiller",
    PROFESSIONAL_TITLE: "Título profesional",
    MASTER_DEGREE: "Maestría",
    DOCTORATE: "Doctorado",
};

export const getVerificationStatusLabel = (status) => {
    return (
        verificationStatusLabels[status] ||
        status ||
        "Desconocido"
    );
};

export const getVerificationStatusColor = (status) => {
    return verificationStatusColors[status] || "secondary";
};

export const getVerificationLevelLabel = (level) => {
    return (
        verificationLevelLabels[level] ||
        level ||
        "Verificación local"
    );
};

export const getVerificationSourceLabel = (source) => {
    return (
        verificationSourceLabels[source] ||
        source ||
        "Desconocido"
    );
};

export const getVerificationTypeLabel = (type) => {
    return (
        verificationTypeLabels[type] ||
        type ||
        "Desconocido"
    );
};

export const getCertificateTypeLabel = (type) => {
    return (
        certificateTypeLabels[type] ||
        type ||
        "Desconocido"
    );
};

export const getCredentialTypeLabel = (type) => {
    return (
        credentialTypeLabels[type] ||
        type ||
        "Desconocido"
    );
};

export const getResourceTypeLabel = (
    verificationType,
    resourceType,
) => {
    if (verificationType === "CREDENTIAL") {
        return getCredentialTypeLabel(resourceType);
    }

    return getCertificateTypeLabel(resourceType);
};

export const formatVerificationDate = (value) => {
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

export const formatVerificationDateOnly = (value) => {
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

export const isCredentialVerification = (record) => {
    return record?.verificationType === "CREDENTIAL";
};

export const getVerificationResourcePath = (record) => {
    if (!record?.resourcePublicId) {
        return "#";
    }

    if (isCredentialVerification(record)) {
        return `/institution/credentials/${record.resourcePublicId}`;
    }

    return `/institution/certificates/${record.resourcePublicId}`;
};

export const getVerificationHistoryPath = (record) => {
    if (!record?.resourcePublicId) {
        return "#";
    }

    if (record.verificationType === "CREDENTIAL") {
        return `/institution/verification/history/credential/${record.resourcePublicId}`;
    }

    return `/institution/verification/history/certificate/${record.resourcePublicId}`;
};