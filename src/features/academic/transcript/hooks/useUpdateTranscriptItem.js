import { useMutation, useQueryClient } from "@tanstack/react-query";

import { transcriptService } from "../services/transcriptService";

export const useUpdateTranscriptItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transcriptService.updateTranscriptItem,

        onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
            queryKey: ["transcript", variables.transcriptPublicId],
        });

        queryClient.invalidateQueries({
            queryKey: ["student-transcripts"],
        });
        },
    });
};
