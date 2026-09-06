export const institutionRequestStatusLabels = {
    PENDING: "Pendiente",
    APPROVED: "Aprobada",
    REJECTED: "Rechazada",
};

export const modalityLabels = {
    PRESENCIAL: "Presencial",
    VIRTUAL: "Virtual",
    SEMIPRESENCIAL: "Semipresencial",
};

export const studentStatusLabels = {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    GRADUATED: "Graduado",
    SUSPENDED: "Suspendido",
    PENDING_ACTIVATION: "Pendiente",
    
};

// PROFILE PROGRAM
export const academicProgramLabels = {

    DISENO_DESARROLLO_SOFTWARE:
        "Diseño y Desarrollo de Software",

    ARQUITECTURA_SISTEMAS_INFORMACION:
        "Arquitectura de Sistemas de Información",

    ADMINISTRACION_EMPRESAS:
        "Administración de Empresas",

    ADMINISTRACION_RECURSOS_HUMANOS:
        "Administración de Recursos Humanos",

    ADMINISTRACION_NEGOCIOS_INTERNACIONALES:
        "Administración de Negocios Internacionales",

    CONTABILIDAD:
        "Contabilidad",

    ADMINISTRACION_BANCARIA_FINANCIERA:
        "Administración Bancaria y Financiera",

    DISEÑO_GRAFICO_PUBLICIDAD:
        "Diseño Gráfico y Publicidad",
};

// PROFILE FACULTADES
export const academicFacultyLabels = {

    INGENIERIA_Y_TECNOLOGIA: "Ingeniería y Tecnología",
    ARQUITECTURA_Y_DISENO: "Arquitectura y Diseño",
    CIENCIAS_EMPRESARIALES: "Ciencias Empresariales",
};

// PROFILE: RELACIONAR PROGRAM CON FACULTY
export const academicProgramFaculty = {

    DISENO_DESARROLLO_SOFTWARE:
        "INGENIERIA_Y_TECNOLOGIA",

    ARQUITECTURA_SISTEMAS_INFORMACION:
        "INGENIERIA_Y_TECNOLOGIA",

    ADMINISTRACION_EMPRESAS:
        "CIENCIAS_EMPRESARIALES",

    ADMINISTRACION_RECURSOS_HUMANOS:
        "CIENCIAS_EMPRESARIALES",

    ADMINISTRACION_NEGOCIOS_INTERNACIONALES:
        "CIENCIAS_EMPRESARIALES",

    CONTABILIDAD:
        "CIENCIAS_EMPRESARIALES",

    ADMINISTRACION_BANCARIA_FINANCIERA:
        "CIENCIAS_EMPRESARIALES",

    DISENO_GRAFICO_PUBLICIDAD:
        "ARQUITECTURA_Y_DISENO",
};

// TRANSCRIPT
export const transcriptStatusLabels = {
    DRAFT: "Borrador",
    FINALIZED: "Finalizado",
    ISSUED: "Emitido",
};

export const transcriptAcademicPeriodTypeLabels = {
    CYCLE: "Ciclo",
    SEMESTER: "Semestre",
    QUARTER: "Trimestre",
    BIMESTER: "Bimestre",
    YEAR: "Año académico",
    
};

// COMPETENCY
export const competencyStatusLabels = {
    ACTIVE: "Activa",
    INACTIVE: "Inactiva",
    REVOKED: "Revocada",
    EXPIRED: "Expirada",
};

// CERTIFICATE
export const certificateTypeLabels = {

    DEGREE: "Título profesional",
    ACADEMIC: "Grado académico",
    DIPLOMA: "Diploma",
    CERTIFICATION: "Certificación",
    COURSE_COMPLETION: "Constancia de finalización",
    TRANSCRIPT:"Certificado de estudios",
    CUSTOM: "Otro",
};

// para formulario : campo select
export const competencyLevels = [
    "BASIC",
    "INTERMEDIATE",
    "ADVANCED",
    "EXPERT",
];

export const competencyLevelLabels = {
    BASIC: "Básico",
    INTERMEDIATE: "Intermedio",
    ADVANCED: "Avanzado",
    EXPERT: "Experto",
};

export const competencySourceLabels = {
    MANUAL: "Manual",
    TRANSCRIPT: "Historial Académico",
    ACHIEVEMENT: "Logro Académico",
    CERTIFICATE: "Certificado",
};

// ACHIEVEMENT
export const achievementTypes = [
    "AWARD",
    "CERTIFICATION",
    "SCHOLARSHIP",
    "COMPETITION",
    "RESEARCH",
    "VOLUNTEERING",
    "OTHER",
];

export const achievementTypeLabels = {
    AWARD: "Premio",
    CERTIFICATION: "Certificación",
    SCHOLARSHIP: "Beca",
    COMPETITION: "Competencia",
    RESEARCH: "Investigación",
    VOLUNTEERING: "Voluntariado",
    OTHER: "Otro",
};

export const achievementStatusLabels = {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    ARCHIVED: "Archivado",
};
