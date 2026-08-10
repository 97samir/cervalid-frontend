// forma de obtener datos actualizados desde backend

import { useQuery } from "@tanstack/react-query";
import { academicProfileService } from "../services/academicProfileService";

export const useStudentProfile = (studentPublicId) => {

    return useQuery({
        
        queryKey: ["student-profile", studentPublicId],

        queryFn: () => 
            academicProfileService.getStudentProfile(
                studentPublicId),

        enabled: !!studentPublicId,
    });
};
