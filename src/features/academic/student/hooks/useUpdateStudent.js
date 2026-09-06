import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

export const useUpdateStudent = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ publicId, data }) =>
        studentApi.updateStudent(publicId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
        }
    });
};