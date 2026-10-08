export const formatTranscriptDate = (date) => {
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


// Ejemplo:
// 2026-07-13T18:25:14 -> 13 jul 2026, 18:25
export const formatTranscriptDateTime = (date) => {
    if (!date) {
        return "Pendiente de emisión";
    }

    const value = String(date);

    /*
     * Si recibe solamente una fecha,
     * la mostramos como fecha sin inventar una hora
     */
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [year, month, day] = value.split("-").map(Number);

        return new Intl.DateTimeFormat("es-PE", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(year, month - 1, day));
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Fecha no válida";
    }

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(parsedDate);
};