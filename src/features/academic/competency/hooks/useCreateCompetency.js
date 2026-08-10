import { useMutation, useQueryClient } from "@tanstack/react-query";
import { competencyService } from "../services/competencyService";

export const useCreateCompetency = () => {

    const queryClient = useQueryClient();

    return useMutation({
        
        mutationFn: competencyService.createCompetency,

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({

                queryKey: ["student-competencies", variables.studentPublicId],
            });
        },
    });
};
