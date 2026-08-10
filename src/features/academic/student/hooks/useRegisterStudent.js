import { useMutation } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

export const useRegisterStudent = () => {

    return useMutation({
        
        mutationFn: async (payload) => {

            const { data } = await studentApi.registerStudent(payload);
            return data;
        }
    });
};