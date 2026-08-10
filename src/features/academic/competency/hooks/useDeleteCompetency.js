import { useMutation, useQueryClient } from "@tanstack/react-query";
import { competencyService } from "../services/competencyService";

export const useDeleteCompetency = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: competencyService.deleteCompetency,

        onSuccess: (_, competencyPublicId) => {

            queryClient.invalidateQueries({
                queryKey: ["competency", competencyPublicId],
            });

            queryClient.invalidateQueries({
                queryKey: ["student-competencies"],
            });
        },
    });
};
