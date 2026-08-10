// 2026-07-15 -> 15 jul 2026

export const formatCompetencyDate = (date) => {
    
    if (!date) {
        return "-";
    }

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};
