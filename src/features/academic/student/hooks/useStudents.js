import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

export const useStudents = (filters = {}) => {

    return useQuery({
        
        queryKey: ["students", filters],

        queryFn: async () => {

            const { data } = await studentApi.getStudents(filters);
            return data;

        },
    });
};
