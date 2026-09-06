import {
    academicProgramLabels,
    academicFacultyLabels,
} from "@/shared/utils/enumUtils";

/* =========================================================
   CONFIGURACIÓN DE EVENTOS
========================================================= */

const timelineEventConfig = {
    STUDENT_REGISTERED: {
        label: "Registro académico",
        title: "Estudiante registrado",
        icon: "bi-person-check",
        category: "Perfil académico",
    },

    PROFILE_CREATED: {
        label: "Perfil académico",
        title: "Perfil académico creado",
        icon: "bi-person-vcard",
        category: "Perfil académico",
    },

    PROFILE_UPDATED: {
        label: "Perfil actualizado",
        title: "Perfil académico actualizado",
        icon: "bi-person-vcard",
        category: "Perfil académico",
    },

    TRANSCRIPT_FINALIZED: {
        label: "Historial finalizado",
        title: "Historial académico finalizado",
        icon: "bi-journal-check",
        category: "Historial académico",
    },

    TRANSCRIPT_ISSUED: {
        label: "Historial emitido",
        title: "Historial académico emitido",
        icon: "bi-journal-text",
        category: "Historial académico",
    },

    CERTIFICATE_ISSUED: {
        label: "Certificado emitido",
        title: "Certificado académico emitido",
        icon: "bi-patch-check",
        category: "Certificación",
    },

    CERTIFICATE_REVOKED: {
        label: "Certificado revocado",
        title: "Certificado académico revocado",
        icon: "bi-exclamation-triangle",
        category: "Certificación",
    },

    SKILL_EARNED: {
        label: "Habilidad adquirida",
        title: "Habilidad adquirida",
        icon: "bi-lightning-charge",
        category: "Competencias",
    },

    COMPETENCY_ACQUIRED: {
        label: "Competencia adquirida",
        title: "Competencia adquirida",
        icon: "bi-award",
        category: "Competencias",
    },

    COMPETENCY_CREATED: {
        label: "Competencia registrada",
        title: "Competencia registrada",
        icon: "bi-award",
        category: "Competencias",
    },

    COMPETENCY_UPDATED: {
        label: "Competencia actualizada",
        title: "Competencia actualizada",
        icon: "bi-award",
        category: "Competencias",
    },

    ACHIEVEMENT_EARNED: {
        label: "Logro académico",
        title: "Logro académico obtenido",
        icon: "bi-trophy",
        category: "Logros",
    },

    ACHIEVEMENT_UPDATED: {
        label: "Logro actualizado",
        title: "Logro académico actualizado",
        icon: "bi-trophy",
        category: "Logros",
    },

    BADGE_GRANTED: {
        label: "Insignia otorgada",
        title: "Insignia académica otorgada",
        icon: "bi-patch-check",
        category: "Logros",
    },

    MANUAL_EVENT: {
        label: "Registro académico",
        title: "Registro académico",
        icon: "bi-journal-check",
        category: "Otros",
    },
};

/* =========================================================
   CONFIGURACIÓN
========================================================= */

export function getTimelineEventConfig(type) {
    return (
        timelineEventConfig[type] ?? {
        label: "Evento académico",
        title: "Evento académico registrado",
        icon: "bi-circle",
        category: "Otros",
        }
    );
}

export function getTimelineEventLabel(type) {
    return getTimelineEventConfig(type).label;
}

export function getTimelineEventIcon(type) {
    return getTimelineEventConfig(type).icon;
}

export function getTimelineEventCategory(type) {
    return getTimelineEventConfig(type).category;
}

/* =========================================================
   FECHAS
========================================================= */

export function formatTimelineDate(value) {
    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(value));
}

/* =========================================================
   PERIODOS ACADÉMICOS
========================================================= */

export const GENERAL_PERIOD_KEY = "GENERAL";

export function getTimelinePeriodKey(event) {
    return event?.academicPeriod?.trim()
        ? event.academicPeriod.trim()
        : GENERAL_PERIOD_KEY;
}

export function getTimelinePeriodLabel(periodKey) {
    return periodKey === GENERAL_PERIOD_KEY ? "General" : periodKey;
}

/* =========================================================
   ORDEN DE PERIODOS
========================================================= */

function parseAcademicPeriod(period) {
    if (!period || period === GENERAL_PERIOD_KEY) {
        return null;
    }

    const match = period.match(/^(\d{4})[-\s]?(I{1,3}|IV)$/i);

    if (!match) {
        return null;
    }

    const year = Number(match[1]);

    const roman = match[2].toUpperCase();

    const order = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4,
    };

    return {
        year,
        period: order[roman] ?? 0,
    };
}

