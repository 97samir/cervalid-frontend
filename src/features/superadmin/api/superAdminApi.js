// maneja operaciones exclusivas del SUPER_ADMIN.

import apiClient from "@/core/api/apiClient";

export const getAllInstitutions = async () => {
    const res = await apiClient.get("/institutions");
    return res.data;
};

export const switchInstitution = async (institutionId) => {
    const res = await apiClient.post("/auth/select-institution", {
        institutionId
    });
    return res.data;
};

export const getAdminDashboardStats = async () => {
    const response = await apiClient.get("/admin/dashboard-stats");
    return response.data;
};