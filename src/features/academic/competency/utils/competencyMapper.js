export const toCompetencyForm = (competency = {}) => ({

    name: competency.name ?? "",
    description: competency.description ?? "",
    level: competency.level ?? "BASIC",
    issuer: competency.issuer ?? "",
    acquiredDate: competency.acquiredDate ?? "",
});

export const toCreateCompetencyRequest = (form) => ({

    name: form.name.trim(),
    description: form.description.trim(),
    level: form.level,
    issuer: form.issuer.trim(),
    acquiredDate: form.acquiredDate,
});

export const toUpdateCompetencyRequest = (form) => ({

    name: form.name.trim(),
    description: form.description.trim(),
    level: form.level,
    issuer: form.issuer.trim(),
    acquiredDate: form.acquiredDate,
});