export function compareAcademicPeriods(a, b) {
    if (a === GENERAL_PERIOD_KEY) {
        return 1;
    }

    if (b === GENERAL_PERIOD_KEY) {
        return -1;
    }

    const parsedA = parseAcademicPeriod(a);
    const parsedB = parseAcademicPeriod(b);

    /*
    * Si no podemos interpretar el formato,
    * mantenemos un orden estable alfabético.
    */
    if (!parsedA || !parsedB) {
        return b.localeCompare(a);
    }

    if (parsedA.year !== parsedB.year) {
        return parsedB.year - parsedA.year;
    }

    return parsedB.period - parsedA.period;
}

/* =========================================================
   AGRUPACIÓN POR PERIODO
========================================================= */

export function groupTimelineByAcademicPeriod(events = []) {
    return events.reduce((groups, event) => {
        const periodKey = getTimelinePeriodKey(event);

        if (!groups[periodKey]) {
        groups[periodKey] = [];
        }

        groups[periodKey].push(event);

        return groups;
    }, {});
}

/* =========================================================
   PERIODOS PARA UI
========================================================= */

export function getTimelinePeriods(events = []) {
    const grouped = groupTimelineByAcademicPeriod(events);

    return Object.entries(grouped)
        .sort(([periodA], [periodB]) => compareAcademicPeriods(periodA, periodB))
        .map(([key, periodEvents]) => {
        const parsed = parseAcademicPeriod(key);

        return {
            key,
            label: getTimelinePeriodLabel(key),
            year: parsed?.year ?? null,
            events: periodEvents,
            count: periodEvents.length,
        };
        });
}

/* =========================================================
   CONTADORES
========================================================= */

export function getTimelinePeriodCount(events = []) {
    const count = events.length;

    return count === 1 ? "1 evento" : `${count} eventos`;
}

/* =========================================================
   DETALLE DEL EVENTO
========================================================= */

export function getTimelineEventDetail(event) {
    if (!event) {
        return null;
    }

    const metadata = event.metadataJson ?? {};

    switch (event.type) {
        /* CERTIFICACIÓN */

        case "CREDENTIAL_UPDATED":
        case "CERTIFICATE_ISSUED": {
        const details = [];

        if (metadata.title) {
            details.push({
            label: "Título",
            value: metadata.title,
            });
        }

        if (metadata.awardedAt) {
            details.push({
            label: "Otorgado",
            value: metadata.awardedAt,
            });
        }

        if (metadata.program) {
            details.push({
            label: "Programa",
            value: academicProgramLabels[metadata.program] ?? metadata.program,
            });
        }

        if (metadata.faculty) {
            details.push({
            label: "Facultad",
            value: academicFacultyLabels[metadata.faculty] ?? metadata.faculty,
            });
        }

        return details.length > 0 ? details : null;
        }

        /* REGISTRO */

        case "STUDENT_REGISTERED":
        if (metadata.admissionDate) {
            return [
            {
                label: "Ingreso",
                value: metadata.admissionDate,
            },
            ];
        }

        break;

        /* PERFIL */

        case "PROFILE_CREATED":
        if (metadata.cycle) {
            return [
            {
                label: "Ciclo",
                value: metadata.cycle,
            },
            ];
        }

        break;

        /* HISTORIAL */

        case "TRANSCRIPT_FINALIZED":
        case "TRANSCRIPT_ISSUED":
        case "TRANSCRIPT_CREATED":
        if (metadata.period) {
            return [
            {
                label: "Periodo",
                value: metadata.period,
            },
            ];
        }

        break;

        /* LOGROS */

        case "ACHIEVEMENT_EARNED":
        case "ACHIEVEMENT_UPDATED":
        case "ACHIEVEMENT_DEACTIVATED":
        if (metadata.title) {
            return [
            {
                label: "Logro",
                value: metadata.title,
            },
            ];
        }

        break;

        /* COMPETENCIAS */

        case "COMPETENCY_CREATED":
        case "COMPETENCY_ACQUIRED":
        case "COMPETENCY_UPDATED":
        case "COMPETENCY_DEACTIVATED":
        if (metadata.competency) {
            return [
            {
                label: "Competencia",
                value: metadata.competency,
            },
            ];
        }

        break;
    }

    /* FALLBACK */

    if (event.description && event.description.trim() !== "") {
        return [
        {
            label: null,
            value: event.description,
        },
        ];
    }

    return null;
}
