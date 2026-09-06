// Maneja las operaciones relacionadas a invitaciones de usuarios
import apiClient from "@/core/api/apiClient";

export const sendInvitation = async (data) => {
    const response = await apiClient.post("/invitations", data);
    return response.data;
};

export const getInvitations = async (params) => {
    const response = await apiClient.get("/invitations", {params});
    return response.data;
};

export const resendInvitation = async (email) => {
    return await apiClient.post(`/invitations/resend?email=${email}`);
};