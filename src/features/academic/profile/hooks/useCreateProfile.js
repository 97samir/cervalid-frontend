import { useMutation, useQueryClient } from "@tanstack/react-query";
import { academicProfileService } from "../services/academicProfileService";

export const useCreateProfile = () => {
    
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: academicProfileService.createProfile,

        onSuccess: (_, variables) => {

            // Actualiza la información del perfil
            queryClient.invalidateQueries({
                queryKey: [
                    "student-profile", 
                    variables.studentPublicId],
            });

            // Actualiza la información del estudiante
            queryClient.invalidateQueries({
                queryKey: [
                    "student",
                    variables.studentPublicId,
                ],
            });
        },
    });
};
