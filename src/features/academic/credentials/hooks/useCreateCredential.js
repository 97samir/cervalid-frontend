import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCredential } from "../api/credentialApi";

export const useCreateCredential = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCredential,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["studentCredentials", variables.studentPublicId],
            });

            queryClient.invalidateQueries({
                queryKey: ["credentials", "search"],
            });
        },
    });
};
