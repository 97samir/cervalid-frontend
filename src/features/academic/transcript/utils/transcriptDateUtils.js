// 2026-07-13T18:25:14 -> 13 jul 2026

export const formatTranscriptDate = (date) => {

    if (!date) {
        return "Pendiente de emisión";
    }

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};


// 13 jul 2026, 18:25

export const formatTranscriptDateTime = (date) => {

    if (!date) {
        return "Pendiente de emisión";
    }

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};