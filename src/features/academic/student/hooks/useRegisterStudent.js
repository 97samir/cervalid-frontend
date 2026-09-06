import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

export const useRegisterStudent = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await studentApi.registerStudent(payload);
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
        },
    });
};
