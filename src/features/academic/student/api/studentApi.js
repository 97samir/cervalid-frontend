import apiClient from "@/core/api/apiClient";

const BASE_URL = "/academic/students";

export const studentApi = {

    getStudents: (params) =>
        apiClient.get(BASE_URL, { params }),

    getStudentById: (publicId) =>
        apiClient.get(`${BASE_URL}/${publicId}`),

    registerStudent: (data) =>
        apiClient.post(`${BASE_URL}/register`, data),

    createStudent: (data) =>
        apiClient.post(BASE_URL, data),

    updateStudent: (publicId, data) =>
        apiClient.put(`${BASE_URL}/${publicId}`, data),

    deleteStudent: (publicId) =>
        apiClient.delete(`${BASE_URL}/${publicId}`)
};