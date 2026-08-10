import { useQuery } from "@tanstack/react-query";
import { timelineService } from "../services/timelineService";

export const useStudentTimeline = (
    studentPublicId,
    page = 0,
    size = 20,
    filters = {}
) => {

    return useQuery({

        queryKey: [
            "studentTimeline",
            studentPublicId,
            page,
            size,
            filters,
        ],

        queryFn: () =>
            timelineService.getStudentTimeline(
                studentPublicId,
                {
                    page,
                    size,
                    ...filters,
                }
            ),

        enabled: !!studentPublicId,

        placeholderData: (previousData) => previousData,
    });
};