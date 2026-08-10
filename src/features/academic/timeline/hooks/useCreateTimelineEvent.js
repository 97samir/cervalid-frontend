import { useMutation, useQueryClient } from "@tanstack/react-query";
import { timelineService } from "../services/timelineService";

export const useCreateTimelineEvent = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => timelineService.createManualEvent(data),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["studentTimeline"],
            });

            // queryClient.invalidateQueries({
            //     queryKey: ["timelineSearch", variables.studentPublicId],
            // });
        },
    });
};
