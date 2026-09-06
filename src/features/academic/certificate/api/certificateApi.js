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

export const issueCertificate = async ({
    transcriptPublicId,
    type,
    title,
    awardedAt,
    documentHash = null,
    documentUrl = null,
}) => {

    const { data } = await apiClient.post(
        `/academic/certificates/transcripts/${transcriptPublicId}`,
        { type, title, awardedAt, documentHash, documentUrl,}
    );
    return data;
};

// Revoca certificado
export const revokeCertificate = async (certificatePublicId) => {

    await apiClient.patch(
        `/academic/certificates/${certificatePublicId}/revoke`
    );
};

// Actualiza los datos principales de la credencial
export const updateCertificateCredential = async ({
    certificatePublicId,
    title,
    awardedAt,
}) => {

    const { data } = await apiClient.put(
        `/academic/certificates/${certificatePublicId}/credential`,
        {title, awardedAt }
    );

    return data;
};

// DOCUMENTO OFICIAL
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
        `/academic/certificates/${certificatePublicId}/document`,
        formData
    );

    return data;
};