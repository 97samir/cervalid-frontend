import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCredential } from "../api/credentialApi";

export function useUpdateCredential() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            credentialPublicId,
            title,
            description,
        }) =>
            updateCredential({
                credentialPublicId,
                title,
                description,
            }),

        onSuccess: (_, variables) => {

            // Actualiza el detalle.
            queryClient.invalidateQueries({
                queryKey: [
                    "credential",
                    variables.credentialPublicId,
                ],
            });

            // Actualiza las credenciales de los estudiantes.
            queryClient.invalidateQueries({
                queryKey: ["studentCredentials"],
            });

            // Actualiza los resultados de búsqueda.
            queryClient.invalidateQueries({
                queryKey: ["credentials", "search"],
            });
        },
    });
}