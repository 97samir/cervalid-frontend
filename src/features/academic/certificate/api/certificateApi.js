import apiClient from "@/core/api/apiClient";

const BASE_URL = "/academic/certificates";

// DASHBOARD: resumen de certificados
export const getCertificateDashboardSummary = async () => {
    const { data } = await apiClient.get(
        `${BASE_URL}/dashboard/summary`
    );

    return data;
};

// DASHBOARD: listado paginado y filtrado
export const getCertificateDashboardCertificates = async (params = {}) => {
    const { data } = await apiClient.get(BASE_URL, {
        params,
    });

    return data;
};

// Obtiene todos los certificados de un estudiante
export const getStudentCertificates = async (studentPublicId) => {
    const { data } = await apiClient.get(
        `${BASE_URL}/students/${studentPublicId}`,
        {
            params: {
                page: 0,
                size: 100,
            },
        }
    );

    return data.content;
};

// Obtiene un certificado por su publicId
export const getCertificate = async (certificatePublicId) => {
    const { data } = await apiClient.get(
        `${BASE_URL}/${certificatePublicId}`
    );

    return data;
};

// Obtiene el detalle completo
export const getCertificateDetail = async (certificatePublicId) => {
    const { data } = await apiClient.get(
        `${BASE_URL}/${certificatePublicId}/detail`
    );

    return data;
};

// Emite un certificado a partir de un transcript
export const issueCertificate = async ({
    transcriptPublicId,
    type,
    title,
    description,
    awardedAt,
    documentHash = null,
    documentUrl = null,
}) => {
    const { data } = await apiClient.post(
        `${BASE_URL}/transcripts/${transcriptPublicId}`,
        {
            type,
            title,
            description,
            awardedAt,
            documentHash,
            documentUrl,
        }
    );

    return data;
};

// Revoca un certificado
export const revokeCertificate = async (certificatePublicId) => {
    await apiClient.patch(
        `${BASE_URL}/${certificatePublicId}/revoke`
    );
};

// Actualiza los datos principales del certificado
export const updateCertificateCredential = async ({
    certificatePublicId,
    title,
    description,
    awardedAt,
}) => {
    const { data } = await apiClient.put(
        `${BASE_URL}/${certificatePublicId}/credential`,
        {
            title,
            description,
            awardedAt,
        }
    );

    return data;
};

// Actualiza el documento oficial
export const updateCertificateDocument = async ({
    certificatePublicId,
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
        `${BASE_URL}/${certificatePublicId}/document`,
        formData
    );

    return data;
};