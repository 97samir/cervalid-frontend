import { useMutation, useQueryClient } from "@tanstack/react-query";
import { competencyService } from "../services/competencyService";

export const useDeactivateCompetency = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: competencyService.deactivateCompetency,

        onSuccess: (_, competencyPublicId) => {
            // Refresca el detalle
            queryClient.invalidateQueries({
                queryKey: ["competency", competencyPublicId],
            });

            // Refresca los listados paginados
            queryClient.invalidateQueries({
                queryKey: ["student-competencies"],
            });
        },
    });
};
