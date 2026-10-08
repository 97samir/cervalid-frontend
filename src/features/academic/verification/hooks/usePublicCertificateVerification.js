import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export const usePublicCertificateVerification = (certificatePublicId) => {
    
    return useQuery({
        queryKey: ["public-certificate-verification", 
            certificatePublicId],

        queryFn: () =>
        verificationService.getPublicCertificateVerification(
            certificatePublicId),

        enabled: !!certificatePublicId,
        staleTime: 60 * 1000,
    });
};
