import apiClient from "./apiClient";

export const verifyCertificate = async ({ certificateNumber, hash }) => {
    const response = await apiClient.post("/verification/certificates/verify", {
        certificateNumber,
        hash,
    });

    return response.data;
};
