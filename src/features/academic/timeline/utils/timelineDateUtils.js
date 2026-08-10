export const formatTimelineDate = (date) => {

    if (!date) {
        return "-";
    }

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(value);
};
// 28 jul 2026, 15:30