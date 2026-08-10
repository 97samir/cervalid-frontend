// llamadas HTTP

import apiClient from "../../../core/api/apiClient";

export async function getInstitutionDashboardStats() {
    const response = await apiClient.get("/institutions/dashboard-stats");
    return response.data;
};

export async function getMyInstitution() {
    const response = await apiClient.get("/institutions/me");
    return response.data;
};
