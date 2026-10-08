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

export const credentialModalityLabels = {
    PRESENCIAL: "Presencial",
    VIRTUAL: "Virtual",
    SEMIPRESENCIAL: "Semipresencial",
};

export const credentialProgramLabels = {
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

export const credentialFacultyLabels = {
    INGENIERIA_Y_TECNOLOGIA: "Ingeniería y Tecnología",
    ARQUITECTURA_Y_DISENO: "Arquitectura y Diseño",
    CIENCIAS_EMPRESARIALES: "Ciencias Empresariales",
};

export const getCredentialTypeLabel = (type) => {
    return credentialTypeLabels[type] || type || "Desconocido";
};

export const getCredentialStatusLabel = (status) => {
    return credentialStatusLabels[status] || status || "Desconocido";
};

export const getCredentialModalityLabel = (modality) => {
    return credentialModalityLabels[modality] || modality || "Desconocida";
};

export const getCredentialProgramLabel = (program) => {
    return credentialProgramLabels[program] || program || "—";
};

export const getCredentialFacultyLabel = (faculty) => {
    return credentialFacultyLabels[faculty] || faculty || "—";
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
