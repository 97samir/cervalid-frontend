import { useQuery } from "@tanstack/react-query";
import { timelineService } from "../services/timelineService";

export const useStudentTimeline = (
    studentPublicId,
    page = 0,
    size = 20,
    filters = {}
) => {

    const params = {
        page,
        size,
        ...(filters.keyword?.trim()
            ? { keyword: filters.keyword.trim() }
            : {}),
        ...(filters.type
            ? { type: filters.type }
            : {}),
        ...(filters.source
            ? { source: filters.source }
            : {}),
        ...(filters.referenceType
            ? { referenceType: filters.referenceType }
            : {}),
        ...(filters.fromDate
            ? { fromDate: filters.fromDate }
            : {}),
        ...(filters.toDate
            ? { toDate: filters.toDate }
            : {}),
    };

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
                params
            ),

        enabled: !!studentPublicId,

        placeholderData: (previousData) => previousData,
    });
};