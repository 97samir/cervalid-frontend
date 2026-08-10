import { useQuery } from "@tanstack/react-query";
import { transcriptService } from "../services/transcriptService";

export const useStudentTranscripts = (studentPublicId) => {

    return useQuery({
        
        queryKey: ["student-transcripts", studentPublicId],

        queryFn: () => transcriptService.getStudentTranscripts(studentPublicId),

        enabled: !!studentPublicId,
    });
};
