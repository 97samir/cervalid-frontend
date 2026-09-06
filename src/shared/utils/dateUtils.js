export const formatLocalDate = (value) => {

    if (!value) {
        return "-";
    }

    const date = new Date(`${value}T00:00:00`);

    return date.toLocaleDateString(
        "es-PE",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
};


export const formatDateTime = (value) => {

    if (!value) {
        return "-";
    }

    const date = new Date(value);

    return date.toLocaleDateString(
        "es-PE",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    ) + ", " +
    date.toLocaleTimeString(
        "es-PE",
        {
            hour: "numeric",
            minute: "2-digit",
        }
    );
};