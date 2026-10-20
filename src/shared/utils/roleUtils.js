export const ROLE_LABELS = {

    SUPER_ADMIN: "Super Administrador",
    INSTITUTION_ADMIN: "Administrador Institucional",
    INSTITUTION_SUBADMIN: "Subadministrador",
    INSTITUTION_AUDITOR: "Auditor",
    STUDENT: "Estudiante",
    RECRUITER: "Reclutador"
};

export function getRoleLabel(role) {

    return ROLE_LABELS[role] ?? role;

}