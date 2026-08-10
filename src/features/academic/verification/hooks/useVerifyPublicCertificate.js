import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export const useVerifyPublicCertificate = (certificatePublicId) => {
    
    return useQuery({
        queryKey: ["publicCertificateVerification", 
            certificatePublicId],

        queryFn: () =>
        verificationService.verifyPublicCertificate(
            certificatePublicId),

        enabled: !!certificatePublicId,
    });
};
