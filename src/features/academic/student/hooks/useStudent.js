import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

export const useStudent = (publicId) => {

    return useQuery({

        queryKey: ["student", publicId],

        queryFn: async () => {
            const { data } = 
                await studentApi.getStudentById(publicId);
            return data;
        },

        enabled: !!publicId
    });
};