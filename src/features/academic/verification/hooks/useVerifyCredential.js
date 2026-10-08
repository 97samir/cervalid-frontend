import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export function useVerifyCredential() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verificationService.verifyCredential,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["verification-dashboard"],
            });

            queryClient.invalidateQueries({
                queryKey: ["verification-summary"],
            });

            queryClient.invalidateQueries({
                queryKey: ["verification-history"],
            });
        },
    });
}