import apiClient from "@/core/api/apiClient";

// export const getUsers = async (params) => {
//     const response = await apiClient.get("/users", { params });
//     return response.data;
// };

// INSTITUCIÓN - listar usuarios
export const getInstitutionUsers = async (params) => {
    const response = await apiClient.get("/users/institution", { params });
    return response.data;
};

// GLOBAL - listar usuarios
export const getAllUsers = async (params) => {
    const response = await apiClient.get("/users/admin", { params });
    return response.data;
};

export const updateUserRole = async (userId, role, institutionId) => {
    return await apiClient.patch(`/users/${userId}/role`, {
        role,
        institutionId // solo para SUPER_ADMIN
    });
};

export const changeUserStatus = async (institutionUserId, active) => {
    return await apiClient.patch(`/institution-users/${institutionUserId}/status`, {
        active
    });
};