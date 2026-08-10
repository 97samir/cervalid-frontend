import { useQuery } from "@tanstack/react-query";
import { achievementService } from "../services/achievementService";
// useStudentAchievements
export const useStudentAchievements = (studentPublicId) => {

    return useQuery({

        queryKey: ["student-achievements", studentPublicId],
        queryFn: () => achievementService.getStudentAchievements(
            studentPublicId),
        enabled: !!studentPublicId,
    });
};
