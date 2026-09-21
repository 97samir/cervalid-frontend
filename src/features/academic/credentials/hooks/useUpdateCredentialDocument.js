import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCredentialDocument } from "../api/credentialApi";

export const useUpdateCredentialDocument = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCredentialDocument,

        onSuccess: (_, variables) => {
            const credentialPublicId = variables.credentialPublicId;

            // Actualiza el detalle de la credencial
            queryClient.invalidateQueries({
                queryKey: ["credential", credentialPublicId],
            });

            // Actualiza las listas de credenciales
            queryClient.invalidateQueries({
                queryKey: ["studentCredentials"],
            });

            queryClient.invalidateQueries({
                queryKey: ["credentials", "search"],
            });
        },
    });
};
