import { useQuery } from "@tanstack/react-query";

import { verificationService } from "../services/verificationService";

export default function usePublicTimeline(
    verificationType,
    resourcePublicId,
) {
    const isCredential =
        verificationType === "CREDENTIAL";

    return useQuery({
        queryKey: [
            "public-verification-timeline",
            verificationType,
            resourcePublicId,
        ],

        queryFn: () => {
            if (isCredential) {
                return verificationService.getPublicCredentialTimeline(
                    resourcePublicId,
                );
            }

            return verificationService.getPublicCertificateTimeline(
                resourcePublicId,
            );
        },

        enabled: Boolean(resourcePublicId),

        staleTime: 60 * 1000,
    });
}
