import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export const usePublicCredentialTimeline = (
    credentialPublicId,
) => {
    return useQuery({
        queryKey: [
            "public-credential-timeline",
            credentialPublicId,
        ],

        queryFn: () =>
            verificationService.getPublicCredentialTimeline(
                credentialPublicId,
            ),

        enabled: Boolean(credentialPublicId),

        staleTime: 60 * 1000,
    });
};