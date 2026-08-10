import { useMutation, useQueryClient } from "@tanstack/react-query";
import { timelineService } from "../services/timelineService";

export const useDeleteTimelineEvent = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (publicId) =>
            timelineService.deleteEvent(publicId),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["studentTimeline"],
            });

            queryClient.invalidateQueries({
                queryKey: ["timelineSearch"],
            });

            queryClient.removeQueries({
                queryKey: ["timelineEvent"],
            });
        },
    });
};