import { useMutation, useQueryClient } from "@tanstack/react-query";
import { certificateService } from "../services/certificateService";

export const useIssueCertificate = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: certificateService.issueCertificate,

        onSuccess: (_, variables) => {

            const transcriptPublicId =
                typeof variables === "string"
                    ? variables
                    : variables.transcriptPublicId;

            // Actualiza el detalle del transcript
            queryClient.invalidateQueries({
                queryKey: ["transcript", transcriptPublicId],
            });

            // Actualiza lista de certificados
            queryClient.invalidateQueries({
                queryKey: ["student-certificates"],
            });

            // Actualiza historial académico del estudiante
            queryClient.invalidateQueries({
                queryKey: ["student-transcripts"],
            });
        },
    });
};