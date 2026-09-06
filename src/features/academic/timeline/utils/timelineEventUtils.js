import {
    academicProgramLabels,
    academicFacultyLabels,
    modalityLabels,
} from "@/shared/utils/enumUtils";


export const timelineEventLabels = {
    STUDENT_REGISTERED: {
        label: "Estudiante registrado",
        icon: "bi-person-plus",
    },

    PROFILE_CREATED: {
        label: "Perfil académico creado",
        icon: "bi-person-vcard",
    },

    PROFILE_UPDATED: {
        label: "Perfil académico actualizado",
        icon: "bi-person-vcard",
    },

    TRANSCRIPT_CREATED: {
        label: "Historial académico creado",
        icon: "bi-journal-text",
    },

    TRANSCRIPT_FINALIZED: {
        label: "Historial académico finalizado",
        icon: "bi-check2-circle",
    },

    TRANSCRIPT_ISSUED: {
        label: "Historial académico emitido",
        icon: "bi-file-earmark-check",
    },

    TRANSCRIPT_REVOKED: {
        label: "Historial académico revocado",
        icon: "bi-file-earmark-x",
    },

    TRANSCRIPT_ITEM_ADDED: {
        label: "Curso agregado",
        icon: "bi-journal-plus",
    },

    TRANSCRIPT_ITEM_UPDATED: {
        label: "Curso actualizado",
        icon: "bi-pencil-square",
    },

    TRANSCRIPT_ITEM_REMOVED: {
        label: "Curso eliminado",
        icon: "bi-journal-minus",
    },

    CERTIFICATE_ISSUED: {
        label: "Certificado emitido",
        icon: "bi-patch-check",
    },

    CERTIFICATE_REVOKED: {
        label: "Certificado revocado",
        icon: "bi-patch-exclamation",
    },

    SKILL_EARNED: {
        label: "Habilidad obtenida",
        icon: "bi-lightning",
    },

    COMPETENCY_ACQUIRED: {
        label: "Competencia adquirida",
        icon: "bi-award",
    },

    COMPETENCY_CREATED: {
        label: "Competencia creada",
        icon: "bi-award",
    },

    COMPETENCY_UPDATED: {
        label: "Competencia actualizada",
        icon: "bi-pencil-square",
    },

    COMPETENCY_DEACTIVATED: {
        label: "Competencia desactivada",
        icon: "bi-award",
    },

    ACHIEVEMENT_EARNED: {
        label: "Logro obtenido",
        icon: "bi-trophy",
    },

    ACHIEVEMENT_DEACTIVATED: {
        label: "Logro desactivado",
        icon: "bi-trophy",
    },

    ACHIEVEMENT_UPDATED: {
        label: "Logro actualizado",
        icon: "bi-pencil-square",
    },

    BADGE_GRANTED: {
        label: "Insignia otorgada",
        icon: "bi-patch-check",
    },

    MANUAL_EVENT: {
        label: "Evento manual",
        icon: "bi-pencil-square",
    },
};

/* Tipo de referencia */
export const timelineReferenceLabels = {

    STUDENT: "Estudiante",
    PROFILE: "Perfil académico",
    TRANSCRIPT: "Historial académico",
    CERTIFICATE: "Certificado académico",
    COMPETENCY: "Competencia",
    ACHIEVEMENT: "Logro",
    BADGE: "Insignia",
    MANUAL: "Registro manual",
};

// Origen del evento
export const timelineSourceLabels = {
    SYSTEM: "Sistema",
    INSTITUTION_ADMIN: "Administrador institucional",
};

// Etiquetas de metadata
export const timelineMetadataLabels = {
    studentCode: "Código del estudiante",
    admissionDate: "Fecha de admisión",
    graduationDate: "Fecha de graduación",

    cycle: "Ciclo académico",
    faculty: "Facultad",
    modality: "Modalidad de estudio",
    program: "Programa académico",
    awardedAt: "Fecha de Otorgamiento",
    period: "Periodo académico",
    courses: "Cursos",
    certificateNumber: "Número de certificado",
    type: "Tipo",
    title: "Título",
    issuer: "Emisor",
    status: "Estado",
    achievedDate: "Fecha de obtención",
    level: "Nivel",
    source: "Origen",
    competency: "Competencia",
};

//Valores de metadata
export const timelineMetadataValueLabels = {
    DEGREE: "Título académico",
    CERTIFICATION: "Certificación",
    BASIC: "Básico",
    INTERMEDIATE: "Intermedio",
    ADVANCED: "Avanzado",
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    MANUAL: "Registro manual",
    SYSTEM: "Sistema",
    VIRTUAL: "Virtual",
    PRESENCIAL: "Presencial",
    SEMIPRESENCIAL: "Semipresencial"
};

