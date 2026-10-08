import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "../api/studentApi";

export const useUpdateStudent = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ publicId, data }) =>

        studentApi.updateStudent(publicId, data),

        onSuccess: (_, variables) => {

            const {publicId} = variables;

            // actualiza lista de estudiantes
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });

            // actualiza detalle de estudiantes
            queryClient.invalidateQueries({
                queryKey: ["student", publicId],
            });
        }
    });
};