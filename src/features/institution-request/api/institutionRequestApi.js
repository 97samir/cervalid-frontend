import apiClient from "@/core/api/apiClient";

export const createInstitutionRequest = async (data) => {
    const response = await apiClient.post("/institution-requests", data);
    return response.data;
};

export const getInstitutionRequests = async (params) => {
    const response = await apiClient.get("/institution-requests", {params});
    return response.data;
};


// export const approveRequest = async (id) => {
//     return apiClient.post(`/institution-requests/${id}/approve`);
// };

export const approveRequest = async (id, walletAddress) => {
    const response = await apiClient.post(`/institution-requests/${id}/approve`,{walletAddress});
    return response.data;
};

export const rejectRequest = async (id, reason) => {
    return apiClient.post(`/institution-requests/${id}/reject`, { reason });
};