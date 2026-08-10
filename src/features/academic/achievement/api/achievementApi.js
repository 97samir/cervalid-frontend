import apiClient from "@/core/api/apiClient";

// Obtiene los logros de un estudiante
export const getStudentAchievements = async (studentPublicId) => {
    const { data } = await apiClient.get("/academic/achievements", {
        params: {
        studentPublicId,
        page: 0,
        size: 100,
        },
    });

    return data.content;
};

// Obtiene un logro
export const getAchievement = async (achievementPublicId) => {
    const { data } = await apiClient.get(
        `/academic/achievements/${achievementPublicId}`,
    );

    return data;
};

// Crea un logro
export const createAchievement = async ({ studentPublicId, data }) => {
    const response = await apiClient.post(
        `/academic/achievements/students/${studentPublicId}`,
        {
        ...data,
        studentPublicId,
        },
    );

    return response.data;
};

// Actualiza un logro
export const updateAchievement = async ({ achievementPublicId, data }) => {
    const response = await apiClient.put(
        `/academic/achievements/${achievementPublicId}`,
        data,
    );

    return response.data;
};

// Desactiva un logro
export const deactivateAchievement = async (achievementPublicId) => {
    await apiClient.delete(`/academic/achievements/${achievementPublicId}`);
};
