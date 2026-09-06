import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "../services/achievementService";

export const useDeactivateAchievement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: achievementService.deactivateAchievement,

        onSuccess: (_, achievementPublicId) => {
        // Actualiza el detalle
        queryClient.invalidateQueries({
            queryKey: ["achievement", achievementPublicId],
        });

        // Actualiza los listados
        queryClient.invalidateQueries({
            queryKey: ["student-achievements"],
        });
        },
    });
};
