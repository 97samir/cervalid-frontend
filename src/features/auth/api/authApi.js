// Contiene todas las llamadas API relacionadas con autenticación

import apiClient from "../../../core/api/apiClient";

export const loginRequest = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

// salir de una institución bajo contexto (caso superadmin)
export const exitInstitution = async () => {
  const response = await apiClient.post("/auth/exit-institution");
  return response.data;
};

export const selectInstitutionRequest = async (payload) => {
  const response = await apiClient.post("/auth/select-institution", payload);
  return response.data;
};

export const getCurrentUser = async () => {
  console.log(">>> GET /auth/me ejecutándose");
  const response = await apiClient.get("/auth/me");
  console.log(">>> RESPUESTA /auth/me:", response.data);
  return response.data;
};

// REFRESH TOKEN (NO usa interceptor)
export const refreshTokenRequest = async (refreshToken) => {
  const response = await apiClient.post("/auth/refresh", {
    refreshToken,
  });
  return response.data;
};

export const activateAccount = async (data) => {
  const response = await apiClient.post("/activate", data);
  return response.data;
};