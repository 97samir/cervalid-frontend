export const formatAchievementDate = (date) => {

    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
        "es-PE",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );
};