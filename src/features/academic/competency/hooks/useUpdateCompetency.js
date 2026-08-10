import { useMutation, useQueryClient } from "@tanstack/react-query";
import { competencyService } from "../services/competencyService";

export const useUpdateCompetency = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: competencyService.updateCompetency,

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ["competency", variables.competencyPublicId],
            });

            queryClient.invalidateQueries({
                queryKey: ["student-competencies"],
            });
        },
    });
};
