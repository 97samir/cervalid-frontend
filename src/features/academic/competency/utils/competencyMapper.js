export const toCompetencyForm = (competency = {}) => ({
    name: competency.name ?? "",
    description: competency.description ?? "",
    level: competency.level ?? "BASIC",
    issuer: competency.issuer ?? "",
    acquiredDate: competency.acquiredDate ?? "",
    academicPeriod: competency.academicPeriod ?? "",
});

export const toCreateCompetencyRequest = (form) => ({
    name: form.name.trim(),
    description: form.description.trim(),
    level: form.level,
    issuer: form.issuer.trim(),
    acquiredDate: form.acquiredDate || null,
    academicPeriod: form.academicPeriod?.trim() || null,
});

export const toUpdateCompetencyRequest = (form) => ({
    name: form.name.trim(),
    description: form.description.trim(),
    level: form.level,
    issuer: form.issuer.trim(),
    acquiredDate: form.acquiredDate || null,
    academicPeriod: form.academicPeriod?.trim() || null,
});