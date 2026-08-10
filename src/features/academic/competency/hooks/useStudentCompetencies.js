import { useQuery } from "@tanstack/react-query";
import { competencyService } from "../services/competencyService";

export const useStudentCompetencies = (studentPublicId) => {

    return useQuery({
        
        queryKey: ["student-competencies", studentPublicId],

        queryFn: () => competencyService.getStudentCompetencies(
            studentPublicId),

        enabled: !!studentPublicId,
    });
};
