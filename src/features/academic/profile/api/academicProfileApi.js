import apiClient from "@/core/api/apiClient";

export const getStudentProfile = async (studentPublicId) => {
    const { data } = await apiClient.get(
        `/academic/profiles/student/${studentPublicId}`,
    );

    return data;
};

export const createProfile = async ({ studentPublicId, data }) => {

    const { data: responseData } = await apiClient.post(
        `/academic/profiles/students/${studentPublicId}/profile`,
        data,
    );

    return responseData;
};

export const getProfile = async (publicId) => {

    const { data } = await apiClient.get(
        `/academic/profiles/${publicId}`
    );

    return data;
};

export const updateProfile = async ({ publicId, data }) => {

    const { data: responseData } = await apiClient.put(
        `/academic/profiles/${publicId}`,
        data,
    );

    return responseData;
};
