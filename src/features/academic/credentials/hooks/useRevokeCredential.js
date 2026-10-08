import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokeCredential } from "../api/credentialApi";

export const useRevokeCredential = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: revokeCredential,

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: [ "credential", variables.credentialPublicId,
                ],
            });
            
            // se actualiza lista
            queryClient.invalidateQueries({
                queryKey: ["credentials", "search"],
            });

            queryClient.invalidateQueries({
                queryKey: ["studentCredentials"],
            });

            // ===========
            queryClient.invalidateQueries({
                queryKey: ["verification-dashboard"],
            });

            queryClient.invalidateQueries({
                queryKey: ["verification-summary"],
            });

            queryClient.invalidateQueries({
                queryKey: ["institution-verification-history"],
            });
        },
    });
};