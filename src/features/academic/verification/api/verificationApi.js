import apiClient from "@/core/api/apiClient";

// certificate
export const verifyCertificate = async (payload) => {
  const { data } = await apiClient.post(
    "/verification/certificates/verify",
    payload,
  );

  return data;
};

export const getPublicCertificateVerification  = async (certificatePublicId) => {
  const response = await apiClient.get(
    `/verification/certificates/${certificatePublicId}`,
  );

  return response.data;
};

export const getPublicCertificateTimeline = async (
    certificatePublicId
) => {

    const response = await apiClient.get(
        `/verification/certificates/public/${certificatePublicId}/timeline`
    );

    return response.data;
};

// credential
export const verifyCredential = async (payload) => {
    const { data } = await apiClient.post(
        "/verification/credentials/verify",
        payload,
    );

    return data;
};

export const getPublicCredentialVerification = async (
    credentialPublicId,
) => {
    const { data } = await apiClient.get(
        `/verification/credentials/${credentialPublicId}`,
    );

    return data;
};

export const getPublicCredentialTimeline = async (
    credentialPublicId,
) => {
    const { data } = await apiClient.get(
        `/verification/credentials/${credentialPublicId}/timeline`,
    );

    return data;
};

// historial
export const searchVerificationHistory = async (
    page = 0,
    size = 10,
    filters = {},
) => {
    const { data } = await apiClient.post(
        `/verification/history/search?page=${page}&size=${size}`,
        filters,
    );

    return data;
};

// dashboard
export const getVerificationDashboard = async () => {
  const { data } = await apiClient.get("/verification/dashboard");

  return data;
};

// Summary - resumen
export const searchVerificationSummary = async (
  page = 0,
  size = 10,
  filters = {},
) => {
  const { data } = await apiClient.get(
    `/verification/summary?page=${page}&size=${size}`,
    {
      params: filters,
    },
  );

  return data;
};
