import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

export const useDeleteStudent = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (publicId) =>
            studentApi.deleteStudent(publicId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
        },
    });
};