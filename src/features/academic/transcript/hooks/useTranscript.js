import { useQuery } from "@tanstack/react-query";
import { transcriptService } from "../services/transcriptService";

export const useTranscript = (transcriptPublicId) => {

    return useQuery({

        queryKey: ["transcript", transcriptPublicId],
        
        queryFn: () => transcriptService
            .getTranscript(transcriptPublicId),
        enabled: !!transcriptPublicId,
    });
};
