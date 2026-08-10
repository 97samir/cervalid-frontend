import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export function useVerifyCertificate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verificationService.verifyCertificate,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["verification-dashboard"],
            });

            queryClient.invalidateQueries({
                queryKey: ["verification-summary"],
            });

            queryClient.invalidateQueries({
                queryKey: ["institution-verification-history"],
            });

            queryClient.invalidateQueries({
                queryKey: ["certificate-verification-history"],
            });
        },
    });
}