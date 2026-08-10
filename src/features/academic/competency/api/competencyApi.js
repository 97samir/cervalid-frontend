import apiClient from "@/core/api/apiClient";

// Obtiene todas las competencias de un estudiante
export const getStudentCompetencies = async (studentPublicId) => {
    const { data } = await apiClient.get(
        `/academic/competencies/students/${studentPublicId}`
    );

    return data;
};

// Obtiene una competencia
export const getCompetency = async (competencyPublicId) => {
    const { data } = await apiClient.get(
        `/academic/competencies/${competencyPublicId}`
    );

    return data;
};

// Crea una competencia
export const createCompetency = async ({ studentPublicId, data }) => {
    const response = await apiClient.post(
        `/academic/competencies/students/${studentPublicId}`,
        data
    );

    return response.data;
};

// Actualiza una competencia
export const updateCompetency = async ({competencyPublicId, data,}) => {
    const response = await apiClient.put(
        `/academic/competencies/${competencyPublicId}`,
        data
    );

    return response.data;
};

// Desactiva una competencia
export const deactivateCompetency  = async (competencyPublicId) => {
    await apiClient.delete(
        `/academic/competencies/${competencyPublicId}`
    );
};