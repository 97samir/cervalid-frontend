import { useMutation, useQueryClient } from "@tanstack/react-query";
import { issueCredential } from "../api/credentialApi";

export const useIssueCredential = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: issueCredential,

        onSuccess: (_, credentialPublicId) => {

            queryClient.invalidateQueries({
                queryKey: ["credential", credentialPublicId],
            });

            // Actualizamos también las listas.
            queryClient.invalidateQueries({
                queryKey: ["credentials", "search"],
            });

            queryClient.invalidateQueries({
                queryKey: ["studentCredentials"],
            });
        },
    });
};