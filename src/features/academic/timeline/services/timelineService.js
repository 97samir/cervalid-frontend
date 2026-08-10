import { timelineApi } from "../api/timelineApi";

export const timelineService = {

    getStudentTimeline: async (studentPublicId, params) => {
        const response = await timelineApi.getStudentTimeline(
            studentPublicId,
            params
        );

        return response.data;
    },

    getEventById: async (publicId) => {
        const response = await timelineApi.getEventById(publicId);

        return response.data;
    },

    createManualEvent: async (data) => {
        const response = await timelineApi.createManualEvent(data);

        return response.data;
    },

    deleteEvent: async (publicId) => {
        const response = await timelineApi.deleteEvent(publicId);

        return response.data;
    },

    searchTimeline: async (data, params) => {
        const response = await timelineApi.searchTimeline(data, params);

        return response.data;
    },

    getSummary: async () => {
        const response = await timelineApi.getSummary();

        return response.data;
    },
};