//  Helpers
export const getTimelineEventLabel = (type) => {
    return timelineEventLabels[type]?.label ?? "Evento académico";
};

export const getTimelineEventIcon = (type) => {
    return timelineEventLabels[type]?.icon ?? "bi-clock-history";
};

export const getTimelineReferenceLabel = (referenceType) => {
    return timelineReferenceLabels[referenceType] ?? referenceType ?? "-";
};

export const getTimelineSourceLabel = (source) => {
    return timelineSourceLabels[source] ?? source ?? "-";
};

export const getTimelineMetadataLabel = (key) => {
    return timelineMetadataLabels[key] ?? key;
};

export const getTimelineMetadataValueLabel = (value) => {
    return timelineMetadataValueLabels[value] ?? value;
};

//Formatear valores de metadata
export const formatTimelineMetadata = (key, value) => {

    if (value === null || value === undefined || value === "") {
        return "-";
    }

    // fechas
    if (
        key === "awardedAt" ||
        key === "achievedDate" ||
        key === "admissionDate" ||
        key === "graduationDate") {
        const date = new Date(value);

        if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat("es-PE", {
            dateStyle: "medium",
        }).format(date);
        }
    }

    if (typeof value === "boolean") {
        return value ? "Sí" : "No";
    }

    if (typeof value === "object") {
        return JSON.stringify(value);
    }
    
    // enums academicos
    if (key === "program") { 
        return academicProgramLabels[value] ?? value; 
    } 
    if (key === "faculty") { 
        return academicFacultyLabels[value] ?? value; 
    } 
    if (key === "modality") { 
        return modalityLabels[value] ?? value; 
    }
    
    return getTimelineMetadataValueLabel(value);
};

/*
|--------------------------------------------------------------------------
| Descripción amigable
|--------------------------------------------------------------------------
*/

export const getTimelineDescription = (event) => {
    const metadata = event?.metadataJson ?? {};

    switch (event?.type) {
        case "STUDENT_REGISTERED":
        return "El estudiante fue registrado en la institución.";

        case "PROFILE_CREATED":
        return "Se creó el perfil académico del estudiante.";

        case "PROFILE_UPDATED":
        return "Se actualizó el perfil académico del estudiante.";

        case "TRANSCRIPT_CREATED":
        return metadata.period
            ? `Se creó el historial académico correspondiente al periodo ${metadata.period}.`
            : "Se creó un nuevo historial académico.";

        case "TRANSCRIPT_FINALIZED":
        return metadata.period
            ? `El historial académico del periodo ${metadata.period} fue finalizado.`
            : "El historial académico fue finalizado.";

        case "TRANSCRIPT_ISSUED":
        return metadata.period
            ? `El historial académico del periodo ${metadata.period} fue emitido.`
            : "El historial académico fue emitido.";

        case "TRANSCRIPT_REVOKED":
        return "El historial académico fue revocado.";

        case "CERTIFICATE_ISSUED":
        return metadata.certificateNumber
            ? `El certificado ${metadata.certificateNumber} fue emitido correctamente.`
            : "El certificado académico fue emitido correctamente.";

        case "CERTIFICATE_REVOKED":
        return "El certificado académico fue revocado.";

        case "COMPETENCY_CREATED":
        return metadata.competency
            ? `Se registró la competencia "${metadata.competency}".`
            : "Se registró una nueva competencia.";

        case "COMPETENCY_ACQUIRED":
        return metadata.competency
            ? `El estudiante adquirió la competencia "${metadata.competency}".`
            : "El estudiante adquirió una nueva competencia.";

        case "COMPETENCY_UPDATED":
        return metadata.competency
            ? `Se actualizó la competencia "${metadata.competency}".`
            : "Se actualizó una competencia.";

        case "COMPETENCY_DEACTIVATED":
        return metadata.competency
            ? `La competencia "${metadata.competency}" fue desactivada.`
            : "Una competencia fue desactivada.";

        case "ACHIEVEMENT_EARNED":
        return metadata.title
            ? `Se registró el logro "${metadata.title}".`
            : "Se registró un nuevo logro.";

        case "ACHIEVEMENT_UPDATED":
        return metadata.title
            ? `Se actualizó el logro "${metadata.title}".`
            : "Se actualizó un logro.";

        case "ACHIEVEMENT_DEACTIVATED":
        return metadata.title
            ? `El logro "${metadata.title}" fue desactivado.`
            : "Un logro fue desactivado.";

        case "BADGE_GRANTED":
        return "Se otorgó una nueva insignia al estudiante.";

        case "MANUAL_EVENT":
        return event.description || "Se registró una actividad académica manual.";

        default:
        return event.description || "Actividad académica registrada.";
    }
};
