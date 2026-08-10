import apiClient from "@/core/api/apiClient";

export const getInstitutions = async (params) => {
    const response = await apiClient.get("/institutions", {
        params
    });
    return response.data;
};

export const changeInstitutionStatus = async (id, active) => {
    return await apiClient.patch(`/institutions/${id}/status?active=${active}`);
};