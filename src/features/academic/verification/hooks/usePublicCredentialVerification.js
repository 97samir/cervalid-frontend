import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export const usePublicCredentialVerification = (
    credentialPublicId,
) => {
    return useQuery({
        queryKey: [
            "public-credential-verification",
            credentialPublicId,
        ],

        queryFn: () =>
            verificationService.getPublicCredentialVerification(
                credentialPublicId,
            ),

        enabled: Boolean(credentialPublicId),

        staleTime: 60 * 1000,
    });
};