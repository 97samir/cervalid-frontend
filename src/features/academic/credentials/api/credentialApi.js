import apiClient from "@/core/api/apiClient";

const BASE_URL = "/academic/credentials";

export const getCredentialDashboardSummary = async () => {
    const { data } = await apiClient.get(
        `${BASE_URL}/dashboard/summary`
    );

    return data;
};

export const getCredentialDashboardCredentials = async (params) => {
    const { data } = await apiClient.get(BASE_URL, {
        params,
    });

    return data;
};

// Obtiene los Credentials de un estudiante
export const getStudentCredentials = async (
    studentPublicId
) => {

    const { data } = await apiClient.get(
        `/academic/credentials/students/${studentPublicId}`,
        {
        params: {
            page: 0,
            size: 100,
        },
        },
    );

    return data.content;
};

// Obtiene un Credential por su publicId
export const getCredential = async (credentialPublicId) => {

    const { data } = await apiClient.get(
        `/academic/credentials/${credentialPublicId}`,
    );

    return data;
};

// Busca Credentials con filtros
export const searchCredentials = async (params = {}) => {

    const { data } = await apiClient.get("/academic/credentials", {
        params: {
        page: 0,
        size: 100,
        ...params,
        },
    });

    return data;
};

// Crea un Credential en estado DRAFT
export const createCredential = async ({ 
    studentPublicId, 
    data 
}) => {

    const response = await apiClient.post(
        `/academic/credentials/students/${studentPublicId}`,
        data,
    );

    return response.data;
};

// Actualiza un Credential en estado DRAFT
export const updateCredential = async ({
    credentialPublicId,
    title,
    description,
}) => {

    const { data } = await apiClient.put(
        `/academic/credentials/${credentialPublicId}`,
        {
            title,
            description,
        }
    );

    return data;
};

// Emite un Credential
export const issueCredential = async (credentialPublicId) => {
    const response = await apiClient.patch(
        `/academic/credentials/${credentialPublicId}/issue`,
    );

    return response.data;
};

// Revoca un Credential emitido
export const revokeCredential = async ({ 
    credentialPublicId, 
    reason 
}) => {
    const response = await apiClient.patch(
        `/academic/credentials/${credentialPublicId}/revoke`,
        {
        reason,
        },
    );

    return response.data;
};

// DOCUMENTO OFICIAL
export const updateCredentialDocument = async ({
    credentialPublicId,
    file,
    documentHash,
    documentUrl,
}) => {

    const formData = new FormData();

    if (file) {
        formData.append("file", file);
    }

    if (documentHash) {
        formData.append("documentHash", documentHash);
    }

    if (documentUrl) {
        formData.append("documentUrl", documentUrl);
    }

    const { data } = await apiClient.put(
        `/academic/credentials/${credentialPublicId}/document`,
        formData
    );

    return data;
};
