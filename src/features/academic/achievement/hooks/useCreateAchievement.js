import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "../services/achievementService";

export const useCreateAchievement = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: achievementService.createAchievement,

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: [
                    "student-achievements",
                    variables.studentPublicId,
                ],
            });
        },
    });
};
