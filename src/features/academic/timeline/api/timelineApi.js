import apiClient from "@/core/api/apiClient";

const BASE_URL = "/academic/timeline";

export const timelineApi = {

    getStudentTimeline: (studentPublicId, params = {}) =>
        apiClient.get(
            `${BASE_URL}/student/${studentPublicId}`,
            { params }
        ),

    getStudentTimelineSummary: (studentPublicId) =>
        apiClient.get(
            `${BASE_URL}/student/${studentPublicId}/summary`
        ),

    getEventById: (publicId) =>
        apiClient.get(`${BASE_URL}/${publicId}`),

    createManualEvent: (data) =>
        apiClient.post(`${BASE_URL}/manual`, data),

    deleteEvent: (publicId) =>
        apiClient.delete(`${BASE_URL}/${publicId}`),

    getSummary: () =>
        apiClient.get(`${BASE_URL}/summary`),
};