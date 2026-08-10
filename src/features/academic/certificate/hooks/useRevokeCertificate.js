import { useMutation, useQueryClient } from "@tanstack/react-query";
import { certificateService } from "../services/certificateService";

export const useRevokeCertificate = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: certificateService.revokeCertificate,

        onSuccess: (_, certificatePublicId) => {
            
            queryClient.invalidateQueries({
                queryKey: ["certificate", certificatePublicId],
            });

            queryClient.invalidateQueries({
                queryKey: ["student-certificates"],
            });
        },
    });
};
