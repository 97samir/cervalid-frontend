import apiClient from "@/core/api/apiClient";

//Obtiene todos los transcripts de un estudiante
export const getStudentTranscripts = async (studentPublicId) => {
    const { data } = await apiClient.get(
        `/academic/transcripts/students/${studentPublicId}`,
    );

    return data;
};

//Obtiene el detalle de un transcript
export const getTranscript = async (transcriptPublicId) => {
    const { data } = await apiClient.get(
        `/academic/transcripts/${transcriptPublicId}`,
    );

    return data;
};

// Crea un transcript
export const createTranscript = async ({ studentPublicId, data }) => {
    const response = await apiClient.post(
        `/academic/transcripts/students/${studentPublicId}`,
        data,
    );

    return response.data;
};

// Finaliza un transcript
export const finalizeTranscript = async (transcriptPublicId) => {
    await apiClient.post(`/academic/transcripts/${transcriptPublicId}/finalize`);
};

// Emite un transcript
export const issueTranscript = async (transcriptPublicId) => {
    await apiClient.post(`/academic/transcripts/${transcriptPublicId}/issue`);
};

//Agrega un curso
export const addTranscriptItem = async ({ transcriptPublicId, data }) => {
    const response = await apiClient.post(
        `/academic/transcripts/${transcriptPublicId}/items`,
        data,
    );

    return response.data;
};

//Actualiza un curso
export const updateTranscriptItem = async ({
    transcriptPublicId,
    itemPublicId,
    data,
    }) => {
    const response = await apiClient.put(
        `/academic/transcripts/${transcriptPublicId}/items/${itemPublicId}`,
        data,
    );

    return response.data;
};

// Elimina un curso
export const deleteTranscriptItem = async ({
    transcriptPublicId,
    itemPublicId,
    }) => {
    await apiClient.delete(
        `/academic/transcripts/${transcriptPublicId}/items/${itemPublicId}`,
    );
};
