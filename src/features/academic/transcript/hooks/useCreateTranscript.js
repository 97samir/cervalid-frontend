import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transcriptService } from "../services/transcriptService";

export const useCreateTranscript = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: transcriptService.createTranscript,

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({

                queryKey: ["student-transcripts", variables.studentPublicId],
            });
        },
    });
};
