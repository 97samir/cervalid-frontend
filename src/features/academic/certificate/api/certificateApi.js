import apiClient from "@/core/api/apiClient";

// Obtiene todos los certificados de un estudiante
export const getStudentCertificates = async (studentPublicId) => {

    const { data } = await apiClient.get(
        `/academic/certificates/students/${studentPublicId}`,
        {
            params: {
                page: 0,
                size: 100,
            },
        }
    );

    return data.content;
};

// Obtiene un certificado
export const getCertificate = async (certificatePublicId) => {

    const { data } = await apiClient.get(
        `/academic/certificates/${certificatePublicId}`
    );

    return data;
};

// Obtiene el detalle completo
export const getCertificateDetail = async (certificatePublicId) => {

    const { data } = await apiClient.get(
        `/academic/certificates/${certificatePublicId}/detail`
    );

    return data;
};

// Emite certificado desde transcript
export const issueCertificate = async (transcriptPublicId) => {

    const { data } = await apiClient.post(
        `/academic/certificates/transcripts/${transcriptPublicId}`
    );

    return data;
};

// Revoca certificado
export const revokeCertificate = async (certificatePublicId) => {

    await apiClient.patch(
        `/academic/certificates/${certificatePublicId}/revoke`
    );
};