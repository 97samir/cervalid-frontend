import { useQuery } from "@tanstack/react-query";
import { academicProfileService } from "../services/academicProfileService";

export const useAcademicProfile = (publicId) => {

    return useQuery({

        queryKey: ["academic-profile", publicId],

        queryFn: () =>
            academicProfileService.getProfile(publicId),

        enabled: !!publicId,
    });

};