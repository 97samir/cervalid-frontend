import { useQuery } from "@tanstack/react-query";
import { timelineService } from "../services/timelineService";

export const useTimelineSearch = (
    studentPublicId,
    filters,
    page = 0,
    size = 20,
) => {
    return useQuery({
        queryKey: ["timelineSearch", studentPublicId, filters, page, size],

        queryFn: () =>
        timelineService.searchTimeline(
            {
            studentPublicId,
            type: filters.type || null,
            source: filters.source || null,
            referenceType: filters.referenceType || null,
            fromDate: filters.fromDate || null,
            toDate: filters.toDate || null,
            keyword: filters.keyword?.trim() || null,
            },
            {
            page,
            size,
            sort: "eventDate,desc",
            },
        ),

        enabled: !!studentPublicId,

        placeholderData: (previousData) => previousData,
    });
};
