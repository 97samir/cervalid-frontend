import { useQuery } from "@tanstack/react-query";
import { certificateService } from "../services/certificateService";

export const useCertificates = (studentPublicId) => {

    return useQuery({

        queryKey: ["student-certificates", studentPublicId],
        
        queryFn: () => certificateService.getStudentCertificates(
            studentPublicId),

        enabled: !!studentPublicId,
    });
};
