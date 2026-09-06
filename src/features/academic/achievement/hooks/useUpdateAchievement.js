import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "../services/achievementService";

export const useUpdateAchievement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: achievementService.updateAchievement,

        onSuccess: (_, variables) => {
        // Actualiza el detalle
        queryClient.invalidateQueries({
            queryKey: ["achievement", variables.achievementPublicId],
        });

        // Actualiza los listados de achievements
        queryClient.invalidateQueries({
            queryKey: ["student-achievements"],
        });
        },
    });
};
