import { useMutation, useQueryClient } from "@tanstack/react-query";

import { transcriptService } from "../services/transcriptService";

export const useAddTranscriptItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transcriptService.addTranscriptItem,

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
