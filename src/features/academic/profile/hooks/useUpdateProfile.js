import { useMutation, useQueryClient } from "@tanstack/react-query";
import { academicProfileService } from "../services/academicProfileService";

export const useUpdateProfile = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: academicProfileService.updateProfile,

        onSuccess: (_, variables) => {
            
            // Actualiza el perfil individual
            queryClient.invalidateQueries({
                queryKey: ["academic-profile", variables.publicId],
            });

            // Actualiza la información del estudiante
            queryClient.invalidateQueries({
                queryKey: ["student", variables.studentPublicId],
            });

            // Actualiza el perfil asociado al estudiante
            queryClient.invalidateQueries({
                queryKey: ["student-profile", variables.studentPublicId],
            });
        },
    });
};
