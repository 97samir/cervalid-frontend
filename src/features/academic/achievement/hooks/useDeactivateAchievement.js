import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "../services/achievementService";

export const useDeactivateAchievement = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: achievementService.deactivateAchievement,

        onSuccess: (_, achievementPublicId, studentPublicId) => {
            
            queryClient.invalidateQueries({
                queryKey: ["achievement", achievementPublicId],
            });

            queryClient.invalidateQueries({
                queryKey: ["student-achievements", studentPublicId],
            });

            queryClient.invalidateQueries({
                queryKey: ["achievements"],
            });
        },
    });
};
