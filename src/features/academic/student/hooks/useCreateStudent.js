import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

export const useCreateStudent = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => studentApi.createStudent(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
        },
    });
};