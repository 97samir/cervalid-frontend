import { useQuery } from "@tanstack/react-query";
import { timelineService } from "../services/timelineService";

export const useTimelineEvent = (publicId) => {

    return useQuery({

        queryKey: ["timelineEvent", publicId],
        queryFn: () => timelineService.getEventById(publicId),
        enabled: !!publicId,
    });
};
