// 2026-07-15 -> 15 jul 2026
export const formatCompetencyDate = (date) => {
    
    if (!date) {
        return "Pendiente de emisión";
    }

    const value = String(date);

    // fecha sin hora
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [year, month, day] = value.split("-").map(Number);

        return new Intl.DateTimeFormat("es-PE", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(year, month - 1, day));
    }

    // fecha con hora
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Fecha no válida";
    }

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(parsedDate);
};
