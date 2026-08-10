import { useQuery } from "@tanstack/react-query";
import { achievementService } from "../services/achievementService";

export const useAchievement = (achievementPublicId) => {

    return useQuery({
        
        queryKey: ["achievement", achievementPublicId],

        queryFn: () => achievementService.getAchievement(
            achievementPublicId),

        enabled: !!achievementPublicId,
    });
};
