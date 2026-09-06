import { useQuery } from "@tanstack/react-query";
import { timelineService } from "../services/timelineService";

export const useStudentTimelineSummary = (studentPublicId) => {

    return useQuery({
        
        queryKey: ["studentTimelineSummary", studentPublicId],

        queryFn: () => timelineService.getStudentTimelineSummary(studentPublicId),

        enabled: !!studentPublicId,
    });
};
