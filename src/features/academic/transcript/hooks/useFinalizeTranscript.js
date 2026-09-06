import { useMutation, useQueryClient } from "@tanstack/react-query";

import { transcriptService } from "../services/transcriptService";

export const useFinalizeTranscript = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transcriptService.finalizeTranscript,

        onSuccess: (_, transcriptPublicId) => {
        queryClient.invalidateQueries({
            queryKey: ["transcript", transcriptPublicId],
        });

        queryClient.invalidateQueries({
            queryKey: ["student-transcripts"],
        });
        },
    });
};
