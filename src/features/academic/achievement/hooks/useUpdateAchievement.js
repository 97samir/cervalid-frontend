import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "../services/achievementService";

export const useUpdateAchievement = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: achievementService.updateAchievement,

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ["achievement", 
                    variables.achievementPublicId],
            });

            queryClient.invalidateQueries({
                queryKey: ["student-achievements", 
                    variables.studentPublicId],
            });

            queryClient.invalidateQueries({
                queryKey: ["achievements"],
            });
        },
    });
};
